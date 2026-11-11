<script setup lang="ts">
import { transformApiRequest } from '~/utils/transformers'
import type {
	ApiCategory,
	ApiCustomer,
	ApiRequestDto,
	ApiUser
} from '../../types/types'

const route = useRoute()
const router = useRouter()
const id = computed(() => String(route.params.id))

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

const request = computed(() => {
	if (!rawRequest.value) return null
	return transformApiRequest(
		rawRequest.value,
		{
			users: usersData.value ?? [],
			customers: customersData.value ?? [],
			categories: categoriesData.value ?? []
		},
		true
	)
})

const retryLoad = () => {
	errorParam.value = undefined
	forceSkeleton.value = false
	router.replace({ query: {} })
	refresh()
}

const onKeydown = (e: KeyboardEvent) => {
	const tag = (e.target as HTMLElement)?.tagName
	if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
	if (e.key === '1') retryLoad()
	if (e.key === '2') forceSkeleton.value = !forceSkeleton.value
	if (e.key === '4') {
		forceSkeleton.value = false
		errorParam.value = '500'
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
								color: var(--color-text-primary, #e8e7ec);
								font-size: 12px;
								font-family: Montserrat;
								font-weight: 600;
								line-height: 16px;
							"
						>
							Ваш комментарий
						</div>
						<div
							style="
								align-self: stretch;
								min-height: 112px;
								padding: 14px;
								background: var(--color-bg-surface, #23204d);
								border-radius: 4px;
								outline: 1px var(--color-border-default, #413e74) solid;
								outline-offset: -1px;
								justify-content: flex-start;
								align-items: flex-start;
								gap: 8px;
								display: inline-flex;
							"
						>
							<div
								style="
									flex: 1 1 0;
									color: var(--color-text-secondary, #b9b3d4);
									font-size: 14px;
									font-family: Montserrat;
									font-weight: 400;
									line-height: 20px;
								"
							>
								Напишите сообщение…
							</div>
						</div>
					</div>

					<div
						data-state="disabled"
						data-variant="primary"
						style="
							height: 40px;
							padding-left: 16px;
							padding-right: 16px;
							background: var(--color-bg-subtle, #2f2a6a);
							border-radius: 4px;
							justify-content: center;
							align-items: center;
							gap: 8px;
							display: inline-flex;
						"
					>
						<div
							style="
								color: var(--color-text-disabled, #8e88a8);
								font-size: 14px;
								font-family: Montserrat;
								font-weight: 500;
								line-height: 20px;
							"
						>
							Отправить комментарий
						</div>
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
					<div
						style="
							align-self: stretch;
							padding: 14px;
							background: var(--color-bg-surface, #23204d);
							border-radius: 4px;
							outline: 1px var(--color-border-default, #413e74) solid;
							outline-offset: -1px;
							justify-content: flex-start;
							align-items: center;
							gap: 8px;
							display: inline-flex;
						"
					>
						<div
							style="
								flex: 1 1 0;
								color: var(--color-text-secondary, #b9b3d4);
								font-size: 14px;
								font-family: Montserrat;
								font-weight: 400;
								line-height: 20px;
								word-wrap: break-word;
							"
						>
							{{ request.assignee }}
						</div>
						<div
							style="
								color: var(--color-text-secondary, #b9b3d4);
								font-size: 14px;
								font-family: Montserrat;
								font-weight: 400;
								line-height: 20px;
							"
						>
							▾
						</div>
					</div>
				</div>

				<div
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
							color: var(--color-text-primary, #e8e7ec);
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 16px;
						"
					>
						Приоритет
					</div>
					<div
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
						"
					>
						<div
							style="
								flex: 1 1 0;
								color: var(--color-text-secondary, #b9b3d4);
								font-size: 14px;
								font-family: Montserrat;
								font-weight: 400;
								line-height: 20px;
							"
						>
							Высокий ▾
						</div>
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

				<div
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
				>
					<div
						style="
							color: var(--color-text-inverse, white);
							font-size: 14px;
							font-family: Montserrat;
							font-weight: 500;
							line-height: 20px;
						"
					>
						Изменить статус
					</div>
				</div>
			</div>
		</div>
	</template>
</template>
