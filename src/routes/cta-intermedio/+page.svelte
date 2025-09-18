<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		// Aquí se agregarán las animaciones cuando se defina el contenido
	});
</script>

<svelte:head>
	<title>CTA Intermedio - ADNED</title>
	<meta name="description" content="CTA Intermedio - ADNED">
</svelte:head>

<!-- Contenido pendiente de definir -->
<main class="main-content">
	<section class="hero">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">CTA Intermedio</h1>
				<p class="hero-subtitle">Contenido pendiente de definir</p>
			</div>
		</div>
	</section>
</main>

<style>
	.main-content {
		padding-top: 80px;
	}

	.hero {
		background: linear-gradient(135deg, #290040 0%, #3d0060 50%, #290040 100%);
		color: white;
		padding: 8rem 0 4rem;
		position: relative;
		overflow: hidden;
		min-height: 60vh;
		display: flex;
		align-items: center;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		position: relative;
		z-index: 2;
	}

	.hero-content {
		text-align: center;
		z-index: 2;
		position: relative;
	}

	.hero-title {
		font-size: 3.5rem;
		font-weight: 900;
		margin-bottom: 1.5rem;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 25%, #fbbf24 50%, #3b82f6 75%, #8b5cf6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 0 4px 20px rgba(249, 115, 22, 0.5);
		filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.3));
	}

	.hero-subtitle {
		font-size: 1.3rem;
		color: rgba(255, 255, 255, 0.9);
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero {
			padding: 6rem 0 3rem;
			min-height: 50vh;
		}

		.hero-title {
			font-size: 2.5rem;
		}

		.hero-subtitle {
			font-size: 1.1rem;
		}
	}

	@media (max-width: 480px) {
		.hero-title {
			font-size: 2rem;
		}
	}
</style>
