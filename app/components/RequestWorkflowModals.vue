<script setup lang="ts">
import { STATUS_LABELS } from '~/utils/mockData'
import type { ApiUser, RequestStatus } from '../../shared/types'

export type ActiveWorkflowModal =
	null | 'assign' | 'resolve' | 'change_status' | 'close_request'

const props = defineProps<{
	modal: ActiveWorkflowModal
	requestId: string
	currentStatus: RequestStatus
	users: ApiUser[]
}>()

const emit = defineEmits<{
	close: []
	updated: []
}>()

const selectedAssigneeId = ref('u-brungilda')
const assignComment = ref('Проверьте права доступа группы')

const isDeactivatedSelected = computed(
	() => selectedAssigneeId.value === 'u-oleg-deactivated'
)

const submitAssign = async () => {
	if (isDeactivatedSelected.value) return
	await $fetch(`/api/requests/${props.requestId}`, {
		method: 'PATCH',
		body: {
			assigneeId: selectedAssigneeId.value,
			comment: assignComment.value
		}
	})
	emit('updated')
	emit('close')
}

const resolutionText = ref('Права доступа восстановлены. Вход проверен.')
const resolutionError = ref(false)

const submitResolution = async () => {
	if (!resolutionText.value.trim()) {
		resolutionError.value = true
		return
	}
	resolutionError.value = false
	await $fetch(`/api/requests/${props.requestId}`, {
		method: 'PATCH',
		body: {
			status: 'resolved',
			resolutionText: resolutionText.value.trim()
		}
	})
	emit('updated')
	emit('close')
}

const nextStatus = ref<RequestStatus>('waiting')
const waitingReason = ref('')
const waitingError = ref(false)

const submitStatusChange = async () => {
	if (nextStatus.value === 'waiting' && !waitingReason.value.trim()) {
		waitingError.value = true
		return
	}
	waitingError.value = false
	await $fetch(`/api/requests/${props.requestId}`, {
		method: 'PATCH',
		body: {
			status: nextStatus.value,
			waitingReason: waitingReason.value.trim()
		}
	})
	emit('updated')
	emit('close')
}

const closeReason = ref('')
const closeError = ref(false)

const submitCloseRequest = async () => {
	if (!closeReason.value.trim()) {
		closeError.value = true
		return
	}
	closeError.value = false
	await $fetch(`/api/requests/${props.requestId}`, {
		method: 'PATCH',
		body: {
			status: 'closed',
			closeReason: closeReason.value.trim()
		}
	})
	emit('updated')
	emit('close')
}

defineExpose({
	setDeactivatedPreset: () => {
		selectedAssigneeId.value = 'u-oleg-deactivated'
	},
	setEmptyResolutionPreset: () => {
		resolutionText.value = ''
		resolutionError.value = true
	},
	setEmptyWaitingPreset: () => {
		nextStatus.value = 'waiting'
		waitingReason.value = ''
		waitingError.value = true
	},
	setEmptyClosePreset: () => {
		closeReason.value = ''
		closeError.value = true
	}
})
</script>

