import { defineStore } from 'pinia'
import type { Priority, RequestStatus } from '~/types/types'
import { PRIORITY_LABELS, STATUS_LABELS } from '~/utils/mockData'

export interface UndoRecord {
	requestId: string
	field: 'priority' | 'status'
	previousValue: Priority | RequestStatus
	newValue: Priority | RequestStatus
	bannerText: string
}

export interface RollbackErrorBanner {
	requestId: string
	title: string
	description: string
}

export const useRequestUiStore = defineStore('requestUi', () => {
	const lastUndo = ref<UndoRecord | null>(null)
	const rollbackBanner = ref<RollbackErrorBanner | null>(null)
	const simulateConflictError = ref<'409' | '500' | null>(null)

	const recordPriorityChange = (
		requestId: string,
		prevPriority: Priority,
		nextPriority: Priority
	) => {
		rollbackBanner.value = null
		lastUndo.value = {
			requestId,
			field: 'priority',
			previousValue: prevPriority,
			newValue: nextPriority,
			bannerText: `Приоритет изменён на «${PRIORITY_LABELS[nextPriority]}»`
		}
	}

	const recordStatusChange = (
		requestId: string,
		prevStatus: RequestStatus,
		nextStatus: RequestStatus
	) => {
		rollbackBanner.value = null
		lastUndo.value = {
			requestId,
			field: 'status',
			previousValue: prevStatus,
			newValue: nextStatus,
			bannerText: `Статус изменён на «${STATUS_LABELS[nextStatus]}»`
		}
	}

	const setRollbackError = (requestId: string, statusCode?: number) => {
		lastUndo.value = null
		rollbackBanner.value = {
			requestId,
			title: 'Изменение не сохранено',
			description:
				statusCode === 500
					? 'Ошибка сервера (500). Предыдущее значение восстановлено. Обновите данные и попробуйте снова.'
					: 'Заявка была изменена другим сотрудником. Предыдущее значение восстановлено. Обновите данные и попробуйте снова.'
		}
	}

	const clearBanners = () => {
		lastUndo.value = null
		rollbackBanner.value = null
	}

	return {
		lastUndo,
		rollbackBanner,
		simulateConflictError,
		recordPriorityChange,
		recordStatusChange,
		setRollbackError,
		clearBanners
	}
})
