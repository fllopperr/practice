import { describe, expect, it } from 'vitest'
import { transformApiRequest } from '../../app/utils/transformers'
import {
	canTransitionStatus,
	ChangeStatusSchema,
	CreateRequestSchema,
	ResolveRequestSchema
} from '../../shared/utils/validation'

describe('Бизнес-правила и переходы статусов заявки', () => {
	it('разрешает валидные переходы статусов (new -> assigned -> in_progress -> resolved -> closed)', () => {
		expect(canTransitionStatus('new', 'assigned')).toBe(true)
		expect(canTransitionStatus('assigned', 'progress')).toBe(true)
		expect(canTransitionStatus('progress', 'waiting')).toBe(true)
		expect(canTransitionStatus('progress', 'resolved')).toBe(true)
		expect(canTransitionStatus('resolved', 'closed')).toBe(true)
	})

	it('запрещает переход из закрытой заявки (closed -> in_progress)', () => {
		expect(canTransitionStatus('closed', 'progress')).toBe(false)
		expect(canTransitionStatus('new', 'resolved')).toBe(false)
	})

	it('требует обязательные поля Название и Описание при создании заявки (//5.03)', () => {
		const invalid = CreateRequestSchema.safeParse({
			title: '',
			category: 'Доступ и учётные записи',
			description: '',
			priority: 'high'
		})
		expect(invalid.success).toBe(false)
		if (!invalid.success) {
			const messages = invalid.error.issues.map(i => i.message)
			expect(messages).toContain('Укажите название заявки.')
			expect(messages).toContain('Опишите проблему.')
		}
	})

	it('требует причину ожидания для статуса waiting и результат решения для resolved', () => {
		const waitingFail = ChangeStatusSchema.safeParse({
			status: 'waiting',
			waitingReason: '   '
		})
		expect(waitingFail.success).toBe(false)

		const resolveFail = ResolveRequestSchema.safeParse({ resolutionText: '' })
		expect(resolveFail.success).toBe(false)
	})

	it('устойчиво преобразует DTO при отсутствии необязательных полей (//2.06)', () => {
		const vm = transformApiRequest({
			id: '1038',
			number: '#1038',
			title: null,
			customerId: null,
			status: 'progress',
			priority: 'normal',
			createdAt: 'Создана 5 октября',
			dueDate: 'Сегодня, 16:00'
		})
		expect(vm.title).toBe('Без названия')
		expect(vm.client).toBe('Клиент не указан')
		expect(vm.isMissingOptionalFields).toBe(true)
	})
})
