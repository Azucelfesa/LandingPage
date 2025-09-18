<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { PageData } from './$types';
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
	import { 
		createRippleEffect, 
		createMouseFollower, 
		revealTextByWords,
		slideInFromDirection as advancedSlideIn
	} from '$lib/advancedAnimations';
    import trpcHttpClient from '$lib/client';
	// import { 
	// 	createRippleEffect, 
	// 	createMouseFollower, 
	// 	revealTextByWords,
	// 	slideInFromDirection
	// } from '$lib/advancedAnimations';

	// Props que SvelteKit puede pasar automáticamente
	export let data: PageData = {} as PageData;
	
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
	
	// Estado para controlar qué FAQ está abierto
	let openFaq: number | null = null;

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}

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
	
	// Referencias para animaciones
	let heroTitle: HTMLElement;
	let heroSubtitle: HTMLElement;
	let registrationForm: HTMLElement;
	let heroSection: HTMLElement;
	let loadingSpinner: HTMLElement;
	let successIcon: HTMLElement;
	let sectionTitles: HTMLElement[] = [];
	let benefitCards: HTMLElement[] = [];
	let testimonialCards: HTMLElement[] = [];
	
	async function handleSubmit(event: any) {
		event.preventDefault();
		
		// Validar que todos los campos estén llenos
		if (!formData.parentName.trim() || !formData.studentName.trim() || !formData.whatsapp.trim() || !formData.email.trim()) {
			console.error('Todos los campos son requeridos');
			console.log('Estado del formulario:', formData);
			shakeElement(registrationForm);
			return;
		}
		
		// Validar el número de WhatsApp
		const whatsappNumber = parseInt(formData.whatsapp.replace(/\D/g, ''));
		if (isNaN(whatsappNumber) || whatsappNumber <= 0) {
			console.error('Número de WhatsApp inválido:', formData.whatsapp);
			shakeElement(registrationForm);
			return;
		}
		
		isSubmitting = true;
		
		// Animar el spinner de carga
		if (loadingSpinner) {
			animateSpinner(loadingSpinner);
		}
		
		try {
			const dataToSend = {
				fathersName: formData.parentName.trim(),
				childName: formData.studentName.trim(),
				whatsappNumber: whatsappNumber,
				email: formData.email.trim()
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
			
			// Animar el ícono de éxito
			if (successIcon) {
				animateSuccess(successIcon);
			}
			
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
			shakeElement(registrationForm);
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
		// Asegurar que el formulario sea visible inmediatamente
		if (registrationForm) {
			registrationForm.style.opacity = '1';
			registrationForm.style.transform = 'translateY(0)';
			registrationForm.style.display = 'block';
			registrationForm.style.visibility = 'visible';
		}

		// Asegurar funcionalidad básica de inputs
		setTimeout(() => {
			const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
			inputs.forEach(input => {
				(input as HTMLInputElement).style.pointerEvents = 'auto';
				(input as HTMLInputElement).style.userSelect = 'text';
				(input as HTMLInputElement).style.webkitUserSelect = 'text';
				(input as HTMLInputElement).style.position = 'relative';
				(input as HTMLInputElement).style.zIndex = '1000';
				(input as HTMLInputElement).style.transform = 'none';
				(input as HTMLInputElement).style.animation = 'none';
			});
		}, 100);
		
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

			// Agregar partículas a la sección de misión y visión
			setTimeout(() => {
				const benefitsSection = document.querySelector('.benefits-section');
				if (benefitsSection) {
					createBackgroundParticlesForBenefits(benefitsSection);
				}
			}, 3000);

			// NUEVAS ANIMACIONES DE TEXTO INTERACTIVAS
			
			// Asegurar que el texto sea visible primero
			setTimeout(() => {
				if (heroTitle) {
					heroTitle.style.opacity = '1';
					heroTitle.style.visibility = 'visible';
					heroTitle.style.display = 'block';
				}
				if (heroSubtitle) {
					heroSubtitle.style.opacity = '1';
					heroSubtitle.style.visibility = 'visible';
					heroSubtitle.style.display = 'block';
				}
			}, 100);

			// Animación de escritura para el título principal (solo después de que sea visible)
			setTimeout(() => {
				if (heroTitle) {
					// Aplicar animación de escritura sin ocultar el texto
					heroTitle.classList.add('typewriter');
				}
			}, 1000);

			// Animación de revelado palabra por palabra para subtítulos (solo después de que sean visibles)
			setTimeout(() => {
				const subtitles = document.querySelectorAll('.hero-subtitle, .section-subtitle, .cta-description');
				subtitles.forEach((subtitle, index) => {
					setTimeout(() => {
						// Aplicar animación sin ocultar el texto
						subtitle.classList.add('word-reveal');
					}, index * 200);
				});
			}, 1500);

			// Animación de aparición escalonada para títulos de sección
			setTimeout(() => {
				const titles = document.querySelectorAll('.section-title, .cta-title');
				titles.forEach((title, index) => {
					setTimeout(() => {
						advancedSlideIn(title as HTMLElement, 'bottom', 0.8);
					}, index * 300);
				});
			}, 1500);

			// Animación de hover mejorada para títulos
			setTimeout(() => {
				const allTitles = document.querySelectorAll('h1, h2, h3');
				allTitles.forEach(title => {
					title.addEventListener('mouseenter', () => {
						(title as HTMLElement).style.transform = 'scale(1.05) translateY(-2px)';
						(title as HTMLElement).style.textShadow = '0 0 20px rgba(249, 115, 22, 0.6)';
						(title as HTMLElement).style.transition = 'all 0.3s ease';
					});
					title.addEventListener('mouseleave', () => {
						(title as HTMLElement).style.transform = 'scale(1) translateY(0)';
						(title as HTMLElement).style.textShadow = '';
					});
				});
			}, 2000);

			// Animación de ondas en elementos interactivos (excluyendo formulario)
			setTimeout(() => {
				const interactiveElements = document.querySelectorAll('.btn:not(.btn-whatsapp), .benefit-card, .testimonial-card, .faq-item');
				interactiveElements.forEach(element => {
					createRippleEffect(element);
				});
			}, 2500);

			// Seguidor de mouse para elementos de texto
			setTimeout(() => {
				createMouseFollower(document.body);
			}, 3000);
			
		}, 200);
	});

	onDestroy(() => {
		// Limpiar el timer si existe cuando el componente se desmonte
		if (redirectTimer) {
			clearTimeout(redirectTimer);
			redirectTimer = null;
		}
	});
