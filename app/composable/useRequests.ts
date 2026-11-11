import { initialRequests } from '~/utils/mockData'
import type { Priority, RequestStatus, WorkRequest } from '~/utils/types'

export type MockViewState = 'normal' | 'loading' | 'empty' | 'error'

export const useRequests = () => {
	const requests = useState<WorkRequest[]>('wf-exact-requests', () =>
		structuredClone(initialRequests)
	)
	const searchQuery = useState<string>('wf-exact-search', () => '')
	const statusFilter = useState<RequestStatus | 'all'>(
		'wf-exact-status',
		() => 'all'
	)
	const priorityFilter = useState<Priority | 'all'>(
		'wf-exact-priority',
		() => 'all'
	)
	const assigneeFilter = useState<string>('wf-exact-assignee', () => 'all')
	const sortBy = useState<'newest' | 'oldest'>('wf-exact-sort', () => 'newest')
	const viewState = useState<MockViewState>('wf-exact-view', () => 'normal')
	const density = useState<'comfortable' | 'compact'>(
		'wf-exact-density',
		() => 'comfortable'
	)

	const filteredRequests = computed(() => {
		if (viewState.value === 'empty') return []

		const list = requests.value.filter(item => {
			const q = searchQuery.value.trim().toLowerCase()
			const matchesSearch =
				!q ||
				item.number.toLowerCase().includes(q) ||
				item.title.toLowerCase().includes(q) ||
				item.client.toLowerCase().includes(q)

			const matchesStatus =
				statusFilter.value === 'all' || item.status === statusFilter.value
			const matchesPriority =
				priorityFilter.value === 'all' || item.priority === priorityFilter.value
			const matchesAssignee =
				assigneeFilter.value === 'all' || item.assignee === assigneeFilter.value

			return (
				matchesSearch && matchesStatus && matchesPriority && matchesAssignee
			)
		})

		return sortBy.value === 'newest' ? list : [...list].reverse()
	})

	const resetFilters = () => {
		searchQuery.value = ''
		statusFilter.value = 'all'
		priorityFilter.value = 'all'
		assigneeFilter.value = 'all'
		sortBy.value = 'newest'
		viewState.value = 'normal'
	}

	const getById = (id: string) =>
		computed(() => requests.value.find(r => r.id === id))

	const addComment = (id: string, text: string) => {
		const req = requests.value.find(r => r.id === id)
		if (!req || !text.trim()) return
		const now = new Date().toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit'
		})
		req.comments.push({
			id: `c-${Date.now()}`,
			author: 'Анна Кузнецова',
			time: now,
			text: text.trim()
		})
		req.history.push({
			id: `h-${Date.now()}`,
			time: now,
			text: 'Анна Кузнецова добавила комментарий'
		})
	}

	const updateRequestParams = (
		id: string,
		payload: { assignee: string; priority: Priority }
	) => {
		const req = requests.value.find(r => r.id === id)
		if (!req) return
		const now = new Date().toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit'
		})
		req.assignee = payload.assignee
		req.priority = payload.priority
		req.history.push({
			id: `h-${Date.now()}`,
			time: now,
			text: `Оператор назначил исполнителя: ${payload.assignee}`
		})
	}

	return {
		requests,
		filteredRequests,
		searchQuery,
		statusFilter,
		priorityFilter,
		assigneeFilter,
		sortBy,
		viewState,
		density,
		resetFilters,
		getById,
		addComment,
		updateRequestParams
	}
}
