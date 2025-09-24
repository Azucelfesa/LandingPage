<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import trpcHttpClient from '$lib/client';
	import { createMouseFollower } from '$lib/advancedAnimations';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	// Declaraciones de tipos para reCAPTCHA
	declare global {
		interface Window {
			grecaptcha: any;
			onCaptchaSuccess: (token: string) => void;
			onCaptchaExpired: () => void;
		}
	}

	// Estado del formulario
	let registrationForm: HTMLFormElement;
	let loadingSpinner: HTMLElement;
	let successIcon: HTMLElement;
	
	let formData = {
		parentName: '',
		studentName: '',
		whatsapp: '',
		email: ''
	};
	
	let isSubmitting = false;
	let showThankYou = false;
	let isFormValid = false;
	let redirectTimer: number | null = null;

	// reCAPTCHA variables
	let captchaToken = '';
	let captchaVerified = false;
	const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

	// Función para validar el formulario
	function validateForm() {
		const { parentName, studentName, whatsapp, email } = formData;
		
		// Validar que todos los campos tengan contenido
		const hasParentName = parentName.trim().length > 0;
		const hasStudentName = studentName.trim().length > 0;
		const hasWhatsapp = whatsapp.trim().length > 0;
		const hasEmail = email.trim().length > 0;
		
		// Validar formato de email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isValidEmail = emailRegex.test(email);
		
		// Validar formato de WhatsApp (solo números, mínimo 10 dígitos)
		const whatsappRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
		const isValidWhatsapp = whatsappRegex.test(whatsapp) && whatsapp.replace(/[^0-9]/g, '').length >= 10;
		
		isFormValid = hasParentName && hasStudentName && hasWhatsapp && hasEmail && isValidEmail && isValidWhatsapp;
	}

	// Función para manejar cambios en los inputs
	function handleInputChange() {
		validateForm();
	}

	// Funciones de reCAPTCHA
	function onCaptchaSuccess(token: string) {
		captchaToken = token;
		captchaVerified = true;
		console.log('CAPTCHA verificado:', token);
	}

	function onCaptchaExpired() {
		captchaToken = '';
		captchaVerified = false;
		console.log('CAPTCHA expirado');
	}

	function resetCaptcha() {
		captchaToken = '';
		captchaVerified = false;
		if (typeof window !== 'undefined' && window.grecaptcha) {
			window.grecaptcha.reset();
		}
	}

	// Hacer las funciones disponibles globalmente para reCAPTCHA
	if (typeof window !== 'undefined') {
		window.onCaptchaSuccess = onCaptchaSuccess;
		window.onCaptchaExpired = onCaptchaExpired;
	}

	// Función para ocultar el mensaje rojo del CAPTCHA
	function hideCaptchaWarning() {
		setTimeout(() => {
			const captchaContainer = document.querySelector('.g-recaptcha');
			if (captchaContainer) {
				// Ocultar cualquier mensaje de advertencia
				const warningElements = captchaContainer.querySelectorAll('div[style*="color: rgb(255, 0, 0)"], div[style*="color: red"]');
				warningElements.forEach(el => {
					el.style.display = 'none';
					el.style.visibility = 'hidden';
					el.style.opacity = '0';
					el.style.height = '0';
					el.style.overflow = 'hidden';
				});
			}
		}, 1000);
	}

	// Función específica para WhatsApp que solo permite números
	function handleWhatsappInput(event: Event) {
		const target = event.target as HTMLInputElement;
		// Remover cualquier carácter que no sea número, +, -, (, ), o espacio
		const cleanValue = target.value.replace(/[^0-9+\-\(\)\s]/g, '');
		formData.whatsapp = cleanValue;
		validateForm();
	}

	// Función para prevenir teclas no numéricas en WhatsApp
	function handleWhatsappKeypress(event: KeyboardEvent) {
		const char = event.key;
		// Permitir: números, +, -, (, ), espacio, backspace, delete, tab, enter, escape
		const allowedKeys = /[0-9+\-\(\)\s]|Backspace|Delete|Tab|Enter|Escape|ArrowLeft|ArrowRight|ArrowUp|ArrowDown/;
		
		if (!allowedKeys.test(char)) {
			event.preventDefault();
		}
	}

	// Variable reactiva para el progreso del formulario
	$: formProgress = (() => {
		const { parentName, studentName, whatsapp, email } = formData;
		let progress = 0;
		
		// Verificar nombre del padre/tutor
		if (parentName.trim().length > 0) progress += 25;
		
		// Verificar nombre del alumno
		if (studentName.trim().length > 0) progress += 25;
		
		// Verificar WhatsApp (solo números, mínimo 10 dígitos)
		const whatsappRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
		if (whatsapp.trim().length > 0 && whatsappRegex.test(whatsapp) && whatsapp.replace(/[^0-9]/g, '').length >= 10) progress += 25;
		
		// Verificar email (formato válido)
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (email.trim().length > 0 && emailRegex.test(email)) progress += 25;
		
		return progress;
	})();

	// Función para manejar el envío del formulario
	async function handleSubmit(event: Event) {
		event.preventDefault();
		
		// Validar que todos los campos estén llenos
		if (!formData.parentName.trim() || !formData.studentName.trim() || !formData.whatsapp.trim() || !formData.email.trim()) {
			console.error('Todos los campos son requeridos');
			console.log('Estado del formulario:', formData);
			return;
		}
		
		// Validar que el CAPTCHA esté verificado
		if (!captchaVerified || !captchaToken) {
			console.error('Por favor, completa el CAPTCHA');
			alert('Por favor, completa el CAPTCHA para continuar');
			return;
		}

		// Verificar el CAPTCHA en el servidor
		try {
			const captchaResponse = await fetch('/api/verify-captcha', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ captchaToken })
			});

			const captchaResult = await captchaResponse.json();

			if (!captchaResult.success) {
				console.error('CAPTCHA inválido:', captchaResult.error);
				alert('CAPTCHA inválido. Por favor, inténtalo de nuevo.');
				resetCaptcha();
				return;
			}

			console.log('CAPTCHA verificado correctamente');
		} catch (error) {
			console.error('Error verificando CAPTCHA:', error);
			alert('Error verificando CAPTCHA. Por favor, inténtalo de nuevo.');
			resetCaptcha();
			return;
		}
		
		// Validar el número de WhatsApp
		const whatsappNumber = parseInt(formData.whatsapp.replace(/\D/g, ''));
		if (isNaN(whatsappNumber) || whatsappNumber <= 0) {
			console.error('Número de WhatsApp inválido:', formData.whatsapp);
			return;
		}
		
		isSubmitting = true;
		
		try {
			const dataToSend = {
				fathersName: formData.parentName.trim(),
				childName: formData.studentName.trim(),
				whatsappNumber: whatsappNumber,
				email: formData.email.trim(),
				captchaToken: captchaToken,
				siteKey: RECAPTCHA_SITE_KEY
			};
			
			console.log('Enviando datos:', dataToSend);
			
			const response = await trpcHttpClient.registerForm.create.mutate(dataToSend);
			
			if (!response.success) {
				throw new Error('Error saving form data');
			}
			
			// Simular envío de datos
			await new Promise(resolve => setTimeout(resolve, 1500));
			
			console.log('Datos del formulario guardados:', response);
			
			isSubmitting = false;
			showThankYou = true;
			
			// Configurar redirección automática después de 5 segundos
			redirectTimer = setTimeout(() => {
				window.location.href = '/';
			}, 5000);
		}
		catch (error: any) {
			console.error('Error during form submission:', error);
			
			// Si es un error de validación de tRPC, mostrar detalles
			if (error.data?.code === 'BAD_REQUEST') {
				console.error('Errores de validación:', error.message);
			}
			
			isSubmitting = false;
		}
	}

	function joinGroup() {
		// Redirigir a WhatsApp
		window.open('https://wa.me/1234567890', '_blank');
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
		// Asegurar que el formulario sea visibl e inmediatamente
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
	<!-- Google reCAPTCHA -->
	<script src="https://www.google.com/recaptcha/api.js" async defer></script>
	<script>
		// Función para ocultar texto rojo del CAPTCHA inmediatamente
		setInterval(function() {
			var captcha = document.querySelector('.g-recaptcha');
			if (captcha) {
				var redTexts = captcha.querySelectorAll('*');
				for (var i = 0; i < redTexts.length; i++) {
					var style = window.getComputedStyle(redTexts[i]);
					if (style.color === 'rgb(255, 0, 0)' || style.color === 'red') {
						redTexts[i].style.display = 'none';
						redTexts[i].style.visibility = 'hidden';
						redTexts[i].style.opacity = '0';
					}
				}
			}
		}, 500);
	</script>
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
							<label for="parentName">Nombre del padre/tutor</label>
							<input 
								type="text" 
								id="parentName" 
								bind:value={formData.parentName}
								on:input={handleInputChange}
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
								on:input={handleInputChange}
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
								on:input={handleWhatsappInput}
								on:keypress={handleWhatsappKeypress}
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
								on:input={handleInputChange}
								required 
								placeholder="tu@email.mx"
							>
					
						</div>
				
					
						
						<!-- Indicador de progreso -->
						<div class="form-progress">
							<div class="progress-bar">
								<div class="progress-fill" style="width: {formProgress}%"></div>
							</div>
							<span class="progress-text">{formProgress}% completado</span>
						</div>

						<!-- Google reCAPTCHA -->
						<div class="captcha-container">
							<div class="g-recaptcha" 
								 data-sitekey={RECAPTCHA_SITE_KEY} 
								 data-callback="onCaptchaSuccess"
								 data-expired-callback="onCaptchaExpired">
							</div>
						</div>

						<button type="submit" class="btn btn-whatsapp" disabled={isSubmitting || !isFormValid || !captchaVerified}>
							{#if isSubmitting}
								<span class="loading-spinner" bind:this={loadingSpinner}></span>
								Registrando...
							{:else}
								<span class="whatsapp-icon">📱</span>
								{#if isFormValid}
									¡Registrarme GRATIS!
								{:else}
									Completa todos los campos
								{/if}
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
						<div class="success-icon" bind:this={successIcon}>✅</div>
						<h2 class="thank-you-title">¡Registro Exitoso!</h2>
						<p class="thank-you-message">
							Gracias por unirte a nuestra comunidad. Ahora puedes acceder al grupo de WhatsApp.
						</p>
						<div class="success-buttons">
							<button class="btn btn-whatsapp" on:click={joinGroup}>
								<span class="whatsapp-icon">📱</span>
								Entrar al grupo de WhatsApp
							</button>
							<button class="btn btn-home" on:click={goToHomePage}>
								<span class="home-icon">🏠</span>
								Volver al inicio
							</button>
						</div>
						<p class="redirect-message">
							Serás redirigido automáticamente al inicio en 5 segundos...
						</p>
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
		gap: 1.5rem;
	}

	.form-group {
		position: relative;
	}

	.form-group label {
		display: block;
		font-weight: 600;
		color: #000000;
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
		transition: all 0.3s ease;
		cursor: pointer;
	}

	.form-group:hover label {
		color: #fbbf24;
		transform: translateX(5px);
	}

	.form-group input {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 2px solid rgba(0, 0, 0, 0.1);
		border-radius: 0.75rem;
		font-size: 1rem;
		color: #000000;
		transition: all 0.3s ease;
		background: rgba(255, 255, 255, 0.95);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.form-group input:hover {
		border-color: rgba(251, 191, 36, 0.3);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		transform: translateY(-1px);
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

	.form-group input:valid {
		border-color: #10b981;
		background: rgba(16, 185, 129, 0.05);
	}

	.form-group input:invalid:not(:placeholder-shown) {
		border-color: #ef4444;
		background: rgba(239, 68, 68, 0.05);
	}

	/* Estilo específico para el campo de WhatsApp */
	input[type="tel"] {
		font-family: 'Courier New', monospace;
		letter-spacing: 0.5px;
	}

	input[type="tel"]::placeholder {
		color: rgba(0, 0, 0, 0.4);
		font-style: italic;
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
		cursor: pointer;
		display: block;
		visibility: visible;
		border: none;
		margin-top: 1rem;
	}

	.btn-whatsapp::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		transition: width 0.6s, height 0.6s;
		z-index: 1;
	}

	.btn-whatsapp:hover::before {
		width: 300px;
		height: 300px;
	}

	.btn-whatsapp:hover {
		transform: translateY(-3px);
		box-shadow: 
			0 15px 40px rgba(251, 191, 36, 0.5),
			0 0 30px rgba(251, 191, 36, 0.3);
	}

	.btn-whatsapp:active {
		transform: translateY(-1px);
		box-shadow: 
			0 8px 20px rgba(251, 191, 36, 0.4),
			0 0 15px rgba(251, 191, 36, 0.2);
	}

	.btn-whatsapp:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
		background: linear-gradient(135deg, #9ca3af 0%, #6b7280 50%, #4b5563 100%);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		display: block;
		visibility: visible;
		position: relative;
		z-index: 10;
		width: 100%;
		padding: 1rem 1.5rem;
		font-size: 1.1rem;
		font-weight: 800;
		border-radius: 1rem;
		border: none;
		margin-top: 1rem;
		color: #ffffff;
	}

	.btn-whatsapp:disabled:hover {
		transform: none;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		background: linear-gradient(135deg, #9ca3af 0%, #6b7280 50%, #4b5563 100%);
	}

	.btn-whatsapp:disabled::before {
		display: none;
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

	/* Indicador de progreso del formulario */
	.form-progress {
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.progress-bar {
		width: 100%;
		height: 8px;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		overflow: hidden;
		margin-bottom: 0.5rem;
		position: relative;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
		border-radius: 4px;
		transition: width 0.5s ease;
		position: relative;
	}

	.progress-fill::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		animation: progressShine 2s infinite;
	}

	@keyframes progressShine {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}

	.progress-text {
		font-size: 0.9rem;
		color: #6b7280;
		font-weight: 500;
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

	.success-buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		margin-bottom: 1rem;
	}

	.btn-home {
		background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%);
		color: #ffffff;
		width: 100%;
		max-width: 300px;
		padding: 1rem 1.5rem;
		font-size: 1.1rem;
		font-weight: 800;
		border-radius: 1rem;
		position: relative;
		overflow: hidden;
		box-shadow: 
			0 10px 30px rgba(59, 130, 246, 0.4),
			0 0 20px rgba(59, 130, 246, 0.2);
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 1px;
		cursor: pointer;
		display: block;
		visibility: visible;
		border: none;
	}

	.btn-home::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		transition: width 0.6s, height 0.6s;
		z-index: 1;
	}

	.btn-home:hover::before {
		width: 300px;
		height: 300px;
	}

	.btn-home:hover {
		transform: translateY(-3px);
		box-shadow: 
			0 15px 40px rgba(59, 130, 246, 0.5),
			0 0 30px rgba(59, 130, 246, 0.3);
		background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #1e3a8a 100%);
	}

	.btn-home:active {
		transform: translateY(-1px);
		box-shadow: 
			0 8px 20px rgba(59, 130, 246, 0.4),
			0 0 15px rgba(59, 130, 246, 0.2);
	}

	.home-icon {
		font-size: 1.2em;
	}

	.redirect-message {
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 0.7; }
		50% { opacity: 1; }
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
	/* .text-glow {
		animation: textGlow 3s ease-in-out infinite;
	}

	@keyframes textGlow {
		0%, 100% {
			text-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
		}
		50% {
			text-shadow: 0 0 30px rgba(249, 115, 22, 0.8), 0 0 40px rgba(251, 191, 36, 0.6);
		}
	} */

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

	/* reCAPTCHA Styles */
	.captcha-container {
		display: flex;
		justify-content: center;
		margin: 1.5rem 0;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 0.75rem;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		position: relative;
		overflow: hidden;
	}

	.captcha-container .g-recaptcha {
		transform: scale(0.9);
		position: relative;
		z-index: 2;
	}

	/* Ocultar completamente el mensaje rojo de reCAPTCHA */
	.g-recaptcha > div > div:first-child,
	.g-recaptcha > div > div:first-child > div,
	.g-recaptcha iframe[src*="recaptcha"][src*="anchor"],
	.g-recaptcha iframe[src*="recaptcha"][src*="bframe"] {
		display: none !important;
		visibility: hidden !important;
		opacity: 0 !important;
		height: 0 !important;
		width: 0 !important;
		position: absolute !important;
		left: -9999px !important;
		top: -9999px !important;
	}

	/* Ocultar cualquier texto rojo que aparezca */
	.captcha-container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 30px;
		background: rgba(255, 255, 255, 0.05);
		z-index: 3;
		backdrop-filter: blur(5px);
	}

	/* Asegurar que solo se vea el checkbox */
	.g-recaptcha > div > div:last-child {
		display: block !important;
		visibility: visible !important;
		opacity: 1 !important;
	}

	/* Solución más agresiva para ocultar texto rojo */
	.g-recaptcha * {
		color: transparent !important;
	}

	.g-recaptcha iframe {
		clip: rect(0, 0, 0, 0) !important;
		position: absolute !important;
		width: 1px !important;
		height: 1px !important;
		margin: -1px !important;
		padding: 0 !important;
		border: 0 !important;
		overflow: hidden !important;
	}

	/* Solo mostrar el checkbox principal */
	.g-recaptcha .recaptcha-checkbox-border {
		display: block !important;
		visibility: visible !important;
	}
</style>
