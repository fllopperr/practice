<script setup lang="ts">
import { useRequestUiStore } from '~/store/requestUi'
import type {
	ApiCategory,
	ApiComment,
	ApiCustomer,
	ApiRequestDto,
	ApiUser,
	Priority,
	RequestStatus
} from '~/types/types'
import { PRIORITY_LABELS } from '~/utils/mockData'
import { transformApiRequest } from '~/utils/transformers'

const route = useRoute()
const router = useRouter()
const id = computed(() => String(route.params.id))

const requestUiStore = useRequestUiStore()

const forceSkeleton = ref(route.query.loading === '1')
const errorParam = ref<string | undefined>(
	route.query.error ? String(route.query.error) : undefined
)

const { data: usersData } = useFetch<ApiUser[]>('/api/users', {
	key: 'api-users'
})
const { data: customersData } = useFetch<ApiCustomer[]>('/api/customers', {
	key: 'api-customers'
})
const { data: categoriesData } = useFetch<ApiCategory[]>('/api/categories', {
	key: 'api-categories'
})

const {
	data: rawRequest,
	status,
	error,
	refresh
} = useFetch<ApiRequestDto>(() => `/api/requests/${id.value}`, {
	query: computed(() => ({
		error: errorParam.value
	}))
})
const optimisticPriority = ref<Priority | null>(null)
const optimisticStatus = ref<RequestStatus | null>(null)
const optimisticAssigneeId = ref<string | null | undefined>(undefined)

const isPriorityMenuOpen = ref(false)
const isAssigneeMenuOpen = ref(false)

const commentDraft = ref('')
const isSendingComment = ref(false)
const commentSentBanner = ref(false)
const commentErrorText = ref('')
const simulateCommentError = ref(false)

const request = computed(() => {
	if (!rawRequest.value) return null
	const mergedDto: ApiRequestDto = {
		...rawRequest.value,
		priority: optimisticPriority.value ?? rawRequest.value.priority,
		status: optimisticStatus.value ?? rawRequest.value.status,
		assigneeId:
			optimisticAssigneeId.value !== undefined
				? optimisticAssigneeId.value
				: rawRequest.value.assigneeId,
		dueDate:
			(optimisticPriority.value ?? rawRequest.value.priority) === 'critical'
				? 'Сегодня, 10:14'
				: rawRequest.value.dueDate
	}

	return transformApiRequest(
		mergedDto,
		{
			users: usersData.value ?? [],
			customers: customersData.value ?? [],
			categories: categoriesData.value ?? []
		},
		true
	)
})

const priorityOptions: { value: Priority; label: string }[] = [
	{ value: 'critical', label: 'Критический' },
	{ value: 'high', label: 'Высокий' },
	{ value: 'normal', label: 'Обычный' },
	{ value: 'low', label: 'Низкий' }
]
const selectPriority = async (nextPriority: Priority) => {
	isPriorityMenuOpen.value = false
	if (!rawRequest.value) return

	const previousPriority = optimisticPriority.value ?? rawRequest.value.priority
	if (previousPriority === nextPriority) return

	optimisticPriority.value = nextPriority
	commentSentBanner.value = false
	requestUiStore.recordPriorityChange(id.value, previousPriority, nextPriority)

	try {
		const updated = await $fetch<ApiRequestDto>(`/api/requests/${id.value}`, {
			method: 'PATCH',
			body: {
				priority: nextPriority,
				simulateError: requestUiStore.simulateConflictError
			}
		})
		rawRequest.value = updated
		optimisticPriority.value = null
	} catch (err: unknown) {
		optimisticPriority.value = previousPriority
		const statusCode = (err as { statusCode?: number })?.statusCode || 409
		requestUiStore.setRollbackError(id.value, statusCode)
	}
}
const cycleStatus = async () => {
	if (!rawRequest.value) return
	const order: RequestStatus[] = [
		'new',
		'assigned',
		'progress',
		'waiting',
		'resolved',
		'closed'
	]
	const current = optimisticStatus.value ?? rawRequest.value.status
	const nextStatus =
		order[(order.indexOf(current) + 1) % order.length] || 'progress'

	optimisticStatus.value = nextStatus
	commentSentBanner.value = false
	requestUiStore.recordStatusChange(id.value, current, nextStatus)

	try {
		const updated = await $fetch<ApiRequestDto>(`/api/requests/${id.value}`, {
			method: 'PATCH',
			body: {
				status: nextStatus,
				simulateError: requestUiStore.simulateConflictError
			}
		})
		rawRequest.value = updated
		optimisticStatus.value = null
	} catch (err: unknown) {
		optimisticStatus.value = current
		const statusCode = (err as { statusCode?: number })?.statusCode || 409
		requestUiStore.setRollbackError(id.value, statusCode)
	}
}

