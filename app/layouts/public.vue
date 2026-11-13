<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'

const route = useRoute()
const mobileOpen = ref(false)

const isAuthFormPage = computed(
	() => route.path === '/login' || route.path === '/register'
)
const isLandingPage = computed(() => route.path === '/')

watch(
	() => route.fullPath,
	() => {
		mobileOpen.value = false
	}
)
</script>

<template>
	<div class="min-h-screen flex flex-col wf-bg-radial text-color-text-primary">
		<header v-if="isAuthFormPage" class="w-full max-w-[1280px] mx-auto">
			<div
				style="
					padding: 24px;
					justify-content: flex-start;
					align-items: flex-start;
					gap: 16px;
					display: inline-flex;
				"
			>
				<NuxtLink
					to="/"
					style="
						color: var(--color-text-inverse, white);
						font-size: 20px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 28px;
					"
					class="wf-focus-ring rounded-sm"
				>
					WorkFlow
				</NuxtLink>
			</div>
		</header>

		<header
			v-else
			:style="
				!isLandingPage ? 'background: var(--color-bg-surface, #23204D);' : ''
			"
			class="w-full"
		>
			<div
				:class="isLandingPage ? 'py-8' : 'py-6'"
				class="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 flex justify-start items-center gap-6"
			>
				<NuxtLink
					to="/"
					style="
						flex: 1 1 0;
						color: var(--color-text-inverse, white);
						font-size: 20px;
						font-family: Montserrat;
						font-weight: 600;
						line-height: 28px;
					"
					class="wf-focus-ring rounded-sm"
				>
					WorkFlow
				</NuxtLink>

				<nav
					aria-label="Публичная навигация"
					class="hidden md:flex items-center gap-6"
				>
					<NuxtLink
						to="/"
						style="
							color: var(--color-text-primary, #e8e7ec);
							font-size: 14px;
							font-family: Montserrat;
							font-weight: 400;
							line-height: 20px;
						"
						class="hover:text-[#79CEE8] wf-focus-ring rounded-sm"
					>
						Главная
					</NuxtLink>
					<NuxtLink
						to="/articles"
						style="
							color: var(--color-text-primary, #e8e7ec);
							font-size: 14px;
							font-family: Montserrat;
							font-weight: 400;
							line-height: 20px;
						"
						class="hover:text-[#79CEE8] wf-focus-ring rounded-sm"
					>
						Статьи
					</NuxtLink>
					<NuxtLink
						to="/help"
						style="
							color: var(--color-text-primary, #e8e7ec);
							font-size: 14px;
							font-family: Montserrat;
							font-weight: 400;
							line-height: 20px;
						"
						class="hover:text-[#79CEE8] wf-focus-ring rounded-sm"
					>
						Помощь
					</NuxtLink>
					<NuxtLink
						to="/faq"
						style="
							color: var(--color-text-primary, #e8e7ec);
							font-size: 14px;
							font-family: Montserrat;
							font-weight: 400;
							line-height: 20px;
						"
						class="hover:text-[#79CEE8] wf-focus-ring rounded-sm"
					>
						FAQ
					</NuxtLink>
				</nav>

				<NuxtLink
					to="/login"
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
					"
					class="wf-focus-ring"
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
						Войти
					</span>
				</NuxtLink>

				<button
					type="button"
					aria-label="Меню"
					class="md:hidden size-5 flex items-center justify-center text-color-text-secondary hover:text-white wf-focus-ring rounded-sm"
					@click="mobileOpen = !mobileOpen"
				>
					<X v-if="mobileOpen" class="size-5" />
					<Menu v-else class="size-5" />
				</button>
			</div>
		</header>

		<div
			v-if="mobileOpen && !isAuthFormPage"
			class="md:hidden bg-color-bg-surface border-y border-[#413E74] px-4 py-3 flex flex-col gap-2 text-sm"
		>
			<NuxtLink to="/" class="py-1 text-color-text-primary">Главная</NuxtLink>
			<NuxtLink to="/articles" class="py-1 text-color-text-primary"
				>Статьи</NuxtLink
			>
			<NuxtLink to="/help" class="py-1 text-color-text-primary"
				>Помощь</NuxtLink
			>
			<NuxtLink to="/faq" class="py-1 text-color-text-primary">FAQ</NuxtLink>
		</div>

		<main class="flex-1 flex flex-col w-full max-w-[1280px] mx-auto">
			<slot />
		</main>

		<footer v-if="isLandingPage" class="w-full bg-[#1b1a2e]">
			<div
				class="max-w-[1280px] mx-auto p-6 flex flex-col lg:flex-row items-start lg:items-center gap-6"
			>
				<div
					class="text-color-text-secondary text-xs font-medium font-['Montserrat'] leading-4 lg:w-[880px]"
				>
					WorkFlow © 2026
				</div>
				<div
					class="flex items-center gap-2 text-color-text-accent text-xs font-medium font-['Montserrat'] leading-4 whitespace-nowrap"
				>
					<NuxtLink to="/help" class="hover:underline">Помощь</NuxtLink>
					<span>·</span>
					<NuxtLink to="/faq" class="hover:underline">FAQ</NuxtLink>
				</div>
			</div>
		</footer>
	</div>
</template>
