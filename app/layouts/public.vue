<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'

const route = useRoute()
const mobileOpen = ref(false)
const isLoginPage = computed(() => route.path === '/login')

watch(
	() => route.fullPath,
	() => {
		mobileOpen.value = false
	}
)
</script>

<template>
	<div class="min-h-screen flex flex-col wf-bg-radial text-color-text-primary">
		<header v-if="isLoginPage" class="w-full max-w-[1280px] mx-auto">
			<div class="w-40 p-6 inline-flex justify-start items-start gap-4">
				<NuxtLink
					to="/"
					class="text-color-text-inverse text-xl font-semibold font-['Montserrat'] leading-7 wf-focus-ring rounded-sm"
				>
					WorkFlow
				</NuxtLink>
			</div>
		</header>

		<header
			v-else
			class="w-full max-w-[1280px] mx-auto flex items-center gap-6 px-4 py-8 md:px-8 lg:px-16"
		>
			<NuxtLink
				to="/"
				class="flex-1 text-color-text-inverse text-xl font-semibold font-['Montserrat'] leading-7 wf-focus-ring rounded-sm"
			>
				WorkFlow
			</NuxtLink>

			<nav
				aria-label="Публичное меню"
				class="hidden md:flex items-center gap-6"
			>
				<NuxtLink
					to="/"
					class="text-color-text-primary text-sm font-normal font-['Nunito_Sans'] leading-5 hover:text-indigo-400 wf-focus-ring rounded-sm px-1"
				>
					Главная
				</NuxtLink>
				<a
					href="#steps"
					class="text-color-text-primary text-sm font-normal font-['Nunito_Sans'] leading-5 hover:text-indigo-400 wf-focus-ring rounded-sm px-1"
				>
					Статьи
				</a>
				<a
					href="#features"
					class="text-color-text-primary text-sm font-normal font-['Nunito_Sans'] leading-5 hover:text-indigo-400 wf-focus-ring rounded-sm px-1"
				>
					Помощь
				</a>
				<a
					href="#features"
					class="text-color-text-primary text-sm font-normal font-['Nunito_Sans'] leading-5 hover:text-indigo-400 wf-focus-ring rounded-sm px-1"
				>
					FAQ
				</a>
			</nav>

			<NuxtLink
				to="/login"
				class="h-10 px-4 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-strong hover:bg-color-bg-subtle inline-flex justify-center items-center gap-2 text-color-text-primary text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring"
			>
				Войти
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
		</header>

		<div
			v-if="mobileOpen && !isLoginPage"
			class="md:hidden bg-color-bg-surface border-y border-[#353263] px-4 py-3 flex flex-col gap-2 text-sm"
		>
			<NuxtLink to="/" class="py-1 text-color-text-primary">Главная</NuxtLink>
			<a
				href="#steps"
				class="py-1 text-color-text-secondary"
				@click="mobileOpen = false"
				>Статьи</a
			>
			<a
				href="#features"
				class="py-1 text-color-text-secondary"
				@click="mobileOpen = false"
				>Помощь</a
			>
			<a
				href="#features"
				class="py-1 text-color-text-secondary"
				@click="mobileOpen = false"
				>FAQ</a
			>
		</div>

		<main class="flex-1 flex flex-col w-full max-w-[1280px] mx-auto">
			<slot />
		</main>

		<footer v-if="!isLoginPage" class="w-full bg-[#1b1a2e]">
			<div
				class="max-w-[1280px] mx-auto p-6 flex flex-col lg:flex-row items-start lg:items-center gap-6"
			>
				<div
					class="text-color-text-secondary text-xs font-medium font-['Montserrat'] leading-4 lg:w-[880px]"
				>
					WorkFlow © 2026
				</div>
				<div
					class="text-color-text-accent text-xs font-medium font-['Montserrat'] leading-4 whitespace-nowrap"
				>
					Помощь · FAQ
				</div>
			</div>
		</footer>
	</div>
</template>
