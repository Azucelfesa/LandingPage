<script>
	let count = 0;
	
	function increment() {
		count += 1;
	}
</script>

<svelte:head>
	<title>Landing Page - SvelteKit</title>
	<meta name="description" content="Una landing page moderna creada con SvelteKit" />
</svelte:head>

<main class="main-content">
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
</style>
