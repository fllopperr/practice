import { RegisterSchema } from '../../../shared/utils/validation'
import { setSessionCookie } from '../../utils/auth'
import { CUSTOMERS_DB, SESSION_USERS } from '../../utils/db'

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const parsed = RegisterSchema.safeParse(body)

	if (!parsed.success) {
		throw createError({
			statusCode: 400,
			statusMessage:
				parsed.error.issues[0]?.message || 'Проверьте заполнение полей'
		})
	}

	const { name, company, email } = parsed.data
	let customer = CUSTOMERS_DB.find(c => c.name === company)
	if (!customer) {
		customer = { id: `cust-${Date.now()}`, name: company }
		CUSTOMERS_DB.push(customer)
	}

	const initials =
		name
			.split(' ')
			.map(p => p[0])
			.join('')
			.toUpperCase()
			.slice(0, 2) || 'МС'

	const clientUser = SESSION_USERS.find(u => u.role === 'Client')!
	clientUser.name = name
	clientUser.fullName = name
	clientUser.email = email
	clientUser.initials = initials
	clientUser.customerId = customer.id

	setSessionCookie(event, clientUser.id)
	return clientUser
})