<template>
	<Teleport to="body">
		<div
			v-if="modal"
			class="fixed inset-0 z-50 flex items-start justify-center pt-[195px]"
		>
			<div
				style="position: fixed; inset: 0; opacity: 0.65; background: #17153a"
				@click="emit('close')"
			/>

			<div
				v-if="modal === 'assign'"
				style="
					width: 560px;
					max-width: 95vw;
					position: relative;
					z-index: 10;
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
						width: 512px;
						max-width: 100%;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 16px;
						display: inline-flex;
					"
				>
					<div
						style="
							width: 460px;
							flex: 1;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 20px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 28px;
						"
					>
						Назначить исполнителя
					</div>
					<button
						type="button"
						style="color: var(--color-text-secondary, #b9b3d4); cursor: pointer"
						@click="emit('close')"
					>
						✕
					</button>
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
					Выберите активного сотрудника.
				</div>

				<div
					style="
						width: 512px;
						max-width: 100%;
						height: 80px;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 8px;
						display: flex;
					"
				>
					<label
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
					</label>
					<select
						v-model="selectedAssigneeId"
						style="
							align-self: stretch;
							width: 100%;
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
						"
					>
						<option value="u-brungilda">Брунгильда Брунгильдовна ▾</option>
						<option value="u-oleg">Олег Смирнов</option>
						<option value="u-oleg-deactivated">
							Олег Соколов · деактивирован
						</option>
					</select>
				</div>

				<div
					style="
						width: 512px;
						max-width: 100%;
						height: 80px;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 8px;
						display: flex;
					"
				>
					<label
						style="
							align-self: stretch;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 16px;
						"
					>
						Комментарий
					</label>
					<input
						v-model="assignComment"
						type="text"
						style="
							align-self: stretch;
							width: 100%;
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
						"
					/>
				</div>

				<div
					v-if="isDeactivatedSelected"
					style="
						align-self: stretch;
						padding: 24px;
						background: #38213d;
						border-radius: 4px;
						outline: 1px #de5994 solid;
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
						Деактивированный сотрудник не может получить новое назначение.
						Выберите активного исполнителя.
					</div>
				</div>

				<div
					style="
						width: 512px;
						max-width: 100%;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 12px;
						display: inline-flex;
					"
				>
					<button
						type="button"
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
							display: flex;
							cursor: pointer;
						"
						@click="emit('close')"
					>
						<span
							style="
								color: var(--color-text-primary, #e8e7ec);
								font-size: 14px;
								font-family: Montserrat;
								font-weight: 500;
								line-height: 20px;
							"
							>Отмена</span
						>
					</button>

					<button
						type="button"
						:disabled="isDeactivatedSelected"
						:style="
							isDeactivatedSelected
								? 'height: 40px; padding-left: 16px; padding-right: 16px; background: var(--color-bg-subtle, #2F2A6A); border-radius: 4px; justify-content: center; align-items: center; gap: 8px; display: flex'
								: 'height: 40px; padding-left: 16px; padding-right: 16px; background: linear-gradient(90deg, #635BFF 0%, #C548AB 100%); border-radius: 4px; justify-content: center; align-items: center; gap: 8px; display: flex; cursor: pointer'
						"
						@click="submitAssign"
					>
						<span
							:style="
								isDeactivatedSelected
									? 'color: var(--color-text-disabled, #8E88A8); font-size: 14px; font-family: Montserrat; font-weight: 500; line-height: 20px'
									: 'color: var(--color-text-inverse, white); font-size: 14px; font-family: Montserrat; font-weight: 500; line-height: 20px'
							"
						>
							Назначить
						</span>
					</button>
				</div>
			</div>

			<div
				v-else-if="modal === 'resolve'"
				style="
					width: 560px;
					max-width: 95vw;
					position: relative;
					z-index: 10;
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
						width: 512px;
						max-width: 100%;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 16px;
						display: inline-flex;
					"
				>
					<div
						style="
							width: 460px;
							flex: 1;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 20px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 28px;
						"
					>
						Зафиксировать решение
					</div>
					<button
						type="button"
						style="color: var(--color-text-secondary, #b9b3d4); cursor: pointer"
						@click="emit('close')"
					>
						✕
					</button>
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
					Результат обязателен для статуса «Решена».
				</div>

				<div
					style="
						width: 512px;
						max-width: 100%;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 8px;
						display: flex;
					"
				>
					<label
						style="
							align-self: stretch;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 16px;
						"
					>
						Результат решения
					</label>
					<textarea
						v-model="resolutionText"
						:style="
							resolutionError
								? 'align-self: stretch; width: 100%; min-height: 112px; padding: 14px; background: var(--color-bg-surface, #23204D); border-radius: 4px; outline: 1px var(--color-border-danger, #FF7994) solid; outline-offset: -1px; color: var(--color-text-secondary, #B9B3D4); font-size: 14px; font-family: Montserrat; font-weight: 400; line-height: 20px'
								: 'align-self: stretch; width: 100%; min-height: 112px; padding: 14px; background: var(--color-bg-surface, #23204D); border-radius: 4px; outline: 1px var(--color-border-default, #413E74) solid; outline-offset: -1px; color: var(--color-text-secondary, #B9B3D4); font-size: 14px; font-family: Montserrat; font-weight: 400; line-height: 20px'
						"
					/>
				</div>

				<div
					v-if="resolutionError"
					style="
						align-self: stretch;
						color: #ff80a3;
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 400;
						line-height: 20px;
					"
				>
					Опишите результат решения.
				</div>

				<div
					style="
						width: 512px;
						max-width: 100%;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 12px;
						display: inline-flex;
					"
				>
					<button
						type="button"
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
							display: flex;
							cursor: pointer;
						"
						@click="emit('close')"
					>
						<span
							style="
								color: var(--color-text-primary, #e8e7ec);
								font-size: 14px;
								font-family: Montserrat;
								font-weight: 500;
								line-height: 20px;
							"
							>Отмена</span
						>
					</button>

					<button
						type="button"
						style="
							height: 40px;
							padding-left: 16px;
							padding-right: 16px;
							background: linear-gradient(90deg, #635bff 0%, #c548ab 100%);
							border-radius: 4px;
							justify-content: center;
							align-items: center;
							gap: 8px;
							display: flex;
							cursor: pointer;
						"
						@click="submitResolution"
					>
						<span
							style="
								color: var(--color-text-inverse, white);
								font-size: 14px;
								font-family: Montserrat;
								font-weight: 500;
								line-height: 20px;
							"
							>Отправить решение</span
						>
					</button>
				</div>
			</div>

			<div
				v-else-if="modal === 'change_status'"
				style="
					width: 560px;
					max-width: 95vw;
					position: relative;
					z-index: 10;
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
						width: 512px;
						max-width: 100%;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 16px;
						display: inline-flex;
					"
				>
					<div
						style="
							width: 460px;
							flex: 1;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 20px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 28px;
						"
					>
						Изменить статус
					</div>
					<button
						type="button"
						style="color: var(--color-text-secondary, #b9b3d4); cursor: pointer"
						@click="emit('close')"
					>
						✕
					</button>
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
					Доступные действия зависят от текущего статуса.
				</div>

				<div
					style="
						width: 512px;
						max-width: 100%;
						height: 80px;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 8px;
						display: flex;
					"
				>
					<label
						style="
							align-self: stretch;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 16px;
						"
					>
						Текущий статус
					</label>
					<div
						style="
							align-self: stretch;
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
						"
					>
						{{ STATUS_LABELS[currentStatus] }}
					</div>
				</div>

				<div
					style="
						width: 512px;
						max-width: 100%;
						height: 80px;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 8px;
						display: flex;
					"
				>
					<label
						style="
							align-self: stretch;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 16px;
						"
					>
						Новый статус
					</label>
					<select
						v-model="nextStatus"
						style="
							align-self: stretch;
							width: 100%;
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
						"
					>
						<option value="waiting">Ожидание</option>
						<option value="in_progress">В работе</option>
						<option value="resolved">Решена</option>
					</select>
				</div>

				<div
					style="
						width: 512px;
						max-width: 100%;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 8px;
						display: flex;
					"
				>
					<label
						style="
							align-self: stretch;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 16px;
						"
					>
						Причина ожидания
					</label>
					<textarea
						v-model="waitingReason"
						:style="
							waitingError
								? 'align-self: stretch; width: 100%; min-height: 112px; padding: 14px; background: var(--color-bg-surface, #23204D); border-radius: 4px; outline: 1px var(--color-border-danger, #FF7994) solid; outline-offset: -1px; color: var(--color-text-secondary, #B9B3D4); font-size: 14px; font-family: Montserrat; font-weight: 400; line-height: 20px'
								: 'align-self: stretch; width: 100%; min-height: 112px; padding: 14px; background: var(--color-bg-surface, #23204D); border-radius: 4px; outline: 1px var(--color-border-default, #413E74) solid; outline-offset: -1px; color: var(--color-text-secondary, #B9B3D4); font-size: 14px; font-family: Montserrat; font-weight: 400; line-height: 20px'
						"
					/>
				</div>

				<div
					v-if="waitingError"
					style="
						align-self: stretch;
						color: #ff80a3;
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 400;
						line-height: 20px;
					"
				>
					Укажите причину ожидания.
				</div>

				<div
					style="
						width: 512px;
						max-width: 100%;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 12px;
						display: inline-flex;
					"
				>
					<button
						type="button"
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
							display: flex;
							cursor: pointer;
						"
						@click="emit('close')"
					>
						<span
							style="
								color: var(--color-text-primary, #e8e7ec);
								font-size: 14px;
								font-family: Montserrat;
								font-weight: 500;
								line-height: 20px;
							"
							>Отмена</span
						>
					</button>

					<button
						type="button"
						style="
							height: 40px;
							padding-left: 16px;
							padding-right: 16px;
							background: linear-gradient(90deg, #635bff 0%, #c548ab 100%);
							border-radius: 4px;
							justify-content: center;
							align-items: center;
							gap: 8px;
							display: flex;
							cursor: pointer;
						"
						@click="submitStatusChange"
					>
						<span
							style="
								color: var(--color-text-inverse, white);
								font-size: 14px;
								font-family: Montserrat;
								font-weight: 500;
								line-height: 20px;
							"
							>Сохранить</span
						>
					</button>
				</div>
			</div>

			<div
				v-else-if="modal === 'close_request'"
				style="
					width: 560px;
					max-width: 95vw;
					position: relative;
					z-index: 10;
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
						width: 512px;
						max-width: 100%;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 16px;
						display: inline-flex;
					"
				>
					<div
						style="
							width: 460px;
							flex: 1;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 20px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 28px;
						"
					>
						Закрыть заявку
					</div>
					<button
						type="button"
						style="color: var(--color-text-secondary, #b9b3d4); cursor: pointer"
						@click="emit('close')"
					>
						✕
					</button>
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
					Укажите причину ручного закрытия.
				</div>

				<div
					style="
						width: 512px;
						max-width: 100%;
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 8px;
						display: flex;
					"
				>
					<label
						style="
							align-self: stretch;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 16px;
						"
					>
						Причина закрытия
					</label>
					<textarea
						v-model="closeReason"
						:style="
							closeError
								? 'align-self: stretch; width: 100%; min-height: 112px; padding: 14px; background: var(--color-bg-surface, #23204D); border-radius: 4px; outline: 1px var(--color-border-danger, #FF7994) solid; outline-offset: -1px; color: var(--color-text-secondary, #B9B3D4); font-size: 14px; font-family: Montserrat; font-weight: 400; line-height: 20px'
								: 'align-self: stretch; width: 100%; min-height: 112px; padding: 14px; background: var(--color-bg-surface, #23204D); border-radius: 4px; outline: 1px var(--color-border-default, #413E74) solid; outline-offset: -1px; color: var(--color-text-secondary, #B9B3D4); font-size: 14px; font-family: Montserrat; font-weight: 400; line-height: 20px'
						"
					/>
				</div>

				<div
					v-if="closeError"
					style="
						align-self: stretch;
						color: #ff80a3;
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 400;
						line-height: 20px;
					"
				>
					Укажите причину ручного закрытия.
				</div>

				<div
					style="
						width: 512px;
						max-width: 100%;
						justify-content: flex-start;
						align-items: flex-start;
						gap: 12px;
						display: inline-flex;
					"
				>
					<button
						type="button"
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
							display: flex;
							cursor: pointer;
						"
						@click="emit('close')"
					>
						<span
							style="
								color: var(--color-text-primary, #e8e7ec);
								font-size: 14px;
								font-family: Montserrat;
								font-weight: 500;
								line-height: 20px;
							"
							>Отмена</span
						>
					</button>

					<button
						type="button"
						style="
							height: 40px;
							padding-left: 16px;
							padding-right: 16px;
							background: linear-gradient(90deg, #635bff 0%, #c548ab 100%);
							border-radius: 4px;
							justify-content: center;
							align-items: center;
							gap: 8px;
							display: flex;
							cursor: pointer;
						"
						@click="submitCloseRequest"
					>
						<span
							style="
								color: var(--color-text-inverse, white);
								font-size: 14px;
								font-family: Montserrat;
								font-weight: 500;
								line-height: 20px;
							"
							>Закрыть заявку</span
						>
					</button>
				</div>
			</div>
		</div>
	</Teleport>
</template>
