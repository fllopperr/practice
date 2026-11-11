<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style>
:root {
	--color-bg-sidebar: #1b1938;
	--color-bg-surface: #23204d;
	--color-bg-subtle: #2f2a6a;
	--color-bg-accent-soft: #302b69;
	--color-border-default: #413e74;
	--color-border-strong: #615b94;
	--color-text-primary: #e8e7ec;
	--color-text-secondary: #b9b3d4;
	--color-text-inverse: #ffffff;
	--color-text-accent: #79cee8;
	--color-text-disabled: #8e88a8;

	--status-new-bg: #353060;
	--status-new-fg: #bbb6ff;
	--status-assigned-bg: #203f57;
	--status-assigned-fg: #79cee8;
	--status-in-progress-bg: #443955;
	--status-in-progress-fg: #ffd482;
	--status-waiting-bg: #37324e;
	--status-waiting-fg: #c8c3de;
	--status-escalated-bg: #4a253b;
	--status-escalated-fg: #ff91ae;
	--status-resolved-bg: #214544;
	--status-resolved-fg: #80e1b3;
	--status-closed-bg: #37324e;
	--status-closed-fg: #bfb9d6;

	--priority-critical: #ff91ae;
	--priority-high: #ffd482;
	--priority-normal: #bbb6ff;
	--priority-low: #b9b3d4;
}

body {
	font-family: 'Montserrat', sans-serif;
	background: radial-gradient(
		ellipse 45.45% 41.67% at 54.55% 50%,
		#201d47 0%,
		#17153a 100%
	);
	color: var(--color-text-primary);
	margin: 0;
	min-height: 100vh;
}

.wf-bg-radial {
	background: radial-gradient(
		ellipse 45.45% 41.67% at 54.55% 50%,
		#201d47 0%,
		#17153a 100%
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

.wf-focus-ring:focus-visible {
	outline: none;
	box-shadow:
		0px 0px 0px 2px rgba(255, 255, 255, 1),
		0px 0px 0px 4px rgba(99, 91, 255, 1);
}
</style>
