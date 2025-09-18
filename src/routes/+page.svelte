<script>
	import { onMount } from 'svelte';
	import { 
		animateHero, 
		animateScrollElements, 
		addHoverAnimations, 
		addPulseAnimation,
		animateSpinner,
		animateSuccess,
		shakeElement,
		spectacularHeroAnimation,
		addRippleEffect,
		staggeredEntryAnimation,
		enhancedFormHover,
		typewriterTitle,
		enhancedPulseAnimation,
		slideInFromDirection,
		textGlowAnimation,
		add3DHoverEffect,
		createBackgroundParticles,
		createBackgroundParticlesForBenefits
	} from '$lib/animations';
	// import { 
	// 	createRippleEffect, 
	// 	createMouseFollower, 
	// 	revealTextByWords,
	// 	slideInFromDirection
	// } from '$lib/advancedAnimations';
	
	let formData = {
		parentName: '',
		studentName: '',
		whatsapp: '',
		email: ''
	};
	
	let isSubmitting = false;
	let showThankYou = false;
	
	// Referencias para animaciones
	let heroTitle;
	let heroSubtitle;
	let registrationForm;
	let heroSection;
	let loadingSpinner;
	let successIcon;
	
	async function handleSubmit(event) {
		event.preventDefault();
		isSubmitting = true;
		
		// Animar el spinner de carga
		if (loadingSpinner) {
			animateSpinner(loadingSpinner);
		}
		
		// Simular envío de datos
		await new Promise(resolve => setTimeout(resolve, 1500));
		
		// Aquí iría la lógica para guardar en la base de datos
		console.log('Datos del formulario:', formData);
		
		isSubmitting = false;
		showThankYou = true;
		
		// Animar el ícono de éxito
		if (successIcon) {
			animateSuccess(successIcon);
		}
	}
	
	function joinGroup() {
		// Redirigir a WhatsApp
		window.open('https://wa.me/1234567890', '_blank');
	}
	
	onMount(() => {
		// Asegurar que el formulario sea visible inmediatamente
		if (registrationForm) {
			registrationForm.style.opacity = '1';
			registrationForm.style.transform = 'translateY(0)';
			registrationForm.style.display = 'block';
			registrationForm.style.visibility = 'visible';
		}
		
		// Fallback adicional después de un tiempo
		setTimeout(() => {
			if (registrationForm) {
				registrationForm.style.opacity = '1';
				registrationForm.style.transform = 'translateY(0)';
				registrationForm.style.display = 'block';
				registrationForm.style.visibility = 'visible';
			}
		}, 1000);
		
		// Esperar a que los elementos estén disponibles
		setTimeout(() => {
			// Ejecutar animación espectacular del hero
			if (heroTitle && heroSubtitle && registrationForm) {
				spectacularHeroAnimation(heroTitle, heroSubtitle, registrationForm);
			}
			
			// Ejecutar animaciones de scroll mejoradas
			animateScrollElements();
			
			// Agregar animaciones de hover mejoradas
			if (registrationForm) {
				enhancedFormHover(registrationForm);
			}
			
			// Agregar efectos de ondas a botones
			const buttons = document.querySelectorAll('.btn');
			buttons.forEach(button => addRippleEffect(button));
			
			// Agregar animación de pulsación mejorada al botón principal
			setTimeout(() => {
				const mainButton = document.querySelector('.btn-whatsapp');
				if (mainButton) {
					enhancedPulseAnimation(mainButton);
				}
			}, 2000);
			
			// Agregar animaciones escalonadas a los campos del formulario
			setTimeout(() => {
				staggeredEntryAnimation('.form-group', 0.15);
			}, 1000);
			
			// Agregar efectos 3D a elementos interactivos
			const interactiveElements = document.querySelectorAll('.btn, .form-group input');
			interactiveElements.forEach(element => add3DHoverEffect(element));
			
			// Agregar animación de resplandor al título
			if (heroTitle) {
				setTimeout(() => {
					textGlowAnimation(heroTitle);
				}, 1500);
			}

			// Agregar partículas a la sección de beneficios
			setTimeout(() => {
				const benefitsSection = document.querySelector('.benefits-section');
				if (benefitsSection) {
					createBackgroundParticlesForBenefits(benefitsSection);
				}
			}, 3000);
			
		}, 200);
	});
