import adapter from '@sveltejs/adapter-static';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const gravOrigin = process.env.PUBLIC_GRAV_ORIGIN ?? 'https://gravfans.live';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({
				fallback: 'index.html'
			}),
			prerender: {
				entries: []
			}
		})
	],
	server: {
		proxy: {
			'/members/api': { target: gravOrigin, changeOrigin: true, secure: true },
			'/members/avatar': { target: gravOrigin, changeOrigin: true, secure: true },
			'/members/cover': { target: gravOrigin, changeOrigin: true, secure: true },
			'/members/activity': { target: gravOrigin, changeOrigin: true, secure: true }
		}
	}
});
