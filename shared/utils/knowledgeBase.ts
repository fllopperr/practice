export interface FaqItem {
	id: string
	question: string
	answer: string
}

export interface HelpCategoryCard {
	id: string
	title: string
	description: string
	slug: string
}

export interface ArticleSection {
	heading: string
	body: string
}

export interface KnowledgeArticle {
	slug: string
	title: string
	categoryTitle: string
	readTime: string
	updatedAtText: string
	seoDescription: string
	sections: ArticleSection[]
}

export const FAQ_ITEMS: FaqItem[] = [
	{
		id: 'faq-1',
		question: 'Как создать заявку?',
		answer:
			'Войдите в аккаунт, откройте «Заявки» и нажмите «Создать заявку». Укажите название, описание и категорию проблемы.'
	},
	{
		id: 'faq-2',
		question: 'Где посмотреть статус обращения?',
		answer: 'В разделе «Мои заявки» или в карточке обращения.'
	},
	{
		id: 'faq-3',
		question: 'Что означает «Ожидание»?',
		answer:
			'Для продолжения работы нужна дополнительная информация или действие. Причину ожидания можно посмотреть в заявке.'
	},
	{
		id: 'faq-4',
		question: 'Как подтвердить решение?',
		answer: 'Откройте решённую заявку и нажмите «Подтвердить решение».'
	},
	{
		id: 'faq-5',
		question: 'Что такое SLA?',
		answer: 'Это установленные сроки реакции на обращение и решения проблемы.'
	}
]

export const HELP_CATEGORIES: HelpCategoryCard[] = [
	{
		id: 'hc-start',
		title: 'Начало работы',
		description: 'Вход, профиль и первая заявка',
		slug: 'how-to-create-first-request'
	},
	{
		id: 'hc-requests',
		title: 'Работа с заявками',
		description: 'Статусы, комментарии и результат',
		slug: 'how-to-track-request-status'
	},
	{
		id: 'hc-sla',
		title: 'Сроки и приоритеты',
		description: 'Как устроены SLA и эскалация',
		slug: 'how-to-confirm-resolution'
	}
]

export const ARTICLES_LIST: KnowledgeArticle[] = [
	{
		slug: 'how-to-create-first-request',
		title: 'Как создать первую заявку',
		categoryTitle: 'Работа с заявками',
		readTime: '3 минуты',
		updatedAtText: 'Начало работы · Обновлено 5 октября 2026',
		seoDescription:
			'Пошаговая инструкция по созданию первой сервисной заявки в системе поддержки WorkFlow.',
		sections: [
			{
				heading: 'Перед началом',
				body: 'Для создания заявки войдите в аккаунт клиента. Подготовьте описание проблемы и ожидаемый результат.'
			},
			{
				heading: '1. Откройте раздел «Заявки»',
				body: 'Нажмите «Создать заявку».'
			},
			{
				heading: '2. Опишите проблему',
				body: 'Укажите понятное название, выберите категорию и добавьте подробности: что произошло и как повторить ошибку.'
			},
			{
				heading: '3. Отправьте обращение',
				body: 'Проверьте данные и нажмите «Создать». Заявка появится в списке со статусом «Новая».'
			},
			{
				heading: '4. Следите за обновлениями',
				body: 'Откройте карточку заявки, чтобы читать комментарии и проверять статус.'
			}
		]
	},
	{
		slug: 'how-to-track-request-status',
		title: 'Как отслеживать статус обращения',
		categoryTitle: 'Работа с заявками',
		readTime: '3 минуты',
		updatedAtText: 'Работа с заявками · Обновлено 5 октября 2026',
		seoDescription:
			'Узнайте, как проверять текущий статус заявки, назначенного исполнителя и плановый срок решения в WorkFlow.',
		sections: [
			{
				heading: 'Перед началом',
				body: 'Перейдите в раздел «Мои заявки» в личном кабинете клиента.'
			},
			{
				heading: '1. Найдите нужное обращение',
				body: 'Используйте поиск по номеру или фильтр по статусу заявки.'
			}
		]
	},
	{
		slug: 'how-to-add-comment',
		title: 'Как добавить комментарий',
		categoryTitle: 'Работа с заявками',
		readTime: '3 минуты',
		updatedAtText: 'Работа с заявками · Обновлено 5 октября 2026',
		seoDescription:
			'Инструкция по общению с исполнителем и отправке комментариев внутри карточки заявки WorkFlow.',
		sections: [
			{
				heading: 'Перед началом',
				body: 'Откройте карточку нужной заявки из списка обращений.'
			},
			{
				heading: '1. Напишите сообщение',
				body: 'Введите текст в поле «Ваш комментарий» и нажмите «Отправить комментарий».'
			}
		]
	},
	{
		slug: 'how-to-confirm-resolution',
		title: 'Как подтвердить решение',
		categoryTitle: 'Работа с заявками',
		readTime: '3 минуты',
		updatedAtText: 'Работа с заявками · Обновлено 5 октября 2026',
		seoDescription:
			'Как проверить результат работы специалиста поддержки и подтвердить выполнение заявки в WorkFlow.',
		sections: [
			{
				heading: 'Перед началом',
				body: 'Дождитесь перехода обращения в статус «Решена» и ознакомьтесь с блоком «Результат решения».'
			}
		]
	}
]
