<script setup lang="ts">
definePageMeta({
	layout: 'public'
})

const steps = [
	'01\u00A0\u00A0Создайте заявку',
	'02\u00A0\u00A0Назначьте исполнителя',
	'03\u00A0\u00A0Подтвердите решение'
]

const features = [
	{
		title: 'Все обращения рядом',
		desc: 'Статусы, приоритеты и история общения.'
	},
	{
		title: 'Понятная ответственность',
		desc: 'У каждой заявки есть исполнитель.'
	},
	{
		title: 'Контроль сроков',
		desc: 'Сроки реакции и решения всегда видны.'
	}
]
</script>

<template>
	<div class="w-full flex flex-col">
		<section
			class="self-stretch bg-color-bg-sidebar flex flex-col gap-6 px-4 py-16 md:px-8 lg:px-16"
		>
			<div
				class="self-stretch flex flex-col lg:flex-row items-start lg:items-center gap-6"
			>
				<div class="flex flex-col items-start gap-6 w-full lg:w-[600px]">
					<p
						class="self-stretch text-color-text-secondary text-xs font-semibold font-['Montserrat'] tracking-wider uppercase leading-4"
					>
						ЗАЯВКИ · КОМАНДА · РЕЗУЛЬТАТ
					</p>

					<h1
						class="self-stretch text-color-text-inverse font-bold font-['Montserrat'] text-[32px] leading-[38.4px] md:text-[40px] md:leading-[48px] lg:text-[52px] lg:leading-[62.4px]"
					>
						Поддержка, в которой<br />
						ничего не теряется
					</h1>

					<p
						class="self-stretch text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
					>
						От первого обращения до решения — управляйте заявками, назначайте
						исполнителей и держите сроки под контролем.
					</p>

					<NuxtLink
						to="/dashboard"
						class="w-full md:w-auto h-10 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-sm inline-flex justify-center items-center gap-2 text-color-text-inverse text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
					>
						Начать работу
					</NuxtLink>
				</div>

				<div class="w-[328px] h-[328px] md:w-[460px] md:h-[460px] shrink-0">
					<svg
						class="w-full h-full"
						width="460"
						height="460"
						viewBox="0 0 460 460"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
					>
						<rect width="460" height="460" fill="url(#pattern0_1_30923)" />
						<defs>
							<pattern
								id="pattern0_1_30923"
								patternContentUnits="objectBoundingBox"
								width="1"
								height="1"
							>
								<use
									xlink:href="#image0_1_30923"
									transform="scale(0.00208333)"
								/>
							</pattern>
							<image
								id="image0_1_30923"
								width="480"
								height="480"
								preserveAspectRatio="none"
								xlink:href="data:image/png;base64,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"
							/>
						</defs>
					</svg>
				</div>
			</div>

			<div
				id="steps"
				class="self-stretch flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-4"
			>
				<div
					v-for="step in steps"
					:key="step"
					class="w-full md:w-[344px] lg:w-[373.33px] p-6 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex flex-col items-start gap-4"
				>
					<div
						class="self-stretch text-color-text-primary text-xl font-semibold font-['Montserrat'] leading-7"
					>
						{{ step }}
					</div>
				</div>
			</div>
		</section>

		<section
			id="features"
			class="self-stretch flex flex-col gap-6 px-4 py-16 md:px-8 lg:px-16"
		>
			<h2
				class="self-stretch text-color-text-primary font-bold font-['Montserrat'] text-2xl leading-[31px] md:text-3xl md:leading-9"
			>
				Одна система для всей команды
			</h2>

			<div
				class="self-stretch flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-4"
			>
				<div
					v-for="f in features"
					:key="f.title"
					class="w-full md:w-[344px] lg:w-[373.33px] p-6 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex flex-col items-start gap-4"
				>
					<div
						class="self-stretch text-color-text-primary text-xl font-semibold font-['Montserrat'] leading-7"
					>
						{{ f.title }}
					</div>
					<p
						class="self-stretch text-color-text-secondary text-sm font-normal font-['Montserrat'] leading-5"
					>
						{{ f.desc }}
					</p>
				</div>
			</div>
		</section>
	</div>
</template>
