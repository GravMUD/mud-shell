import { dev } from '$app/environment';

export const GRAV_ORIGIN = import.meta.env.PUBLIC_GRAV_ORIGIN ?? 'https://gravfans.live';
export const APP_TITLE = import.meta.env.PUBLIC_APP_TITLE ?? 'MUD Shell · gravfans';
export const LOGIN_URL = `${GRAV_ORIGIN}/login`;

/** Community API base — proxied in dev, absolute in prod. */
export function communityApiBase(): string {
	if (dev) return '/members/api';
	return `${GRAV_ORIGIN}/members/api`;
}

/** Resolve Grav-relative asset paths (avatars, media). */
export function assetUrl(path: string | null | undefined): string {
	if (!path) return '';
	if (path.startsWith('http://') || path.startsWith('https://')) return path;
	if (dev && path.startsWith('/')) return path;
	return `${GRAV_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}
