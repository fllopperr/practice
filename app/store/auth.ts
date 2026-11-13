import { defineStore } from 'pinia'
import type { SessionUser, UserRole } from '../../shared/types'

export const useAuthStore = defineStore('auth', () => {
	const isAuthenticated = useCookie<boolean>('wf_is_auth', {
		default: () => true
	})

	const user = ref<SessionUser>({
		id: 'u-anna',
		name: 'Анна К.',
		fullName: 'Анна Кузнецова',
		email: '0000@mail.demo',
		role: 'Operator',
		roleLabel: 'Оператор',
		initials: 'АК',
		customerId: null,
		isActive: true
	})

	const sessionExpiredBanner = ref(false)

	const fetchSession = async () => {
		if (!isAuthenticated.value) {
			throw createError({ statusCode: 401, statusMessage: 'Не авторизован' })
		}
		try {
			const data = await $fetch<SessionUser>('/api/auth/session')
			user.value = data
			isAuthenticated.value = true
			sessionExpiredBanner.value = false
		} catch {
			isAuthenticated.value = false
			sessionExpiredBanner.value = true
		}
	}

	const switchRole = async (role: UserRole) => {
		const data = await $fetch<SessionUser>('/api/auth/login', {
			method: 'POST',
			body: {
				email: '0000@mail.demo',
				password: 'password123',
				role
			}
		})
		user.value = data
		isAuthenticated.value = true
		sessionExpiredBanner.value = false
	}

	const login = async (email: string, password: string, role?: UserRole) => {
		const data = await $fetch<SessionUser>('/api/auth/login', {
			method: 'POST',
			body: { email, password, role }
		})
		user.value = data
		isAuthenticated.value = true
		sessionExpiredBanner.value = false
		return data
	}

	const register = async (payload: {
		name: string
		company: string
		email: string
		password: string
	}) => {
		const data = await $fetch<SessionUser>('/api/auth/register', {
			method: 'POST',
			body: payload
		})
		user.value = data
		isAuthenticated.value = true
		sessionExpiredBanner.value = false
		return data
	}

	const logout = async () => {
		await $fetch('/api/auth/logout', { method: 'POST' })
		isAuthenticated.value = false
	}

	return {
		user,
		isAuthenticated,
		sessionExpiredBanner,
		fetchSession,
		switchRole,
		login,
		register,
		logout
	}
})
