<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import FloatingMolecules from '$lib/FloatingMolecules.svelte';
</script>

<FloatingMolecules />
<Header />
<main>
	<slot />
</main>
<Footer />
