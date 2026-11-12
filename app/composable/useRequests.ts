import type {
	ApiCategory,
	ApiCustomer,
	ApiRequestsListResponse,
	ApiUser,
	Priority,
	RequestStatus,
	WorkRequest
} from '~/types/types'
import { transformApiRequest } from '~/utils/transformers'
import { useDebounce } from './useDebounce'

export type MockViewState = 'normal' | 'loading' | 'empty' | 'error'

export const useRequests = () => {
	const route = useRoute()
	const router = useRouter()

	const searchQuery = useState<string>('wf-q', () =>
		String(route.query.q || '')
	)
	const debouncedSearch = useDebounce(searchQuery, 350)

	const statusFilter = useState<RequestStatus | 'all'>(
		'wf-status',
		() => (route.query.status as RequestStatus) || 'all'
	)
	const priorityFilter = useState<Priority | 'all'>(
		'wf-priority',
		() => (route.query.priority as Priority) || 'all'
	)
	const assigneeFilter = useState<string>('wf-assignee', () =>
		String(route.query.assignee || 'all')
	)
	const sortBy = useState<'newest' | 'oldest'>(
		'wf-sort',
		() => (route.query.sort as 'newest' | 'oldest') || 'newest'
	)
	const page = useState<number>('wf-page', () =>
		Math.max(1, Number(route.query.page) || 1)
	)
	const partialMode = useState<boolean>(
		'wf-partial',
		() => route.query.partial === '1'
	)
	const errorMode = useState<'429' | '500' | null>(
		'wf-error-mode',
		() => (route.query.error as '429' | '500') || null
	)
	const forceLoading = useState<boolean>('wf-force-loading', () => false)
	const density = useState<'comfortable' | 'compact'>(
		'wf-density',
		() => 'comfortable'
	)

	watch(
		() => route.query,
		q => {
			if (q.q !== undefined && String(q.q) !== searchQuery.value) {
				searchQuery.value = String(q.q)
			}
			statusFilter.value = (q.status as RequestStatus) || 'all'
			priorityFilter.value = (q.priority as Priority) || 'all'
			assigneeFilter.value = q.assignee ? String(q.assignee) : 'all'
			sortBy.value = (q.sort as 'newest' | 'oldest') || 'newest'
			page.value = Math.max(1, Number(q.page) || 1)
			partialMode.value = q.partial === '1'
			errorMode.value = (q.error as '429' | '500') || null
		}
	)

	const syncUrl = () => {
		if (!import.meta.client) return
		if (route.path !== '/requests') return

		const nextQuery: Record<string, string | undefined> = {
			q: debouncedSearch.value.trim() || undefined,
			status: statusFilter.value !== 'all' ? statusFilter.value : undefined,
			priority:
				priorityFilter.value !== 'all' ? priorityFilter.value : undefined,
			assignee:
				assigneeFilter.value !== 'all' ? assigneeFilter.value : undefined,
			sort: sortBy.value !== 'newest' ? sortBy.value : undefined,
			page: page.value > 1 ? String(page.value) : undefined,
			partial: partialMode.value ? '1' : undefined,
			error: errorMode.value || undefined
		}
		router.replace({ query: nextQuery })
	}

	watch(
		[debouncedSearch, statusFilter, priorityFilter, assigneeFilter, sortBy],
		() => {
			page.value = 1
			syncUrl()
		}
	)

	watch([page, partialMode, errorMode], () => {
		syncUrl()
	})

	const { data: usersData } = useFetch<ApiUser[]>('/api/users', {
		key: 'api-users'
	})
	const { data: customersData } = useFetch<ApiCustomer[]>('/api/customers', {
		key: 'api-customers'
	})
	const { data: categoriesData } = useFetch<ApiCategory[]>('/api/categories', {
		key: 'api-categories'
	})

	const dictionaries = computed(() => ({
		users: usersData.value ?? [],
		customers: customersData.value ?? [],
		categories: categoriesData.value ?? []
	}))

	const apiQuery = computed(() => ({
		q: debouncedSearch.value.trim() || undefined,
		status: statusFilter.value !== 'all' ? statusFilter.value : undefined,
		priority: priorityFilter.value !== 'all' ? priorityFilter.value : undefined,
		assignee: assigneeFilter.value !== 'all' ? assigneeFilter.value : undefined,
		sort: sortBy.value,
		page: page.value,
		pageSize: 12,
		partial: partialMode.value ? '1' : undefined,
		error: errorMode.value || undefined
	}))

	const {
		data: requestsResponse,
		status: fetchStatus,
		error: fetchError,
		refresh: refreshRequests
	} = useFetch<ApiRequestsListResponse>('/api/requests', {
		query: apiQuery,
		watch: [apiQuery]
	})

	const requests = computed<WorkRequest[]>(() => {
		const rawItems = requestsResponse.value?.items ?? []
		return rawItems.map(dto =>
			transformApiRequest(dto, dictionaries.value, false)
		)
	})

	const filteredRequests = requests
	const totalCount = computed(() => requestsResponse.value?.total ?? 0)
	const hasPartialError = computed(
		() =>
			Boolean(requestsResponse.value?.hasPartialDataMissing) ||
			partialMode.value
	)

	const viewState = computed<MockViewState>(() => {
		if (forceLoading.value || fetchStatus.value === 'pending') return 'loading'
		if (fetchError.value) return 'error'
		if (requests.value.length === 0) return 'empty'
		return 'normal'
	})

	const clearSearchOnly = () => {
		searchQuery.value = ''
		debouncedSearch.value = ''
		page.value = 1
		syncUrl()
	}

	const resetFilters = () => {
		searchQuery.value = ''
		debouncedSearch.value = ''
		statusFilter.value = 'all'
		priorityFilter.value = 'all'
		assigneeFilter.value = 'all'
		sortBy.value = 'newest'
		page.value = 1
		partialMode.value = false
		errorMode.value = null
		forceLoading.value = false
		syncUrl()
		refreshRequests()
	}

	const retryAfterError = () => {
		errorMode.value = null
		syncUrl()
		refreshRequests()
	}

	const setPage = (nextPage: number) => {
		page.value = Math.max(1, Math.min(2, nextPage))
	}

	return {
		requests,
		filteredRequests,
		dictionaries,
		searchQuery,
		debouncedSearch,
		statusFilter,
		priorityFilter,
		assigneeFilter,
		sortBy,
		page,
		totalCount,
		hasPartialError,
		partialMode,
		errorMode,
		forceLoading,
		fetchStatus,
		fetchError,
		viewState,
		density,
		clearSearchOnly,
		resetFilters,
		retryAfterError,
		setPage,
		refreshRequests
	}
}
