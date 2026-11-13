<script setup lang="ts">
import {
	ARTICLES_LIST,
	HELP_CATEGORIES
} from '../../../shared/utils/knowledgeBase'

definePageMeta({
	layout: 'public'
})

useSeoMeta({
	title: 'Статьи и инструкции — WorkFlow',
	description:
		'Все статьи и пошаговые инструкции по использованию системы поддержки WorkFlow: создание заявок, отслеживание статусов и SLA.',
	ogTitle: 'Статьи и инструкции — WorkFlow',
	ogDescription: 'База знаний и документация по работе с заявками в WorkFlow.',
	ogType: 'website',
	ogUrl: 'https://workflow.demo/articles'
})

useHead({
	link: [{ rel: 'canonical', href: 'https://workflow.demo/articles' }]
})

const searchQuery = ref('')

const filteredArticles = computed(() => {
	const q = searchQuery.value.trim().toLowerCase()
	if (!q) return ARTICLES_LIST
	return ARTICLES_LIST.filter(a => a.title.toLowerCase().includes(q))
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
			Статьи и инструкции
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
			Найдите ответ или отправьте обращение
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
				for="articles-search"
				style="
					align-self: stretch;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 600;
					line-height: 16px;
				"
			>
				Поиск
			</label>
			<input
				id="articles-search"
				v-model="searchQuery"
				type="text"
				placeholder="Поиск по базе знаний"
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
			class="w-full lg:w-[1152px] flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-start items-start gap-6"
		>
			<div
				v-for="cat in HELP_CATEGORIES"
				:key="cat.id"
				class="w-full md:w-[340px] lg:w-[368px]"
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
					display: inline-flex;
				"
			>
				<h2
					style="
						align-self: stretch;
						color: var(--color-text-primary, #e8e7ec);
						font-size: 20px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 28px;
						margin: 0;
					"
				>
					{{ cat.title }}
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
					{{ cat.description }}
				</p>
				<NuxtLink
					:to="`/articles/${cat.slug}`"
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
					<span
						style="
							color: var(--color-text-accent, #79cee8);
							font-size: 14px;
							font-family: Montserrat;
							font-weight: 500;
							line-height: 20px;
						"
					>
						Открыть
					</span>
				</NuxtLink>
			</div>
		</div>

		<h2
			style="
				align-self: stretch;
				color: var(--color-text-primary, #e8e7ec);
				font-size: 20px;
				font-family: Montserrat;
				font-weight: 600;
				line-height: 28px;
				margin: 0;
			"
		>
			Все статьи
		</h2>

		<NuxtLink
			v-for="art in filteredArticles"
			:key="art.slug"
			:to="`/articles/${art.slug}`"
			class="w-full lg:w-[1152px] hover:bg-[#2F2A6A] transition wf-focus-ring"
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
				{{ art.title }}
			</div>
			<div
				style="
					align-self: stretch;
					color: var(--color-text-secondary, #b9b3d4);
					font-size: 12px;
					font-family: Montserrat;
					font-weight: 500;
					line-height: 16px;
				"
			>
				{{ art.categoryTitle }} · {{ art.readTime }}
			</div>
		</NuxtLink>
	</div>
</template>
