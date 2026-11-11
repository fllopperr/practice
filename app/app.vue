<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style>
:root {
	--color-bg-sidebar: #1b1938;
	--color-bg-surface: #222044;
	--color-bg-subtle: #2b2952;
	--color-bg-accent-soft: #312e63;
	--color-border-default: #353263;
	--color-border-strong: #4c4887;
	--color-text-primary: #f8fafc;
	--color-text-secondary: #94a3b8;
	--color-text-inverse: #ffffff;
	--color-text-accent: #a5b4fc;
	--color-text-disabled: #64748b;
}

body {
	font-family: 'Montserrat', sans-serif;
	background: radial-gradient(
		50% 50% at 45% 50%,
		rgba(32, 29, 71, 1) 0%,
		rgba(23, 21, 58, 1) 100%
	);
	color: var(--color-text-primary);
	margin: 0;
	min-height: 100vh;
}

.wf-bg-radial {
	background: radial-gradient(
		50% 50% at 45% 50%,
		rgba(32, 29, 71, 1) 0%,
		rgba(23, 21, 58, 1) 100%
	);
}

.bg-color-bg-sidebar {
	background-color: var(--color-bg-sidebar);
}
.bg-color-bg-surface {
	background-color: var(--color-bg-surface);
}
.bg-color-bg-subtle {
	background-color: var(--color-bg-subtle);
}
.bg-color-bg-accent-soft {
	background-color: var(--color-bg-accent-soft);
}

.text-color-text-primary {
	color: var(--color-text-primary);
}
.text-color-text-secondary {
	color: var(--color-text-secondary);
}
.text-color-text-inverse {
	color: var(--color-text-inverse);
}
.text-color-text-accent {
	color: var(--color-text-accent);
}
.text-color-text-disabled {
	color: var(--color-text-disabled);
}

.outline-color-border-default {
	outline-color: var(--color-border-default);
}
.outline-color-border-strong {
	outline-color: var(--color-border-strong);
}

/* Focus Ring из секции //1.11 */
.wf-focus-ring:focus-visible {
	outline: none;
	box-shadow:
		0px 0px 0px 2px rgba(255, 255, 255, 1),
		0px 0px 0px 4px rgba(99, 91, 255, 1);
}
</style>
