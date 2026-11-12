import type { ApiRequestDto } from '~/types/types'
import { REQUESTS_DB } from '../../utils/db'

export default defineEventHandler((event): ApiRequestDto => {
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

	return found
})
