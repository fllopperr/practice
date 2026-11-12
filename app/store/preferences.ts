import { defineStore } from 'pinia'

export type ListDensity = 'comfortable' | 'compact'

const STORAGE_KEY = 'wf_ui_preferences_v3'

export const usePreferencesStore = defineStore('preferences', () => {
	const density = ref<ListDensity>('comfortable')
	const operatorName = ref('Анна Кузнецова')
	const operatorEmail = ref('0000@mail.demo')
	const showDensityBanner = ref(false)

	if (import.meta.client) {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (raw) {
			try {
				const parsed = JSON.parse(raw) as {
					density?: ListDensity
					operatorName?: string
					operatorEmail?: string
				}
				if (parsed.density === 'compact' || parsed.density === 'comfortable') {
					density.value = parsed.density
				}
				if (parsed.operatorName) operatorName.value = parsed.operatorName
				if (parsed.operatorEmail) operatorEmail.value = parsed.operatorEmail
			} catch {}
		}
	}

	const persist = () => {
		if (!import.meta.client) return
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				density: density.value,
				operatorName: operatorName.value,
				operatorEmail: operatorEmail.value
			})
		)
	}

	const setDensity = (value: ListDensity) => {
		density.value = value
		showDensityBanner.value = value === 'compact'
		persist()
	}

	const saveProfile = (name: string, email: string) => {
		operatorName.value = name
		operatorEmail.value = email
		persist()
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
