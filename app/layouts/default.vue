<script setup lang="ts">
import { Bell, Menu, X } from 'lucide-vue-next'
import { useAuthStore } from '~/store/auth'

const route = useRoute()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)

await callOnce(() => authStore.fetchSession())

watch(
	() => route.fullPath,
	() => {
		mobileMenuOpen.value = false
	}
)

const handleKey = (e: KeyboardEvent) => {
	if (e.key === 'Escape') mobileMenuOpen.value = false
	if (e.altKey && e.key === '1') authStore.switchRole('Operator')
	if (e.altKey && e.key === '2') authStore.switchRole('Client')
	if (e.altKey && e.key === '3') authStore.switchRole('Agent')
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
					to="/"
					style="
						flex: 1 1 0;
						color: var(--color-text-primary, #e8e7ec);
						font-size: 14px;
						font-family: Montserrat;
						font-weight: 500;
						line-height: 20px;
					"
					class="wf-focus-ring rounded-sm"
				>
					WorkFlow
				</NuxtLink>

				<nav
					aria-label="Основная навигация"
					class="hidden md:flex justify-start items-center gap-4 overflow-hidden"
				>
					<NuxtLink
						to="/dashboard"
						style="
							color: var(--color-text-primary, #e8e7ec);
							font-size: 14px;
							font-family: Montserrat;
							font-weight: 500;
							line-height: 20px;
						"
						class="hover:text-indigo-400 px-2 py-1 rounded-lg wf-focus-ring"
					>
						Обзор
					</NuxtLink>
					<NuxtLink
						to="/requests"
						style="
							color: var(--color-text-primary, #e8e7ec);
							font-size: 14px;
							font-family: Montserrat;
							font-weight: 500;
							line-height: 20px;
						"
						class="hover:text-indigo-400 px-2 py-1 rounded-lg wf-focus-ring"
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
						style="
							width: 32px;
							height: 32px;
							background: var(--color-bg-accent-soft, #302b69);
							border-radius: 999px;
							justify-content: center;
							align-items: center;
							display: flex;
						"
					>
						<div
							style="
								color: var(--color-text-accent, #79cee8);
								font-size: 12px;
								font-family: Montserrat;
								font-weight: 600;
								line-height: 16px;
							"
						>
							{{ authStore.user.initials }}
						</div>
					</div>
					<div
						class="hidden lg:block"
						style="
							color: var(--color-text-secondary, #b9b3d4);
							font-size: 12px;
							font-family: Montserrat;
							font-weight: 500;
							line-height: 16px;
						"
					>
						{{ authStore.user.roleLabel }}
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
					>Профиль ({{ authStore.user.roleLabel }})</NuxtLink
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
