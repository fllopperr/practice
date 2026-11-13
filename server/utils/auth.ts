import type { H3Event } from 'h3'
import type { SessionUser, UserRole } from '../../shared/types'
import { SESSION_USERS } from './db'

const COOKIE_NAME = 'wf_session_user'

export const getServerSessionUser = (event: H3Event): SessionUser => {
	const cookieVal = getCookie(event, COOKIE_NAME)
	if (cookieVal === 'unauthenticated') {
		throw createError({
			statusCode: 401,
			statusMessage: 'Сессия истекла. Войдите снова, чтобы продолжить работу.'
		})
	}

	const found = SESSION_USERS.find(
		u => u.id === cookieVal || u.role === cookieVal
	)
	return found ?? SESSION_USERS[0]!
}

export const requireRoles = (
	event: H3Event,
	allowed: UserRole[]
): SessionUser => {
	const user = getServerSessionUser(event)
	if (!allowed.includes(user.role)) {
		throw createError({
			statusCode: 403,
			statusMessage: 'Эта страница недоступна вашей роли.'
		})
	}
	return user
}

export const setSessionCookie = (event: H3Event, userIdOrRole: string) => {
	setCookie(event, COOKIE_NAME, userIdOrRole, {
		httpOnly: false,
		path: '/',
		maxAge: 60 * 60 * 24 * 7
	})
}
