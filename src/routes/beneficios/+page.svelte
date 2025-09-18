<script>
	import { onMount } from 'svelte';
	import { spectacularHeroAnimation, slideInFromDirection, textGlowAnimation, add3DHoverEffect } from '$lib/animations.js';

	let heroTitle, heroSubtitle, benefitsGrid, ctaSection;

	onMount(() => {
		// Animar elementos al cargar la página
		if (heroTitle) spectacularHeroAnimation(heroTitle, heroSubtitle, null);
		if (benefitsGrid) slideInFromDirection(benefitsGrid, 'bottom', 0.3);
		if (ctaSection) slideInFromDirection(ctaSection, 'top', 0.5);
		
		// Agregar efectos 3D a las tarjetas de beneficios
		const benefitCards = document.querySelectorAll('.benefit-card');
		benefitCards.forEach(card => {
			add3DHoverEffect(card);
		});
	});
</script>

<svelte:head>
	<title>Beneficios - ADNED</title>
	<meta name="description" content="Descubre todos los beneficios de unirte a ADNED y asegura el ingreso de tu hijo a la prepa de sus sueños.">
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<div class="hero-content">
		<h1 class="hero-title" bind:this={heroTitle}>
			Beneficios Exclusivos
		</h1>
		<p class="hero-subtitle" bind:this={heroSubtitle}>
			Todo lo que necesitas para que tu hijo ingrese a la prepa de sus sueños
		</p>
	</div>
	<div class="hero-decoration">
		<div class="floating-shape shape-1"></div>
		<div class="floating-shape shape-2"></div>
		<div class="floating-shape shape-3"></div>
	</div>
</section>

<!-- Benefits Grid Section -->
<section class="benefits-section" bind:this={benefitsGrid}>
	<div class="container">
		<div class="section-header">
			<h2 class="section-title">¿Por qué elegir ADNED?</h2>
			<p class="section-subtitle">
				Somos la guía más completa y efectiva para el proceso de admisión ECOEMS 2026
			</p>
		</div>

		<div class="benefits-grid">
			<!-- Beneficio 1 -->
			<div class="benefit-card">
				<div class="benefit-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M9 12l2 2 4-4"/>
						<path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
						<path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
						<path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
						<path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
					</svg>
				</div>
				<h3 class="benefit-title">Información Oficial y Actualizada</h3>
				<p class="benefit-description">
					Recibe información oficial y actualizada del ECOEMS directamente en tu WhatsApp, sin intermediarios ni información desactualizada.
				</p>
			</div>

			<!-- Beneficio 2 -->
			<div class="benefit-card">
				<div class="benefit-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
					</svg>
				</div>
				<h3 class="benefit-title">Tips Prácticos</h3>
				<p class="benefit-description">
					Consejos prácticos y estrategias específicas para padres y alumnos que te ayudarán a navegar el proceso de admisión con confianza.
				</p>
			</div>

			<!-- Beneficio 3 -->
			<div class="benefit-card">
				<div class="benefit-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/>
						<polyline points="12,6 12,12 16,14"/>
					</svg>
				</div>
				<h3 class="benefit-title">Recordatorios Clave</h3>
				<p class="benefit-description">
					Recibe recordatorios importantes para que tu hijo no pierda fechas críticas del proceso de admisión ECOEMS 2026.
				</p>
			</div>

			<!-- Beneficio 4 -->
			<div class="benefit-card">
				<div class="benefit-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
					</svg>
				</div>
				<h3 class="benefit-title">Comunicación Directa</h3>
				<p class="benefit-description">
					Comunicación directa con asesores especializados que resolverán todas tus dudas y te guiarán paso a paso.
				</p>
			</div>

			<!-- Beneficio 5 -->
			<div class="benefit-card">
				<div class="benefit-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
						<polyline points="14,2 14,8 20,8"/>
						<line x1="16" y1="13" x2="8" y2="13"/>
						<line x1="16" y1="17" x2="8" y2="17"/>
						<polyline points="10,9 9,9 8,9"/>
					</svg>
				</div>
				<h3 class="benefit-title">Material Exclusivo</h3>
				<p class="benefit-description">
					Acceso a material exclusivo diseñado específicamente para preparar mejor a tu hijo para el proceso de admisión.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Stats Section -->
<section class="stats-section">
	<div class="container">
		<div class="stats-grid">
			<div class="stat-item">
				<div class="stat-number">95%</div>
				<div class="stat-label">Tasa de Éxito</div>
			</div>
			<div class="stat-item">
				<div class="stat-number">500+</div>
				<div class="stat-label">Estudiantes Ayudados</div>
			</div>
			<div class="stat-item">
				<div class="stat-number">3</div>
				<div class="stat-label">Años de Experiencia</div>
			</div>
			<div class="stat-item">
				<div class="stat-number">24/7</div>
				<div class="stat-label">Soporte Disponible</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="cta-section" bind:this={ctaSection}>
	<div class="container">
		<div class="cta-content">
			<h2 class="cta-title">¿Listo para empezar?</h2>
			<p class="cta-description">
				Únete a nuestra comunidad y asegura el futuro académico de tu hijo
			</p>
			<button class="cta-button" on:click={() => window.open('https://wa.me/1234567890', '_blank')}>
				<svg class="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
				</svg>
				Unirme al grupo gratuito
			</button>
		</div>
	</div>
