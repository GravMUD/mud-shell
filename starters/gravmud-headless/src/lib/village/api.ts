import { communityApiBase } from '$lib/config';
import type {
	ActivityResponse,
	FeedResponse,
	MembersResponse,
	ProfileResponse,
	WhoamiResponse
} from './types';

class VillageApiError extends Error {
	status: number;

	constructor(message: string, status = 0) {
		super(message);
		this.name = 'VillageApiError';
		this.status = status;
	}
}

async function villageGet<T extends { ok: boolean; error?: string }>(
	path: string,
	init?: RequestInit
): Promise<T> {
	const url = `${communityApiBase()}${path}`;
	const res = await fetch(url, {
		credentials: 'include',
		headers: { Accept: 'application/json' },
		...init
	});

	let data: T & { error?: string };
	try {
		data = await res.json();
	} catch {
		throw new VillageApiError(`Invalid JSON from ${path}`, res.status);
	}

	if (!res.ok || !data.ok) {
		throw new VillageApiError(data.error ?? `HTTP ${res.status}`, res.status);
	}

	return data;
}

export function fetchFeed(page = 1, limit = 20, scope = 'all') {
	const q = new URLSearchParams({ page: String(page), limit: String(limit), scope });
	return villageGet<FeedResponse>(`/feed?${q}`);
}

export function fetchMembers(page = 1, limit = 24, search = '') {
	const q = new URLSearchParams({ page: String(page), limit: String(limit) });
	if (search.trim()) q.set('search', search.trim());
	return villageGet<MembersResponse>(`/members?${q}`);
}

export function fetchProfile(username: string) {
	return villageGet<ProfileResponse>(`/profile/${encodeURIComponent(username)}`);
}

export function fetchActivity(username: string, page = 1, limit = 20) {
	const q = new URLSearchParams({ page: String(page), limit: String(limit) });
	return villageGet<ActivityResponse>(`/activity/${encodeURIComponent(username)}?${q}`);
}

export function fetchWhoami() {
	return villageGet<WhoamiResponse>('/whoami');
}

export { VillageApiError };
