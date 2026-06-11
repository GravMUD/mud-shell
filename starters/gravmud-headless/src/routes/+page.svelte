<script lang="ts">
	import { goto } from '$app/navigation';
	import LoadingState from '$lib/village/components/LoadingState.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/feed', { replaceState: true });
	});
</script>

<LoadingState label="Opening village feed…" />
