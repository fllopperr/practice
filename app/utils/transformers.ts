import type {
	ApiRequestDto,
	LookupDictionaries,
	WorkRequest
} from '../types/types'

export const transformApiRequest = (
	dto: ApiRequestDto,
	dictionaries?: LookupDictionaries,
	useFullAssigneeName = false
): WorkRequest => {
	const customerObj = dictionaries?.customers.find(c => c.id === dto.customerId)
	const categoryObj = dictionaries?.categories.find(
		cat => cat.id === dto.categoryId
	)
	const assigneeObj = dictionaries?.users.find(u => u.id === dto.assigneeId)

	const hasMissingTitle = !dto.title || !dto.title.trim()
	const hasMissingCustomer = !dto.customerId || !customerObj

	const resolvedAssignee = assigneeObj
		? useFullAssigneeName && assigneeObj.fullName
			? assigneeObj.fullName
			: assigneeObj.name
		: 'Не назначен'

	return {
		id: dto.id,
		number: dto.number || `#${dto.id}`,
		title: hasMissingTitle ? 'Без названия' : dto.title!.trim(),
		description: dto.description?.trim() || 'Описание проблемы не указано.',
		client: hasMissingCustomer ? 'Клиент не указан' : customerObj!.name,
		category: categoryObj?.name || 'Доступ и учётные записи',
		assignee: resolvedAssignee,
		status: dto.status || 'new',
		priority: dto.priority || 'normal',
		createdAtText: dto.createdAt || 'Создана недавно',
		dueDateText: dto.dueDate || 'Сегодня, 13:14',
		comments: dto.comments ?? [],
		history: dto.history ?? [],
		isMissingOptionalFields: hasMissingTitle || hasMissingCustomer
	}
}
