<script lang="ts">
	import { page } from '$app/state';
	import { APP_TITLE } from '$lib/config';
	import { App, Navbar, Page, Tabbar, TabbarLink } from 'konsta/svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		children: Snippet;
	}

	let { title = APP_TITLE, children }: Props = $props();

	const path = $derived(page.url.pathname);

	const tabs = [
		{ href: '/feed', label: 'Feed', icon: '🏠', match: (p: string) => p === '/feed' || p === '/' },
		{ href: '/members', label: 'Members', icon: '👥', match: (p: string) => p.startsWith('/members') },
		{
			href: '/me',
			label: 'Me',
			icon: '✨',
			match: (p: string) => p === '/me' || p.startsWith('/profile/')
		}
	] as const;
</script>

<App theme="material" dark={true} safeAreas={true}>
	<Page>
		<Navbar title={title} class="!bg-[var(--mud-card)]" />
		<main class="pb-[calc(4.5rem+env(safe-area-inset-bottom))] min-h-[calc(100dvh-3.5rem)]">
			{@render children()}
		</main>
		<Tabbar labels icons class="!fixed !bottom-0 !left-0 !right-0 !bg-[var(--mud-card)]">
			{#each tabs as tab (tab.href)}
				<TabbarLink
					href={tab.href}
					active={tab.match(path)}
					label={tab.label}
					icon={tab.icon}
					linkProps={{ 'data-sveltekit-preload-data': 'hover' }}
				/>
			{/each}
		</Tabbar>
	</Page>
</App>
