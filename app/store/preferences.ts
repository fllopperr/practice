import { defineStore } from 'pinia'

export type ListDensity = 'comfortable' | 'compact'

export const usePreferencesStore = defineStore('preferences', () => {
	const density = useCookie<ListDensity>('wf_pref_density', {
		default: () => 'comfortable',
		maxAge: 60 * 60 * 24 * 365
	})

	const operatorName = useCookie<string>('wf_pref_name', {
		default: () => 'Анна Кузнецова',
		maxAge: 60 * 60 * 24 * 365
	})

	const operatorEmail = useCookie<string>('wf_pref_email', {
		default: () => '0000@mail.demo',
		maxAge: 60 * 60 * 24 * 365
	})

	const showDensityBanner = computed(() => density.value === 'compact')

	const setDensity = (value: ListDensity) => {
		density.value = value
	}

	const saveProfile = (name: string, email: string) => {
		operatorName.value = name
		operatorEmail.value = email
	}

	return {
		density,
		operatorName,
		operatorEmail,
		showDensityBanner,
		setDensity,
		saveProfile
	}
})
