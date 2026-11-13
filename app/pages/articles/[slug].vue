<script setup lang="ts">
import { ARTICLES_LIST } from '../../../shared/utils/knowledgeBase'

definePageMeta({
	layout: 'public'
})

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const article = computed(() =>
	ARTICLES_LIST.find(item => item.slug === slug.value)
)

if (!article.value && import.meta.server) {
	const event = useRequestEvent()
	if (event) {
		setResponseStatus(event, 404)
	}
}

useSeoMeta({
	title: () =>
		article.value
			? `${article.value.title} — База знаний WorkFlow`
			: '404 Статья не найдена — WorkFlow',
	description: () =>
		article.value
			? article.value.seoDescription
			: 'Возможно, статья удалена или её адрес изменился.',
	ogTitle: () =>
		article.value
			? `${article.value.title} — WorkFlow`
			: 'Статья не найдена — WorkFlow',
	ogDescription: () =>
		article.value
			? article.value.seoDescription
			: 'Возможно, статья удалена или её адрес изменился.',
	ogType: 'article',
	ogUrl: () => `https://workflow.demo/articles/${slug.value}`
})

useHead({
	link: [
		{
			rel: 'canonical',
			href: () => `https://workflow.demo/articles/${slug.value}`
		}
	]
})

const feedbackGiven = ref<'yes' | 'no' | null>(null)
</script>

<template>
	<div
		v-if="!article"
		class="w-full flex-1 flex flex-col justify-center items-center py-20"
	>
		<div
			style="
				width: 720px;
				max-width: 100%;
				padding: 64px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				gap: 24px;
				display: flex;
			"
		>
			<div
				style="
					align-self: stretch;
					text-align: center;
					color: var(--color-text-accent, #79cee8);
					font-size: 32px;
					font-family: Montserrat;
					font-weight: 700;
					line-height: 40px;
				"
			>
				404
			</div>
			<h1
				style="
					align-self: stretch;
					text-align: center;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 28px;
					font-family: Montserrat;
					font-weight: 700;
					line-height: 36px;
					margin: 0;
				"
			>
				Статья не найдена
			</h1>
			<p
				style="
					align-self: stretch;
					text-align: center;
					color: var(--color-text-secondary, #b9b3d4);
					font-size: 14px;
					font-family: Montserrat;
					font-weight: 400;
					line-height: 20px;
					margin: 0;
				"
			>
				Возможно, статья удалена или её адрес изменился.
			</p>
			<NuxtLink
				to="/articles"
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
				"
				class="wf-focus-ring"
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
					К списку статей
				</span>
			</NuxtLink>
		</div>
	</div>

	<article
		v-else
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
			{{ article.title }}
		</h1>
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
			{{ article.updatedAtText }}
		</div>

		<div
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
			<template v-for="sec in article.sections" :key="sec.heading">
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
					{{ sec.heading }}
				</h2>
				<p
					style="
						align-self: stretch;
						color: var(--color-text-primary, #e8e7ec);
						font-size: 14px;
						font-family: Montserrat;
						font-weight: 400;
						line-height: 20px;
						margin: 0;
					"
				>
					{{ sec.body }}
				</p>
			</template>

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
				Была ли статья полезна?
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
					class="wf-focus-ring"
					@click="feedbackGiven = 'yes'"
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
						Да
					</span>
				</button>

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
					class="wf-focus-ring"
					@click="feedbackGiven = 'no'"
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
						Нет
					</span>
				</button>
			</div>
		</div>
	</article>
</template>
