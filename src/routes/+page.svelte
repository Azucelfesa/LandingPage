<script>
	let count = 0;
	let currentBanner = 0;
	
	function increment() {
		count += 1;
	}
	
	const banners = [
		{
			id: 1,
			title: "¡Oferta Especial!",
			subtitle: "Descuento del 50% en todos los cursos",
			buttonText: "Ver Oferta",
			buttonLink: "#oferta",
			background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
			textColor: "white"
		},
		{
			id: 2,
			title: "Nuevo Curso Disponible",
			subtitle: "Aprende las últimas tecnologías web",
			buttonText: "Comenzar Ahora",
			buttonLink: "#curso",
			background: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)",
			textColor: "white"
		},
		{
			id: 3,
			title: "Comunidad Activa",
			subtitle: "Únete a más de 10,000 estudiantes",
			buttonText: "Unirse",
			buttonLink: "#comunidad",
			background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
			textColor: "white"
		}
	];
	
	function nextBanner() {
		currentBanner = (currentBanner + 1) % banners.length;
	}
	
	function prevBanner() {
		currentBanner = currentBanner === 0 ? banners.length - 1 : currentBanner - 1;
	}
	
	function goToBanner(index) {
		currentBanner = index;
	}

	// Auto-play functionality
	let autoPlayInterval;
	
	function startAutoPlay() {
		autoPlayInterval = setInterval(() => {
			nextBanner();
		}, 5000); // Cambia cada 5 segundos
	}
	
	function stopAutoPlay() {
		if (autoPlayInterval) {
			clearInterval(autoPlayInterval);
		}
	}

	// Start auto-play when component mounts
	import { onMount, onDestroy } from 'svelte';
	
	onMount(() => {
		startAutoPlay();
	});
	
	onDestroy(() => {
		stopAutoPlay();
	});
</script>

<svelte:head>
	<title>Landing Page - SvelteKit</title>
	<meta name="description" content="Una landing page moderna creada con SvelteKit" />
</svelte:head>

