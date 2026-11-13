import type {
	ApiRequestDto,
	Priority,
	RequestStatus
} from '../../../shared/types'
import { canTransitionStatus } from '../../../shared/utils/validation'
import { getServerSessionUser } from '../../utils/auth'
import { REQUESTS_DB, USERS_DB } from '../../utils/db'

interface PatchBody {
	priority?: Priority
	status?: RequestStatus
	assigneeId?: string | null
	comment?: string
	waitingReason?: string
	resolutionText?: string
	closeReason?: string
	simulateError?: '409' | '500' | null
}

export default defineEventHandler(async (event): Promise<ApiRequestDto> => {
	const user = getServerSessionUser(event)
	const id = getRouterParam(event, 'id')
	const body = await readBody<PatchBody>(event)

	if (user.role === 'Client') {
		throw createError({
			statusCode: 403,
			statusMessage: 'Клиент не может изменять параметры заявки.'
		})
	}

	if (body.simulateError === '409') {
		throw createError({
			statusCode: 409,
			statusMessage:
				'Заявка была изменена другим сотрудником. Предыдущее значение восстановлено. Обновите данные и попробуйте снова.'
		})
	}
	if (body.simulateError === '500') {
		throw createError({
			statusCode: 500,
			statusMessage: 'Внутренняя ошибка сервера при сохранении.'
		})
	}

	const target = REQUESTS_DB.find(r => r.id === id)
	if (!target) {
		throw createError({ statusCode: 404, statusMessage: 'Заявка не найдена' })
	}

	if (body.assigneeId !== undefined) {
		if (user.role === 'Agent') {
			throw createError({
				statusCode: 403,
				statusMessage: 'Исполнитель не может переназначать заявку.'
			})
		}

		if (body.assigneeId !== null) {
			const candidate = USERS_DB.find(
				u => u.id === body.assigneeId || u.fullName === body.assigneeId
			)
			if (!candidate || !candidate.isActive) {
				throw createError({
					statusCode: 422,
					statusMessage:
						'Деактивированный сотрудник не может получить новое назначение. Выберите активного исполнителя.'
				})
			}
			target.assigneeId = candidate.id
			if (target.status === 'new') {
				target.status = 'assigned'
			}
		} else {
			target.assigneeId = null
		}
	}

	if (body.status !== undefined && body.status !== target.status) {
		if (!canTransitionStatus(target.status, body.status)) {
			throw createError({
				statusCode: 422,
				statusMessage: `Недопустимый переход статуса из «${target.status}» в «${body.status}».`
			})
		}

		if (
			body.status === 'waiting' &&
			(!body.waitingReason || !body.waitingReason.trim())
		) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Укажите причину ожидания.'
			})
		}

		if (
			body.status === 'resolved' &&
			(!body.resolutionText || !body.resolutionText.trim())
		) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Опишите результат решения.'
			})
		}

		if (
			body.status === 'closed' &&
			(!body.closeReason || !body.closeReason.trim())
		) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Укажите причину ручного закрытия.'
			})
		}

		target.status = body.status

		if (body.resolutionText?.trim()) {
			target.resolutionText = body.resolutionText.trim()
			target.history = [
				...(target.history ?? []),
				{
					id: `h-${Date.now()}`,
					time: '13:00',
					text: 'Исполнитель зафиксировал решение'
				}
			]
		}
		if (body.waitingReason?.trim()) {
			target.waitingReason = body.waitingReason.trim()
		}
		if (body.closeReason?.trim()) {
			target.closeReason = body.closeReason.trim()
		}
	}

	if (body.priority !== undefined) {
		target.priority = body.priority
		target.dueDate =
			body.priority === 'critical' ? 'Сегодня, 10:14' : 'Сегодня, 13:14'
	}

	return target
})
