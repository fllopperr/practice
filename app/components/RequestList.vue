<script setup lang="ts">
import type { MockViewState } from '../composable/useRequests'
import type { WorkRequest } from '../types/types'

const props = withDefaults(
	defineProps<{
		items: WorkRequest[]
		state?: MockViewState
		showPagination?: boolean
		page?: number
		total?: number
		errorMessage?: string
	}>(),
	{
		state: 'normal',
		showPagination: false,
		page: 1,
		total: 24,
		errorMessage: ''
	}
)

const emit = defineEmits<{
	reset: []
	retry: []
	pageChange: [page: number]
}>()

const router = useRouter()

const startItem = computed(() => {
	if (props.total === 0) return 0
	return (props.page - 1) * 12 + 1
})

const endItem = computed(() => {
	return Math.min(props.page * 12, props.total)
})

const goToRequest = (id: string) => {
	router.push(`/requests/${id}`)
}
</script>

<template>
	<div
		v-if="state === 'loading'"
		style="
			align-self: stretch;
			padding: 40px 24px;
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
			Загружаем заявки…
		</div>
		<div
			v-for="n in 6"
			:key="n"
			style="
				align-self: stretch;
				padding: 16px;
				background: var(--color-bg-subtle, #2f2a6a);
				justify-content: flex-start;
				align-items: flex-start;
				gap: 12px;
				display: inline-flex;
			"
		>
			<div
				style="
					color: var(--color-text-disabled, #8e88a8);
					font-size: 14px;
					font-family: Montserrat;
					font-weight: 400;
					line-height: 20px;
					white-space: pre;
				"
			>
				— — —
			</div>
		</div>
	</div>

	<div
		v-else-if="state === 'error'"
		style="
			align-self: stretch;
			padding: 40px 24px;
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
			Не удалось загрузить заявки
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
			{{ errorMessage || 'Сервис временно недоступен. Попробуйте ещё раз.' }}
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
			@click="emit('retry')"
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

	<div
		v-else-if="items.length === 0"
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
					width: 11.67px;
					height: 11.67px;
					left: 3.33px;
					top: 3.33px;
					position: absolute;
					outline: 1.67px var(--color-text-secondary, #b9b3d4) solid;
					outline-offset: -0.83px;
				"
			></div>
			<div
				style="
					width: 3.58px;
					height: 3.58px;
					left: 13.92px;
					top: 13.92px;
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
			Ничего не найдено
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
			Попробуйте изменить запрос или сбросить фильтры.
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
			@click="emit('reset')"
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
				Сбросить фильтры
			</span>
		</button>
	</div>

	<template v-else>
		<div
			class="hidden md:flex"
			style="
				align-self: stretch;
				background: var(--color-bg-surface, #23204d);
				border-radius: 4px;
				outline: 1px var(--color-border-default, #413e74) solid;
				outline-offset: -1px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
			"
		>
			<div
				style="
					align-self: stretch;
					padding: 16px;
					background: var(--color-bg-subtle, #2f2a6a);
					justify-content: flex-start;
					align-items: flex-start;
					gap: 12px;
					display: inline-flex;
				"
			>
				<div
					style="
						width: 62px;
						color: var(--color-text-secondary, #b9b3d4);
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 16px;
					"
				>
					Номер
				</div>
				<div
					style="
						flex: 1 1 0;
						color: var(--color-text-secondary, #b9b3d4);
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 16px;
					"
				>
					Заявка
				</div>
				<div
					class="hidden lg:block"
					style="
						width: 140px;
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
					class="hidden lg:block"
					style="
						width: 110px;
						color: var(--color-text-secondary, #b9b3d4);
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
						width: 120px;
						color: var(--color-text-secondary, #b9b3d4);
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 16px;
					"
				>
					Статус
				</div>
				<div
					style="
						width: 130px;
						color: var(--color-text-secondary, #b9b3d4);
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 16px;
					"
				>
					Приоритет
				</div>
			</div>

			<div
				v-for="item in items"
				:key="item.id"
				tabindex="0"
				role="link"
				style="
					align-self: stretch;
					height: 54px;
					padding-left: 16px;
					padding-right: 16px;
					background: var(--color-bg-surface, #23204d);
					justify-content: flex-start;
					align-items: center;
					gap: 12px;
					display: inline-flex;
					cursor: pointer;
				"
				class="hover:bg-[#2F2A6A] wf-focus-ring"
				@click="goToRequest(item.id)"
				@keydown.enter.prevent="goToRequest(item.id)"
				@keydown.space.prevent="goToRequest(item.id)"
			>
				<div
					style="
						width: 62px;
						color: var(--color-text-secondary, #b9b3d4);
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 500;
						line-height: 16px;
					"
				>
					{{ item.number }}
				</div>
				<div
					style="
						flex: 1 1 0;
						color: var(--color-text-primary, #e8e7ec);
						font-size: 14px;
						font-family: Montserrat;
						font-weight: 500;
						line-height: 20px;
					"
				>
					{{ item.title }}
				</div>
				<div
					class="hidden lg:block"
					style="
						width: 140px;
						color: var(--color-text-primary, #e8e7ec);
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 500;
						line-height: 16px;
					"
				>
					{{ item.client }}
				</div>
				<div
					class="hidden lg:block"
					style="
						width: 110px;
						color: var(--color-text-primary, #e8e7ec);
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 500;
						line-height: 16px;
					"
				>
					{{ item.assignee }}
				</div>
				<div
					style="
						width: 120px;
						overflow: hidden;
						justify-content: flex-start;
						align-items: center;
						display: flex;
					"
				>
					<StatusBadge :status="item.status" />
				</div>
				<div
					style="
						width: 130px;
						overflow: hidden;
						justify-content: flex-start;
						align-items: center;
						display: flex;
					"
				>
					<PriorityBadge :priority="item.priority" />
				</div>
			</div>
		</div>

		<div
			class="md:hidden self-stretch bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex flex-col justify-start items-start"
		>
			<RequestCard v-for="item in items" :key="item.id" :item="item" />
		</div>

		<div
			v-if="showPagination"
			style="
				align-self: stretch;
				justify-content: flex-start;
				align-items: center;
				gap: 12px;
				display: inline-flex;
				flex-wrap: wrap;
			"
		>
			<div
				style="
					flex: 1 1 0;
					color: var(--color-text-secondary, #b9b3d4);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 500;
					line-height: 16px;
				"
			>
				Показано {{ startItem }}–{{ endItem }} из {{ total }}
			</div>

			<template v-if="total > 12">
				<button
					type="button"
					:disabled="page <= 1"
					:data-state="page <= 1 ? 'disabled' : 'default'"
					data-variant="secondary"
					:style="
						page <= 1
							? 'height: 40px; padding-left: 16px; padding-right: 16px; background: var(--color-bg-subtle, #2F2A6A); border-radius: 4px; outline: 1px var(--color-border-default, #413E74) solid; outline-offset: -1px; justify-content: center; align-items: center; gap: 8px; display: flex'
							: 'height: 40px; padding-left: 16px; padding-right: 16px; background: var(--color-bg-surface, #23204D); border-radius: 4px; outline: 1px var(--color-border-strong, #615B94) solid; outline-offset: -1px; justify-content: center; align-items: center; gap: 8px; display: flex; cursor: pointer'
					"
					class="wf-focus-ring"
					@click="emit('pageChange', page - 1)"
				>
					<span
						:style="
							page <= 1
								? 'color: var(--color-text-disabled, #8E88A8); font-size: 14px; font-family: Montserrat; font-weight: 500; line-height: 20px'
								: 'color: var(--color-text-primary, #E8E7EC); font-size: 14px; font-family: Montserrat; font-weight: 500; line-height: 20px'
						"
					>
						Назад
					</span>
				</button>

				<button
					type="button"
					data-state="default"
					:data-variant="page === 1 ? 'secondary' : 'ghost'"
					:style="
						page === 1
							? 'height: 40px; padding-left: 16px; padding-right: 16px; background: var(--color-bg-surface, #23204D); border-radius: 4px; outline: 1px var(--color-border-strong, #615B94) solid; outline-offset: -1px; justify-content: center; align-items: center; gap: 8px; display: flex; cursor: pointer'
							: 'height: 40px; padding-left: 16px; padding-right: 16px; border-radius: 4px; justify-content: center; align-items: center; gap: 8px; display: flex; cursor: pointer'
					"
					class="wf-focus-ring"
					@click="emit('pageChange', 1)"
				>
					<span
						:style="
							page === 1
								? 'color: var(--color-text-primary, #E8E7EC); font-size: 14px; font-family: Montserrat; font-weight: 500; line-height: 20px'
								: 'color: var(--color-text-accent, #79CEE8); font-size: 14px; font-family: Montserrat; font-weight: 500; line-height: 20px'
						"
					>
						1
					</span>
				</button>

				<button
					type="button"
					data-state="default"
					:data-variant="page === 2 ? 'secondary' : 'ghost'"
					:style="
						page === 2
							? 'height: 40px; padding-left: 16px; padding-right: 16px; background: var(--color-bg-surface, #23204D); border-radius: 4px; outline: 1px var(--color-border-strong, #615B94) solid; outline-offset: -1px; justify-content: center; align-items: center; gap: 8px; display: flex; cursor: pointer'
							: 'height: 40px; padding-left: 16px; padding-right: 16px; border-radius: 4px; justify-content: center; align-items: center; gap: 8px; display: flex; cursor: pointer'
					"
					class="wf-focus-ring"
					@click="emit('pageChange', 2)"
				>
					<span
						:style="
							page === 2
								? 'color: var(--color-text-primary, #E8E7EC); font-size: 14px; font-family: Montserrat; font-weight: 500; line-height: 20px'
								: 'color: var(--color-text-accent, #79CEE8); font-size: 14px; font-family: Montserrat; font-weight: 500; line-height: 20px'
						"
					>
						2
					</span>
				</button>

				<button
					type="button"
					:disabled="page >= 2"
					:data-state="page >= 2 ? 'disabled' : 'default'"
					data-variant="secondary"
					:style="
						page >= 2
							? 'height: 40px; padding-left: 16px; padding-right: 16px; background: var(--color-bg-subtle, #2F2A6A); border-radius: 4px; outline: 1px var(--color-border-default, #413E74) solid; outline-offset: -1px; justify-content: center; align-items: center; gap: 8px; display: flex'
							: 'height: 40px; padding-left: 16px; padding-right: 16px; background: var(--color-bg-surface, #23204D); border-radius: 4px; outline: 1px var(--color-border-strong, #615B94) solid; outline-offset: -1px; justify-content: center; align-items: center; gap: 8px; display: flex; cursor: pointer'
					"
					class="wf-focus-ring"
					@click="emit('pageChange', page + 1)"
				>
					<span
						:style="
							page >= 2
								? 'color: var(--color-text-disabled, #8E88A8); font-size: 14px; font-family: Montserrat; font-weight: 500; line-height: 20px'
								: 'color: var(--color-text-primary, #E8E7EC); font-size: 14px; font-family: Montserrat; font-weight: 500; line-height: 20px'
						"
					>
						Далее
					</span>
				</button>
			</template>
		</div>
	</template>
</template>
