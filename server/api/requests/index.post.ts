import { CreateRequestSchema } from '../../../shared/utils/validation'
import { getServerSessionUser } from '../../utils/auth'
import { CATEGORIES_DB, REQUESTS_DB } from '../../utils/db'

export default defineEventHandler(async event => {
	const user = getServerSessionUser(event)
	const body = await readBody(event)

	if (body?.simulateError) {
		throw createError({
			statusCode: 500,
			statusMessage:
				'Не удалось сохранить изменения. Данные не потеряны. Повторите попытку.'
		})
	}

	const parsed = CreateRequestSchema.safeParse(body)
	if (!parsed.success) {
		throw createError({
			statusCode: 400,
			statusMessage:
				parsed.error.issues[0]?.message || 'Проверьте заполнение полей заявки'
		})
	}

	const { title, category, description, priority } = parsed.data
	const catObj = CATEGORIES_DB.find(
		c => c.name === category || c.id === category
	)
	const nextNumericId = 1043 + REQUESTS_DB.length - 24
	const id = String(nextNumericId)

	const newRequest = {
		id,
		number: `#${id}`,
		title: title.trim(),
		description: description.trim(),
		customerId: user.customerId || 'cust-vektor',
		categoryId: catObj?.id || 'cat-access',
		assigneeId: null,
		status: 'new' as const,
		priority,
		createdAt: 'Создана 5 октября, 09:14',
		dueDate: 'Сегодня, 13:14',
		comments: [],
		history: [
			{
				id: `h-${Date.now()}`,
				time: '09:14',
				text: `${user.name} создала заявку`
			}
		]
	}

	REQUESTS_DB.unshift(newRequest)
	setResponseStatus(event, 201)
	return newRequest
})
