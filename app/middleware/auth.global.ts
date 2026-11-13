import { useAuthStore } from '~/store/auth'

const PROTECTED_PREFIXES = ['/dashboard', '/requests', '/profile']

export default defineNuxtRouteMiddleware(to => {
	const authStore = useAuthStore()
	const sessionCookie = useCookie('wf_session_user')

	const isProtected = PROTECTED_PREFIXES.some(
		prefix => to.path === prefix || to.path.startsWith(`${prefix}/`)
	)

	if (
		isProtected &&
		(!authStore.isAuthenticated || sessionCookie.value === 'unauthenticated')
	) {
		authStore.sessionExpiredBanner = true
		return navigateTo('/login?expired=1')
	}
})
