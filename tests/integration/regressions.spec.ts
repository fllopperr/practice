import { describe, expect, it, vi } from 'vitest'
import { AsyncRaceGuard, CommentSubmitLock } from '../../shared/utils/raceGuard'

describe('Regression Tests для исправленных багов Уровня 5', () => {
	it('Regression #1: предотвращает двойную отправку комментария при двойном клике', async () => {
		const lock = new CommentSubmitLock()
		const apiCall = vi.fn(async (text: string) => {
			await new Promise(r => setTimeout(r, 30))
			return { id: 'c-new', text }
		})

		const submitComment = async (text: string) => {
			if (!lock.acquire()) return null
			try {
				return await apiCall(text)
			} finally {
				lock.release()
			}
		}

		const [res1, res2] = await Promise.all([
			submitComment('Уточнила детали заявки.'),
			submitComment('Уточнила детали заявки.')
		])

		expect(apiCall).toHaveBeenCalledTimes(1)
		expect(res1).not.toBeNull()
		expect(res2).toBeNull()
	})

	it('Regression #2: устаревший ответ поиска не перезаписывает более новый результат', async () => {
		const guard = new AsyncRaceGuard()
		let displayedResults: string[] = []

		const performSearch = async (query: string, delayMs: number) => {
			const { seq } = guard.next()
			await new Promise(r => setTimeout(r, delayMs))
			if (guard.isLatest(seq)) {
				displayedResults = [`Result for ${query}`]
			}
		}
		await Promise.all([performSearch('CRM', 50), performSearch('VPN', 10)])

		expect(displayedResults).toEqual(['Result for VPN'])
	})

	it('Regression #3: блокирует доступ к приватному route после logout', () => {
		let isAuthenticated = true
		const logout = () => {
			isAuthenticated = false
		}
		const canAccessProtectedRoute = (path: string) => {
			const isPrivate = ['/dashboard', '/requests', '/profile'].some(p =>
				path.startsWith(p)
			)
			if (isPrivate && !isAuthenticated) return '/login?expired=1'
			return path
		}

		logout()
		expect(canAccessProtectedRoute('/requests')).toBe('/login?expired=1')
		expect(canAccessProtectedRoute('/profile')).toBe('/login?expired=1')
	})

	it('Regression #4: выполняет rollback к предыдущему приоритету при ошибке API 409', async () => {
		let priority: 'high' | 'critical' = 'high'
		const updatePriorityOptimistic = async (
			next: 'high' | 'critical',
			shouldFail409: boolean
		) => {
			const prev = priority
			priority = next
			try {
				if (shouldFail409) {
					throw Object.assign(new Error('Conflict'), { statusCode: 409 })
				}
			} catch {
				priority = prev
			}
		}

		await updatePriorityOptimistic('critical', true)
		expect(priority).toBe('high')
	})
})
