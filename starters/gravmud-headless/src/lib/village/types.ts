export interface VillageMedia {
	type: 'image' | 'video' | string;
	url: string;
	alt?: string;
}

export interface VillageLinkPreview {
	url: string;
	title?: string;
	description?: string;
	image?: string;
}

export interface VillageReactions {
	counts: Record<string, number>;
	mine: string | null;
	total: number;
}

export interface VillagePost {
	id: string;
	author: string;
	created: string;
	updated: string;
	body: string;
	body_html?: string;
	visibility: string;
	media: VillageMedia[];
	link: VillageLinkPreview | null;
	author_name: string;
	author_avatar: string;
	profile_url: string;
	post_url: string;
	og_image?: string | null;
	reactions?: VillageReactions;
}

export interface Paginated<T> {
	items: T[];
	total: number;
	page: number;
	pages: number;
	per_page: number;
}

export interface FeedResponse extends Paginated<VillagePost> {
	ok: true;
	scope: string;
}

export interface MemberSummary {
	username: string;
	display_name: string;
	avatar: string;
	cover?: string;
	bio_excerpt?: string;
	tier: string;
	profile_url: string;
}

export interface MembersResponse extends Paginated<MemberSummary> {
	ok: true;
}

export interface ProfileLink {
	title: string;
	url: string;
}

export interface VillageProfile {
	username: string;
	display_name: string;
	avatar: string;
	cover: string;
	bio: string;
	bio_html?: string;
	bio_excerpt: string;
	links: ProfileLink[];
	tier: string;
	member_since: string;
	profile_public: boolean;
	profile_url: string;
	can_edit: boolean;
}

export interface ProfileResponse {
	ok: true;
	profile: VillageProfile;
	graph: {
		followers: number;
		following: number;
		is_following: boolean;
		is_blocked: boolean;
		can_follow: boolean;
	};
}

export interface ActivityResponse extends Paginated<VillagePost> {
	ok: true;
	username: string;
}

export interface WhoamiResponse {
	ok: boolean;
	authenticated: boolean;
	username: string | null;
	tier: string;
	member_since: string | null;
	member_expires: string | null;
	permissions: string[];
}
