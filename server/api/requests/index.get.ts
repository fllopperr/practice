import type {
	ApiRequestDto,
	ApiRequestsListResponse
} from '../../../app/types/types'
import { CUSTOMERS_DATA } from '../customers/index.get'
import { USERS_DATA } from '../users/index.get'

export const REQUESTS_DATA: ApiRequestDto[] = [
	{
		id: '1042',
		number: '#1042',
		title: 'Не работает доступ к CRM',
		description:
			'После обновления не удаётся войти в CRM. При попытке входа появляется сообщение «Доступ запрещён». Проблема затрагивает отдел продаж.',
		customerId: 'cust-vektor',
		categoryId: 'cat-access',
		assigneeId: null,
		status: 'new',
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
	},
	{
		id: '1041',
		number: '#1041',
		title: 'Ошибка выгрузки отчёта',
		description: 'При выгрузке финансового отчёта возникает ошибка сервера.',
		customerId: 'cust-sfera',
		categoryId: 'cat-reports',
		assigneeId: null,
		status: 'new',
		priority: 'critical',
		createdAt: 'Создана 5 октября, 09:10',
		dueDate: 'Сегодня, 13:10'
	},
	{
		id: '1040',
		number: '#1040',
		title: 'Подключить нового сотрудника',
		description: 'Создать учётную запись и выдать базовые права доступа.',
		customerId: 'cust-vektor',
		categoryId: 'cat-access',
		assigneeId: 'u-brungilda',
		status: 'assigned',
		priority: 'normal',
		createdAt: 'Создана 5 октября, 09:00',
		dueDate: 'Сегодня, 14:00'
	},
	{
		id: '1039',
		number: '#1039',
		title: 'Обновить сертификат',
		description: 'Требуется плановое обновление SSL-сертификата.',
		customerId: 'cust-puls',
		categoryId: 'cat-infra',
		assigneeId: 'u-brungilda',
		status: 'waiting',
		priority: 'high',
		createdAt: 'Создана 5 октября, 08:45',
		dueDate: 'Сегодня, 15:00'
	},
	{
		id: '1038',
		number: '#1038',
		title: 'Настроить резервное копирование',
		description: 'Настроить расписание резервного копирования базы данных.',
		customerId: 'cust-sfera',
		categoryId: 'cat-infra',
		assigneeId: 'u-oleg',
		status: 'progress',
		priority: 'normal',
		createdAt: 'Создана 5 октября, 08:30',
		dueDate: 'Сегодня, 16:00'
	},
	{
		id: '1037',
		number: '#1037',
		title: 'Сбой печати документов',
		description: 'Не отправляются документы на сетевой принтер.',
		customerId: 'cust-puls',
		categoryId: 'cat-hardware',
		assigneeId: 'u-brungilda',
		status: 'resolved',
		priority: 'low',
		createdAt: 'Создана 5 октября, 08:15',
		dueDate: 'Сегодня, 17:00'
	},
	{
		id: '1036',
		number: '#1036',
		title: 'Изменить права доступа',
		description: 'Обновить права доступа к внутренним каталогам.',
		customerId: 'cust-vektor',
		categoryId: 'cat-access',
		assigneeId: null,
		status: 'new',
		priority: 'normal',
		createdAt: 'Создана 4 октября, 17:40',
		dueDate: 'Сегодня, 18:00'
	},
	{
		id: '1035',
		number: '#1035',
		title: 'Ошибка авторизации в кабинете',
		description: 'Сбой при входе в личный кабинет клиента.',
		customerId: 'cust-puls',
		categoryId: 'cat-access',
		assigneeId: 'u-oleg',
		status: 'assigned',
		priority: 'high',
		createdAt: 'Создана 4 октября, 16:20',
		dueDate: 'Сегодня, 14:30'
	},
	{
		id: '1034',
		number: '#1034',
		title: 'Подключить почтовый ящик',
		description: 'Подключить корпоративный ящик для нового отдела.',
		customerId: 'cust-sfera',
		categoryId: 'cat-access',
		assigneeId: 'u-brungilda',
		status: 'closed',
		priority: 'low',
		createdAt: 'Создана 4 октября, 15:10',
		dueDate: 'Сегодня, 19:00'
	},
	{
		id: '1033',
		number: '#1033',
		title: 'Недоступен файловый сервер',
		description: 'Отсутствует подключение к файловому серверу.',
		customerId: 'cust-vektor',
		categoryId: 'cat-infra',
		assigneeId: 'u-brungilda',
		status: 'progress',
		priority: 'critical',
		createdAt: 'Создана 4 октября, 14:05',
		dueDate: 'Сегодня, 12:30'
	},
	{
		id: '1032',
		number: '#1032',
		title: 'Изменить контакты компании',
		description: 'Обновить контактные данные в карточке клиента.',
		customerId: 'cust-puls',
		categoryId: 'cat-access',
		assigneeId: 'u-oleg',
		status: 'closed',
		priority: 'low',
		createdAt: 'Создана 4 октября, 12:00',
		dueDate: 'Сегодня, 18:00'
	},
	{
		id: '1031',
		number: '#1031',
		title: 'Проверить интеграцию',
		description: 'Проверить корректность синхронизации данных.',
		customerId: 'cust-sfera',
		categoryId: 'cat-integrations',
		assigneeId: 'u-brungilda',
		status: 'waiting',
		priority: 'normal',
		createdAt: 'Создана 4 октября, 10:30',
		dueDate: 'Сегодня, 17:30'
	},

	{
		id: '1030',
		number: '#1030',
		title: 'Настроить VPN',
		customerId: 'cust-vektor',
		categoryId: 'cat-infra',
		assigneeId: null,
		status: 'new',
		priority: 'high',
		createdAt: 'Создана 3 октября, 17:00',
		dueDate: 'Сегодня, 18:00'
	},
	{
		id: '1029',
		number: '#1029',
		title: 'Заменить картридж принтера',
		customerId: 'cust-sfera',
		categoryId: 'cat-hardware',
		assigneeId: null,
		status: 'new',
		priority: 'critical',
		createdAt: 'Создана 3 октября, 16:10',
		dueDate: 'Сегодня, 18:00'
	},
	{
		id: '1028',
		number: '#1028',
		title: 'Восстановить доступ к почте',
		customerId: 'cust-vektor',
		categoryId: 'cat-access',
		assigneeId: 'u-brungilda',
		status: 'assigned',
		priority: 'normal',
		createdAt: 'Создана 3 октября, 15:00',
		dueDate: 'Сегодня, 18:00'
	},
	{
		id: '1027',
		number: '#1027',
		title: 'Обновить антивирус',
		customerId: 'cust-puls',
		categoryId: 'cat-infra',
		assigneeId: 'u-brungilda',
		status: 'waiting',
		priority: 'high',
		createdAt: 'Создана 3 октября, 14:20',
		dueDate: 'Сегодня, 18:00'
	},
	{
		id: '1026',
		number: '#1026',
		title: 'Подключить второй монитор',
		customerId: 'cust-sfera',
		categoryId: 'cat-hardware',
		assigneeId: 'u-oleg',
		status: 'progress',
		priority: 'normal',
		createdAt: 'Создана 3 октября, 13:00',
		dueDate: 'Сегодня, 18:00'
	},
	{
		id: '1025',
		number: '#1025',
		title: 'Проверить резервную копию',
		customerId: 'cust-puls',
		categoryId: 'cat-infra',
		assigneeId: 'u-brungilda',
		status: 'resolved',
		priority: 'low',
		createdAt: 'Создана 3 октября, 11:40',
		dueDate: 'Сегодня, 18:00'
	},
	{
		id: '1024',
		number: '#1024',
		title: 'Настроить общую папку',
		customerId: 'cust-vektor',
		categoryId: 'cat-access',
		assigneeId: null,
		status: 'new',
		priority: 'normal',
		createdAt: 'Создана 2 октября, 16:30',
		dueDate: 'Сегодня, 18:00'
	},
	{
		id: '1023',
		number: '#1023',
		title: 'Продлить сертификат',
		customerId: 'cust-puls',
		categoryId: 'cat-infra',
		assigneeId: 'u-oleg',
		status: 'assigned',
		priority: 'high',
		createdAt: 'Создана 2 октября, 15:10',
		dueDate: 'Сегодня, 18:00'
	},
	{
		id: '1022',
		number: '#1022',
		title: 'Подключить IP-телефон',
		customerId: 'cust-sfera',
		categoryId: 'cat-hardware',
		assigneeId: 'u-brungilda',
		status: 'closed',
		priority: 'low',
		createdAt: 'Создана 2 октября, 13:20',
		dueDate: 'Сегодня, 18:00'
	},
	{
		id: '1021',
		number: '#1021',
		title: 'Исправить печать счетов',
		customerId: 'cust-vektor',
		categoryId: 'cat-hardware',
		assigneeId: 'u-brungilda',
		status: 'progress',
		priority: 'critical',
		createdAt: 'Создана 2 октября, 11:00',
		dueDate: 'Сегодня, 18:00'
	},
	{
		id: '1020',
		number: '#1020',
		title: 'Настроить права в CRM',
		customerId: 'cust-puls',
		categoryId: 'cat-access',
		assigneeId: 'u-oleg',
		status: 'closed',
		priority: 'low',
		createdAt: 'Создана 1 октября, 15:40',
		dueDate: 'Сегодня, 18:00'
	},
	{
		id: '1019',
		number: '#1019',
		title: 'Проверить синхронизацию',
		customerId: 'cust-sfera',
		categoryId: 'cat-integrations',
		assigneeId: 'u-brungilda',
		status: 'waiting',
		priority: 'normal',
		createdAt: 'Создана 1 октября, 10:15',
		dueDate: 'Сегодня, 18:00'
	}
]

export default defineEventHandler((event): ApiRequestsListResponse => {
	const query = getQuery(event)

	if (query.error === '429') {
		throw createError({
			statusCode: 429,
			statusMessage:
				'Превышен лимит запросов (HTTP 429). Пожалуйста, подождите и повторите попытку.'
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

	const sourceList = REQUESTS_DATA.map(item => {
		if (partialMode && item.id === '1038') {
			return { ...item, title: null, customerId: null }
		}
		return item
	})

	let filtered = sourceList.filter(item => {
		const customerName =
			CUSTOMERS_DATA.find(c => c.id === item.customerId)?.name || ''
		const assigneeName =
			USERS_DATA.find(u => u.id === item.assigneeId)?.name || 'Не назначен'

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

	return {
		items,
		total,
		page,
		pageSize,
		hasPartialDataMissing
	}
})
