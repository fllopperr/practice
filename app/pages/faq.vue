<script setup lang="ts">
import { FAQ_ITEMS } from '../../shared/utils/knowledgeBase'

definePageMeta({
	layout: 'public'
})

useSeoMeta({
	title: 'Частые вопросы (FAQ) — WorkFlow',
	description:
		'Ответы на частые вопросы о работе с сервисными заявками, статусах обращений, подтверждении решения и сроках SLA в WorkFlow.',
	ogTitle: 'Частые вопросы (FAQ) — WorkFlow',
	ogDescription: 'Ответы о работе с сервисными заявками в системе WorkFlow.',
	ogType: 'website',
	ogUrl: 'https://workflow.demo/faq'
})

useHead({
	link: [{ rel: 'canonical', href: 'https://workflow.demo/faq' }]
})

const searchQuery = ref('')

const filteredFaq = computed(() => {
	const q = searchQuery.value.trim().toLowerCase()
	if (!q) return FAQ_ITEMS
	return FAQ_ITEMS.filter(
		item =>
			item.question.toLowerCase().includes(q) ||
			item.answer.toLowerCase().includes(q)
	)
})
</script>

<template>
	<div
		class="w-full px-4 md:px-8 lg:px-16 py-16 flex flex-col justify-start items-start gap-6"
	>
		<h1
			class="text-[24px] leading-[31px] md:text-[28px] md:leading-[36px]"
			style="
				align-self: stretch;
				color: var(--color-text-primary, #e8e7ec);
				font-family: Montserrat;
				font-weight: 700;
				margin: 0;
			"
		>
			Частые вопросы
		</h1>
		<p
			style="
				align-self: stretch;
				color: var(--color-text-secondary, #b9b3d4);
				font-size: 14px;
				font-family: Montserrat;
				font-weight: 400;
				line-height: 20px;
				margin: 0;
			"
		>
			Ответы о работе с сервисными заявками
		</p>

		<div
			class="w-full lg:w-[1152px]"
			style="
				height: 80px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 8px;
				display: flex;
			"
		>
			<label
				for="faq-search"
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
			>
				Поиск по вопросам
			</label>
			<input
				id="faq-search"
				v-model="searchQuery"
				type="text"
				placeholder="Что вы хотите узнать?"
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
			v-for="item in filteredFaq"
			:key="item.id"
			class="w-full lg:w-[1152px]"
			style="
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
			<h2
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 16px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 24px;
					margin: 0;
				"
			>
				{{ item.question }}
			</h2>
			<p
				style="
					align-self: stretch;
					color: var(--color-text-secondary, #b9b3d4);
					font-size: 14px;
					font-family: Montserrat;
					font-weight: 400;
					line-height: 20px;
					margin: 0;
				"
			>
				{{ item.answer }}
			</p>
		</div>
	</div>
</template>
