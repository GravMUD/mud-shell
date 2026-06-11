<script lang="ts">
	import { assetUrl } from '$lib/config';
	import type { VillageMedia } from '$lib/village/types';

	interface Props {
		media: VillageMedia[];
	}

	let { media }: Props = $props();
</script>

{#if media.length > 0}
	<div
		class="grid gap-1 mt-3 rounded-xl overflow-hidden"
		class:grid-cols-1={media.length === 1}
		class:grid-cols-2={media.length >= 2}
	>
		{#each media as item, i (item.url + i)}
			{#if item.type === 'video'}
				<video
					class="w-full max-h-80 object-cover bg-black"
					controls
					preload="metadata"
					src={assetUrl(item.url)}
				>
					<track kind="captions" />
				</video>
			{:else}
				<img
					class="w-full max-h-64 object-cover bg-black/20"
					src={assetUrl(item.url)}
					alt={item.alt || 'Post media'}
					loading="lazy"
				/>
			{/if}
		{/each}
	</div>
{/if}
