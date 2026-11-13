import { setSessionCookie } from '../../utils/auth'

export default defineEventHandler(event => {
	setSessionCookie(event, 'unauthenticated')
	return { ok: true }
})
