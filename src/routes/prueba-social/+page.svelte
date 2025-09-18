<script lang="ts">
	import { onMount } from 'svelte';
	import { spectacularHeroAnimation, slideInFromDirection, textGlowAnimation, add3DHoverEffect } from '$lib/animations';

	let heroTitle: HTMLElement;
	let heroSubtitle: HTMLElement;
	let testimonialsGrid: HTMLElement;
	let ctaSection: HTMLElement;

	onMount(() => {
		// Animar elementos al cargar la página
		if (heroTitle) spectacularHeroAnimation(heroTitle, heroSubtitle, null);
		if (testimonialsGrid) slideInFromDirection(testimonialsGrid, 'bottom', 0.3);
		if (ctaSection) slideInFromDirection(ctaSection, 'top', 0.5);
		
		// Agregar efectos 3D a las tarjetas de testimonios
		const testimonialCards = document.querySelectorAll('.testimonial-card');
		testimonialCards.forEach(card => {
			add3DHoverEffect(card);
		});
	});
</script>

<svelte:head>
	<title>Testimonios - ADNED</title>
	<meta name="description" content="Descubre las historias de éxito de padres que lograron que sus hijos ingresaran a la prepa de sus sueños con ADNED.">
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<div class="hero-content">
		<h1 class="hero-title" bind:this={heroTitle}>
			Lo que dicen otros padres como tú
		</h1>
		<p class="hero-subtitle" bind:this={heroSubtitle}>
			Más de 1,200 padres y alumnos ya están dentro de ADNED recibiendo información exclusiva
		</p>
	</div>
	<div class="hero-decoration">
		<div class="floating-shape shape-1"></div>
		<div class="floating-shape shape-2"></div>
		<div class="floating-shape shape-3"></div>
	</div>
</section>

<!-- Stats Section -->
<section class="stats-section">
	<div class="container">
		<div class="stats-grid">
			<div class="stat-item">
				<div class="stat-number">1,200+</div>
				<div class="stat-label">Padres y Alumnos</div>
			</div>
			<div class="stat-item">
				<div class="stat-number">95%</div>
				<div class="stat-label">Tasa de Éxito</div>
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

<!-- Testimonials Section -->
<section class="testimonials-section" bind:this={testimonialsGrid}>
	<div class="container">
		<div class="testimonials-carousel">
			<!-- Testimonio Principal -->
			<div class="testimonial-main">
				<div class="testimonial-content">
					<div class="quote-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1 0 1-1 2-2 2s-1-.008-1-.008V21z"/>
							<path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1.005 0 1.005.005 1.005 1.005 0 1-.995 2-2 2s-1-.008-1-.008V21z"/>
						</svg>
					</div>
					<p class="testimonial-text">
						"Gracias al grupo estuve al pendiente de cada fecha y mi hijo logró entrar a la prepa de sus sueños."
					</p>
					<div class="testimonial-author">
						<div class="author-avatar">
							<img src="/photo_2025-09-12_15-08-29.jpg" alt="Laura M." class="author-photo">
						</div>
						<div class="author-info">
							<h4 class="author-name">Laura M.</h4>
						</div>
					</div>
				</div>
			</div>

			<!-- Testimonios Adicionales -->
			<div class="testimonials-grid">
				<div class="testimonial-card">
					<div class="testimonial-content">
						<div class="author-avatar">
							<div class="avatar-placeholder">MR</div>
						</div>
						<p class="testimonial-text">
							"Los recordatorios fueron clave para no perder fechas importantes. ¡100% recomendado!"
						</p>
						<div class="author-info">
							<h4 class="author-name">María R.</h4>
						</div>
					</div>
				</div>

				<div class="testimonial-card">
					<div class="testimonial-content">
						<div class="author-avatar">
							<div class="avatar-placeholder">CL</div>
						</div>
						<p class="testimonial-text">
							"El proceso era confuso, pero ADNED nos guió paso a paso. ¡Increíble servicio!"
						</p>
						<div class="author-info">
							<h4 class="author-name">Carlos L.</h4>
						</div>
					</div>
				</div>

				<div class="testimonial-card">
					<div class="testimonial-content">
						<div class="author-avatar">
							<div class="avatar-placeholder">AG</div>
						</div>
						<p class="testimonial-text">
							"Los tips prácticos fueron exactamente lo que necesitábamos. ¡Gracias infinitas!"
						</p>
						<div class="author-info">
							<h4 class="author-name">Ana G.</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Success Stories Section -->
