<script setup lang="ts">
import { Bell, Menu, X } from 'lucide-vue-next'

const route = useRoute()
const mobileMenuOpen = ref(false)

watch(
	() => route.fullPath,
	() => {
		mobileMenuOpen.value = false
	}
)

const handleKey = (e: KeyboardEvent) => {
	if (e.key === 'Escape') mobileMenuOpen.value = false
}

onMounted(() => window.addEventListener('keydown', handleKey))
onUnmounted(() => window.removeEventListener('keydown', handleKey))
</script>

<template>
	<div class="min-h-screen flex flex-col wf-bg-radial text-color-text-primary">
		<div class="w-full max-w-[1280px] mx-auto flex-1 flex flex-col">
			<header
				class="self-stretch px-4 md:px-8 lg:px-16 py-6 inline-flex justify-start items-center gap-4"
			>
				<NuxtLink
					to="/dashboard"
					class="flex-1 justify-start text-color-text-primary text-sm font-medium font-['Montserrat'] leading-5 wf-focus-ring rounded-sm"
				>
					WorkFlow
				</NuxtLink>

				<nav
					aria-label="Основная навигация"
					class="hidden md:flex justify-start items-center gap-4 overflow-hidden"
				>
					<NuxtLink
						to="/dashboard"
						class="justify-start text-color-text-primary hover:text-indigo-400 text-sm font-medium font-['Montserrat'] leading-5 px-2 py-1 rounded-lg wf-focus-ring"
					>
						Обзор
					</NuxtLink>
					<NuxtLink
						to="/requests"
						class="justify-start text-color-text-primary hover:text-indigo-400 text-sm font-medium font-['Montserrat'] leading-5 px-2 py-1 rounded-lg wf-focus-ring"
					>
						Заявки
					</NuxtLink>
				</nav>

				<button
					type="button"
					aria-label="Уведомления"
					class="size-5 relative flex items-center justify-center text-color-text-secondary hover:text-white wf-focus-ring rounded-sm"
				>
					<Bell class="size-4 stroke-[1.67]" />
				</button>

				<NuxtLink
					to="/profile"
					class="inline-flex items-center gap-4 rounded-lg wf-focus-ring"
				>
					<div
						class="size-8 bg-color-bg-accent-soft rounded-[999px] flex justify-center items-center"
					>
						<div
							class="justify-start text-color-text-accent text-xs font-semibold font-['Montserrat'] leading-4"
						>
							АК
						</div>
					</div>
					<div
						class="hidden lg:block justify-start text-color-text-secondary text-xs font-medium font-['Montserrat'] leading-4"
					>
						Оператор
					</div>
				</NuxtLink>

				<button
					type="button"
					aria-label="Открыть меню"
					class="md:hidden size-5 relative flex items-center justify-center text-color-text-secondary hover:text-white wf-focus-ring rounded-sm"
					@click="mobileMenuOpen = !mobileMenuOpen"
				>
					<X v-if="mobileMenuOpen" class="size-4 stroke-[1.67]" />
					<Menu v-else class="size-4 stroke-[1.67]" />
				</button>
			</header>

			<div
				v-if="mobileMenuOpen"
				class="md:hidden mx-4 mb-2 p-4 bg-color-bg-surface rounded-sm outline outline-1 outline-offset-[-1px] outline-color-border-default flex flex-col gap-3 text-sm font-medium"
			>
				<NuxtLink to="/dashboard" class="text-color-text-primary"
					>Обзор</NuxtLink
				>
				<NuxtLink to="/requests" class="text-color-text-primary"
					>Заявки</NuxtLink
				>
				<NuxtLink to="/profile" class="text-color-text-primary"
					>Профиль</NuxtLink
				>
			</div>

			<main
				class="self-stretch px-4 md:px-8 lg:px-16 py-6 flex flex-col justify-start items-start gap-6"
			>
				<slot />
			</main>
		</div>
	</div>
</template>
