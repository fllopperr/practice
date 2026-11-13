<script setup lang="ts">
import type { Priority } from '../../shared/types'

const props = defineProps<{
	isOpen: boolean
}>()

const emit = defineEmits<{
	close: []
	created: []
}>()

const title = ref('Не работает доступ к CRM')
const category = ref('Доступ и учётные записи')
const description = ref(
	'После обновления не удаётся войти в CRM. При попытке входа появляется сообщение «Доступ запрещён». Проблема затрагивает отдел продаж.'
)
const priority = ref<Priority>('high')

const isSubmitting = ref(false)
const saveError = ref(false)
const touchedValidation = ref(false)
const simulateServerError = ref(false)

const isTitleEmpty = computed(
	() => touchedValidation.value && !title.value.trim()
)
const isDescEmpty = computed(
	() => touchedValidation.value && !description.value.trim()
)
const hasValidationErrors = computed(
	() => isTitleEmpty.value || isDescEmpty.value
)

const submitCreate = async () => {
	if (isSubmitting.value) return

	touchedValidation.value = true
	if (!title.value.trim() || !description.value.trim()) {
		return
	}

	isSubmitting.value = true
	saveError.value = false

	try {
		await $fetch('/api/requests', {
			method: 'POST',
			body: {
				title: title.value.trim(),
				category: category.value,
				description: description.value.trim(),
				priority: priority.value,
				simulateError: simulateServerError.value
			}
		})
		touchedValidation.value = false
		emit('created')
		emit('close')
	} catch {
		saveError.value = true
	} finally {
		isSubmitting.value = false
	}
}

