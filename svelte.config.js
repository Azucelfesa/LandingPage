import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({
			// Cloudflare Pages configuration
			routes: {
				include: ['/*'],
				exclude: ['<build>']
			}
		}),
		prerender: {
			handleMissingId: 'warn' // or 'warn', or a custom handler
		},
        alias: {
            "@backend": "../adnedtrpcbackend/src/server/index.ts",
        }
    }
};

export default config;
