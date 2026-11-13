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
const errorMsg = ref('')

const submitCreate = async () => {
	errorMsg.value = ''
	try {
		await $fetch('/api/requests', {
			isMethod: 'POST',
			body: {
				title: title.value,
				category: category.value,
				description: description.value,
				priority: priority.value
			}
		})
		emit('created')
		emit('close')
	} catch (e: unknown) {
		errorMsg.value =
			(e as { statusMessage?: string })?.statusMessage ||
			'Ошибка создания заявки'
	}
}

const onKeydown = (e: KeyboardEvent) => {
	if (e.key === 'Escape' && props.isOpen) emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
	<Teleport to="body">
		<div
			v-if="isOpen"
			class="fixed inset-0 z-50 flex items-start justify-center pt-[145px]"
		>
			<div
				style="position: fixed; inset: 0; opacity: 0.65; background: #17153a"
				@click="emit('close')"
			/>

			<div
				role="dialog"
				aria-modal="true"
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
						v-model="title"
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
						Категория
					</label>
					<select
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
						v-model="description"
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
						"
					/>
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
						Приоритет
					</label>
					<select
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
					v-if="errorMsg"
					style="color: #ff80a3; font-size: 12px; font-family: Montserrat"
				>
					{{ errorMsg }}
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
							display: flex;
							cursor: pointer;
						"
						@click="submitCreate"
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
							Создать заявку
						</span>
					</button>
				</div>
			</div>
		</div>
	</Teleport>
</template>