<section class="success-stories-section">
	<div class="container">
		<div class="section-header">
			<h2 class="section-title">Casos de Éxito Recientes</h2>
			<p class="section-subtitle">
				Estudiantes que lograron ingresar a sus prepas de elección
			</p>
		</div>

		<div class="success-stories-grid">
			<div class="success-story-card">
				<div class="story-content">
					<div class="story-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
							<polyline points="22,4 12,14.01 9,11.01"/>
						</svg>
					</div>
					<h3 class="story-title">CCH UNAM</h3>
					<p class="story-description">
						María logró ingresar después de estar en lista de espera
					</p>
				</div>
			</div>

			<div class="success-story-card">
				<div class="story-content">
					<div class="story-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
							<polyline points="22,4 12,14.01 9,11.01"/>
						</svg>
					</div>
					<h3 class="story-title">IPN</h3>
					<p class="story-description">
						Carlos ingresó a su primera opción gracias a nuestros tips
					</p>
				</div>
			</div>

			<div class="success-story-card">
				<div class="story-content">
					<div class="story-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
							<polyline points="22,4 12,14.01 9,11.01"/>
						</svg>
					</div>
					<h3 class="story-title">CONALEP</h3>
					<p class="story-description">
						Ana superó expectativas y obtuvo una beca
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="cta-section" bind:this={ctaSection}>
	<div class="container">
		<div class="cta-content">
			<h2 class="cta-title">¿Quieres ser el próximo caso de éxito?</h2>
			<p class="cta-description">
				Únete a cientos de familias que ya lograron su objetivo con ADNED
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
		position: relative;
		z-index: 2;
	}

	/* Stats Section */
	.stats-section {
		background: linear-gradient(135deg, #290040 0%, #3d0060 50%, #290040 100%);
		padding: 4rem 0;
		color: white;
		position: relative;
		overflow: hidden;
	}

	.stats-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
					radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
					radial-gradient(circle at 40% 40%, rgba(249, 115, 22, 0.1) 0%, transparent 50%);
		pointer-events: none;
		z-index: 1;
		animation: backgroundShift 8s ease-in-out infinite;
	}

	@keyframes backgroundShift {
		0%, 100% { 
			background: 
				radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
				radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
				radial-gradient(circle at 40% 40%, rgba(249, 115, 22, 0.1) 0%, transparent 50%);
		}
		50% { 
			background: 
				radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
				radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
				radial-gradient(circle at 60% 40%, rgba(249, 115, 22, 0.15) 0%, transparent 50%);
		}
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
		text-align: center;
		position: relative;
		z-index: 2;
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

	/* Testimonials Section */
	.testimonials-section {
		padding: 6rem 0;
		background: linear-gradient(135deg, #290040 0%, #3d0060 50%, #290040 100%);
		position: relative;
		overflow: hidden;
	}

	.testimonials-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
					radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
					radial-gradient(circle at 40% 40%, rgba(249, 115, 22, 0.1) 0%, transparent 50%);
		pointer-events: none;
		z-index: 1;
		animation: backgroundShift 8s ease-in-out infinite;
	}

	.section-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.section-title {
		font-size: 2.5rem;
		font-weight: 800;
		color: #ffffff;
		margin-bottom: 1rem;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 25%, #fbbf24 50%, #3b82f6 75%, #8b5cf6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 0 4px 20px rgba(249, 115, 22, 0.5);
		filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.3));
	}

	.section-subtitle {
		font-size: 1.2rem;
		color: rgba(255, 255, 255, 0.9);
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.testimonials-carousel {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.testimonial-main {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		padding: 3rem 2.5rem;
		border-radius: 2rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
		transition: all 0.3s ease;
		border: 2px solid rgba(251, 191, 36, 0.3);
		position: relative;
		overflow: hidden;
		text-align: center;
	}

	.testimonial-main::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
	}

	.testimonial-main:hover {
		transform: translateY(-5px);
		box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
		border-color: rgba(251, 191, 36, 0.6);
		background: rgba(255, 255, 255, 1);
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.testimonial-card {
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(20px);
		padding: 2rem 1.5rem;
		border-radius: 1.5rem;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
		transition: all 0.3s ease;
		border: 2px solid rgba(251, 191, 36, 0.2);
		position: relative;
		overflow: hidden;
		text-align: center;
	}

	.testimonial-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
	}

	.testimonial-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
		border-color: rgba(251, 191, 36, 0.5);
		background: rgba(255, 255, 255, 1);
	}

	.testimonial-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.quote-icon {
		width: 50px;
		height: 50px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
	}

	.quote-icon svg {
		width: 24px;
		height: 24px;
		color: white;
	}

	.testimonial-text {
		font-size: 1.1rem;
		line-height: 1.6;
		color: #4a5568;
		font-style: italic;
		margin: 0;
	}

	.testimonial-author {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.author-avatar {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
		border: 3px solid rgba(251, 191, 36, 0.3);
	}

	.author-photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-placeholder {
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 700;
		font-size: 1.2rem;
	}

	.author-name {
		font-size: 1rem;
		font-weight: 700;
		color: #290040;
		margin: 0;
	}

	/* Success Stories Section */
	.success-stories-section {
		padding: 6rem 0;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
	}

	.success-stories-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	.success-story-card {
		background: white;
		border-radius: 1.5rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		border: 2px solid rgba(251, 191, 36, 0.2);
		padding: 2rem;
		text-align: center;
	}

	.success-story-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
		border-color: rgba(251, 191, 36, 0.4);
	}

	.story-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.story-icon {
		width: 60px;
		height: 60px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
	}

	.story-icon svg {
		width: 30px;
		height: 30px;
		color: white;
	}

	.story-title {
		font-size: 1.2rem;
		font-weight: 700;
		color: #290040;
		margin: 0;
	}

	.story-description {
		color: #4a5568;
		line-height: 1.6;
		margin: 0;
		font-size: 0.9rem;
	}

	/* CTA Section */
	.cta-section {
		background: linear-gradient(135deg, #290040 0%, #3d0060 50%, #290040 100%);
		padding: 6rem 0;
		text-align: center;
		position: relative;
		overflow: hidden;
	}

	.cta-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
					radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
					radial-gradient(circle at 40% 40%, rgba(249, 115, 22, 0.1) 0%, transparent 50%);
		pointer-events: none;
		z-index: 1;
		animation: backgroundShift 8s ease-in-out infinite;
	}

	.cta-content {
		max-width: 600px;
		margin: 0 auto;
		position: relative;
		z-index: 2;
	}

	.cta-title {
		font-size: 2.5rem;
		font-weight: 800;
		color: #ffffff;
		margin-bottom: 1.5rem;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 25%, #fbbf24 50%, #3b82f6 75%, #8b5cf6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 0 4px 20px rgba(249, 115, 22, 0.5);
		filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.3));
	}

	.cta-description {
		font-size: 1.2rem;
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 2.5rem;
		line-height: 1.6;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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

		.testimonials-section {
			padding: 4rem 0;
		}

		.section-title {
			font-size: 2rem;
		}

		.testimonials-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.testimonial-card {
			padding: 2rem 1.5rem;
		}

		.success-stories-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
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

		.testimonial-card {
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
