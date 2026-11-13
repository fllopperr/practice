import { LoginSchema } from '../../../shared/utils/validation'
import { setSessionCookie } from '../../utils/auth'
import { SESSION_USERS } from '../../utils/db'

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const parsed = LoginSchema.safeParse(body)

	if (!parsed.success) {
		throw createError({
			statusCode: 400,
			statusMessage: parsed.error.issues[0]?.message || 'Ошибка валидации'
		})
	}

	const { email, role } = parsed.data
	const user =
		(role ? SESSION_USERS.find(u => u.role === role) : undefined) ||
		SESSION_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) ||
		SESSION_USERS[0]!

	setSessionCookie(event, user.id)
	return user
})
