<script setup lang="ts">
definePageMeta({
	layout: false
})
</script>

<template>
	<div
		class="w-full min-h-screen wf-bg-radial inline-flex flex-col justify-center items-center"
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
				403
			</div>
			<div
				style="
					align-self: stretch;
					text-align: center;
					color: var(--color-text-primary, #e8e7ec);
					font-size: 28px;
					font-family: Montserrat;
					font-weight: 700;
					line-height: 36px;
				"
			>
				Нет доступа
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
				Эта страница недоступна вашей роли.
			</div>
			<NuxtLink
				to="/requests"
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
					Вернуться к заявкам
				</span>
			</NuxtLink>
		</div>
	</div>
</template>
