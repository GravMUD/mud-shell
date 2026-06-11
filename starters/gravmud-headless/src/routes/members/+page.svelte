<script lang="ts">
	import { fetchMembers } from '$lib/village/api';
	import type { MemberSummary } from '$lib/village/types';
	import ErrorState from '$lib/village/components/ErrorState.svelte';
	import LoadingState from '$lib/village/components/LoadingState.svelte';
	import MemberRow from '$lib/village/components/MemberRow.svelte';
	import { Block, BlockTitle, List, Searchbar } from 'konsta/svelte';
	import { onMount } from 'svelte';

	let members = $state<MemberSummary[]>([]);
	let search = $state('');
	let loading = $state(true);
	let error = $state('');
	let debounce: ReturnType<typeof setTimeout> | undefined;

	async function loadMembers(q = '') {
		loading = true;
		error = '';
		try {
			const data = await fetchMembers(1, 50, q);
			members = data.items;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Could not load members';
		} finally {
			loading = false;
		}
	}

	function onSearch(value: string) {
		search = value;
		clearTimeout(debounce);
		debounce = setTimeout(() => loadMembers(value), 300);
	}

	onMount(() => loadMembers());
</script>

<Block class="!my-0">
	<BlockTitle class="mud-accent">Members</BlockTitle>
	<Searchbar
		class="!mt-2"
		placeholder="Search the village"
		value={search}
		onInput={(e) => onSearch((e.target as HTMLInputElement).value)}
		onClear={() => onSearch('')}
	/>
</Block>

{#if loading}
	<LoadingState label="Loading directory…" />
{:else if error}
	<ErrorState message={error} onRetry={() => loadMembers(search)} />
{:else if members.length === 0}
	<Block class="py-12 text-center text-white/50">No members found.</Block>
{:else}
	<List strongIos outlineIos class="!my-0">
		{#each members as member (member.username)}
			<MemberRow {member} />
		{/each}
	</List>
{/if}
