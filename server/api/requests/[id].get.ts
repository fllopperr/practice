import type { ApiRequestDto } from '../../../app/types/types'
import { REQUESTS_DATA } from './index.get'

export default defineEventHandler((event): ApiRequestDto => {
	const id = getRouterParam(event, 'id')
	const query = getQuery(event)

	if (query.error === '429' || query.error === '500') {
		throw createError({
			statusCode: Number(query.error),
			statusMessage: 'Проверьте соединение и повторите загрузку.'
		})
	}

	if (id === '1042') {
		return {
			id: '1042',
			number: '#1042',
			title:
				'После обновления корпоративной CRM сотрудники отдела продаж не могут войти в систему и открыть карточки клиентов',
			description:
				'После обновления не удаётся войти в CRM. При попытке входа появляется сообщение «Доступ запрещён». Проблема затрагивает отдел продаж.',
			customerId: 'cust-vektor',
			categoryId: 'cat-access',
			assigneeId: 'u-brungilda',
			status: 'progress',
			priority: 'high',
			createdAt: 'Создана 5 октября, 09:14',
			dueDate: 'Сегодня, 13:14',
			comments: [
				{
					id: 'c-1',
					author: 'Мария Смирнова',
					time: '09:14',
					text: 'Не можем войти с рабочих компьютеров. Нужна помощь.'
				},
				{
					id: 'c-2',
					author: 'Брунгильда Брунгильдовна',
					time: '09:25',
					text: 'Заявку приняла. Проверяем права доступа.'
				},
				{
					id: 'c-3',
					author: 'Брунгильда Брунгильдовна',
					time: '10:05',
					text: 'Нашла причину: после обновления сбросилась группа доступа.'
				}
			],
			history: [
				{ id: 'h-1', time: '09:14', text: 'Мария создала заявку' },
				{
					id: 'h-2',
					time: '09:25',
					text: 'Оператор назначил Брунгильду Брунгильдовну'
				},
				{ id: 'h-3', time: '10:00', text: 'Брунгильда начала работу' }
			]
		}
	}

	const found = REQUESTS_DATA.find(r => r.id === id)
	if (!found) {
		throw createError({ statusCode: 404, statusMessage: 'Заявка не найдена' })
	}

	return found
})