const selectAssignee = async (userId: string | null) => {
	isAssigneeMenuOpen.value = false
	if (!rawRequest.value) return
	const prevAssignee = rawRequest.value.assigneeId
	optimisticAssigneeId.value = userId

	try {
		const updated = await $fetch<ApiRequestDto>(`/api/requests/${id.value}`, {
			method: 'PATCH',
			body: { assigneeId: userId }
		})
		rawRequest.value = updated
		optimisticAssigneeId.value = undefined
	} catch {
		optimisticAssigneeId.value = prevAssignee
	}
}

const handleUndo = async () => {
	const undo = requestUiStore.lastUndo
	if (!undo || !rawRequest.value) return

	if (undo.field === 'priority') {
		const restored = undo.previousValue as Priority
		optimisticPriority.value = restored
		requestUiStore.clearBanners()
		const updated = await $fetch<ApiRequestDto>(`/api/requests/${id.value}`, {
			method: 'PATCH',
			body: { priority: restored }
		})
		rawRequest.value = updated
		optimisticPriority.value = null
	} else {
		const restored = undo.previousValue as RequestStatus
		optimisticStatus.value = restored
		requestUiStore.clearBanners()
		const updated = await $fetch<ApiRequestDto>(`/api/requests/${id.value}`, {
			method: 'PATCH',
			body: { status: restored }
		})
		rawRequest.value = updated
		optimisticStatus.value = null
	}
}
const sendComment = async () => {
	if (!commentDraft.value.trim() || isSendingComment.value) return

	isSendingComment.value = true
	commentErrorText.value = ''
	commentSentBanner.value = false
	requestUiStore.clearBanners()

	try {
		const created = await $fetch<ApiComment>(
			`/api/requests/${id.value}/comments`,
			{
				method: 'POST',
				body: {
					text: commentDraft.value,
					simulateError: simulateCommentError.value
				}
			}
		)

		if (rawRequest.value) {
			const existingComments: ApiComment[] = rawRequest.value.comments ?? []
			rawRequest.value = {
				...rawRequest.value,
				comments: [...existingComments, created]
			}
		}
		commentDraft.value = ''
		commentSentBanner.value = true
	} catch {
		commentErrorText.value =
			'Не удалось отправить комментарий. Текст сохранён — попробуйте ещё раз.'
	} finally {
		isSendingComment.value = false
	}
}

const retryLoad = () => {
	errorParam.value = undefined
	forceSkeleton.value = false
	requestUiStore.clearBanners()
	router.replace({ query: {} })
	refresh()
}

