<script>
	import { onMount, onDestroy } from 'svelte';
	import { trpcHttpClient } from '$lib/client';
	import { createMouseFollower } from '$lib/advancedAnimations';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	// Estado del formulario
	let registrationForm: HTMLFormElement;
	let formData = {
		studentName: '',
		whatsapp: '',
		email: ''
	};
	
	let isSubmitting = false;
	let showThankYou = false;
	let isFormValid = false;
	let redirectTimer: number | null = null;

	// Función para validar el formulario
	function validateForm() {
		const nameValid = formData.studentName.trim().length >= 2;
		const whatsappValid = formData.whatsapp.trim().length >= 10;
		const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
		
		isFormValid = nameValid && whatsappValid && emailValid;
		return isFormValid;
	}

	// Función para manejar el envío del formulario
	async function handleSubmit(event: Event) {
		event.preventDefault();
		
		if (!validateForm()) {
			return;
		}

		isSubmitting = true;

		try {
			// Simular llamada a la API
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			// Aquí iría la llamada real a la API
			// await trpcHttpClient.registerForm.create.mutate(formData);
			
			showThankYou = true;
			
			// Configurar redirección automática después de 5 segundos
			redirectTimer = setTimeout(() => {
				window.location.href = '/';
			}, 5000);
			
		} catch (error) {
			console.error('Error al enviar el formulario:', error);
			alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
		} finally {
			isSubmitting = false;
		}
	}

	function goToHomePage() {
		// Limpiar el timer si existe
		if (redirectTimer) {
			clearTimeout(redirectTimer);
			redirectTimer = null;
		}
		// Redirigir a la página de inicio
		window.location.href = '/';
	}

	onMount(() => {
		// Asegurar que el formulario sea visible inmediatamente
		if (registrationForm) {
			registrationForm.style.opacity = '1';
		}

		// Crear el efecto de seguimiento del mouse
		createMouseFollower(document.body);

		// Agregar efectos de partículas flotantes
		const createFloatingParticle = () => {
			const particle = document.createElement('div');
			particle.className = 'floating-particle';
			particle.style.left = Math.random() * 100 + '%';
			particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
			particle.style.animationDelay = Math.random() * 2 + 's';
			document.body.appendChild(particle);

			setTimeout(() => {
				if (particle.parentNode) {
					particle.parentNode.removeChild(particle);
				}
			}, 5000);
		};

		// Crear partículas cada 2 segundos
		const particleInterval = setInterval(createFloatingParticle, 2000);

		// Limpiar el intervalo al desmontar
		return () => {
			clearInterval(particleInterval);
		};
	});

	onDestroy(() => {
		// Limpiar el timer si existe
		if (redirectTimer) {
			clearTimeout(redirectTimer);
		}
	});
</script>

<svelte:head>
	<title>Formulario de Registro - ADNED</title>
	<meta name="description" content="Regístrate en ADNED y forma parte de nuestra comunidad educativa. Acceso gratuito a material de estudio y preparación para exámenes de admisión." />
</svelte:head>

<Header />

