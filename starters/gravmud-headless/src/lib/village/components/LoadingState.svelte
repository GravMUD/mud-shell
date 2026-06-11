<script lang="ts">
	import { Block, Preloader } from 'konsta/svelte';

	interface Props {
		label?: string;
	}

	let { label = 'Loading village…' }: Props = $props();
</script>

<Block class="flex flex-col items-center justify-center gap-3 py-16 text-center opacity-80">
	<Preloader />
	<p class="text-sm">{label}</p>
</Block>
