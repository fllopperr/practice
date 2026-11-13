import { z } from 'zod'
import type { RequestStatus, UserRole } from '../types'

export const ROLE_LABELS: Record<UserRole, string> = {
	Client: 'Клиент',
	Operator: 'Оператор',
	Agent: 'Исполнитель',
	Admin: 'Администратор'
}

export const ALLOWED_STATUS_TRANSITIONS: Record<
	RequestStatus,
	RequestStatus[]
> = {
	new: ['assigned', 'progress', 'closed'],
	assigned: ['progress', 'waiting', 'escalated', 'closed'],
	progress: ['waiting', 'resolved', 'escalated', 'closed'],
	waiting: ['progress', 'resolved', 'closed'],
	escalated: ['progress', 'resolved', 'closed'],
	resolved: ['closed', 'progress'],
	closed: []
}

export const canTransitionStatus = (
	from: RequestStatus,
	to: RequestStatus
): boolean => {
	if (from === to) return true
	return ALLOWED_STATUS_TRANSITIONS[from]?.includes(to) ?? false
}

export const LoginSchema = z.object({
	email: z.string().email('Введите корректный адрес электронной почты.'),
	password: z.string().min(4, 'Минимум 4 символа'),
	role: z.enum(['Client', 'Operator', 'Agent', 'Admin']).optional()
})

export const RegisterSchema = z.object({
	name: z.string().min(2, 'Укажите имя'),
	company: z.string().min(2, 'Укажите компанию'),
	email: z.string().email('Введите корректный адрес электронной почты.'),
	password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

export const CreateRequestSchema = z.object({
	title: z.string().min(1, 'Укажите название заявки.'),
	category: z.string().min(1, 'Выберите категорию.'),
	description: z.string().min(1, 'Опишите проблему.'),
	priority: z.enum(['critical', 'high', 'normal', 'low'])
})

export const AssignRequestSchema = z.object({
	assigneeId: z.string().min(1, 'Выберите активного сотрудника.'),
	comment: z.string().optional()
})

export const ResolveRequestSchema = z.object({
	resolutionText: z.string().trim().min(1, 'Опишите результат решения.')
})

export const ChangeStatusSchema = z
	.object({
		status: z.enum([
			'new',
			'assigned',
			'in_progress',
			'waiting',
			'escalated',
			'resolved',
			'closed'
		]),
		waitingReason: z.string().optional(),
		resolutionText: z.string().optional(),
		closeReason: z.string().optional()
	})
	.superRefine((val, ctx) => {
		if (
			val.status === 'waiting' &&
			(!val.waitingReason || !val.waitingReason.trim())
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['waitingReason'],
				message: 'Укажите причину ожидания.'
			})
		}
		if (
			val.status === 'resolved' &&
			(!val.resolutionText || !val.resolutionText.trim())
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['resolutionText'],
				message: 'Опишите результат решения.'
			})
		}
		if (
			val.status === 'closed' &&
			(!val.closeReason || !val.closeReason.trim())
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['closeReason'],
				message: 'Укажите причину ручного закрытия.'
			})
		}
	})