<main class="formulario-main">
	<!-- Sección Hero del Formulario -->
	<section class="formulario-hero">
		<div class="container">
			<div class="hero-content">
				<div class="hero-text">
					<h1 class="hero-title text-glow text-zoom-rotate">
						Únete a Nuestra Comunidad Educativa
					</h1>
					<p class="hero-subtitle text-zoom-smooth">
						Regístrate ahora y forma parte de más de 1,200 estudiantes que ya confían en ADNED para su preparación académica
					</p>
					<div class="hero-stats">
						<div class="stat-item">
							<div class="stat-number">1,200+</div>
							<div class="stat-label">Estudiantes</div>
						</div>
						<div class="stat-item">
							<div class="stat-number">95%</div>
							<div class="stat-label">Éxito</div>
						</div>
						<div class="stat-item">
							<div class="stat-number">100%</div>
							<div class="stat-label">Gratuito</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Formulario de Registro -->
	<section class="registration-section">
		<div class="container">
			{#if !showThankYou}
				<div class="form-container">
					<div class="form-header">
						<h2 class="form-title">Formulario de Registro</h2>
						<p class="form-subtitle">
							Completa tus datos para acceder a nuestro grupo de WhatsApp y comenzar tu preparación
						</p>
					</div>

					<form bind:this={registrationForm} on:submit={handleSubmit} class="registration-form">
						<div class="form-group">
							<input
								type="text"
								id="studentName"
								bind:value={formData.studentName}
								on:input={validateForm}
								required
								class="form-input"
								placeholder=" "
							/>
							<label for="studentName" class="form-label">Nombre completo del estudiante</label>
						</div>

						<div class="form-group">
							<input
								type="tel"
								id="whatsapp"
								bind:value={formData.whatsapp}
								on:input={validateForm}
								required
								class="form-input"
								placeholder=" "
							/>
							<label for="whatsapp" class="form-label">Número de WhatsApp</label>
						</div>

						<div class="form-group">
							<input
								type="email"
								id="email"
								bind:value={formData.email}
								on:input={validateForm}
								required
								class="form-input"
								placeholder=" "
							/>
							<label for="email" class="form-label">Correo electrónico</label>
						</div>

						<button
							type="submit"
							class="btn btn-primary btn-submit"
							disabled={!isFormValid || isSubmitting}
						>
							{#if isSubmitting}
								<div class="btn-loading">
									<div class="spinner"></div>
									<span>Procesando...</span>
								</div>
							{:else}
								<span>Unirme al Grupo</span>
								<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M9 12l2 2 4-4"/>
									<path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
									<path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
									<path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
									<path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
								</svg>
							{/if}
						</button>
					</form>

					<div class="form-footer">
						<p class="privacy-text">
							Al registrarte, aceptas nuestros términos de servicio y política de privacidad.
						</p>
					</div>
				</div>
			{:else}
				<!-- Página de Agradecimiento -->
				<div class="thank-you-container">
					<div class="thank-you-content">
						<div class="success-icon">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M9 12l2 2 4-4"/>
								<path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
								<path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
								<path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
								<path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
							</svg>
						</div>
						<h2 class="thank-you-title">¡Bienvenido a ADNED!</h2>
						<p class="thank-you-message">
							Tu registro ha sido exitoso. Te redirigiremos automáticamente a la página principal en unos segundos.
						</p>
						<div class="redirect-info">
							<p class="redirect-text">
								Serás redirigido en <span class="countdown">5</span> segundos...
							</p>
						</div>
						<button class="btn btn-secondary" on:click={goToHomePage}>
							<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
								<polyline points="9,22 9,12 15,12 15,22"/>
							</svg>
							Volver al inicio
						</button>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<!-- Sección de Beneficios -->
	<section class="benefits-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title text-glow text-zoom-rotate">¿Qué Obtienes al Registrarte?</h2>
				<p class="section-subtitle text-zoom-smooth">
					Accede a todos estos beneficios de forma completamente gratuita
				</p>
			</div>

			<div class="benefits-grid">
				<div class="benefit-card">
					<div class="benefit-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
							<line x1="8" y1="21" x2="16" y2="21"/>
							<line x1="12" y1="17" x2="12" y2="21"/>
						</svg>
					</div>
					<h3 class="benefit-title">Clases en Línea</h3>
					<p class="benefit-desc">Acceso a clases virtuales desde cualquier lugar</p>
				</div>

				<div class="benefit-card">
					<div class="benefit-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m0-7v7m0-7h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H9m0-7V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
						</svg>
					</div>
					<h3 class="benefit-title">Simulacros</h3>
					<p class="benefit-desc">Pruebas de práctica para evaluar tu progreso</p>
				</div>

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
					<h3 class="benefit-title">Banco de Preguntas</h3>
					<p class="benefit-desc">Amplia base de datos con preguntas de exámenes</p>
				</div>

				<div class="benefit-card">
					<div class="benefit-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
							<circle cx="9" cy="7" r="4"/>
							<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
							<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
						</svg>
					</div>
					<h3 class="benefit-title">Acompañamiento</h3>
					<p class="benefit-desc">Soporte personalizado durante todo el proceso</p>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	/* Variables CSS - Paleta Profesional */
	:root {
		--primary-blue: #1e40af;
		--primary-dark: #1e3a8a;
		--accent-orange: #f97316;
		--accent-yellow: #fbbf24;
		--text-dark: #1f2937;
		--text-light: #6b7280;
		--bg-light: #f8fafc;
		--bg-white: #ffffff;
		--border-light: #e5e7eb;
		--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
		--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
	}

	/* Reset y estilos base */
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		line-height: 1.6;
		color: var(--text-dark);
		background: var(--bg-light);
		overflow-x: hidden;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	/* Formulario Main */
	.formulario-main {
		min-height: 100vh;
		background: linear-gradient(135deg, #290040 0%, #3d0060 50%, #290040 100%);
		position: relative;
		overflow: hidden;
	}

	.formulario-main::before {
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
			transform: translateX(0) translateY(0);
		}
		25% {
			transform: translateX(-10px) translateY(-5px);
		}
		50% {
			transform: translateX(5px) translateY(-10px);
		}
		75% {
			transform: translateX(-5px) translateY(5px);
		}
	}

	/* Hero Section del Formulario */
	.formulario-hero {
		padding: 8rem 0 4rem 0;
		position: relative;
		z-index: 2;
	}

	.hero-content {
		text-align: center;
		max-width: 800px;
		margin: 0 auto;
	}

	.hero-title {
		font-size: 3.5rem;
		font-weight: 800;
		color: #ffffff;
		margin-bottom: 1.5rem;
		text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtitle {
		font-size: 1.25rem;
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 3rem;
		line-height: 1.7;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.hero-stats {
		display: flex;
		justify-content: center;
		gap: 3rem;
		margin-top: 2rem;
	}

	.stat-item {
		text-align: center;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		padding: 1.5rem 2rem;
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
		transition: all 0.3s ease;
	}

	.stat-item:hover {
		transform: translateY(-5px);
		background: rgba(255, 255, 255, 0.15);
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
	}

	.stat-number {
		font-size: 2.5rem;
		font-weight: 800;
		color: #fbbf24;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	/* Registration Section */
	.registration-section {
		padding: 4rem 0;
		position: relative;
		z-index: 2;
	}

	.form-container {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 2rem;
		padding: 3rem;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
		border: 2px solid rgba(251, 191, 36, 0.3);
		max-width: 600px;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
	}

	.form-container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
	}

	.form-header {
		text-align: center;
		margin-bottom: 2.5rem;
	}

	.form-title {
		font-size: 2rem;
		font-weight: 700;
		color: #290040;
		margin-bottom: 1rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.form-subtitle {
		font-size: 1.1rem;
		color: #6b7280;
		line-height: 1.6;
	}

	.registration-form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.form-group {
		position: relative;
	}

	.form-input {
		width: 100%;
		padding: 1rem 1.25rem;
		border: 2px solid #e5e7eb;
		border-radius: 0.75rem;
		font-size: 1rem;
		background: #ffffff;
		transition: all 0.3s ease;
		outline: none;
	}

	.form-input:focus {
		border-color: #f97316;
		box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
		transform: translateY(-2px);
	}

	.form-input:valid {
		border-color: #10b981;
		background: rgba(16, 185, 129, 0.05);
	}

	.form-label {
		position: absolute;
		left: 1.25rem;
		top: 50%;
		transform: translateY(-50%);
		background: #ffffff;
		padding: 0 0.5rem;
		color: #6b7280;
		font-size: 1rem;
		transition: all 0.3s ease;
		pointer-events: none;
		z-index: 1;
	}

	.form-input:focus + .form-label,
	.form-input:not(:placeholder-shown) + .form-label {
		top: 0;
		font-size: 0.875rem;
		color: #f97316;
		font-weight: 600;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 1rem 2rem;
		border: none;
		border-radius: 0.75rem;
		font-weight: 600;
		font-size: 1.1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		text-decoration: none;
		position: relative;
		overflow: hidden;
	}

	.btn-primary {
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		color: #ffffff;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.btn-primary:hover:not(:disabled) {
		background: linear-gradient(135deg, #ea580c 0%, #d97706 50%, #2563eb 100%);
		transform: translateY(-3px);
		box-shadow: 0 12px 35px rgba(249, 115, 22, 0.6);
		text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
	}

	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
	}

	.btn-secondary {
		background: rgba(255, 255, 255, 0.1);
		color: #ffffff;
		border: 2px solid rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(10px);
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.5);
		transform: translateY(-2px);
	}

	.btn-icon {
		width: 20px;
		height: 20px;
		transition: transform 0.3s ease;
	}

	.btn:hover .btn-icon {
		transform: scale(1.1);
	}

	.btn-loading {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.spinner {
		width: 20px;
		height: 20px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top: 2px solid #ffffff;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.form-footer {
		text-align: center;
		margin-top: 1.5rem;
	}

	.privacy-text {
		font-size: 0.875rem;
		color: #6b7280;
		line-height: 1.5;
	}

	/* Thank You Page */
	.thank-you-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 60vh;
	}

	.thank-you-content {
		text-align: center;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		padding: 3rem;
		border-radius: 2rem;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
		border: 2px solid rgba(16, 185, 129, 0.3);
		max-width: 500px;
		position: relative;
		overflow: hidden;
	}

	.thank-you-content::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%);
	}

	.success-icon {
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 2rem auto;
		box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
		animation: successPulse 2s ease-in-out infinite;
	}

	.success-icon svg {
		width: 40px;
		height: 40px;
		color: white;
	}

	@keyframes successPulse {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	.thank-you-title {
		font-size: 2rem;
		font-weight: 700;
		color: #290040;
		margin-bottom: 1rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.thank-you-message {
		font-size: 1.1rem;
		color: #6b7280;
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.redirect-info {
		background: rgba(16, 185, 129, 0.1);
		padding: 1rem;
		border-radius: 0.75rem;
		margin-bottom: 2rem;
		border: 1px solid rgba(16, 185, 129, 0.2);
	}

	.redirect-text {
		font-size: 1rem;
		color: #059669;
		font-weight: 600;
	}

	.countdown {
		font-weight: 800;
		font-size: 1.2rem;
		color: #10b981;
	}

	/* Benefits Section */
	.benefits-section {
		padding: 4rem 0;
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(10px);
		position: relative;
		z-index: 2;
	}

	.section-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.section-title {
		font-size: 2.5rem;
		font-weight: 700;
		color: #ffffff;
		margin-bottom: 1rem;
		text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.section-subtitle {
		font-size: 1.2rem;
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.6;
	}

	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		max-width: 1000px;
		margin: 0 auto;
	}

	.benefit-card {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		padding: 2rem;
		border-radius: 1.5rem;
		text-align: center;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
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
		transform: translateY(-8px);
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
		border-color: rgba(251, 191, 36, 0.6);
		background: rgba(255, 255, 255, 1);
	}

	.benefit-icon {
		width: 60px;
		height: 60px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 1.5rem auto;
		box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
		transition: all 0.3s ease;
	}

	.benefit-card:hover .benefit-icon {
		transform: scale(1.1);
		box-shadow: 0 12px 25px rgba(249, 115, 22, 0.4);
	}

	.benefit-icon svg {
		width: 30px;
		height: 30px;
		color: white;
	}

	.benefit-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: #290040;
		margin-bottom: 1rem;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	.benefit-desc {
		font-size: 1rem;
		color: #6b7280;
		line-height: 1.5;
	}

	/* Floating Particles */
	.floating-particle {
		position: fixed;
		width: 4px;
		height: 4px;
		background: rgba(251, 191, 36, 0.6);
		border-radius: 50%;
		pointer-events: none;
		z-index: 1;
		animation: floatUp 5s linear infinite;
	}

	@keyframes floatUp {
		0% {
			transform: translateY(100vh) rotate(0deg);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			transform: translateY(-100px) rotate(360deg);
			opacity: 0;
		}
	}

	/* Animaciones de texto */
	.text-glow {
		animation: textGlow 3s ease-in-out infinite;
	}

	@keyframes textGlow {
		0%, 100% {
			text-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
		}
		50% {
			text-shadow: 0 0 30px rgba(249, 115, 22, 0.8), 0 0 40px rgba(251, 191, 36, 0.6);
		}
	}

	.text-zoom-rotate {
		animation: zoomRotate 4s ease-in-out infinite;
	}

	@keyframes zoomRotate {
		0%, 100% {
			transform: scale(1) rotate(0deg);
		}
		50% {
			transform: scale(1.02) rotate(1deg);
		}
	}

	.text-zoom-smooth {
		animation: zoomSmooth 3s ease-in-out infinite;
	}

	@keyframes zoomSmooth {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.01);
		}
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero-title {
			font-size: 2.5rem;
		}

		.hero-subtitle {
			font-size: 1.1rem;
		}

		.hero-stats {
			flex-direction: column;
			gap: 1.5rem;
			align-items: center;
		}

		.stat-item {
			padding: 1rem 1.5rem;
		}

		.form-container {
			padding: 2rem;
			margin: 0 1rem;
		}

		.form-title {
			font-size: 1.75rem;
		}

		.benefits-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.section-title {
			font-size: 2rem;
		}
	}

	@media (max-width: 480px) {
		.hero-title {
			font-size: 2rem;
		}

		.form-container {
			padding: 1.5rem;
		}

		.form-title {
			font-size: 1.5rem;
		}

		.btn {
			padding: 0.875rem 1.5rem;
			font-size: 1rem;
		}
	}
</style>
