import type { ApiRequestDto, Priority, RequestStatus } from '~/types/types'
import { REQUESTS_DB } from '../../utils/db'

interface PatchRequestBody {
	priority?: Priority
	status?: RequestStatus
	assigneeId?: string | null
	simulateError?: '409' | '500' | null
}

export default defineEventHandler(async (event): Promise<ApiRequestDto> => {
	const id = getRouterParam(event, 'id')
	const body = await readBody<PatchRequestBody>(event)

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
			statusMessage:
				'Внутренняя ошибка сервера при сохранении. Предыдущее значение восстановлено.'
		})
	}

	const target = REQUESTS_DB.find(r => r.id === id)
	if (!target) {
		throw createError({ statusCode: 404, statusMessage: 'Заявка не найдена' })
	}

	if (body.priority !== undefined) {
		target.priority = body.priority
		target.dueDate =
			body.priority === 'critical' ? 'Сегодня, 10:14' : 'Сегодня, 13:14'
	}

	if (body.status !== undefined) {
		target.status = body.status
	}

	if (body.assigneeId !== undefined) {
		target.assigneeId = body.assigneeId
	}

	return target
})