<main class="main-content">
	<!-- Banner Carousel -->
	<section class="banner-carousel" on:mouseenter={stopAutoPlay} on:mouseleave={startAutoPlay}>
		<div class="banner-container">
			{#each banners as banner, index}
				<div class="banner-slide" class:active={index === currentBanner} style="background: {banner.background}; color: {banner.textColor};">
					<div class="banner-content">
						<div class="banner-text">
							<h2 class="banner-title">{banner.title}</h2>
							<p class="banner-subtitle">{banner.subtitle}</p>
							<button class="banner-btn" on:click={() => window.location.href = banner.buttonLink}>
								{banner.buttonText}
							</button>
						</div>
						<div class="banner-image">
							<div class="banner-icon">
								{#if index === 0}
									🔥
								{:else if index === 1}
									🚀
								{:else}
									👥
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		
		<!-- Navigation Arrows -->
		<button class="banner-nav banner-prev" on:click={prevBanner}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M15 18l-6-6 6-6"/>
			</svg>
		</button>
		<button class="banner-nav banner-next" on:click={nextBanner}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M9 18l6-6-6-6"/>
			</svg>
		</button>
		
		<!-- Dots Indicator -->
		<div class="banner-dots">
			{#each banners as _, index}
				<button 
					class="banner-dot" 
					class:active={index === currentBanner}
					on:click={() => goToBanner(index)}
				></button>
			{/each}
		</div>
	</section>

	<!-- Hero Section -->
	<section class="hero">
		<div class="container">
			<div class="hero-content text-center">
				<h1 class="text-5xl font-bold mb-6">
					Bienvenido a tu Landing Page
				</h1>
				<p class="text-xl text-gray-600 mb-8">
					Una página moderna y responsive creada con SvelteKit y TypeScript
				</p>
				<div class="flex gap-4 justify-center">
					<button class="btn btn-primary" on:click={increment}>
						Contador: {count}
					</button>
					<button class="btn btn-secondary">
						Más información
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="section bg-gray-50">
		<div class="container">
			<div class="text-center mb-12">
				<h2 class="text-4xl font-bold mb-4">Características</h2>
				<p class="text-lg text-gray-600">
					Descubre las características principales de esta landing page
				</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div class="card text-center">
					<div class="mb-4">
						<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
							<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
							</svg>
						</div>
					</div>
					<h3 class="text-xl font-semibold mb-2">Rápido</h3>
					<p class="text-gray-600">
						Construido con SvelteKit para un rendimiento óptimo y carga rápida
					</p>
				</div>
				
				<div class="card text-center">
					<div class="mb-4">
						<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
							<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</div>
					</div>
					<h3 class="text-xl font-semibold mb-2">Confiable</h3>
					<p class="text-gray-600">
						Desarrollado con TypeScript para mayor seguridad y mantenibilidad
					</p>
				</div>
				
				<div class="card text-center">
					<div class="mb-4">
						<div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
							<svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
							</svg>
						</div>
					</div>
					<h3 class="text-xl font-semibold mb-2">Moderno</h3>
					<p class="text-gray-600">
						Diseño responsive y moderno que se adapta a todos los dispositivos
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="section">
		<div class="container">
			<div class="text-center">
				<h2 class="text-4xl font-bold mb-4">¿Listo para comenzar?</h2>
				<p class="text-lg text-gray-600 mb-8">
					Comienza a construir tu proyecto con SvelteKit hoy mismo
				</p>
				<button class="btn btn-primary text-lg px-8 py-3">
					Comenzar ahora
				</button>
			</div>
		</div>
	</section>
</main>

<style>
	:global(.bg-blue-100) {
		background-color: #dbeafe;
	}
	
	:global(.bg-green-100) {
		background-color: #dcfce7;
	}
	
	:global(.bg-purple-100) {
		background-color: #f3e8ff;
	}
	
	:global(.text-blue-600) {
		color: #2563eb;
	}
	
	:global(.text-green-600) {
		color: #16a34a;
	}
	
	:global(.text-purple-600) {
		color: #9333ea;
	}
	
	:global(.text-gray-600) {
		color: var(--color-text-2);
	}
	
	:global(.w-16) {
		width: 4rem;
	}
	
	:global(.h-16) {
		height: 4rem;
	}
	
	:global(.w-8) {
		width: 2rem;
	}
	
	:global(.h-8) {
		height: 2rem;
	}
	
	:global(.rounded-full) {
		border-radius: 9999px;
	}
	
	:global(.flex) {
		display: flex;
	}
	
	:global(.items-center) {
		align-items: center;
	}
	
	:global(.justify-center) {
		justify-content: center;
	}
	
	:global(.mx-auto) {
		margin-left: auto;
		margin-right: auto;
	}
	
	:global(.px-8) {
		padding-left: 2rem;
		padding-right: 2rem;
	}
	
	:global(.py-3) {
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
	}
	
	:global(.md\\:grid-cols-3) {
		@media (min-width: 768px) {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.main-content {
		padding-top: 70px; /* Espacio para el header fijo */
	}

	/* Banner Carousel Styles */
	.banner-carousel {
		position: relative;
		height: 400px;
		overflow: hidden;
		margin-bottom: 2rem;
	}

	.banner-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.banner-slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transform: translateX(100%);
		transition: all 0.5s ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.banner-slide.active {
		opacity: 1;
		transform: translateX(0);
	}

	.banner-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		max-width: 1200px;
		padding: 0 2rem;
		gap: 3rem;
	}

	.banner-text {
		flex: 1;
		text-align: left;
	}

	.banner-title {
		font-size: 3rem;
		font-weight: 800;
		margin-bottom: 1rem;
		line-height: 1.1;
	}

	.banner-subtitle {
		font-size: 1.25rem;
		margin-bottom: 2rem;
		opacity: 0.9;
		line-height: 1.6;
	}

	.banner-btn {
		background: rgba(255, 255, 255, 0.2);
		border: 2px solid rgba(255, 255, 255, 0.3);
		color: white;
		padding: 1rem 2rem;
		font-size: 1.1rem;
		font-weight: 600;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
	}

	.banner-btn:hover {
		background: rgba(255, 255, 255, 0.3);
		border-color: rgba(255, 255, 255, 0.5);
		transform: translateY(-2px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}

	.banner-image {
		flex: 0 0 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.banner-icon {
		font-size: 8rem;
		opacity: 0.8;
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-20px); }
	}

	/* Navigation Arrows */
	.banner-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.2);
		border: none;
		color: white;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
		z-index: 10;
	}

	.banner-nav:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: translateY(-50%) scale(1.1);
	}

	.banner-prev {
		left: 2rem;
	}

	.banner-next {
		right: 2rem;
	}

	/* Dots Indicator */
	.banner-dots {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 0.5rem;
		z-index: 10;
	}

	.banner-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.5);
		background: transparent;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.banner-dot.active {
		background: white;
		border-color: white;
		transform: scale(1.2);
	}

	.banner-dot:hover {
		border-color: white;
		background: rgba(255, 255, 255, 0.5);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.banner-carousel {
			height: 300px;
		}

		.banner-content {
			flex-direction: column;
			text-align: center;
			gap: 1.5rem;
			padding: 0 1rem;
		}

		.banner-title {
			font-size: 2rem;
		}

		.banner-subtitle {
			font-size: 1rem;
		}

		.banner-icon {
			font-size: 4rem;
		}

		.banner-nav {
			width: 40px;
			height: 40px;
		}

		.banner-prev {
			left: 1rem;
		}

		.banner-next {
			right: 1rem;
		}

		.banner-dots {
			bottom: 1rem;
		}
	}

	@media (max-width: 480px) {
		.banner-carousel {
			height: 250px;
		}

		.banner-title {
			font-size: 1.5rem;
		}

		.banner-subtitle {
			font-size: 0.9rem;
		}

		.banner-btn {
			padding: 0.75rem 1.5rem;
			font-size: 1rem;
		}

		.banner-icon {
			font-size: 3rem;
		}
	}
</style>
