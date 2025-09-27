<script lang="ts">
	import { slideInFromDirection } from '$lib/animations';
	import { onMount } from 'svelte';

	let heroTitle: HTMLElement | null;
	let heroSubtitle: HTMLElement | null;
	let missionSection: HTMLElement | null;
	let visionSection: HTMLElement | null;
	let ctaSection: HTMLElement | null;

	onMount(() => {
		// Animar elementos al cargar la página
		// if (heroTitle) spectacularHeroAnimation(heroTitle, heroSubtitle, null);
		if (missionSection) slideInFromDirection(missionSection, 'left', 0.3);
		if (visionSection) slideInFromDirection(visionSection, 'right', 0.5);
		if (ctaSection) slideInFromDirection(ctaSection, 'top', 0.7);
	});
</script>

<svelte:head>
	<title>Misión y Visión - ADNED</title>
	<meta name="description" content="Conoce la misión y visión de ADNED para asegurar el ingreso de tu hijo a la prepa de sus sueños.">
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<div class="hero-content">
		<h1 class="hero-title" bind:this={heroTitle}>
			Misión y Visión
		</h1>
		<p class="hero-subtitle" bind:this={heroSubtitle}>
			Conoce los valores y objetivos que nos impulsan a ayudarte
		</p>
	</div>
	<div class="hero-decoration">
		<div class="floating-shape shape-1"></div>
		<div class="floating-shape shape-2"></div>
		<div class="floating-shape shape-3"></div>
	</div>
</section>

<!-- Mission Section -->
<section class="mission-section" bind:this={missionSection}>
	<div class="container">
		<div class="mission-content">
			<div class="mission-icon">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
				</svg>
			</div>
			<div class="mission-text">
				<h2 class="mission-title">Misión</h2>
				<p class="mission-description">
					Ofrecer cursos innovadores, accesibles y de calidad que preparen a los 
					estudiantes para superar los exámenes de admisión al bachillerato y la 
					universidad, brindándoles confianza, motivación y herramientas modernas que los 
					acerquen a lograr sus sueños académicos.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Vision Section -->
<section class="vision-section" bind:this={visionSection}>
	<div class="container">
		<div class="vision-content">
			<div class="vision-icon">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
					<circle cx="12" cy="12" r="3"/>
				</svg>
			</div>
			<div class="vision-text">
				<h2 class="vision-title">Visión</h2>
				<p class="vision-description">
					Convertirse en la comunidad educativa líder en México para la preparación de 
					exámenes de admisión, reconocida por su enfoque futurista, juvenil y motivador, 
					que acompaña a cada alumno en su camino al éxito académico.
				</p>
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
			<button class="cta-button" on:click={() => window.open('https://wa.me/5654961193', '_blank')}>
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

	/* Mission Section */
	.mission-section {
		padding: 6rem 0;
		background: linear-gradient(135deg, #290040 0%, #3d0060 50%, #290040 100%);
		position: relative;
		overflow: hidden;
	}

	.mission-section::before {
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

	.mission-content {
		display: flex;
		align-items: center;
		gap: 3rem;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		padding: 3rem;
		border-radius: 2rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
		border: 2px solid rgba(251, 191, 36, 0.3);
		position: relative;
		z-index: 2;
	}

	.mission-icon {
		width: 100px;
		height: 100px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		border-radius: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		box-shadow: 0 10px 25px rgba(249, 115, 22, 0.3);
	}

	.mission-icon svg {
		width: 50px;
		height: 50px;
		color: white;
	}

	.mission-text {
		flex: 1;
	}

	.mission-title {
		font-size: 2.5rem;
		font-weight: 800;
		color: #290040;
		margin-bottom: 1.5rem;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 25%, #fbbf24 50%, #3b82f6 75%, #8b5cf6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.mission-description {
		font-size: 1.2rem;
		color: #4a5568;
		line-height: 1.8;
		text-align: justify;
	}

	/* Vision Section */
	.vision-section {
		padding: 6rem 0;
		background: linear-gradient(135deg, #3d0060 0%, #290040 50%, #3d0060 100%);
		position: relative;
		overflow: hidden;
	}

	.vision-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
					radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
					radial-gradient(circle at 60% 40%, rgba(249, 115, 22, 0.1) 0%, transparent 50%);
		pointer-events: none;
		z-index: 1;
		animation: backgroundShift 8s ease-in-out infinite;
	}

	.vision-content {
		display: flex;
		align-items: center;
		gap: 3rem;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		padding: 3rem;
		border-radius: 2rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
		border: 2px solid rgba(251, 191, 36, 0.3);
		position: relative;
		z-index: 2;
	}

	.vision-icon {
		width: 100px;
		height: 100px;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #f97316 100%);
		border-radius: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
	}

	.vision-icon svg {
		width: 50px;
		height: 50px;
		color: white;
	}

	.vision-text {
		flex: 1;
	}

	.vision-title {
		font-size: 2.5rem;
		font-weight: 800;
		color: #290040;
		margin-bottom: 1.5rem;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 25%, #8b5cf6 50%, #f97316 75%, #fbbf24 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.vision-description {
		font-size: 1.2rem;
		color: #4a5568;
		line-height: 1.8;
		text-align: justify;
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

		.mission-section,
		.vision-section {
			padding: 4rem 0;
		}

		.mission-content,
		.vision-content {
			flex-direction: column;
			text-align: center;
			padding: 2rem;
			gap: 2rem;
		}

		.mission-title,
		.vision-title {
			font-size: 2rem;
		}

		.mission-description,
		.vision-description {
			font-size: 1.1rem;
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

		.mission-content,
		.vision-content {
			padding: 1.5rem;
		}

		.mission-title,
		.vision-title {
			font-size: 1.8rem;
		}

		.mission-description,
		.vision-description {
			font-size: 1rem;
		}

		.cta-button {
			width: 100%;
			justify-content: center;
		}
	}
</style>