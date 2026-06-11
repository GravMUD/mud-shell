<script lang="ts">
	import { page } from '$app/state';
	import { assetUrl } from '$lib/config';
	import { fetchActivity, fetchProfile } from '$lib/village/api';
	import type { VillagePost, VillageProfile } from '$lib/village/types';
	import ErrorState from '$lib/village/components/ErrorState.svelte';
	import FeedCard from '$lib/village/components/FeedCard.svelte';
	import LoadingState from '$lib/village/components/LoadingState.svelte';
	import { Block, BlockTitle, Chip, List, ListItem } from 'konsta/svelte';

	const username = $derived(page.params.username ?? '');

	let profile = $state<VillageProfile | null>(null);
	let posts = $state<VillagePost[]>([]);
	let followers = $state(0);
	let following = $state(0);
	let loading = $state(true);
	let error = $state('');

	async function loadProfile() {
		if (!username) return;
		loading = true;
		error = '';
		try {
			const [profileRes, activityRes] = await Promise.all([
				fetchProfile(username),
				fetchActivity(username, 1, 30)
			]);
			profile = profileRes.profile;
			followers = profileRes.graph.followers;
			following = profileRes.graph.following;
			posts = activityRes.items;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Profile not found';
			profile = null;
			posts = [];
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		if (username) loadProfile();
	});
</script>

{#if loading}
	<LoadingState label="Loading profile…" />
{:else if error}
	<ErrorState message={error} onRetry={loadProfile} />
{:else if profile}
	<div class="relative">
		<div
			class="h-36 bg-cover bg-center"
			style:background-image="url('{assetUrl(profile.cover)}')"
		>
			<div class="absolute inset-0 bg-gradient-to-t from-[var(--mud-surface)] to-transparent"></div>
		</div>
		<Block class="!-mt-10 relative z-10">
			<div class="flex gap-4 items-end">
				<img
					class="w-20 h-20 rounded-2xl border-4 border-[var(--mud-surface)] object-cover bg-white/10"
					src={assetUrl(profile.avatar)}
					alt={profile.display_name}
				/>
				<div class="pb-1 min-w-0">
					<h1 class="text-xl font-bold truncate">{profile.display_name}</h1>
					<p class="text-white/50 text-sm">@{profile.username}</p>
				</div>
			</div>

			<div class="flex gap-2 mt-3 flex-wrap">
				<Chip>{profile.tier}</Chip>
				<Chip>{followers} followers</Chip>
				<Chip>{following} following</Chip>
			</div>

			{#if profile.bio_html}
				<div class="mud-feed-body mt-3 text-sm text-white/80">{@html profile.bio_html}</div>
			{:else if profile.bio}
				<p class="mt-3 text-sm text-white/80 whitespace-pre-wrap">{profile.bio}</p>
			{/if}

			{#if profile.links.length > 0}
				<BlockTitle class="!mt-4 !mb-1">Links</BlockTitle>
				<List outlineIos strongIos class="!my-0">
					{#each profile.links as link (link.url)}
						<ListItem
							link
							href={link.url}
							title={link.title}
							target="_blank"
							rel="noopener noreferrer"
							external
						/>
					{/each}
				</List>
			{/if}
		</Block>

		<BlockTitle class="!px-4 mud-accent">Activity</BlockTitle>
		{#if posts.length === 0}
			<Block class="py-8 text-center text-white/40 text-sm">No public posts yet.</Block>
		{:else}
			<div class="divide-y divide-white/5">
				{#each posts as post (post.id)}
					<FeedCard {post} />
				{/each}
			</div>
		{/if}
	</div>
{/if}
