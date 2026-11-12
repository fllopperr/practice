import type { Priority, RequestStatus } from '~/types/types'

export const STATUS_LABELS: Record<RequestStatus, string> = {
	new: 'Новая',
	assigned: 'Назначена',
	progress: 'В работе',
	waiting: 'Ожидание',
	escalated: 'Эскалирована',
	resolved: 'Решена',
	closed: 'Закрыта'
}

export const PRIORITY_LABELS: Record<Priority, string> = {
	critical: 'Критический',
	high: 'Высокий',
	normal: 'Обычный',
	low: 'Низкий'
}

export const ASSIGNEE_OPTIONS = ['Не назначен', 'Брунгильда Б.', 'Олег С.']

// export const initialRequests: WorkRequest[] = [
// 	{
// 		id: '1042',
// 		number: '#1042',
// 		title: 'Не работает доступ к CRM',
// 		description:
// 			'После обновления не удаётся войти в CRM. При попытке входа появляется сообщение «Доступ запрещён». Проблема затрагивает отдел продаж.',
// 		client: 'АО «Вектор»',
// 		category: 'Доступ и учётные записи',
// 		assignee: 'Не назначен',
// 		status: 'new',
// 		priority: 'high',
// 		createdAtText: 'Создана 5 октября, 09:14',
// 		dueDateText: 'Сегодня, 13:14',
// 		comments: [
// 			{
// 				id: 'c-1',
// 				author: 'Мария Смирнова',
// 				time: '09:14',
// 				text: 'Не можем войти с рабочих компьютеров. Нужна помощь.'
// 			}
// 		],
// 		history: [
// 			{
// 				id: 'h-1',
// 				time: '09:14',
// 				text: 'Мария создала заявку'
// 			}
// 		]
// 	},
// 	{
// 		id: '1041',
// 		number: '#1041',
// 		title: 'Ошибка выгрузки отчёта',
// 		description:
// 			'При формировании ежемесячного финансового отчёта система возвращает ошибку выгрузки.',
// 		client: 'ООО «Сфера»',
// 		category: 'Отчётность и аналитика',
// 		assignee: 'Не назначен',
// 		status: 'new',
// 		priority: 'critical',
// 		createdAtText: 'Создана 5 октября, 09:10',
// 		dueDateText: 'Сегодня, 13:10',
// 		comments: [],
// 		history: [{ id: 'h-2', time: '09:10', text: 'Мария создала заявку' }]
// 	},
// 	{
// 		id: '1040',
// 		number: '#1040',
// 		title: 'Подключить нового сотрудника',
// 		description:
// 			'Необходимо создать корпоративную учётную запись и выдать базовые права доступа.',
// 		client: 'АО «Вектор»',
// 		category: 'Доступ и учётные записи',
// 		assignee: 'Брунгильда Б.',
// 		status: 'assigned',
// 		priority: 'normal',
// 		createdAtText: 'Создана 5 октября, 09:00',
// 		dueDateText: 'Сегодня, 14:00',
// 		comments: [],
// 		history: [{ id: 'h-3', time: '09:00', text: 'Мария создала заявку' }]
// 	},
// 	{
// 		id: '1039',
// 		number: '#1039',
// 		title: 'Обновить сертификат',
// 		description: 'Требуется плановое обновление SSL-сертификата.',
// 		client: 'ООО «Пульс»',
// 		category: 'Доступ и учётные записи',
// 		assignee: 'Брунгильда Б.',
// 		status: 'waiting',
// 		priority: 'high',
// 		createdAtText: 'Создана 5 октября, 08:45',
// 		dueDateText: 'Сегодня, 15:00',
// 		comments: [],
// 		history: [{ id: 'h-4', time: '08:45', text: 'Мария создала заявку' }]
// 	},
// 	{
// 		id: '1038',
// 		number: '#1038',
// 		title: 'Настроить резервное копирование',
// 		description: 'Настроить автоматическое резервное копирование базы данных.',
// 		client: 'ООО «Сфера»',
// 		category: 'Инфраструктура',
// 		assignee: 'Олег С.',
// 		status: 'progress',
// 		priority: 'normal',
// 		createdAtText: 'Создана 5 октября, 08:30',
// 		dueDateText: 'Сегодня, 16:00',
// 		comments: [],
// 		history: [{ id: 'h-5', time: '08:30', text: 'Мария создала заявку' }]
// 	},
// 	{
// 		id: '1037',
// 		number: '#1037',
// 		title: 'Сбой печати документов',
// 		description: 'Сетевой принтер не печатает документы из очереди.',
// 		client: 'ООО «Пульс»',
// 		category: 'Оборудование',
// 		assignee: 'Брунгильда Б.',
// 		status: 'resolved',
// 		priority: 'low',
// 		createdAtText: 'Создана 5 октября, 08:15',
// 		dueDateText: 'Сегодня, 17:00',
// 		comments: [],
// 		history: [{ id: 'h-6', time: '08:15', text: 'Мария создала заявку' }]
// 	},
// 	{
// 		id: '1036',
// 		number: '#1036',
// 		title: 'Изменить права доступа',
// 		description: 'Обновить права доступа к общим каталогам.',
// 		client: 'АО «Вектор»',
// 		category: 'Доступ и учётные записи',
// 		assignee: 'Не назначен',
// 		status: 'new',
// 		priority: 'normal',
// 		createdAtText: 'Создана 4 октября, 17:40',
// 		dueDateText: 'Сегодня, 18:00',
// 		comments: [],
// 		history: [{ id: 'h-7', time: '17:40', text: 'Мария создала заявку' }]
// 	},
// 	{
// 		id: '1035',
// 		number: '#1035',
// 		title: 'Ошибка авторизации в кабинете',
// 		description: 'Сбой при входе в личный кабинет клиента.',
// 		client: 'ООО «Пульс»',
// 		category: 'Доступ и учётные записи',
// 		assignee: 'Олег С.',
// 		status: 'assigned',
// 		priority: 'high',
// 		createdAtText: 'Создана 4 октября, 16:20',
// 		dueDateText: 'Сегодня, 14:30',
// 		comments: [],
// 		history: [{ id: 'h-8', time: '16:20', text: 'Мария создала заявку' }]
// 	},
// 	{
// 		id: '1034',
// 		number: '#1034',
// 		title: 'Подключить почтовый ящик',
// 		description: 'Подключить корпоративный ящик для нового отдела.',
// 		client: 'ООО «Сфера»',
// 		category: 'Доступ и учётные записи',
// 		assignee: 'Брунгильда Б.',
// 		status: 'closed',
// 		priority: 'low',
// 		createdAtText: 'Создана 4 октября, 15:10',
// 		dueDateText: 'Сегодня, 19:00',
// 		comments: [],
// 		history: [{ id: 'h-9', time: '15:10', text: 'Мария создала заявку' }]
// 	},
// 	{
// 		id: '1033',
// 		number: '#1033',
// 		title: 'Недоступен файловый сервер',
// 		description: 'Отсутствует подключение к файловому серверу.',
// 		client: 'АО «Вектор»',
// 		category: 'Инфраструктура',
// 		assignee: 'Брунгильда Б.',
// 		status: 'progress',
// 		priority: 'critical',
// 		createdAtText: 'Создана 4 октября, 14:05',
// 		dueDateText: 'Сегодня, 12:30',
// 		comments: [],
// 		history: [{ id: 'h-10', time: '14:05', text: 'Мария создала заявку' }]
// 	},
// 	{
// 		id: '1032',
// 		number: '#1032',
// 		title: 'Изменить контакты компании',
// 		description: 'Обновить контактные данные в карточке клиента.',
// 		client: 'ООО «Пульс»',
// 		category: 'Данные',
// 		assignee: 'Олег С.',
// 		status: 'closed',
// 		priority: 'low',
// 		createdAtText: 'Создана 4 октября, 12:00',
// 		dueDateText: 'Сегодня, 18:00',
// 		comments: [],
// 		history: [{ id: 'h-11', time: '12:00', text: 'Мария создала заявку' }]
// 	},
// 	{
// 		id: '1031',
// 		number: '#1031',
// 		title: 'Проверить интеграцию',
// 		description: 'Проверить корректность синхронизации данных.',
// 		client: 'ООО «Сфера»',
// 		category: 'Интеграции',
// 		assignee: 'Брунгильда Б.',
// 		status: 'waiting',
// 		priority: 'normal',
// 		createdAtText: 'Создана 4 октября, 10:30',
// 		dueDateText: 'Сегодня, 17:30',
// 		comments: [],
// 		history: [{ id: 'h-12', time: '10:30', text: 'Мария создала заявку' }]
// 	}
// ]