const onKeydown = (e: KeyboardEvent) => {
	if (e.key === 'Escape') {
		isPriorityMenuOpen.value = false
		isAssigneeMenuOpen.value = false
		return
	}
	const tag = (e.target as HTMLElement)?.tagName
	if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

	if (e.key === '1') {
		isPriorityMenuOpen.value = false
		commentSentBanner.value = false
		commentErrorText.value = ''
		requestUiStore.clearBanners()
		retryLoad()
	}
	if (e.key === '2') {
		isPriorityMenuOpen.value = !isPriorityMenuOpen.value
	}
	if (e.key === '3') {
		selectPriority('critical')
	}
	if (e.key === '5') {
		requestUiStore.simulateConflictError = '409'
		selectPriority('critical').finally(() => {
			requestUiStore.simulateConflictError = null
		})
	}
	if (e.key === '6') {
		commentDraft.value = 'Уточнила детали заявки.'
		commentErrorText.value = ''
	}
	if (e.key === '9') {
		commentDraft.value = 'Уточнила детали заявки.'
		simulateCommentError.value = true
		sendComment().finally(() => {
			simulateCommentError.value = false
		})
	}
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
	<NuxtLink
		to="/requests"
		data-state="default"
		data-variant="ghost"
		style="
			height: 40px;
			padding-left: 16px;
			padding-right: 16px;
			border-radius: 4px;
			justify-content: center;
			align-items: center;
			gap: 8px;
			display: inline-flex;
		"
		class="wf-focus-ring"
	>
		<div
			style="
				color: var(--color-text-accent, #79cee8);
				font-size: 14px;
				font-family: Montserrat;
				font-weight: 500;
				line-height: 20px;
			"
		>
			← К списку заявок
		</div>
	</NuxtLink>

	<template v-if="forceSkeleton || status === 'pending'">
		<div
			style="
				align-self: stretch;
				color: var(--color-text-secondary, #b9b3d4);
				font-size: 14px;
				font-family: Montserrat;
				font-weight: 400;
				line-height: 20px;
			"
		>
			Загружаем заявку…
		</div>
		<div
			style="
				align-self: stretch;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 24px;
				display: inline-flex;
				flex-wrap: wrap;
			"
		>
			<div
				style="
					flex: 1 1 0;
					min-width: 300px;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
					gap: 20px;
					display: inline-flex;
				"
			>
				<div
					style="
						align-self: stretch;
						padding: 24px;
						background: var(--color-bg-surface, #23204d);
						border-radius: 4px;
						outline: 1px var(--color-border-default, #413e74) solid;
						outline-offset: -1px;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 16px;
						display: flex;
					"
				>
					<div
						style="
							width: 200px;
							height: 32px;
							padding: 16px;
							background: var(--color-bg-subtle, #2f2a6a);
						"
					></div>
					<div
						style="
							align-self: stretch;
							height: 32px;
							padding: 16px;
							background: var(--color-bg-subtle, #2f2a6a);
						"
					></div>
					<div
						style="
							align-self: stretch;
							height: 32px;
							padding: 16px;
							background: var(--color-bg-subtle, #2f2a6a);
						"
					></div>
				</div>
				<div
					style="
						align-self: stretch;
						padding: 24px;
						background: var(--color-bg-surface, #23204d);
						border-radius: 4px;
						outline: 1px var(--color-border-default, #413e74) solid;
						outline-offset: -1px;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 16px;
						display: flex;
					"
				>
					<div
						v-for="n in 7"
						:key="n"
						:style="n === 1 ? 'width: 200px' : 'align-self: stretch'"
						style="
							height: 32px;
							padding: 16px;
							background: var(--color-bg-subtle, #2f2a6a);
						"
					></div>
				</div>
				<div
					style="
						align-self: stretch;
						padding: 24px;
						background: var(--color-bg-surface, #23204d);
						border-radius: 4px;
						outline: 1px var(--color-border-default, #413e74) solid;
						outline-offset: -1px;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 16px;
						display: flex;
					"
				>
					<div
						style="
							width: 200px;
							height: 32px;
							padding: 16px;
							background: var(--color-bg-subtle, #2f2a6a);
						"
					></div>
					<div
						style="
							align-self: stretch;
							height: 32px;
							padding: 16px;
							background: var(--color-bg-subtle, #2f2a6a);
						"
					></div>
					<div
						style="
							align-self: stretch;
							height: 32px;
							padding: 16px;
							background: var(--color-bg-subtle, #2f2a6a);
						"
					></div>
				</div>
			</div>
			<div
				style="
					width: 320px;
					padding: 24px;
					background: var(--color-bg-surface, #23204d);
					border-radius: 4px;
					outline: 1px var(--color-border-default, #413e74) solid;
					outline-offset: -1px;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
					gap: 16px;
					display: inline-flex;
				"
			>
				<div
					v-for="n in 9"
					:key="n"
					:style="n === 1 ? 'width: 200px' : 'align-self: stretch'"
					style="
						height: 32px;
						padding: 16px;
						background: var(--color-bg-subtle, #2f2a6a);
					"
				></div>
			</div>
		</div>
	</template>

	<div
		v-else-if="error"
		style="
			align-self: stretch;
			padding-left: 24px;
			padding-right: 24px;
			padding-top: 40px;
			padding-bottom: 40px;
			background: var(--color-bg-surface, #23204d);
			border-radius: 4px;
			outline: 1px var(--color-border-default, #413e74) solid;
			outline-offset: -1px;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 16px;
			display: flex;
		"
	>
		<div style="width: 20px; height: 20px; position: relative">
			<div
				style="
					width: 15px;
					height: 15px;
					left: 2.5px;
					top: 2.5px;
					position: absolute;
					outline: 1.67px var(--color-text-secondary, #b9b3d4) solid;
					outline-offset: -0.83px;
				"
			></div>
			<div
				style="
					width: 0.01px;
					height: 6.67px;
					left: 10px;
					top: 6.67px;
					position: absolute;
					outline: 1.67px var(--color-text-secondary, #b9b3d4) solid;
					outline-offset: -0.83px;
				"
			></div>
		</div>
		<div
			style="
				align-self: stretch;
				text-align: center;
				color: var(--color-text-primary, #e8e7ec);
				font-size: 20px;
				font-family: Montserrat;
				font-weight: 600;
				line-height: 28px;
			"
		>
			Не удалось загрузить заявку
		</div>
		<div
			style="
				align-self: stretch;
				text-align: center;
				color: var(--color-text-secondary, #b9b3d4);
				font-size: 14px;
				font-family: Montserrat;
				font-weight: 400;
				line-height: 20px;
			"
		>
			Проверьте соединение и повторите загрузку.
		</div>
		<button
			type="button"
			data-state="default"
			data-variant="primary"
			style="
				height: 40px;
				padding-left: 16px;
				padding-right: 16px;
				background: linear-gradient(90deg, #635bff 0%, #c548ab 100%);
				border-radius: 4px;
				justify-content: center;
				align-items: center;
				gap: 8px;
				display: inline-flex;
				cursor: pointer;
			"
			class="wf-focus-ring"
			@click="retryLoad"
		>
			<span
				style="
					color: var(--color-text-inverse, white);
					font-size: 14px;
					font-family: Montserrat;
					font-weight: 500;
					line-height: 20px;
				"
			>
				Повторить загрузку
			</span>
		</button>
	</div>

	<template v-else-if="request">
		<div
			style="
				align-self: stretch;
				color: var(--color-text-primary, #e8e7ec);
				font-size: 28px;
				font-family: Montserrat;
				font-weight: 700;
				line-height: 36px;
			"
		>
			{{ request.title }}
		</div>
		<div
			v-if="requestUiStore.lastUndo && requestUiStore.lastUndo.requestId === id"
			style="
				align-self: stretch;
				padding: 24px;
				background: var(--color-bg-surface, #23204d);
				border-radius: 4px;
				outline: 1px var(--color-border-default, #413e74) solid;
				outline-offset: -1px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 16px;
				display: flex;
			"
		>
			<div
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 16px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 24px;
				"
			>
				{{ requestUiStore.lastUndo.bannerText }}
			</div>
			<button
				type="button"
				data-state="default"
				data-variant="secondary"
				style="
					height: 40px;
					padding-left: 16px;
					padding-right: 16px;
					background: var(--color-bg-surface, #23204d);
					border-radius: 4px;
					outline: 1px var(--color-border-strong, #615b94) solid;
					outline-offset: -1px;
					justify-content: center;
					align-items: center;
					gap: 8px;
					display: inline-flex;
					cursor: pointer;
				"
				class="wf-focus-ring"
				@click="handleUndo"
			>
				<span
					style="
						color: var(--color-text-primary, #e8e7ec);
						font-size: 14px;
						font-family: Montserrat;
						font-weight: 500;
						line-height: 20px;
					"
				>
					Отменить изменение
				</span>
			</button>
		</div>

		<div
			v-else-if="
				requestUiStore.rollbackBanner &&
				requestUiStore.rollbackBanner.requestId === id
			"
			style="
				align-self: stretch;
				padding: 24px;
				background: var(--color-bg-surface, #23204d);
				border-radius: 4px;
				outline: 1px var(--color-border-default, #413e74) solid;
				outline-offset: -1px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 16px;
				display: flex;
			"
		>
			<div
				style="
					align-self: stretch;
					color: var(--color-text-danger, #ff7994);
					font-size: 16px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 24px;
				"
			>
				{{ requestUiStore.rollbackBanner.title }}
			</div>
			<div
				style="
					align-self: stretch;
					color: var(--color-text-secondary, #b9b3d4);
					font-size: 14px;
					font-family: Montserrat;
					font-weight: 400;
					line-height: 20px;
				"
			>
				{{ requestUiStore.rollbackBanner.description }}
			</div>
			<button
				type="button"
				data-state="default"
				data-variant="secondary"
				style="
					height: 40px;
					padding-left: 16px;
					padding-right: 16px;
					background: var(--color-bg-surface, #23204d);
					border-radius: 4px;
					outline: 1px var(--color-border-strong, #615b94) solid;
					outline-offset: -1px;
					justify-content: center;
					align-items: center;
					gap: 8px;
					display: inline-flex;
					cursor: pointer;
				"
				class="wf-focus-ring"
				@click="retryLoad"
			>
				<span
					style="
						color: var(--color-text-primary, #e8e7ec);
						font-size: 14px;
						font-family: Montserrat;
						font-weight: 500;
						line-height: 20px;
					"
				>
					Обновить заявку
				</span>
			</button>
		</div>

		<div
			v-else-if="commentSentBanner"
			style="
				align-self: stretch;
				padding: 24px;
				background: var(--color-bg-surface, #23204d);
				border-radius: 4px;
				outline: 1px var(--color-border-default, #413e74) solid;
				outline-offset: -1px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 16px;
				display: flex;
			"
		>
			<div
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 16px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 24px;
				"
			>
				Комментарий отправлен
			</div>
		</div>

		<div
			style="
				align-self: stretch;
				color: var(--color-text-secondary, #b9b3d4);
				font-size: 14px;
				font-family: Montserrat;
				font-weight: 400;
				line-height: 20px;
			"
		>
			{{ request.number }} · {{ request.createdAtText }}
		</div>

		<div
			style="
				align-self: stretch;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 12px;
				display: inline-flex;
			"
		>
			<StatusBadge :status="request.status" />
			<PriorityBadge :priority="request.priority" />
		</div>

		<div
			style="
				align-self: stretch;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 24px;
				display: inline-flex;
				flex-wrap: wrap;
			"
		>
			<div
				style="
					flex: 1 1 0;
					min-width: 300px;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
					gap: 20px;
					display: inline-flex;
				"
			>
				<div
					style="
						align-self: stretch;
						padding: 24px;
						background: var(--color-bg-surface, #23204d);
						border-radius: 4px;
						outline: 1px var(--color-border-default, #413e74) solid;
						outline-offset: -1px;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 16px;
						display: flex;
					"
				>
					<div
						style="
							align-self: stretch;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 20px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 28px;
						"
					>
						Описание проблемы
					</div>
					<div
						style="
							align-self: stretch;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 14px;
							font-family: Montserrat;
							font-weight: 400;
							line-height: 20px;
						"
					>
						{{ request.description }}
					</div>
				</div>

				<div
					style="
						align-self: stretch;
						padding: 24px;
						background: var(--color-bg-surface, #23204d);
						border-radius: 4px;
						outline: 1px var(--color-border-default, #413e74) solid;
						outline-offset: -1px;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 16px;
						display: flex;
					"
				>
					<div
						style="
							align-self: stretch;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 20px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 28px;
						"
					>
						Комментарии · {{ request.comments.length }}
					</div>

					<div
						v-for="c in request.comments"
						:key="c.id"
						style="
							align-self: stretch;
							flex-direction: column;
							justify-content: flex-start;
							align-items: flex-start;
							gap: 8px;
							display: flex;
						"
					>
						<div
							style="
								align-self: stretch;
								color: var(--color-text-secondary, #b9b3d4);
								font-size: 12px;
								font-family: Montserrat;
								font-weight: 600;
								line-height: 16px;
							"
						>
							{{ c.author }} · {{ c.time }}
						</div>
						<div
							style="
								align-self: stretch;
								color: var(--color-text-primary, #e8e7ec);
								font-size: 14px;
								font-family: Montserrat;
								font-weight: 400;
								line-height: 20px;
							"
						>
							{{ c.text }}
						</div>
					</div>

					<div
						:style="{ opacity: isSendingComment ? 0.6 : 1 }"
						style="
							align-self: stretch;
							flex-direction: column;
							justify-content: flex-start;
							align-items: flex-start;
							gap: 8px;
							display: flex;
						"
					>
						<label
							for="comment-textarea"
							style="
								align-self: stretch;
								color: var(--color-text-primary, #e8e7ec);
								font-size: 12px;
								font-family: Montserrat;
								font-weight: 600;
								line-height: 16px;
							"
						>
							Ваш комментарий
						</label>
						<textarea
							id="comment-textarea"
							v-model="commentDraft"
							:disabled="isSendingComment"
							placeholder="Напишите сообщение…"
							style="
								align-self: stretch;
								width: 100%;
								min-height: 112px;
								padding: 14px;
								background: var(--color-bg-surface, #23204d);
								border-radius: 4px;
								outline: 1px var(--color-border-default, #413e74) solid;
								outline-offset: -1px;
								color: var(--color-text-secondary, #b9b3d4);
								font-size: 14px;
								font-family: Montserrat;
								font-weight: 400;
								line-height: 20px;
								resize: vertical;
							"
						/>
					</div>

					<div
						v-if="commentErrorText"
						style="
							align-self: stretch;
							color: #ff80a3;
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 400;
							line-height: 20px;
						"
					>
						{{ commentErrorText }}
					</div>

					<button
						type="button"
						:disabled="!commentDraft.trim() || isSendingComment"
						:data-state="
							!commentDraft.trim() || isSendingComment ? 'disabled' : 'default'
						"
						data-variant="primary"
						:style="
							!commentDraft.trim() || isSendingComment
								? 'height: 40px; padding-left: 16px; padding-right: 16px; background: var(--color-bg-subtle, #2F2A6A); border-radius: 4px; justify-content: center; align-items: center; gap: 8px; display: inline-flex'
								: 'height: 40px; padding-left: 16px; padding-right: 16px; background: linear-gradient(90deg, #635BFF 0%, #C548AB 100%); border-radius: 4px; justify-content: center; align-items: center; gap: 8px; display: inline-flex; cursor: pointer'
						"
						class="wf-focus-ring"
						@click="sendComment"
					>
						<span
							:style="
								!commentDraft.trim() || isSendingComment
									? 'color: var(--color-text-disabled, #8E88A8); font-size: 14px; font-family: Montserrat; font-weight: 500; line-height: 20px'
									: 'color: var(--color-text-inverse, white); font-size: 14px; font-family: Montserrat; font-weight: 500; line-height: 20px'
							"
						>
							{{
								isSendingComment
									? 'Отправляем…'
									: commentErrorText
										? 'Повторить отправку'
										: 'Отправить комментарий'
							}}
						</span>
					</button>

					<div
						v-if="isSendingComment"
						style="
							align-self: stretch;
							color: var(--color-text-secondary, #b9b3d4);
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 400;
							line-height: 20px;
						"
					>
						Отправляем комментарий…
					</div>
				</div>

				<div
					style="
						align-self: stretch;
						padding: 24px;
						background: var(--color-bg-surface, #23204d);
						border-radius: 4px;
						outline: 1px var(--color-border-default, #413e74) solid;
						outline-offset: -1px;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 16px;
						display: flex;
					"
				>
					<div
						style="
							align-self: stretch;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 20px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 28px;
						"
					>
						История заявки
					</div>
					<div
						v-for="h in request.history"
						:key="h.id"
						style="
							align-self: stretch;
							color: var(--color-text-secondary, #b9b3d4);
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 500;
							line-height: 16px;
						"
					>
						{{ h.time }}  {{ h.text }}
					</div>
				</div>
			</div>

			<div
				style="
					width: 320px;
					padding: 24px;
					background: var(--color-bg-surface, #23204d);
					border-radius: 4px;
					outline: 1px var(--color-border-default, #413e74) solid;
					outline-offset: -1px;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
					gap: 16px;
					display: inline-flex;
				"
			>
				<div
					style="
						align-self: stretch;
						color: var(--color-text-primary, #e8e7ec);
						font-size: 20px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 28px;
					"
				>
					Параметры
				</div>
				<div
					style="
						align-self: stretch;
						color: var(--color-text-secondary, #b9b3d4);
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 16px;
					"
				>
					Клиент
				</div>
				<div
					style="
						align-self: stretch;
						color: var(--color-text-primary, #e8e7ec);
						font-size: 14px;
						font-family: Montserrat;
						font-weight: 500;
						line-height: 20px;
					"
				>
					{{ request.client }}
				</div>
				<div
					style="
						align-self: stretch;
						color: var(--color-text-secondary, #b9b3d4);
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 16px;
					"
				>
					Категория
				</div>
				<div
					style="
						align-self: stretch;
						color: var(--color-text-primary, #e8e7ec);
						font-size: 14px;
						font-family: Montserrat;
						font-weight: 500;
						line-height: 20px;
					"
				>
					{{ request.category }}
				</div>

				<div
					style="
						align-self: stretch;
						position: relative;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 8px;
						display: flex;
					"
				>
					<div
						style="
							align-self: stretch;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 16px;
						"
					>
						Исполнитель
					</div>
					<button
						type="button"
						style="
							align-self: stretch;
							padding: 14px;
							background: var(--color-bg-surface, #23204d);
							border-radius: 4px;
							outline: 1px var(--color-border-default, #413e74) solid;
							outline-offset: -1px;
							justify-content: flex-start;
							align-items: flex-start;
							gap: 8px;
							display: inline-flex;
							text-align: left;
							cursor: pointer;
						"
						class="wf-focus-ring"
						@click="
							isAssigneeMenuOpen = !isAssigneeMenuOpen
							isPriorityMenuOpen = false
						"
					>
						<span
							style="
								flex: 1 1 0;
								color: var(--color-text-secondary, #b9b3d4);
								font-size: 14px;
								font-family: Montserrat;
								font-weight: 400;
								line-height: 20px;
							"
						>
							{{ request.assignee }} ▾
						</span>
					</button>

					<div
						v-if="isAssigneeMenuOpen"
						style="
							width: 270px;
							padding: 8px;
							top: 76px;
							left: 0;
							z-index: 30;
							position: absolute;
							background: var(--color-bg-surface, #23204d);
							overflow: hidden;
							border-radius: 4px;
							outline: 1px var(--color-border-default, #413e74) solid;
							outline-offset: -1px;
							flex-direction: column;
							justify-content: flex-start;
							align-items: flex-start;
							gap: 8px;
							display: flex;
						"
					>
						<button
							v-for="u in usersData"
							:key="u.id"
							type="button"
							style="
								align-self: stretch;
								height: 40px;
								padding-left: 12px;
								padding-right: 12px;
								border-radius: 4px;
								justify-content: flex-start;
								align-items: center;
								gap: 8px;
								display: inline-flex;
								cursor: pointer;
							"
							class="hover:bg-[#2F2A6A] wf-focus-ring"
							@click="selectAssignee(u.id)"
						>
							<span
								style="
									color: var(--color-text-primary, #e8e7ec);
									font-size: 14px;
									font-family: Montserrat;
									font-weight: 500;
									line-height: 20px;
								"
							>
								{{ u.fullName || u.name }}
							</span>
						</button>
					</div>
				</div>

				<div
					style="
						align-self: stretch;
						position: relative;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 8px;
						display: flex;
					"
				>
					<div
						style="
							align-self: stretch;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 16px;
						"
					>
						Приоритет
					</div>
					<button
						type="button"
						style="
							align-self: stretch;
							padding: 14px;
							background: var(--color-bg-surface, #23204d);
							border-radius: 4px;
							outline: 1px var(--color-border-default, #413e74) solid;
							outline-offset: -1px;
							justify-content: flex-start;
							align-items: flex-start;
							gap: 8px;
							display: inline-flex;
							text-align: left;
							cursor: pointer;
						"
						class="wf-focus-ring"
						@click="
							isPriorityMenuOpen = !isPriorityMenuOpen
							isAssigneeMenuOpen = false
						"
					>
						<span
							style="
								flex: 1 1 0;
								color: var(--color-text-secondary, #b9b3d4);
								font-size: 14px;
								font-family: Montserrat;
								font-weight: 400;
								line-height: 20px;
							"
						>
							{{ PRIORITY_LABELS[request.priority] }} ▾
						</span>
					</button>

					<div
						v-if="isPriorityMenuOpen"
						style="
							width: 270px;
							padding: 8px;
							top: 76px;
							left: 0;
							z-index: 30;
							position: absolute;
							background: var(--color-bg-surface, #23204d);
							overflow: hidden;
							border-radius: 4px;
							outline: 1px var(--color-border-default, #413e74) solid;
							outline-offset: -1px;
							flex-direction: column;
							justify-content: flex-start;
							align-items: flex-start;
							gap: 8px;
							display: flex;
						"
					>
						<button
							v-for="opt in priorityOptions"
							:key="opt.value"
							type="button"
							data-state="default"
							data-variant="ghost"
							style="
								align-self: stretch;
								height: 40px;
								padding-left: 12px;
								padding-right: 12px;
								border-radius: 4px;
								justify-content: flex-start;
								align-items: center;
								gap: 8px;
								display: inline-flex;
								cursor: pointer;
							"
							class="hover:bg-[#2F2A6A] wf-focus-ring"
							@click="selectPriority(opt.value)"
						>
							<span
								style="
									color: var(--color-text-primary, #e8e7ec);
									font-size: 14px;
									font-family: Montserrat;
									font-weight: 500;
									line-height: 20px;
								"
							>
								{{ opt.label }}
							</span>
						</button>
					</div>
				</div>

				<div
					style="
						align-self: stretch;
						color: var(--color-text-secondary, #b9b3d4);
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 16px;
					"
				>
					Срок решения
				</div>
				<div
					style="
						align-self: stretch;
						color: var(--color-text-accent, #79cee8);
						font-size: 14px;
						font-family: Montserrat;
						font-weight: 500;
						line-height: 20px;
					"
				>
					{{ request.dueDateText }}
				</div>

				<button
					type="button"
					data-state="default"
					data-variant="primary"
					style="
						align-self: stretch;
						height: 40px;
						padding-left: 16px;
						padding-right: 16px;
						background: linear-gradient(90deg, #635bff 0%, #c548ab 100%);
						border-radius: 4px;
						justify-content: center;
						align-items: center;
						gap: 8px;
						display: inline-flex;
						cursor: pointer;
					"
					class="wf-focus-ring"
					@click="cycleStatus"
				>
					<span
						style="
							color: var(--color-text-inverse, white);
							font-size: 14px;
							font-family: Montserrat;
							font-weight: 500;
							line-height: 20px;
						"
					>
						Изменить статус
					</span>
				</button>
			</div>
		</div>
	</template>
</template>
