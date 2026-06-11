<script lang="ts">
	import { fetchFeed } from '$lib/village/api';
	import type { VillagePost } from '$lib/village/types';
	import ErrorState from '$lib/village/components/ErrorState.svelte';
	import FeedCard from '$lib/village/components/FeedCard.svelte';
	import LoadingState from '$lib/village/components/LoadingState.svelte';
	import { Block, BlockTitle, Button } from 'konsta/svelte';
	import { onMount } from 'svelte';

	let posts = $state<VillagePost[]>([]);
	let page = $state(1);
	let pages = $state(1);
	let loading = $state(true);
	let loadingMore = $state(false);
	let error = $state('');

	async function loadFeed(nextPage = 1, append = false) {
		if (append) loadingMore = true;
		else {
			loading = true;
			error = '';
		}

		try {
			const data = await fetchFeed(nextPage, 20);
			posts = append ? [...posts, ...data.items] : data.items;
			page = data.page;
			pages = data.pages;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Could not load feed';
		} finally {
			loading = false;
			loadingMore = false;
		}
	}

	onMount(() => {
		loadFeed();
	});
</script>

<Block class="!my-0 !p-0">
	<BlockTitle class="!px-4 !pt-3 mud-accent">Village feed</BlockTitle>
	<p class="px-4 pb-2 text-xs text-white/40">THE HOUSE and friends — live from gravfans</p>
</Block>

{#if loading}
	<LoadingState label="Fetching village feed…" />
{:else if error}
	<ErrorState message={error} onRetry={() => loadFeed()} />
{:else if posts.length === 0}
	<Block class="py-12 text-center text-white/50">No posts yet. Be the first on gravfans!</Block>
{:else}
	<div class="divide-y divide-white/5">
		{#each posts as post (post.id)}
			<FeedCard {post} />
		{/each}
	</div>

	{#if page < pages}
		<Block class="flex justify-center py-4">
			<Button rounded disabled={loadingMore} onClick={() => loadFeed(page + 1, true)}>
				{loadingMore ? 'Loading…' : 'Load more'}
			</Button>
		</Block>
	{/if}
{/if}
