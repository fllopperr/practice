import type { ApiRequestDto } from '../../../shared/types'
import { getServerSessionUser } from '../../utils/auth'
import { REQUESTS_DB } from '../../utils/db'

export default defineEventHandler((event): ApiRequestDto => {
	const user = getServerSessionUser(event)
	const id = getRouterParam(event, 'id')
	const query = getQuery(event)

	if (query.error === '429' || query.error === '500') {
		throw createError({
			statusCode: Number(query.error),
			statusMessage: 'Проверьте соединение и повторите загрузку.'
		})
	}

	const found = REQUESTS_DB.find(r => r.id === id)
	if (!found) {
		throw createError({ statusCode: 404, statusMessage: 'Заявка не найдена' })
	}

	if (
		user.role === 'Client' &&
		found.customerId !== (user.customerId || 'cust-vektor')
	) {
		throw createError({
			statusCode: 403,
			statusMessage: 'Эта страница недоступна вашей роли.'
		})
	}

	return found
})
