<script lang="ts">
	import { Block, Button } from 'konsta/svelte';

	interface Props {
		message: string;
		onRetry?: () => void;
	}

	let { message, onRetry }: Props = $props();
</script>

<Block class="flex flex-col items-center gap-4 py-12 px-4 text-center">
	<p class="text-red-400 text-sm">{message}</p>
	{#if onRetry}
		<Button rounded onClick={onRetry}>Try again</Button>
	{/if}
</Block>
