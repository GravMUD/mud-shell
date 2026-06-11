<script lang="ts">
	import { GRAV_ORIGIN, LOGIN_URL } from '$lib/config';
	import { fetchWhoami } from '$lib/village/api';
	import type { WhoamiResponse } from '$lib/village/types';
	import ErrorState from '$lib/village/components/ErrorState.svelte';
	import LoadingState from '$lib/village/components/LoadingState.svelte';
	import { Block, BlockTitle, Button, Card, Link } from 'konsta/svelte';
	import { onMount } from 'svelte';

	let whoami = $state<WhoamiResponse | null>(null);
	let loading = $state(true);
	let error = $state('');

	async function load() {
		loading = true;
		error = '';
		try {
			whoami = await fetchWhoami();
		} catch (e) {
			error = e instanceof Error ? e.message : 'Could not check session';
		} finally {
			loading = false;
		}
	}

	onMount(load);
</script>

<Block class="!my-0">
	<BlockTitle class="mud-accent">Your session</BlockTitle>
	<p class="text-xs text-white/40 mt-1">
		v0.1 uses Grav Login on gravfans — full cookie auth lands with app.gravfans.live
	</p>
</Block>

{#if loading}
	<LoadingState label="Checking whoami…" />
{:else if error}
	<ErrorState message={error} onRetry={load} />
{:else if whoami?.authenticated && whoami.username}
	<Card class="!m-4 !bg-[var(--mud-card)]">
		<Block>
			<p class="text-lg font-semibold">Signed in as @{whoami.username}</p>
			<p class="text-sm text-white/50 mt-1">Tier: {whoami.tier}</p>
			<div class="flex flex-col gap-2 mt-4">
				<Button rounded href={`/profile/${whoami.username}`}>View profile</Button>
				<Button rounded outline href={`${GRAV_ORIGIN}/members/me`}>Open full profile on gravfans</Button>
			</div>
		</Block>
	</Card>
{:else}
	<Card class="!m-4 !bg-[var(--mud-card)]">
		<Block>
			<p class="text-lg font-semibold">Join the village</p>
			<p class="text-sm text-white/60 mt-2 leading-relaxed">
				Sign in on gravfans to post, react, and follow. This shell reads the public feed now; session
				cookies follow when we deploy to <code class="text-[var(--mud-accent)]">app.gravfans.live</code>.
			</p>
			<Button rounded large class="!mt-4" href={LOGIN_URL}>Log in on gravfans</Button>
			<p class="text-xs text-white/30 mt-4 text-center">
				<Link href="https://getmudshell.com" target="_blank" class="!text-[var(--mud-accent)]">
					What is MUD Shell?
				</Link>
			</p>
		</Block>
	</Card>
{/if}
