<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import type { LayoutData } from './$types';


	// Props que SvelteKit puede pasar automáticamente
	export let data: LayoutData = {} as LayoutData;
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/photo_2025-09-12_15-08-29.jpg" />
	<link rel="shortcut icon" type="image/png" href="/photo_2025-09-12_15-08-29.jpg" />
</svelte:head>

<Header />
<main>
	<slot />
</main>
<Footer />
