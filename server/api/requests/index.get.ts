import type { ApiRequestsListResponse } from '../../../shared/types'
import { getServerSessionUser } from '../../utils/auth'
import { CUSTOMERS_DB, REQUESTS_DB, USERS_DB } from '../../utils/db'

export default defineEventHandler((event): ApiRequestsListResponse => {
	const user = getServerSessionUser(event)
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

	let sourceList = REQUESTS_DB.map(item => {
		if (partialMode && item.id === '1038') {
			return { ...item, title: null, customerId: null }
		}
		return { ...item }
	})

	if (user.role === 'Client') {
		sourceList = sourceList.filter(
			r =>
				r.customerId === (user.customerId || 'cust-vektor') &&
				Number(r.id) >= 1031
		)
	} else if (user.role === 'Agent') {
		sourceList = sourceList
			.filter(r => ['1042', '1037', '1033'].includes(r.id))
			.map(r => (r.id === '1042' ? { ...r, status: 'assigned' } : r))
	}

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
