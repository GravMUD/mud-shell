<script lang="ts">
	import { assetUrl } from '$lib/config';
	import type { MemberSummary } from '$lib/village/types';
	import { ListItem } from 'konsta/svelte';

	interface Props {
		member: MemberSummary;
	}

	let { member }: Props = $props();
</script>

<ListItem
	link
	href={`/profile/${member.username}`}
	title={member.display_name}
	subtitle={member.bio_excerpt || `@${member.username}`}
	after={member.tier}
>
	{#snippet media()}
		<img
			class="w-12 h-12 rounded-full object-cover bg-white/10"
			src={assetUrl(member.avatar)}
			alt={member.display_name}
			loading="lazy"
		/>
	{/snippet}
</ListItem>