</script>

<svelte:head>
	<title>ADNED </title>
	<meta name="description" content="La guía que todo padre necesita para que su hijo ingrese a la prepa de sus sueños. Regístrate GRATIS y recibe consejos, guías y recordatorios clave del proceso de admisión ECOEMS 2026." />
	<link rel="icon" type="image/png" href="/photo_2025-09-12_15-08-29.jpg" />
	<link rel="shortcut icon" type="image/png" href="/photo_2025-09-12_15-08-29.jpg" />
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
					<div class="success-buttons">
						<button class="btn btn-whatsapp text-lg px-8 py-3" on:click={joinGroup}>
							<span class="whatsapp-icon">📱</span>
							Entrar al grupo de WhatsApp
						</button>
						<button class="btn btn-home text-lg px-8 py-3" on:click={goToHomePage}>
							<span class="home-icon">🏠</span>
							Volver al inicio
						</button>
					</div>
					<p class="redirect-message text-sm text-gray-500 mt-4">
						Serás redirigido automáticamente al inicio en 5 segundos...
					</p>
				</div>
			</div>
		</section>
	{:else}
		<!-- Hero Section -->
		<section class="hero" bind:this={heroSection}>
			<div class="container">
				<div class="hero-content-centered">
					<h1 class="hero-title text-glow text-zoom-ultra" bind:this={heroTitle}>
				
						La guía que todo padre necesita para que su hijo ingrese a la prepa de sus sueños
					</h1>
					<h2 class="hero-subtitle text-zoom-smooth" bind:this={heroSubtitle}>
						Regístrate <strong>GRATIS</strong> y recibe en tu WhatsApp consejos, guías y recordatorios clave del proceso de admisión <strong>ECOEMS 2026</strong>.
					</h2>
					
					<!-- Formulario de registro -->
					<div class="form-container">
						<form class="registration-form static-form" bind:this={registrationForm} on:submit={handleSubmit}>
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
									placeholder="tu@email.com"
								>
							</div>
							
							<!-- Indicador de progreso -->
							<div class="form-progress">
								<div class="progress-bar">
									<div class="progress-fill" style="width: {formProgress}%"></div>
								</div>
								<span class="progress-text">{formProgress}% completado</span>
							</div>

							<button type="submit" class="btn btn-whatsapp" disabled={isSubmitting || !isFormValid}>
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
					</div>
					</div>
				</div>
		</section>
	{/if}

	<!-- Sección de Misión y Visión -->
	<section id="beneficios" class="benefits-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title text-glow text-zoom-rotate">ADNED</h2>
				<p class="section-subtitle text-zoom-smooth">
					Conoce los valores y objetivos que nos impulsan a ayudarte
				</p>
			</div>

			<div class="benefits-grid">
				<!-- Misión -->
				<div class="benefit-card">
					<div class="benefit-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
						</svg>
					</div>
					<h3 class="benefit-title">Misión</h3>
					<p class="benefit-description">
						Ofrecer cursos innovadores, accesibles y de calidad que preparen a los 
						estudiantes para superar los exámenes de admisión al bachillerato y la 
						universidad, brindándoles confianza, motivación y herramientas modernas que los 
						acerquen a lograr sus sueños académicos.
					</p>
				</div>

				<!-- Visión -->
				<div class="benefit-card">
					<div class="benefit-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
							<circle cx="12" cy="12" r="3"/>
						</svg>
					</div>
					<h3 class="benefit-title">Visión</h3>
					<p class="benefit-description">
						Convertirse en la comunidad educativa líder en México para la preparación de 
						exámenes de admisión, reconocida por su enfoque futurista, juvenil y motivador, 
						que acompaña a cada alumno en su camino al éxito académico.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Sección de Testimonios -->
	<section id="testimonios" class="testimonials-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title text-glow text-zoom-rotate">Lo que dicen otros padres como tú</h2>
				<p class="section-subtitle text-zoom-smooth">
					Más de 1,200 padres y alumnos ya están dentro de ADNED recibiendo información exclusiva
				</p>
			</div>

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

	<!-- Sección CTA Intermedio -->
	<section id="cta-intermedio" class="cta-intermedio-section">
		<div class="container">
			<div class="cta-content">
				<h2 class="cta-title text-glow text-zoom-ultra">No dejes que tu hijo se quede fuera de su prepa soñada</h2>
				<p class="cta-description text-zoom-smooth">Únete ahora y recibe toda la información en tu celular</p>
				<button class="cta-button" on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
					<svg class="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M9 12l2 2 4-4"/>
						<path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
						<path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
						<path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
						<path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
					</svg>
					Registrarme y entrar al grupo
				</button>
			</div>
		</div>
	</section>

	<!-- Sección de Preguntas Frecuentes -->
	<section id="preguntas-frecuentes" class="faq-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title text-glow text-zoom-rotate">¿Tienes dudas? Te las resolvemos</h2>
				<p class="section-subtitle text-zoom-smooth">
					Aquí están las respuestas a las preguntas más comunes de padres como tú
				</p>
			</div>

			<div class="faq-container">
				<div class="faq-item" class:open={openFaq === 0}>
					<button class="faq-question" on:click={() => toggleFaq(0)}>
						<span class="question-text">¿Tiene costo el grupo?</span>
						<svg class="faq-icon" class:rotated={openFaq === 0} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="6,9 12,15 18,9"/>
						</svg>
					</button>
					<div class="faq-answer" class:open={openFaq === 0}>
						<p>No, es 100% gratuito.</p>
					</div>
				</div>

				<div class="faq-item" class:open={openFaq === 1}>
					<button class="faq-question" on:click={() => toggleFaq(1)}>
						<span class="question-text">¿Por qué piden mis datos?</span>
						<svg class="faq-icon" class:rotated={openFaq === 1} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="6,9 12,15 18,9"/>
						</svg>
					</button>
					<div class="faq-answer" class:open={openFaq === 1}>
						<p>Para enviarte información personalizada y asegurarnos de que recibas todo el contenido.</p>
					</div>
				</div>

				<div class="faq-item" class:open={openFaq === 2}>
					<button class="faq-question" on:click={() => toggleFaq(2)}>
						<span class="question-text">¿Cuánto tiempo estaré en el grupo?</span>
						<svg class="faq-icon" class:rotated={openFaq === 2} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="6,9 12,15 18,9"/>
						</svg>
					</button>
					<div class="faq-answer" class:open={openFaq === 2}>
						<p>Hasta que termine el proceso de admisión ECOEMS.</p>
					</div>
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
		padding: 0 0 4rem 0;
		min-height: auto;
		display: flex;
		align-items: flex-start;
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
		animation: none !important;
		transform: none !important;
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
		animation: titleFloat 3s ease-in-out infinite;
		transition: all 0.3s ease;
		cursor: pointer;
		opacity: 1;
		visibility: visible;
		display: block;
	}

	@keyframes titleFloat {
		0%, 100% { transform: translateY(0px) scale(1); }
		25% { transform: translateY(-15px) scale(1.02); }
		50% { transform: translateY(-20px) scale(1.05); }
		75% { transform: translateY(-15px) scale(1.02); }
	}

	/* Animaciones de texto interactivas */
	.hero-title:hover {
		transform: scale(1.05) translateY(-5px);
		text-shadow: 
			0 0 20px rgba(249, 115, 22, 0.6),
			0 0 30px rgba(251, 191, 36, 0.4),
			0 0 40px rgba(59, 130, 246, 0.4),
			0 4px 12px rgba(0, 0, 0, 0.7);
		filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.5));
	}

	/* Animación de escritura */
	.typewriter {
		overflow: hidden;
		border-right: 3px solid #f97316;
		white-space: nowrap;
		animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
		opacity: 1;
		visibility: visible;
	}

	@keyframes typing {
		from { width: 0; }
		to { width: 100%; }
	}

	@keyframes blink-caret {
		from, to { border-color: transparent; }
		50% { border-color: #f97316; }
	}

	/* Animación de revelado palabra por palabra */
	.word-reveal {
		opacity: 1;
		transform: translateY(0);
		animation: wordReveal 0.6s ease forwards;
	}

	@keyframes wordReveal {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Animación de hover para todos los títulos */
	h1, h2, h3 {
		transition: all 0.3s ease;
		cursor: pointer;
	}

	h1:hover, h2:hover, h3:hover {
		transform: scale(1.05) translateY(-2px);
		text-shadow: 0 0 20px rgba(249, 115, 22, 0.6);
	}

	/* Animación de ondas en texto */
	.text-wave {
		animation: textWave 1.5s ease-in-out infinite;
	}

	@keyframes textWave {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		25% { transform: translateY(-8px) rotate(1deg); }
		50% { transform: translateY(-12px) rotate(0deg); }
		75% { transform: translateY(-8px) rotate(-1deg); }
	}

	/* Animación de brillo en texto */
	.text-glow {
		animation: textGlow 2s ease-in-out infinite alternate;
	}

	@keyframes textGlow {
		from {
			text-shadow: 0 0 10px rgba(249, 115, 22, 0.3);
		}
		to {
			text-shadow: 0 0 25px rgba(249, 115, 22, 0.9), 0 0 40px rgba(251, 191, 36, 0.6), 0 0 50px rgba(59, 130, 246, 0.4);
		}
	}

	/* Animación de rotación sutil */
	.text-rotate {
		animation: textRotate 2.5s ease-in-out infinite;
	}

	@keyframes textRotate {
		0%, 100% { transform: rotate(0deg) scale(1); }
		25% { transform: rotate(2deg) scale(1.02); }
		50% { transform: rotate(0deg) scale(1.05); }
		75% { transform: rotate(-2deg) scale(1.02); }
	}

	/* Animación de pulso dinámico */
	.text-pulse {
		animation: textPulse 1.8s ease-in-out infinite;
	}

	@keyframes textPulse {
		0%, 100% { 
			transform: scale(1) translateY(0px);
			text-shadow: 0 0 10px rgba(249, 115, 22, 0.3);
		}
		50% { 
			transform: scale(1.08) translateY(-8px);
			text-shadow: 0 0 30px rgba(249, 115, 22, 0.8), 0 0 40px rgba(251, 191, 36, 0.5);
		}
	}

	/* Animación de rebote */
	.text-bounce {
		animation: textBounce 2s ease-in-out infinite;
	}

	@keyframes textBounce {
		0%, 100% { transform: translateY(0px); }
		25% { transform: translateY(-10px); }
		50% { transform: translateY(-15px); }
		75% { transform: translateY(-5px); }
	}

	/* Animación de zoom continuo - ACERCAR Y ALEJAR - RÁPIDA */
	.text-zoom {
		animation: textZoom 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
	}

	@keyframes textZoom {
		0%, 100% { 
			transform: scale(1) translateY(0px);
			text-shadow: 0 0 10px rgba(249, 115, 22, 0.3);
		}
		50% { 
			transform: scale(1.3) translateY(-10px);
			text-shadow: 0 0 30px rgba(249, 115, 22, 0.8), 0 0 40px rgba(251, 191, 36, 0.6), 0 0 50px rgba(59, 130, 246, 0.4);
		}
	}

	/* Animación de zoom más suave - RÁPIDA */
	.text-zoom-smooth {
		animation: textZoomSmooth 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
	}

	@keyframes textZoomSmooth {
		0%, 100% { 
			transform: scale(1) translateY(0px);
			text-shadow: 0 0 8px rgba(251, 191, 36, 0.2);
		}
		50% { 
			transform: scale(1.2) translateY(-8px);
			text-shadow: 0 0 16px rgba(251, 191, 36, 0.6), 0 0 24px rgba(249, 115, 22, 0.3);
		}
	}

	/* Animación de zoom con rotación - RÁPIDA */
	.text-zoom-rotate {
		animation: textZoomRotate 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
	}

	@keyframes textZoomRotate {
		0%, 100% { 
			transform: scale(1) rotate(0deg) translateY(0px);
			text-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
		}
		50% { 
			transform: scale(1.25) rotate(0deg) translateY(-6px);
			text-shadow: 0 0 25px rgba(59, 130, 246, 0.8), 0 0 35px rgba(251, 191, 36, 0.6), 0 0 45px rgba(249, 115, 22, 0.4);
		}
	}

	/* Animación de zoom ultra fluida para títulos principales - RÁPIDA */
	.text-zoom-ultra {
		animation: textZoomUltra 3s cubic-bezier(0.23, 1, 0.32, 1) infinite;
	}

	@keyframes textZoomUltra {
		0%, 100% { 
			transform: scale(1) translateY(0px);
			text-shadow: 0 0 15px rgba(249, 115, 22, 0.4);
		}
		50% { 
			transform: scale(1.2) translateY(-8px);
			text-shadow: 0 0 27px rgba(249, 115, 22, 0.8), 0 0 40px rgba(251, 191, 36, 0.6), 0 0 50px rgba(59, 130, 246, 0.4);
		}
	}

	/* Proteger elementos del formulario de las animaciones */
	.registration-form {
		animation: formGlow 4s ease-in-out infinite !important;
		transform: translateY(0) !important;
		position: relative;
		z-index: 100;
	}

	.registration-form * {
		animation: none !important;
		transform: none !important;
	}

	.form-group {
		animation: none !important;
		transform: none !important;
		position: relative;
		z-index: 101;
	}

	.form-group * {
		animation: none !important;
		transform: none !important;
	}

	.form-group input {
		animation: inputPulse 3s ease-in-out infinite !important;
		transform: none !important;
		position: relative;
		z-index: 102;
		pointer-events: auto !important;
		user-select: text !important;
	}

	.form-group input:focus {
		transform: translateY(-2px) !important;
		z-index: 103;
	}

	.form-group label {
		animation: none !important;
		transform: none !important;
		position: relative;
		z-index: 101;
	}

	.btn-whatsapp {
		animation: none !important;
		transform: none !important;
		position: relative;
		z-index: 101;
	}

	.registration-form:hover {
		transform: translateY(-5px) !important;
	}

	/* Contenedor del formulario - aislado de animaciones */
	.form-container {
		animation: none !important;
		transform: none !important;
		position: relative;
		z-index: 99;
		pointer-events: auto !important;
	}

	/* Formulario estático - sin animaciones */
	.static-form {
		animation: none !important;
		transform: none !important;
		position: relative !important;
		z-index: 1000 !important;
		pointer-events: auto !important;
	}

	.static-form * {
		animation: none !important;
		transform: none !important;
		pointer-events: auto !important;
	}

	/* Asegurar que los inputs funcionen correctamente - CON INTERACTIVIDAD */
	input[type="text"],
	input[type="email"],
	input[type="tel"] {
		animation: none !important;
		transform: none !important;
		position: relative !important;
		z-index: 1000 !important;
		pointer-events: auto !important;
		user-select: text !important;
		-webkit-user-select: text !important;
		-moz-user-select: text !important;
		-ms-user-select: text !important;
		background: rgba(255, 255, 255, 0.95) !important;
		border: 2px solid rgba(0, 0, 0, 0.1) !important;
		width: 100% !important;
		padding: 0.75rem 1rem !important;
		border-radius: 0.75rem !important;
		font-size: 1rem !important;
		color: #000000 !important;
		transition: all 0.3s ease !important;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
	}

	/* Asegurar que el botón siempre sea visible */
	.btn-whatsapp,
	button.btn-whatsapp {
		display: block !important;
		visibility: visible !important;
		opacity: 1 !important;
		position: relative !important;
		z-index: 10 !important;
		margin-top: 1rem !important;
		width: 100% !important;
	}

	input[type="text"]:hover,
	input[type="email"]:hover,
	input[type="tel"]:hover {
		border-color: rgba(251, 191, 36, 0.3) !important;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
		transform: translateY(-1px) !important;
	}

	input[type="text"]:focus,
	input[type="email"]:focus,
	input[type="tel"]:focus {
		transform: translateY(-2px) !important;
		z-index: 1001 !important;
		outline: none !important;
		border-color: #fbbf24 !important;
		background: rgba(255, 255, 255, 1) !important;
		color: #000000 !important;
		box-shadow: 
			0 0 0 3px rgba(251, 191, 36, 0.2),
			0 8px 25px rgba(0, 0, 0, 0.15) !important;
	}

	/* Estilo específico para el campo de WhatsApp */
	input[type="tel"] {
		font-family: 'Courier New', monospace !important;
		letter-spacing: 0.5px !important;
	}

	input[type="tel"]::placeholder {
		color: rgba(0, 0, 0, 0.4) !important;
		font-style: italic !important;
	}


	.hero-subtitle {
		font-size: 1.1rem;
		line-height: 1.4;
		margin-bottom: 1.5rem;
		color: #ffffff;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		opacity: 1;
		visibility: visible;
		display: block;
	}

	/* Formulario de registro - CON INTERACTIVIDAD SUTIL */
	.registration-form {
		background: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(20px);
		padding: 2rem;
		border-radius: 1.5rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		margin-top: 1rem;
		border: 2px solid rgba(251, 191, 36, 0.3);
		position: relative;
		opacity: 1;
		transform: none !important;
		display: block;
		visibility: visible;
		animation: none !important;
		z-index: 3;
		transition: all 0.3s ease;
	}

	.registration-form:hover {
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
		border-color: rgba(251, 191, 36, 0.5);
		transform: translateY(-2px) !important;
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
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		transform: none !important;
		border-color: rgba(251, 191, 36, 0.3);
	}

	.form-group {
		margin-bottom: 1rem;
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

	.form-group input:focus + label,
	.form-group:focus-within label {
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
		animation: none !important;
		transform: none !important;
		position: relative;
		z-index: 10;
	}

	.form-group input:hover {
		border-color: rgba(251, 191, 36, 0.3);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		transform: translateY(-1px) !important;
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
		transform: translateY(-2px) !important;
		z-index: 15;
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
		cursor: pointer;
		display: block !important;
		visibility: visible !important;
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

	.btn-whatsapp:hover {
		background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
		transform: translateY(-4px);
		box-shadow: 
			0 15px 40px rgba(251, 191, 36, 0.5),
			0 0 30px rgba(251, 191, 36, 0.3);
	}

	.btn-whatsapp:disabled {
		opacity: 0.7 !important;
		cursor: not-allowed !important;
		transform: none !important;
		background: linear-gradient(135deg, #9ca3af 0%, #6b7280 50%, #4b5563 100%) !important;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
		display: block !important;
		visibility: visible !important;
		position: relative !important;
		z-index: 10 !important;
		width: 100% !important;
		padding: 1rem 1.5rem !important;
		font-size: 1.1rem !important;
		font-weight: 800 !important;
		border-radius: 1rem !important;
		border: none !important;
		margin-top: 1rem !important;
		color: #ffffff !important;
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

	/* Responsive para botones de éxito */
	@media (max-width: 768px) {
		.success-buttons {
			flex-direction: column;
			width: 100%;
		}

		.btn-whatsapp,
		.btn-home {
			width: 100%;
			max-width: none;
		}
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero {
			padding: 1rem 0 2rem 0;
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

	/* Sección de Misión y Visión */
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

	/* Responsive para misión y visión */
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

	/* Testimonials Section */
	.testimonials-section {
		padding: 2rem 0 6rem 0;
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

	/* Responsive para testimonios */
	@media (max-width: 768px) {
		.testimonials-section {
			padding: 4rem 0;
		}

		.testimonial-main {
			padding: 2rem 1.5rem;
		}

		.testimonials-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.testimonial-card {
			padding: 1.5rem 1rem;
		}
	}

	/* CTA Intermedio Section */
	.cta-intermedio-section {
		background: linear-gradient(135deg, #290040 0%, #3d0060 50%, #290040 100%);
		padding: 1rem 0;
		text-align: center;
		position: relative;
		overflow: hidden;
	}

	.cta-intermedio-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
					radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
					radial-gradient(circle at 40% 40%, rgba(249, 115, 22, 0.05) 0%, transparent 50%);
		pointer-events: none;
		z-index: 1;
	}

	.cta-content {
		max-width: 600px;
		margin: 0 auto;
		position: relative;
		z-index: 2;
	}

	.cta-title {
		font-size: 2.2rem;
		font-weight: 800;
		color: #ffffff;
		margin-bottom: 1.5rem;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 25%, #fbbf24 50%, #3b82f6 75%, #8b5cf6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 0 4px 20px rgba(249, 115, 22, 0.5);
		filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.3));
		line-height: 1.2;
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

	/* Responsive para CTA Intermedio */
	@media (max-width: 768px) {
		.cta-intermedio-section {
			padding: 4rem 0;
		}

		.cta-title {
			font-size: 1.8rem;
		}

		.cta-button {
			padding: 1rem 2rem;
			font-size: 1rem;
		}
	}

	@media (max-width: 480px) {
		.cta-button {
			width: 100%;
			justify-content: center;
		}
	}

	/* FAQ Section */
	.faq-section {
		padding: 2rem 0 4rem 0;
		background: linear-gradient(135deg, #290040 0%, #3d0060 50%, #290040 100%);
		position: relative;
		overflow: hidden;
	}

	.faq-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
					radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
					radial-gradient(circle at 40% 40%, rgba(249, 115, 22, 0.05) 0%, transparent 50%);
		pointer-events: none;
		z-index: 1;
	}

	.faq-container {
		max-width: 800px;
		margin: 0 auto;
		position: relative;
		z-index: 2;
	}

	.faq-item {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 1rem;
		margin-bottom: 1rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
		transition: all 0.3s ease;
		border: 2px solid rgba(251, 191, 36, 0.3);
		overflow: hidden;
	}

	.faq-item:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
		border-color: rgba(251, 191, 36, 0.6);
		background: rgba(255, 255, 255, 1);
	}

	.faq-item.open {
		border-color: rgba(251, 191, 36, 0.6);
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
		background: rgba(255, 255, 255, 1);
	}

	.faq-question {
		width: 100%;
		padding: 1.5rem 2rem;
		background: none;
		border: none;
		text-align: left;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: all 0.3s ease;
	}

	.faq-question:hover {
		background: rgba(251, 191, 36, 0.05);
	}

	.question-text {
		font-size: 1.1rem;
		font-weight: 600;
		color: #290040;
		line-height: 1.4;
		flex: 1;
		margin-right: 1rem;
	}

	.faq-icon {
		width: 24px;
		height: 24px;
		color: #f97316;
		transition: transform 0.3s ease;
		flex-shrink: 0;
	}

	.faq-icon.rotated {
		transform: rotate(180deg);
	}

	.faq-answer {
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.3s ease, padding 0.3s ease;
		background: rgba(251, 191, 36, 0.02);
	}

	.faq-answer.open {
		max-height: 200px;
		padding: 0 2rem 1.5rem 2rem;
	}

	.faq-answer p {
		color: #4a5568;
		line-height: 1.6;
		margin: 0;
		font-size: 1rem;
	}

	/* Responsive para FAQ */
	@media (max-width: 768px) {
		.faq-section {
			padding: 4rem 0;
		}

		.faq-question {
			padding: 1.25rem 1.5rem;
		}

		.question-text {
			font-size: 1rem;
		}

		.faq-answer.open {
			padding: 0 1.5rem 1.25rem 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.faq-question {
			padding: 1rem;
		}

		.faq-answer.open {
			padding: 0 1rem 1rem 1rem;
		}
	}

	/* Efectos de validación del formulario */
	.form-group input:valid {
		border-color: #10b981 !important;
		background: rgba(16, 185, 129, 0.05) !important;
	}

	.form-group input:invalid:not(:placeholder-shown) {
		border-color: #ef4444 !important;
		background: rgba(239, 68, 68, 0.05) !important;
	}

	/* Animación de pulso sutil en el formulario */
	.registration-form {
		animation: subtlePulse 4s ease-in-out infinite;
	}

	@keyframes subtlePulse {
		0%, 100% { 
			box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		}
		50% { 
			box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
		}
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
</style>