</script>

<svelte:head>
	<title>ADNED - Guía para Ingreso a Prepa ECOEMS 2026</title>
	<meta name="description" content="La guía que todo padre necesita para que su hijo ingrese a la prepa de sus sueños. Regístrate GRATIS y recibe consejos, guías y recordatorios clave del proceso de admisión ECOEMS 2026." />
</svelte:head>

<main class="main-content">
	{#if showThankYou}
		<!-- Página de agradecimiento -->
		<section class="hero thank-you-section">
			<div class="container">
				<div class="hero-content text-center">
					<div class="success-icon" bind:this={successIcon}>✅</div>
					<h1 class="text-5xl font-bold mb-6 text-green-600">
						¡Registro Exitoso!
					</h1>
					<p class="text-xl text-gray-600 mb-8">
						Gracias por unirte a nuestra comunidad. Ahora puedes acceder al grupo de WhatsApp.
					</p>
					<button class="btn btn-whatsapp text-lg px-8 py-3" on:click={joinGroup}>
						<span class="whatsapp-icon">📱</span>
						Entrar al grupo de WhatsApp
					</button>
				</div>
			</div>
		</section>
	{:else}
		<!-- Hero Section -->
		<section class="hero" bind:this={heroSection}>
			<div class="container">
				<div class="hero-content-centered">
					<h1 class="hero-title" bind:this={heroTitle}>
				
						La guía que todo padre necesita para que su hijo ingrese a la prepa de sus sueños
					</h1>
					<h2 class="hero-subtitle" bind:this={heroSubtitle}>
						Regístrate <strong>GRATIS</strong> y recibe en tu WhatsApp consejos, guías y recordatorios clave del proceso de admisión <strong>ECOEMS 2026</strong>.
					</h2>
					
					<!-- Formulario de registro -->
					<form class="registration-form" bind:this={registrationForm} on:submit={handleSubmit}>
							<div class="form-group">
								<label for="parentName">Nombre del padre/tutor</label>
								<input 
									type="text" 
									id="parentName" 
									bind:value={formData.parentName}
									required 
									placeholder="Tu nombre completo"
								>
							</div>
							
							<div class="form-group">
								<label for="studentName">Nombre del alumno</label>
								<input 
									type="text" 
									id="studentName" 
									bind:value={formData.studentName}
									required 
									placeholder="Nombre de tu hijo/a"
								>
							</div>
							
							<div class="form-group">
								<label for="whatsapp">WhatsApp</label>
								<input 
									type="tel" 
									id="whatsapp" 
									bind:value={formData.whatsapp}
									required 
									placeholder="+52 55 1234 5678"
								>
							</div>
							
							<div class="form-group">
								<label for="email">Correo electrónico</label>
								<input 
									type="email" 
									id="email" 
									bind:value={formData.email}
									required 
									placeholder="tu@email.com"
								>
							</div>
							
							<button type="submit" class="btn btn-whatsapp" disabled={isSubmitting}>
								{#if isSubmitting}
									<span class="loading-spinner" bind:this={loadingSpinner}></span>
									Registrando...
								{:else}
									<span class="whatsapp-icon">📱</span>
									Registrarme GRATIS
								{/if}
							</button>
						</form>
					</div>
				</div>
		</section>
	{/if}

	<!-- Sección de Beneficios -->
	<section id="beneficios" class="benefits-section">
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

</main>

<style>
	/* Variables CSS - Paleta Profesional */
	:root {
		--primary-blue: #1e40af;
		--primary-dark: #1e3a8a;
		--secondary-gray: #64748b;
		--accent-blue: #3b82f6;
		--adned-purple: #290040;
		--adned-purple-dark: #1a0026;
		--adned-purple-light: #3d0060;
		--text-dark: #1e293b;
		--text-gray: #64748b;
		--bg-light: #f8fafc;
		--bg-white: #ffffff;
		--border-light: #e2e8f0;
		--success-green: #059669;
		--shadow-light: rgba(0, 0, 0, 0.1);
		--shadow-medium: rgba(0, 0, 0, 0.15);
	}

	.main-content {
		padding-top: 80px;
	}

	/* Hero Section */
	.hero {
		background: linear-gradient(135deg, #290040 0%, #3d0060 50%, #290040 100%);
		color: var(--bg-white);
		padding: 2rem 0 0 0;
		min-height: 100vh;
		display: flex;
		align-items: center;
		position: relative;
		overflow: hidden;
	}

	.hero::before {
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
		animation: backgroundShift 8s ease-in-out infinite;
	}

	.hero::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 4rem;
		background: linear-gradient(to bottom, transparent 0%, rgba(41, 0, 64, 0.8) 50%, rgba(41, 0, 64, 1) 100%);
		pointer-events: none;
		z-index: 1;
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

	.hero-content-centered {
		max-width: 600px;
		margin: 0 auto;
		text-align: center;
		position: relative;
		z-index: 2;
		padding-bottom: 2rem;
	}

	.hero-title {
		font-size: 2.2rem;
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: 1rem;
		color: var(--bg-white);
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 25%, #fbbf24 50%, #3b82f6 75%, #8b5cf6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 
			0 0 10px rgba(249, 115, 22, 0.3),
			0 0 20px rgba(251, 191, 36, 0.2),
			0 0 30px rgba(59, 130, 246, 0.2),
			0 2px 8px rgba(0, 0, 0, 0.5);
		filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.3));
		animation: titleFloat 6s ease-in-out infinite;
	}

	@keyframes titleFloat {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-10px); }
	}


	.hero-subtitle {
		font-size: 1.1rem;
		line-height: 1.4;
		margin-bottom: 1.5rem;
		color: #ffffff;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	/* Formulario de registro */
	.registration-form {
		background: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(20px);
		padding: 2rem;
		border-radius: 1.5rem;
		box-shadow: 
			0 25px 50px rgba(0, 0, 0, 0.6),
			0 0 0 1px rgba(255, 255, 255, 0.2),
			0 0 0 3px rgba(251, 191, 36, 0.2);
		margin-top: 1rem;
		border: 2px solid rgba(251, 191, 36, 0.3);
		position: relative;
		transition: all 0.3s ease;
		opacity: 1;
		transform: translateY(0);
		display: block;
		visibility: visible;
		animation: formGlow 4s ease-in-out infinite;
		z-index: 3;
	}

	@keyframes formGlow {
		0%, 100% { 
			box-shadow: 
				0 25px 50px rgba(0, 0, 0, 0.6),
				0 0 0 1px rgba(255, 255, 255, 0.2),
				0 0 0 3px rgba(251, 191, 36, 0.2);
		}
		50% { 
			box-shadow: 
				0 25px 50px rgba(0, 0, 0, 0.6),
				0 0 0 1px rgba(255, 255, 255, 0.3),
				0 0 0 3px rgba(251, 191, 36, 0.4),
				0 0 20px rgba(251, 191, 36, 0.2);
		}
	}

	.registration-form:hover {
		box-shadow: 
			0 35px 70px rgba(0, 0, 0, 0.7),
			0 0 0 1px rgba(255, 255, 255, 0.3),
			0 0 0 3px rgba(251, 191, 36, 0.3);
		transform: translateY(-5px);
		border-color: rgba(251, 191, 36, 0.5);
	}

	.form-group {
		margin-bottom: 1rem;
	}

	.form-group label {
		display: block;
		font-weight: 600;
		color: var(--text-dark);
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}

	.form-group input {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 2px solid rgba(0, 0, 0, 0.1);
		border-radius: 0.75rem;
		font-size: 1rem;
		transition: all 0.3s ease;
		background: rgba(255, 255, 255, 0.95);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		animation: inputPulse 3s ease-in-out infinite;
	}

	@keyframes inputPulse {
		0%, 100% { 
			box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		}
		50% { 
			box-shadow: 0 4px 20px rgba(251, 191, 36, 0.2);
		}
	}

	.form-group input:focus {
		outline: none;
		border-color: #fbbf24;
		background: rgba(255, 255, 255, 1);
		box-shadow: 
			0 0 0 4px rgba(251, 191, 36, 0.2),
			0 8px 25px rgba(0, 0, 0, 0.15);
		transform: translateY(-2px);
	}

	/* Botones */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 0.5rem;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 1rem;
		gap: 0.5rem;
	}

	.btn-whatsapp {
		background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
		color: #000000;
		width: 100%;
		padding: 1rem 1.5rem;
		font-size: 1.1rem;
		font-weight: 800;
		border-radius: 1rem;
		position: relative;
		overflow: hidden;
		box-shadow: 
			0 10px 30px rgba(251, 191, 36, 0.4),
			0 0 20px rgba(251, 191, 36, 0.2);
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.btn-whatsapp:hover {
		background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
		transform: translateY(-4px);
		box-shadow: 
			0 15px 40px rgba(251, 191, 36, 0.5),
			0 0 30px rgba(251, 191, 36, 0.3);
	}

	.btn-whatsapp:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
	}


	.whatsapp-icon {
		font-size: 1.2em;
	}

	.loading-spinner {
		width: 20px;
		height: 20px;
		border: 2px solid transparent;
		border-top: 2px solid white;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}


	/* Efectos de hover mejorados */
	.btn-whatsapp:hover {
		transform: translateY(-2px) scale(1.02);
		box-shadow: 0 15px 30px rgba(251, 191, 36, 0.4);
	}

	.registration-form:hover {
		transform: translateY(-5px);
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
	}

	/* Efectos de focus mejorados */
	.form-group input:focus {
		transform: scale(1.02);
		box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
	}

	/* Efecto de ondas en botones */
	.btn {
		position: relative;
		overflow: hidden;
	}


	/* Thank You Page */
	.thank-you-section {
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
		min-height: 60vh;
		color: var(--adned-purple);
	}

	.success-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero {
			padding: 1rem 0;
			min-height: auto;
		}

		.hero-title {
			font-size: 1.4rem;
		}

		.hero-subtitle {
			font-size: 1rem;
		}

		.registration-form {
			padding: 1.25rem;
		}
	}

	/* Utility Classes */
	.text-center {
		text-align: center;
	}

	.mb-6 {
		margin-bottom: 1.5rem;
	}

	.mb-8 {
		margin-bottom: 2rem;
	}

	.text-5xl {
		font-size: 3rem;
	}

	.text-xl {
		font-size: 1.25rem;
	}

	.font-bold {
		font-weight: 700;
	}

	.text-green-600 {
		color: #16a34a;
	}

	.text-gray-600 {
		color: var(--text-gray);
	}

	.px-8 {
		padding-left: 2rem;
		padding-right: 2rem;
	}

	.py-3 {
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
	}

	/* Sección de Beneficios */
	.benefits-section {
		background: linear-gradient(135deg, #290040 0%, #3d0060 50%, #290040 100%);
		padding: 0;
		position: relative;
		overflow: hidden;
		margin-top: -2rem;
	}

	.benefits-section::before {
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


	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 6rem 1rem 4rem 1rem;
		position: relative;
		z-index: 2;
	}

	.section-header {
		text-align: center;
		margin-bottom: 3rem;
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

	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	.benefit-card {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		padding: 2.5rem 2rem;
		border-radius: 1.5rem;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
		transition: all 0.3s ease;
		border: 2px solid rgba(251, 191, 36, 0.3);
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
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
		border-color: rgba(251, 191, 36, 0.6);
		background: rgba(255, 255, 255, 1);
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
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.benefit-description {
		color: #4a5568;
		line-height: 1.6;
		font-size: 1rem;
	}

	/* Responsive para beneficios */
	@media (max-width: 768px) {
		.benefits-section {
			padding: 3rem 0;
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
	}

	@media (max-width: 480px) {
		.benefit-card {
			padding: 1.5rem 1rem;
		}
	}
</style>
