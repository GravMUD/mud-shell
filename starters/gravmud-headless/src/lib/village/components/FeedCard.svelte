<script lang="ts">
	import { assetUrl } from '$lib/config';
	import type { VillagePost } from '$lib/village/types';
	import { Block, Card, Link } from 'konsta/svelte';
	import MediaGrid from './MediaGrid.svelte';

	interface Props {
		post: VillagePost;
	}

	let { post }: Props = $props();

	const when = $derived(
		new Date(post.created).toLocaleString(undefined, {
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		})
	);

	const reactionTotal = $derived(post.reactions?.total ?? 0);
</script>

<Card class="!m-0 !rounded-none border-b border-white/5 !bg-[var(--mud-card)]">
	<Block class="!my-0 !py-3">
		<div class="flex gap-3 items-start">
			<Link href={`/profile/${post.author}`} class="shrink-0">
				<img
					class="w-11 h-11 rounded-full object-cover bg-white/10"
					src={assetUrl(post.author_avatar)}
					alt={post.author_name}
					loading="lazy"
				/>
			</Link>
			<div class="min-w-0 flex-1">
				<div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
					<Link href={`/profile/${post.author}`} class="font-semibold text-[15px] !text-white">
						{post.author_name}
					</Link>
					<span class="text-white/40 text-xs">@{post.author}</span>
					<span class="text-white/30 text-xs">· {when}</span>
				</div>

				{#if post.body_html}
					<div class="mud-feed-body mt-2 text-[15px] leading-relaxed text-white/90">
						{@html post.body_html}
					</div>
				{:else if post.body}
					<p class="mt-2 text-[15px] leading-relaxed text-white/90 whitespace-pre-wrap">{post.body}</p>
				{/if}

				<MediaGrid media={post.media} />

				{#if post.link}
					<a
						class="mt-3 block rounded-xl border border-white/10 p-3 hover:bg-white/5 transition"
						href={post.link.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<p class="font-medium text-sm text-[var(--mud-accent)] truncate">{post.link.title ?? post.link.url}</p>
						{#if post.link.description}
							<p class="text-xs text-white/50 mt-1 line-clamp-2">{post.link.description}</p>
						{/if}
					</a>
				{/if}

				{#if reactionTotal > 0}
					<p class="mt-2 text-xs text-white/40">{reactionTotal} reaction{reactionTotal === 1 ? '' : 's'}</p>
				{/if}
			</div>
		</div>
	</Block>
</Card>