</section>

<style>
	/* Hero Section */
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
		animation: titleFloat 3s ease-in-out infinite;
	}

	.hero-subtitle {
		font-size: 1.3rem;
		color: rgba(255, 255, 255, 0.9);
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.hero-decoration {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
	}

	.floating-shape {
		position: absolute;
		border-radius: 50%;
		background: linear-gradient(45deg, rgba(249, 115, 22, 0.1), rgba(251, 191, 36, 0.1));
		animation: float 6s ease-in-out infinite;
	}

	.shape-1 {
		width: 100px;
		height: 100px;
		top: 20%;
		left: 10%;
		animation-delay: 0s;
	}

	.shape-2 {
		width: 150px;
		height: 150px;
		top: 60%;
		right: 15%;
		animation-delay: 2s;
	}

	.shape-3 {
		width: 80px;
		height: 80px;
		top: 30%;
		right: 30%;
		animation-delay: 4s;
	}

	@keyframes titleFloat {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-10px); }
	}

	@keyframes float {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		50% { transform: translateY(-20px) rotate(180deg); }
	}

	/* Container */
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	/* Benefits Section */
	.benefits-section {
		padding: 6rem 0;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
	}

	.section-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.section-title {
		font-size: 2.5rem;
		font-weight: 800;
		color: #290040;
		margin-bottom: 1rem;
		background: linear-gradient(135deg, #290040 0%, #3d0060 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.section-subtitle {
		font-size: 1.2rem;
		color: #64748b;
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	.benefit-card {
		background: white;
		padding: 2.5rem 2rem;
		border-radius: 1.5rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		border: 2px solid transparent;
		position: relative;
		overflow: hidden;
	}

	.benefit-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
	}

	.benefit-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
		border-color: rgba(249, 115, 22, 0.3);
	}

	.benefit-icon {
		width: 60px;
		height: 60px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.5rem;
		box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
	}

	.benefit-icon svg {
		width: 30px;
		height: 30px;
		color: white;
	}

	.benefit-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #290040;
		margin-bottom: 1rem;
	}

	.benefit-description {
		color: #64748b;
		line-height: 1.6;
		font-size: 1rem;
	}

	/* Stats Section */
	.stats-section {
		background: #290040;
		padding: 4rem 0;
		color: white;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
		text-align: center;
	}

	.stat-item {
		padding: 2rem 1rem;
	}

	.stat-number {
		font-size: 3rem;
		font-weight: 900;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 1.1rem;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 600;
	}

	/* CTA Section */
	.cta-section {
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
		padding: 6rem 0;
		text-align: center;
	}

	.cta-content {
		max-width: 600px;
		margin: 0 auto;
	}

	.cta-title {
		font-size: 2.5rem;
		font-weight: 800;
		color: #290040;
		margin-bottom: 1.5rem;
		background: linear-gradient(135deg, #290040 0%, #3d0060 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.cta-description {
		font-size: 1.2rem;
		color: #64748b;
		margin-bottom: 2.5rem;
		line-height: 1.6;
	}

	.cta-button {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #f59e0b 100%);
		color: #ffffff;
		padding: 1.25rem 2.5rem;
		border: none;
		border-radius: 1rem;
		font-weight: 700;
		font-size: 1.1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.cta-button:hover {
		background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
		transform: translateY(-3px);
		box-shadow: 0 12px 35px rgba(249, 115, 22, 0.6);
		text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
	}

	.cta-icon {
		width: 24px;
		height: 24px;
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

		.benefits-section {
			padding: 4rem 0;
		}

		.section-title {
			font-size: 2rem;
		}

		.benefits-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.benefit-card {
			padding: 2rem 1.5rem;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.5rem;
		}

		.stat-number {
			font-size: 2.5rem;
		}

		.cta-section {
			padding: 4rem 0;
		}

		.cta-title {
			font-size: 2rem;
		}

		.cta-button {
			padding: 1rem 2rem;
			font-size: 1rem;
		}
	}

	@media (max-width: 480px) {
		.hero-title {
			font-size: 2rem;
		}

		.benefit-card {
			padding: 1.5rem 1rem;
		}

		.stats-grid {
			grid-template-columns: 1fr;
		}

		.cta-button {
			width: 100%;
			justify-content: center;
		}
	}
</style>