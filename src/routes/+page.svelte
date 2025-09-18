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
		add3DHoverEffect
	} from '$lib/animations.js';
	// import { 
	// 	createRippleEffect, 
	// 	createMouseFollower, 
	// 	revealTextByWords,
	// 	slideInFromDirection
	// } from '$lib/advancedAnimations.js';
	
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
		background: var(--adned-purple);
		color: var(--bg-white);
		padding: 3rem 0;
		min-height: 60vh;
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
		background: 
			radial-gradient(circle at 20% 80%, rgba(30, 27, 75, 0.3) 0%, transparent 70%),
			radial-gradient(circle at 80% 20%, rgba(49, 46, 129, 0.2) 0%, transparent 70%),
			radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.1) 0%, transparent 80%),
			radial-gradient(circle at 70% 30%, rgba(41, 0, 64, 0.15) 0%, transparent 60%);
		pointer-events: none;
		animation: backgroundShift 8s ease-in-out infinite;
	}

	@keyframes backgroundShift {
		0%, 100% { 
			background: 
				radial-gradient(circle at 20% 80%, rgba(30, 27, 75, 0.3) 0%, transparent 70%),
				radial-gradient(circle at 80% 20%, rgba(49, 46, 129, 0.2) 0%, transparent 70%),
				radial-gradient(circle at 50% 50%, rgba(76, 29, 149, 0.1) 0%, transparent 80%),
				radial-gradient(circle at 70% 30%, rgba(41, 0, 64, 0.15) 0%, transparent 60%);
		}
		50% { 
			background: 
				radial-gradient(circle at 30% 70%, rgba(30, 27, 75, 0.4) 0%, transparent 70%),
				radial-gradient(circle at 70% 30%, rgba(49, 46, 129, 0.3) 0%, transparent 70%),
				radial-gradient(circle at 60% 40%, rgba(76, 29, 149, 0.2) 0%, transparent 80%),
				radial-gradient(circle at 60% 40%, rgba(41, 0, 64, 0.2) 0%, transparent 60%);
		}
	}

	.hero-content-centered {
		max-width: 600px;
		margin: 0 auto;
		text-align: center;
		position: relative;
		z-index: 1;
	}

	.hero-title {
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1.2;
		margin-bottom: 1.5rem;
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
		font-size: 1.2rem;
		line-height: 1.6;
		margin-bottom: 2rem;
		color: #ffffff;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	/* Formulario de registro */
	.registration-form {
		background: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(20px);
		padding: 3rem;
		border-radius: 2rem;
		box-shadow: 
			0 25px 50px rgba(0, 0, 0, 0.6),
			0 0 0 1px rgba(255, 255, 255, 0.2),
			0 0 0 3px rgba(251, 191, 36, 0.2);
		margin-top: 2rem;
		border: 2px solid rgba(251, 191, 36, 0.3);
		position: relative;
		transition: all 0.3s ease;
		opacity: 1;
		transform: translateY(0);
		display: block;
		visibility: visible;
		animation: formGlow 4s ease-in-out infinite;
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
		margin-bottom: 1.5rem;
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
		padding: 1rem 1.25rem;
		border: 2px solid rgba(0, 0, 0, 0.1);
		border-radius: 1rem;
		font-size: 1.1rem;
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
		padding: 1.5rem 2rem;
		font-size: 1.3rem;
		font-weight: 800;
		border-radius: 1.5rem;
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
			padding: 1.5rem 0;
			min-height: auto;
		}

		.hero-title {
			font-size: 1.5rem;
		}


		.hero-subtitle {
			font-size: 1.1rem;
		}

		.registration-form {
			padding: 1.5rem;
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
</style>
