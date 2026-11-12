<script setup lang="ts">
import { useRequests } from '~/composable/useRequests'
import { usePreferencesStore } from '~/store/preferences'
import { useRequestUiStore } from '~/store/requestUi'
import type { Priority, RequestStatus } from '~/types/types'

const preferencesStore = usePreferencesStore()
const requestUiStore = useRequestUiStore()

const {
	filteredRequests,
	searchQuery,
	debouncedSearch,
	page,
	totalCount,
	hasPartialError,
	partialMode,
	errorMode,
	forceLoading,
	fetchError,
	viewState,
	clearSearchOnly,
	resetFilters,
	retryAfterError,
	setPage,
	refreshRequests
} = useRequests()

const isCompactHeaderLayout = computed(
	() =>
		viewState.value !== 'normal' ||
		Boolean(requestUiStore.lastUndo) ||
		Boolean(requestUiStore.rollbackBanner)
)

const handleUndoFromList = async () => {
	const undo = requestUiStore.lastUndo
	if (!undo) return

	await $fetch(`/api/requests/${undo.requestId}`, {
		isMethod: 'PATCH',
		body:
			undo.field === 'priority'
				? { priority: undo.previousValue as Priority }
				: { status: undo.previousValue as RequestStatus }
	})
	requestUiStore.clearBanners()
	await refreshRequests()
}

const handleRefreshAfterConflict = async () => {
	requestUiStore.clearBanners()
	await refreshRequests()
}

const onKeydown = (e: KeyboardEvent) => {
	const tag = (e.target as HTMLElement)?.tagName
	if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

	if (e.key === '1') {
		requestUiStore.clearBanners()
		resetFilters()
	}
	if (e.key === '2') forceLoading.value = !forceLoading.value
	if (e.key === '3') searchQuery.value = 'несуществующий_запрос'
	if (e.key === '4') errorMode.value = '500'
	if (e.key === '5') errorMode.value = '429'
	if (e.key === '6') partialMode.value = !partialMode.value
	if (e.key === '7') {
		requestUiStore.recordPriorityChange('1042', 'critical', 'high')
	}
	if (e.key === '8') {
		requestUiStore.setRollbackError('1042', 409)
	}
	if (e.key === '9') {
		preferencesStore.setDensity(
			preferencesStore.density === 'compact' ? 'comfortable' : 'compact'
		)
	}
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
	<template v-if="isCompactHeaderLayout">
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
			Заявки
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
			Все обращения в одном месте
		</div>

		<div
			v-if="requestUiStore.lastUndo"
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
				@click="handleUndoFromList"
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
			v-else-if="requestUiStore.rollbackBanner"
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
				@click="handleRefreshAfterConflict"
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
			@click="resetFilters"
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
				Создать заявку
			</div>
		</div>

		<RequestFilters three-columns-only />

		<RequestList
			:items="filteredRequests"
			:state="viewState"
			:page="page"
			:total="totalCount"
			:show-pagination="viewState === 'normal'"
			:error-message="fetchError?.statusMessage"
			@reset="resetFilters"
			@retry="retryAfterError"
			@page-change="setPage"
		/>
	</template>

	<template v-else>
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
			Рабочий день под контролем
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
			Заявки, которые требуют вашего внимания
		</div>

		<div
			v-if="preferencesStore.density === 'compact'"
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
				Плотность списка: компактная
			</div>
		</div>

		<div
			v-if="debouncedSearch.trim()"
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
				По запросу «{{ debouncedSearch.trim() }}» найдено: {{ totalCount }}
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
				@click="clearSearchOnly"
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
					Сбросить поиск
				</span>
			</button>
		</div>

		<div
			v-else-if="hasPartialError"
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
				Часть данных заявки недоступна. Остальные обращения отображаются.
			</div>
		</div>

		<StatsGrid />

		<div
			style="
				align-self: stretch;
				overflow: hidden;
				justify-content: flex-start;
				align-items: center;
				gap: 12px;
				display: inline-flex;
			"
		>
			<div
				style="
					flex: 1 1 0;
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 20px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 28px;
				"
			>
				Заявки
			</div>
		</div>

		<div
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
				Создать заявку
			</div>
		</div>

		<RequestFilters />

		<RequestList
			:items="filteredRequests"
			:state="viewState"
			:page="page"
			:total="totalCount"
			show-pagination
			@reset="resetFilters"
			@retry="retryAfterError"
			@page-change="setPage"
		/>
	</template>
</template>
