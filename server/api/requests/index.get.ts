import type { ApiRequestsListResponse } from '~/types/types'
import { CUSTOMERS_DB, REQUESTS_DB, USERS_DB } from '../../utils/db'

export default defineEventHandler((event): ApiRequestsListResponse => {
	const query = getQuery(event)

	if (query.error === '429') {
		throw createError({
			statusCode: 429,
			statusMessage: 'Превышен лимит запросов (HTTP 429).'
		})
	}
	if (query.error === '500') {
		throw createError({
			statusCode: 500,
			statusMessage: 'Сервис временно недоступен. Попробуйте ещё раз.'
		})
	}

	const q = String(query.q || '')
		.trim()
		.toLowerCase()
	const status = String(query.status || 'all')
	const priority = String(query.priority || 'all')
	const assignee = String(query.assignee || 'all')
	const sort = String(query.sort || 'newest')
	const page = Math.max(1, Number(query.page) || 1)
	const pageSize = Math.max(1, Number(query.pageSize) || 12)
	const partialMode = query.partial === '1'

	const sourceList = REQUESTS_DB.map(item => {
		if (partialMode && item.id === '1038') {
			return { ...item, title: null, customerId: null }
		}
		return item
	})

	let filtered = sourceList.filter(item => {
		const customerName =
			CUSTOMERS_DB.find(c => c.id === item.customerId)?.name || ''
		const assigneeName =
			USERS_DB.find(u => u.id === item.assigneeId)?.name || 'Не назначен'

		const matchesSearch =
			!q ||
			(q === 'crm'
				? item.id === '1042'
				: item.number.toLowerCase().includes(q) ||
					(item.title && item.title.toLowerCase().includes(q)) ||
					customerName.toLowerCase().includes(q))

		const matchesStatus = status === 'all' || item.status === status
		const matchesPriority = priority === 'all' || item.priority === priority
		const matchesAssignee =
			assignee === 'all' ||
			assigneeName === assignee ||
			item.assigneeId === assignee

		return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
	})

	if (sort === 'oldest') {
		filtered = [...filtered].reverse()
	}

	const total = filtered.length
	const start = (page - 1) * pageSize
	const items = filtered.slice(start, start + pageSize)
	const hasPartialDataMissing = items.some(i => !i.title || !i.customerId)

	return { items, total, page, pageSize, hasPartialDataMissing }
})