const onKeydown = (e: KeyboardEvent) => {
	if (!props.isOpen) return
	if (e.key === 'Escape') {
		emit('close')
		return
	}
	if (e.altKey && e.key === '5') {
		saveError.value = false
		touchedValidation.value = false
		if (!title.value) title.value = 'Не работает доступ к CRM'
		if (!description.value) {
			description.value =
				'После обновления не удаётся войти в CRM. При попытке входа появляется сообщение «Доступ запрещён». Проблема затрагивает отдел продаж.'
		}
		isSubmitting.value = !isSubmitting.value
	}
	if (e.altKey && e.key === '6') {
		isSubmitting.value = false
		touchedValidation.value = false
		if (!title.value) title.value = 'Не работает доступ к CRM'
		if (!description.value) {
			description.value =
				'После обновления не удаётся войти в CRM. При попытке входа появляется сообщение «Доступ запрещён». Проблема затрагивает отдел продаж.'
		}
		saveError.value = !saveError.value
	}
	if (e.altKey && e.key === '7') {
		isSubmitting.value = false
		saveError.value = false
		title.value = ''
		description.value = ''
		touchedValidation.value = true
	}
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
	<Teleport to="body">
		<div
			v-if="isOpen"
			class="fixed inset-0 z-50 flex items-start justify-center pt-[88px] md:pt-[109px]"
		>
			<div
				style="position: fixed; inset: 0; opacity: 0.65; background: #17153a"
				@click="emit('close')"
			/>

			<div
				role="dialog"
				aria-modal="true"
				data-testid="create-request-modal"
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
						Новая заявка
					</div>
					<button
						type="button"
						aria-label="Закрыть"
						style="
							width: 20px;
							height: 20px;
							position: relative;
							color: var(--color-text-secondary, #b9b3d4);
							cursor: pointer;
						"
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
					Опишите проблему — оператор назначит исполнителя.
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
						for="modal-req-title"
						style="
							align-self: stretch;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 16px;
						"
					>
						Название
					</label>
					<input
						id="modal-req-title"
						v-model="title"
						data-testid="request-title-input"
						type="text"
						:style="
							isTitleEmpty
								? 'align-self: stretch; width: 100%; padding: 14px; background: var(--color-bg-surface, #23204D); border-radius: 4px; outline: 1px #FF80A3 solid; outline-offset: -1px; color: var(--color-text-secondary, #B9B3D4); font-size: 14px; font-family: Montserrat; font-weight: 400; line-height: 20px'
								: 'align-self: stretch; width: 100%; padding: 14px; background: var(--color-bg-surface, #23204D); border-radius: 4px; outline: 1px var(--color-border-default, #413E74) solid; outline-offset: -1px; color: var(--color-text-secondary, #B9B3D4); font-size: 14px; font-family: Montserrat; font-weight: 400; line-height: 20px'
						"
					/>
				</div>
				<div
					v-if="isTitleEmpty"
					data-testid="title-error"
					style="
						align-self: stretch;
						color: #ff80a3;
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 400;
						line-height: 20px;
					"
				>
					Укажите название заявки.
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
						for="modal-req-category"
						style="
							align-self: stretch;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 16px;
						"
					>
						Категория
					</label>
					<select
						id="modal-req-category"
						v-model="category"
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
						<option value="Доступ и учётные записи">
							Доступ и учётные записи ▾
						</option>
						<option value="Инфраструктура">Инфраструктура</option>
						<option value="Отчётность и аналитика">
							Отчётность и аналитика
						</option>
						<option value="Оборудование">Оборудование</option>
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
						for="modal-req-desc"
						style="
							align-self: stretch;
							color: var(--color-text-primary, #e8e7ec);
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 600;
							line-height: 16px;
						"
					>
						Описание
					</label>
					<textarea
						id="modal-req-desc"
						v-model="description"
						data-testid="request-desc-input"
						:style="
							isDescEmpty
								? 'align-self: stretch; width: 100%; min-height: 112px; padding: 14px; background: var(--color-bg-surface, #23204D); border-radius: 4px; outline: 1px #FF80A3 solid; outline-offset: -1px; color: var(--color-text-secondary, #B9B3D4); font-size: 14px; font-family: Montserrat; font-weight: 400; line-height: 20px'
								: 'align-self: stretch; width: 100%; min-height: 112px; padding: 14px; background: var(--color-bg-surface, #23204D); border-radius: 4px; outline: 1px var(--color-border-default, #413E74) solid; outline-offset: -1px; color: var(--color-text-secondary, #B9B3D4); font-size: 14px; font-family: Montserrat; font-weight: 400; line-height: 20px'
						"
					/>
				</div>
				<div
					v-if="isDescEmpty"
					data-testid="desc-error"
					style="
						align-self: stretch;
						color: #ff80a3;
						font-size: 12px;
						font-family: Montserrat;
						font-weight: 400;
						line-height: 20px;
					"
				>
					Опишите проблему.
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
						for="modal-req-priority"
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
					</label>
					<select
						id="modal-req-priority"
						v-model="priority"
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
						<option value="high">Высокий ▾</option>
						<option value="critical">Критический</option>
						<option value="normal">Обычный</option>
						<option value="low">Низкий</option>
					</select>
				</div>

				<div
					v-if="saveError"
					data-testid="save-error-banner"
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
						Не удалось сохранить изменения. Данные не потеряны. Повторите
						попытку.
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
						>
							Отмена
						</span>
					</button>

					<button
						type="button"
						data-testid="submit-create-request"
						:disabled="isSubmitting || hasValidationErrors"
						:data-state="
							isSubmitting || hasValidationErrors ? 'disabled' : 'default'
						"
						data-variant="primary"
						:style="
							isSubmitting || hasValidationErrors
								? 'height: 40px; padding-left: 16px; padding-right: 16px; background: var(--color-bg-subtle, #2F2A6A); border-radius: 4px; justify-content: center; align-items: center; gap: 8px; display: flex'
								: 'height: 40px; padding-left: 16px; padding-right: 16px; background: linear-gradient(90deg, #635BFF 0%, #C548AB 100%); border-radius: 4px; justify-content: center; align-items: center; gap: 8px; display: flex; cursor: pointer'
						"
						@click="submitCreate"
					>
						<span
							:style="
								isSubmitting || hasValidationErrors
									? 'color: var(--color-text-disabled, #8E88A8); font-size: 14px; font-family: Montserrat; font-weight: 500; line-height: 20px'
									: 'color: var(--color-text-inverse, white); font-size: 14px; font-family: Montserrat; font-weight: 500; line-height: 20px'
							"
						>
							{{
								isSubmitting
									? 'Создаём…'
									: saveError
										? 'Повторить'
										: 'Создать заявку'
							}}
						</span>
					</button>
				</div>
			</div>
		</div>
	</Teleport>
</template>
