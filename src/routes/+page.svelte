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
	let showMoreCursos = false;
	let currentPhotoIndex = 0;
	let carouselInterval: number | null = null;

	
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

	// Función para manejar el envío del formulario
	async function handleSubmit(event: Event) {
		event.preventDefault();
		
		// Validar que todos los campos estén llenos
		if (!formData.parentName.trim() || !formData.studentName.trim() || !formData.whatsapp.trim() || !formData.email.trim()) {
			console.error('Todos los campos son requeridos');
			console.log('Estado del formulario:', formData);
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

	function scrollToForm() {
		const formSection = document.getElementById('formulario');
		if (formSection) {
			formSection.scrollIntoView({ 
				behavior: 'smooth',
				block: 'start'
			});
		}
	}

	
	// Referencias para animaciones
	let heroTitle: HTMLElement;
	let heroSubtitle: HTMLElement;
	let heroSection: HTMLElement;
	let sectionTitles: HTMLElement[] = [];
	let benefitCards: HTMLElement[] = [];
	let testimonialCards: HTMLElement[] = [];
	

	function toggleMoreCursos() {
		showMoreCursos = !showMoreCursos;
	}

	// Funciones del carrusel de fotos
	const fotosResenas = [
		{
			src: "/Resenas/WhatsApp Image 2025-08-19 at 10.44.18 (1).jpeg",
			alt: "Reseña ADNED 1",
			titulo: "Testimonio Real",
			desc: "Estudiante satisfecho con ADNED"
		},
		{
			src: "/Resenas/WhatsApp Image 2025-08-19 at 10.44.18.jpeg",
			alt: "Reseña ADNED 2",
			titulo: "Experiencia Positiva",
			desc: "Resultados que hablan por sí solos"
		},
		{
			src: "/Resenas/WhatsApp Image 2025-08-19 at 10.44.19 (1).jpeg",
			alt: "Reseña ADNED 3",
			titulo: "Recomendación",
			desc: "Estudiantes que recomiendan ADNED"
		},
		{
			src: "/Resenas/WhatsApp Image 2025-08-19 at 10.44.19.jpeg",
			alt: "Reseña ADNED 4",
			titulo: "Éxito Garantizado",
			desc: "Logros de nuestros estudiantes"
		},
		{
			src: "/Resenas/WhatsApp Image 2025-08-19 at 10.44.20 (1).jpeg",
			alt: "Reseña ADNED 5",
			titulo: "Calidad Educativa",
			desc: "Excelencia en la enseñanza"
		},
		{
			src: "/Resenas/WhatsApp Image 2025-08-19 at 10.44.20.jpeg",
			alt: "Reseña ADNED 6",
			titulo: "Satisfacción Total",
			desc: "Estudiantes completamente satisfechos"
		},
		{
			src: "/Resenas/WhatsApp Image 2025-08-19 at 10.44.21.jpeg",
			alt: "Reseña ADNED 7",
			titulo: "Resultados Exitosos",
			desc: "Metas alcanzadas con ADNED"
		},
		{
			src: "/Resenas/WhatsApp Image 2025-08-19 at 10.44.22 (1).jpeg",
			alt: "Reseña ADNED 8",
			titulo: "Confianza Plena",
			desc: "Estudiantes que confían en nosotros"
		},
		{
			src: "/Resenas/WhatsApp Image 2025-08-19 at 10.44.22.jpeg",
			alt: "Reseña ADNED 9",
			titulo: "Excelencia Comprobada",
			desc: "Calidad que se demuestra"
		}
	];


	function nextPhoto() {
		currentPhotoIndex = (currentPhotoIndex + 1) % fotosResenas.length;
	}

	function prevPhoto() {
		currentPhotoIndex = (currentPhotoIndex - 1 + fotosResenas.length) % fotosResenas.length;
	}

	function goToPhoto(index: number) {
		currentPhotoIndex = index;
	}

	function startCarousel() {
		if (carouselInterval) {
			clearInterval(carouselInterval);
		}
		carouselInterval = setInterval(nextPhoto, 4000); // Cambia cada 4 segundos
	}

	function stopCarousel() {
		if (carouselInterval) {
			clearInterval(carouselInterval);
			carouselInterval = null;
		}
	}

	
	onMount(() => {
		
		// Esperar a que los elementos estén disponibles
		setTimeout(() => {
			// Ejecutar animación espectacular del hero
			if (heroTitle && heroSubtitle) {
				spectacularHeroAnimation(heroTitle, heroSubtitle, null);
			}
			
			// Ejecutar animaciones de scroll mejoradas
			animateScrollElements();
			
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
			
			// Agregar efectos 3D a elementos interactivos
			const interactiveElements = document.querySelectorAll('.btn');
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

		// Iniciar el carrusel de fotos
		startCarousel();
	});

	onDestroy(() => {
		// Limpiar el timer si existe cuando el componente se desmonte
		if (redirectTimer) {
			clearTimeout(redirectTimer);
			redirectTimer = null;
		}
		// Limpiar el carrusel
		stopCarousel();
	});
</script>

<svelte:head>
	<title>ADNED </title>
	<meta name="description" content="La guía que todo padre necesita para que su hijo ingrese a la prepa de sus sueños. Regístrate GRATIS y recibe consejos, guías y recordatorios clave del proceso de admisión ECOEMS 2026." />
	<link rel="icon" type="image/png" href="/photo_2025-09-12_15-08-29.jpg" />
	<link rel="shortcut icon" type="image/png" href="/photo_2025-09-12_15-08-29.jpg" />
</svelte:head>

<main class="main-content">
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
					
					<!-- Botón para ir al formulario -->
					<div class="cta-container">
						<button class="btn btn-whatsapp" on:click={scrollToForm}>
							<span class="whatsapp-icon">📱</span>
							¡Registrarme GRATIS!
						</button>
					</div>
					</div>
				</div>
		</section>

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

	<!-- Sección Quiénes Somos -->
	<section id="quienes-somos" class="quienes-somos-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title text-glow text-zoom-rotate">Quiénes Somos</h2>
				<p class="section-subtitle text-zoom-smooth">
					Conoce más sobre nuestro equipo y nuestra misión
				</p>
			</div>

			<div class="quienes-somos-content">
				<div class="quienes-somos-text">
					<p class="main-text">
						ADNED es mucho más que un curso de preparación: es una comunidad que acompaña a los estudiantes en cada paso de su camino académico, brindando innovación, motivación y cercanía. Nacimos con la misión de ofrecer cursos accesibles y de calidad que permitan a los jóvenes enfrentar con confianza y seguridad los exámenes de admisión al bachillerato y la universidad, especialmente bajo los nuevos procesos ECOEMS, UNAM, IPN y UAM. Nuestra visión es clara: consolidarnos como la comunidad educativa líder en México, reconocida por un enfoque futurista, juvenil y motivador, donde cada alumno encuentre no solo conocimientos, sino inspiración para creer en sí mismo. A través de herramientas digitales, estrategias modernas, inteligencia artificial y personajes como Adni y Ema, transformamos la forma de aprender y hacer frente a los retos educativos. ADNED no es solo preparación académica, es un espacio donde el compromiso, la confianza y la innovación se convierten en aliados para cumplir sueños y abrir las puertas del futuro.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Sección Nuestros Cursos -->
	<section id="nuestros-cursos" class="nuestros-cursos-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title text-glow text-zoom-rotate">Nuestros Cursos</h2>
				<p class="section-subtitle text-zoom-smooth">
					Descubre los cursos especializados que tenemos para ti
				</p>
			</div>

			<div class="cursos-sections">
				<!-- Sección 1: Introducción -->
				<div class="curso-section curso-intro">
					<div class="curso-icon">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
							</svg>
						</div>
					<h3 class="curso-title">Nuestra Comunidad Educativa</h3>
					<p class="curso-text">
						ADNED es una comunidad educativa creada para transformar la manera en que los estudiantes se preparan rumbo a los exámenes de admisión más importantes de su vida académica. Nuestro propósito va más allá de enseñar; buscamos inspirar y acompañar a cada alumno en un proceso que suele estar lleno de nervios, dudas e incertidumbre.
						</p>
							</div>

				<!-- Botón Ver Más -->
				<div class="ver-mas-container">
					<button class="btn-ver-mas" on:click={toggleMoreCursos}>
						{#if showMoreCursos}
							<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="18,15 12,9 6,15"/>
							</svg>
							Ver menos
						{:else}
							<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="6,9 12,15 18,9"/>
							</svg>
							Ver más
						{/if}
					</button>
							</div>

				{#if showMoreCursos}
					<!-- Sección 2: Beneficios Principales -->
					<div class="curso-section curso-beneficios">
						<div class="curso-icon">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M9 12l2 2 4-4"/>
								<path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
								<path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
								<path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
								<path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
							</svg>
						</div>
						<h3 class="curso-title">Beneficios Principales</h3>
						<div class="beneficios-grid">
							<div class="beneficio-item">
								<div class="beneficio-icon">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
										<line x1="8" y1="21" x2="16" y2="21"/>
										<line x1="12" y1="17" x2="12" y2="21"/>
									</svg>
					</div>
								<h4 class="beneficio-title">Clases en Línea</h4>
								<p class="beneficio-desc">Acceso a clases virtuales desde cualquier lugar</p>
				</div>

							<div class="beneficio-item">
								<div class="beneficio-icon">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m0-7v7m0-7h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H9m0-7V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
									</svg>
							</div>
								<h4 class="beneficio-title">Simulacros</h4>
								<p class="beneficio-desc">Pruebas de práctica para evaluar tu progreso</p>
							</div>
							
							<div class="beneficio-item">
								<div class="beneficio-icon">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
										<polyline points="14,2 14,8 20,8"/>
										<line x1="16" y1="13" x2="8" y2="13"/>
										<line x1="16" y1="17" x2="8" y2="17"/>
										<polyline points="10,9 9,9 8,9"/>
									</svg>
						</div>
								<h4 class="beneficio-title">Banco de Preguntas</h4>
								<p class="beneficio-desc">Amplia base de datos con preguntas de exámenes</p>
					</div>

							<div class="beneficio-item">
								<div class="beneficio-icon">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
										<circle cx="9" cy="7" r="4"/>
										<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
										<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
									</svg>
							</div>
								<h4 class="beneficio-title">Acompañamiento</h4>
								<p class="beneficio-desc">Soporte personalizado durante todo el proceso</p>
							</div>
						</div>
					</div>

					<!-- Sección 3: Galería de Cursos -->
					<div class="curso-section curso-galeria">
						<div class="curso-icon">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
								<circle cx="8.5" cy="8.5" r="1.5"/>
								<polyline points="21,15 16,10 5,21"/>
							</svg>
							</div>
						<h3 class="curso-title">Nuestros Cursos en Acción</h3>
						<p class="curso-text">
							Descubre cómo son nuestras clases y el ambiente de aprendizaje que creamos para nuestros estudiantes.
						</p>
						<div class="galeria-grid">
							<div class="galeria-item">
								<img src="/cursos/photo_2025-09-18_16-36-26.jpg" alt="Curso ADNED 1" class="galeria-imagen">
								<div class="galeria-overlay">
									<div class="galeria-info">
										<h4 class="galeria-titulo">Clases Interactivas</h4>
										<p class="galeria-desc">Aprendizaje dinámico y participativo</p>
							</div>
						</div>
					</div>
							
							<div class="galeria-item">
								<img src="/cursos/photo_2025-09-18_16-36-26 (2).jpg" alt="Curso ADNED 2" class="galeria-imagen">
								<div class="galeria-overlay">
									<div class="galeria-info">
										<h4 class="galeria-titulo">Material Didáctico</h4>
										<p class="galeria-desc">Recursos educativos de alta calidad</p>
				</div>
			</div>
		</div>
							
							<div class="galeria-item">
								<img src="/cursos/photo_2025-09-18_16-36-26 (3).jpg" alt="Curso ADNED 3" class="galeria-imagen">
								<div class="galeria-overlay">
									<div class="galeria-info">
										<h4 class="galeria-titulo">Ambiente de Estudio</h4>
										<p class="galeria-desc">Espacios diseñados para el aprendizaje</p>
									</div>
								</div>
							</div>
							
							<div class="galeria-item">
								<img src="/cursos/photo_2025-09-18_16-36-26 (4).jpg" alt="Curso ADNED 4" class="galeria-imagen">
								<div class="galeria-overlay">
									<div class="galeria-info">
										<h4 class="galeria-titulo">Tecnología Educativa</h4>
										<p class="galeria-desc">Herramientas modernas de enseñanza</p>
									</div>
								</div>
							</div>
							
							<div class="galeria-item">
								<img src="/cursos/photo_2025-09-18_16-36-26 (5).jpg" alt="Curso ADNED 5" class="galeria-imagen">
								<div class="galeria-overlay">
									<div class="galeria-info">
										<h4 class="galeria-titulo">Resultados Exitosos</h4>
										<p class="galeria-desc">Estudiantes que logran sus objetivos</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- Sección de Reseñas -->
	<section id="reseñas" class="faq-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title text-glow text-zoom-rotate">Reseñas de Nuestros Estudiantes</h2>
				<p class="section-subtitle text-zoom-smooth">
					Descubre lo que dicen nuestros estudiantes sobre su experiencia con ADNED
				</p>
				<div class="reinforcement-phrase">
					<p class="reinforcement-text">
						Más de <span class="highlight-number">1,200</span> estudiantes y familias ya forman parte de ADNED
					</p>
				</div>
			</div>

			<div class="reseñas-container">
				<div class="reseña-item" class:open={openFaq === 0}>
					<button class="reseña-header" on:click={() => toggleFaq(0)}>
						<div class="reseña-info">
							<div class="reseña-avatar">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
									<circle cx="12" cy="7" r="4"/>
								</svg>
							</div>
							<div class="reseña-details">
								<h3 class="reseña-nombre">María González</h3>
								<div class="reseña-rating">
									⭐⭐⭐⭐⭐
								</div>
							</div>
						</div>
						<svg class="reseña-icon" class:rotated={openFaq === 0} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="6,9 12,15 18,9"/>
						</svg>
					</button>
					<div class="reseña-content" class:open={openFaq === 0}>
						<p>"ADNED me ayudó a prepararme para el examen de admisión de la UNAM. Las clases en línea son excelentes y los profesores muy dedicados. Logré entrar a la carrera que quería gracias a su apoyo."</p>
					</div>
				</div>

				<div class="reseña-item" class:open={openFaq === 1}>
					<button class="reseña-header" on:click={() => toggleFaq(1)}>
						<div class="reseña-info">
							<div class="reseña-avatar">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
									<circle cx="12" cy="7" r="4"/>
								</svg>
							</div>
							<div class="reseña-details">
								<h3 class="reseña-nombre">Carlos Rodríguez</h3>
								<div class="reseña-rating">
									⭐⭐⭐⭐⭐
								</div>
							</div>
						</div>
						<svg class="reseña-icon" class:rotated={openFaq === 1} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="6,9 12,15 18,9"/>
						</svg>
					</button>
					<div class="reseña-content" class:open={openFaq === 1}>
						<p>"Los simulacros y el banco de preguntas son increíbles. Me sentí muy preparado para el examen del IPN. El acompañamiento personalizado hace la diferencia."</p>
					</div>
				</div>

				<div class="reseña-item" class:open={openFaq === 2}>
					<button class="reseña-header" on:click={() => toggleFaq(2)}>
						<div class="reseña-info">
							<div class="reseña-avatar">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
									<circle cx="12" cy="7" r="4"/>
								</svg>
							</div>
							<div class="reseña-details">
								<h3 class="reseña-nombre">Ana Martínez</h3>
								<div class="reseña-rating">
									⭐⭐⭐⭐⭐
								</div>
							</div>
						</div>
						<svg class="reseña-icon" class:rotated={openFaq === 2} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="6,9 12,15 18,9"/>
						</svg>
					</button>
					<div class="reseña-content" class:open={openFaq === 2}>
						<p>"La metodología de ADNED es única. Los personajes Adni y Ema hacen que aprender sea divertido. Recomiendo totalmente este curso para cualquier estudiante."</p>
					</div>
				</div>
			</div>

			<!-- Sección de Fotos de Reseñas - Carrusel -->
			<div class="fotos-reseñas-container">
				<div class="fotos-header">
					<h3 class="fotos-title">Reseñas en Imágenes</h3>
					<p class="fotos-subtitle">
						Mira lo que dicen nuestros estudiantes a través de sus capturas de pantalla
					</p>
				</div>

				<div class="carousel-container">
					<div class="carousel-wrapper">
						<button class="carousel-btn carousel-prev" on:click={prevPhoto} on:mouseenter={stopCarousel} on:mouseleave={startCarousel}>
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="15,18 9,12 15,6"/>
							</svg>
						</button>

						<div class="carousel-slide">
							<div class="carousel-track" style="transform: translateX(-{currentPhotoIndex * 33.333}%)">
								{#each fotosResenas as foto, index}
									<div class="carousel-item">
										<div class="foto-item">
											<img src={foto.src} alt={foto.alt} class="foto-imagen">
											<div class="foto-overlay">
												<div class="play-button">
													<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
														<polygon points="5,3 19,12 5,21"/>
													</svg>
												</div>
											</div>
											<div class="foto-info">
												<div class="foto-logo">ADNED</div>
												<div class="foto-titulo">{foto.titulo}</div>
												<div class="foto-desc">{foto.desc}</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<button class="carousel-btn carousel-next" on:click={nextPhoto} on:mouseenter={stopCarousel} on:mouseleave={startCarousel}>
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="9,18 15,12 9,6"/>
							</svg>
						</button>
					</div>


				</div>
			</div>
		</div>
	</section>

	<!-- Sección de Formulario -->
	<section id="formulario" class="formulario-section">
		<div class="container">
			<div class="section-header">
				<h2 class="section-title text-glow text-zoom-rotate">Formulario de Registro</h2>
				<p class="section-subtitle text-zoom-smooth">
					Completa tus datos para acceder a nuestro grupo de WhatsApp y comenzar tu preparación
				</p>
			</div>

			{#if !showThankYou}
				<div class="formulario-content">
					<div class="formulario-card">
						<form class="registration-form" on:submit={handleSubmit}>
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
									<span class="loading-spinner"></span>
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
				</div>
			{:else}
				<!-- Página de Agradecimiento -->
				<div class="thank-you-container">
					<div class="thank-you-content">
						<div class="success-icon">✅</div>
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

	.cta-container {
		margin-top: 2rem;
		display: flex;
		justify-content: center;
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

	/* Quiénes Somos Section */
	.quienes-somos-section {
		padding: 2rem 0 6rem 0;
		background: linear-gradient(135deg, #290040 0%, #3d0060 50%, #290040 100%);
		position: relative;
		overflow: hidden;
	}

	.quienes-somos-section::before {
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

	.quienes-somos-content {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		padding: 4rem 3rem;
		border-radius: 2rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
		transition: all 0.3s ease;
		border: 2px solid rgba(251, 191, 36, 0.3);
		position: relative;
		overflow: hidden;
		text-align: center;
		max-width: 900px;
		margin: 0 auto;
	}

	.quienes-somos-content::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
	}

	.quienes-somos-content:hover {
		transform: translateY(-5px);
		box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
		border-color: rgba(251, 191, 36, 0.6);
		background: rgba(255, 255, 255, 1);
	}

	.quienes-somos-text {
		position: relative;
		z-index: 2;
	}

	.main-text {
		font-size: 1.2rem;
		color: #290040;
		line-height: 1.8;
		margin: 0;
		text-align: justify;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		font-weight: 400;
	}

	/* Responsive para Quiénes Somos */
	@media (max-width: 768px) {
		.quienes-somos-section {
			padding: 4rem 0;
		}

		.quienes-somos-content {
			padding: 3rem 2rem;
		}

		.main-text {
			font-size: 1.1rem;
			line-height: 1.7;
			text-align: left;
		}
	}

	@media (max-width: 480px) {
		.quienes-somos-content {
			padding: 2.5rem 1.5rem;
		}

		.main-text {
			font-size: 1rem;
			line-height: 1.6;
		}
	}

	/* Nuestros Cursos Section */
	.nuestros-cursos-section {
		padding: 2rem 0 6rem 0;
		background: linear-gradient(135deg, #290040 0%, #3d0060 50%, #290040 100%);
		position: relative;
		overflow: hidden;
	}

	.nuestros-cursos-section::before {
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

	.cursos-sections {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
		max-width: 1000px;
		margin: 0 auto;
	}

	.curso-section {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		padding: 3rem 2.5rem;
		border-radius: 2rem;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
		transition: all 0.3s ease;
		border: 2px solid rgba(251, 191, 36, 0.3);
		position: relative;
		overflow: hidden;
		text-align: center;
	}

	.curso-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
	}

	.curso-section:hover {
		transform: translateY(-8px);
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
		border-color: rgba(251, 191, 36, 0.6);
		background: rgba(255, 255, 255, 1);
	}

	.curso-intro {
		border-color: rgba(249, 115, 22, 0.4);
		background: linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(251, 191, 36, 0.05) 50%, rgba(59, 130, 246, 0.05) 100%);
	}

	.curso-intro::before {
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
	}

	.curso-beneficios {
		border-color: rgba(59, 130, 246, 0.4);
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(249, 115, 22, 0.05) 100%);
	}

	.curso-beneficios::before {
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #f97316 100%);
	}

	.curso-galeria {
		border-color: rgba(139, 92, 246, 0.4);
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(249, 115, 22, 0.05) 50%, rgba(59, 130, 246, 0.05) 100%);
	}

	.curso-galeria::before {
		background: linear-gradient(135deg, #8b5cf6 0%, #f97316 50%, #3b82f6 100%);
	}

	.curso-pending {
		border-color: rgba(107, 114, 128, 0.3);
		background: rgba(255, 255, 255, 0.8);
		opacity: 0.7;
	}

	.curso-pending::before {
		background: linear-gradient(135deg, #9ca3af 0%, #6b7280 50%, #4b5563 100%);
	}

	.curso-icon {
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 2rem auto;
		box-shadow: 0 10px 25px rgba(249, 115, 22, 0.3);
		transition: all 0.3s ease;
	}

	.curso-pending .curso-icon {
		background: linear-gradient(135deg, #9ca3af 0%, #6b7280 50%, #4b5563 100%);
		box-shadow: 0 8px 20px rgba(107, 114, 128, 0.3);
	}

	.curso-section:hover .curso-icon {
		transform: scale(1.1);
		box-shadow: 0 15px 35px rgba(249, 115, 22, 0.4);
	}

	.curso-pending:hover .curso-icon {
		box-shadow: 0 12px 25px rgba(107, 114, 128, 0.4);
	}

	.curso-icon svg {
		width: 40px;
		height: 40px;
		color: white;
	}

	.curso-title {
		font-size: 1.8rem;
		font-weight: 700;
		color: #290040;
		margin-bottom: 1.5rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.curso-pending .curso-title {
		color: #6b7280;
	}

	.curso-text {
		font-size: 1.1rem;
		color: #4a5568;
		line-height: 1.7;
		margin: 0;
		text-align: justify;
		max-width: 800px;
		margin: 0 auto;
	}

	.curso-pending .curso-text {
		color: #9ca3af;
		font-style: italic;
	}

	.beneficios-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.beneficio-item {
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(10px);
		padding: 2rem 1.5rem;
		border-radius: 1.5rem;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		border: 2px solid rgba(59, 130, 246, 0.2);
		text-align: center;
		position: relative;
		overflow: hidden;
	}

	.beneficio-item::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #f97316 100%);
	}

	.beneficio-item:hover {
		transform: translateY(-5px);
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
		border-color: rgba(59, 130, 246, 0.4);
		background: rgba(255, 255, 255, 0.95);
	}

	.beneficio-icon {
		width: 50px;
		height: 50px;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #f97316 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 1rem auto;
		box-shadow: 0 6px 15px rgba(59, 130, 246, 0.3);
		transition: all 0.3s ease;
	}

	.beneficio-item:hover .beneficio-icon {
		transform: scale(1.1);
		box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
	}

	.beneficio-icon svg {
		width: 24px;
		height: 24px;
		color: white;
	}

	.beneficio-title {
		font-size: 1.1rem;
		font-weight: 700;
		color: #290040;
		margin-bottom: 0.75rem;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	.beneficio-desc {
		font-size: 0.9rem;
		color: #6b7280;
		line-height: 1.5;
		margin: 0;
	}

	.galeria-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.galeria-item {
		position: relative;
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
		transition: all 0.3s ease;
		background: #ffffff;
	}

	.galeria-item:hover {
		transform: translateY(-8px);
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
	}

	.galeria-imagen {
		width: 100%;
		height: 200px;
		object-fit: cover;
		transition: all 0.3s ease;
	}

	.galeria-item:hover .galeria-imagen {
		transform: scale(1.05);
	}

	.galeria-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(249, 115, 22, 0.9) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: all 0.3s ease;
	}

	.galeria-item:hover .galeria-overlay {
		opacity: 1;
	}

	.galeria-info {
		text-align: center;
		color: white;
		padding: 1rem;
	}

	.galeria-titulo {
		font-size: 1.2rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.galeria-desc {
		font-size: 0.9rem;
		line-height: 1.4;
		margin: 0;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.ver-mas-container {
		display: flex;
		justify-content: center;
		margin: 2rem 0;
	}

	.btn-ver-mas {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		background: linear-gradient(135deg, #8b5cf6 0%, #f97316 50%, #3b82f6 100%);
		color: #ffffff;
		padding: 1rem 2rem;
		border: none;
		border-radius: 2rem;
		font-weight: 700;
		font-size: 1.1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		position: relative;
		overflow: hidden;
	}

	.btn-ver-mas::before {
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

	.btn-ver-mas:hover::before {
		width: 300px;
		height: 300px;
	}

	.btn-ver-mas:hover {
		background: linear-gradient(135deg, #7c3aed 0%, #ea580c 50%, #2563eb 100%);
		transform: translateY(-3px);
		box-shadow: 0 12px 35px rgba(139, 92, 246, 0.6);
		text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
	}

	.btn-ver-mas:active {
		transform: translateY(-1px);
		box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
	}

	.btn-icon {
		width: 20px;
		height: 20px;
		transition: transform 0.3s ease;
		position: relative;
		z-index: 2;
	}

	.btn-ver-mas:hover .btn-icon {
		transform: scale(1.1);
	}

	/* Responsive para Nuestros Cursos */
	@media (max-width: 768px) {
		.nuestros-cursos-section {
			padding: 4rem 0;
		}

		.cursos-sections {
			gap: 2rem;
		}

		.curso-section {
			padding: 2.5rem 2rem;
		}

		.curso-icon {
			width: 70px;
			height: 70px;
		}

		.curso-icon svg {
			width: 35px;
			height: 35px;
		}

		.curso-title {
			font-size: 1.6rem;
		}

		.curso-text {
			font-size: 1rem;
			text-align: left;
		}

		.beneficios-grid {
			grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
			gap: 1.5rem;
		}

		.beneficio-item {
			padding: 1.5rem 1rem;
		}

		.beneficio-icon {
			width: 45px;
			height: 45px;
		}

		.beneficio-icon svg {
			width: 22px;
			height: 22px;
		}

		.beneficio-title {
			font-size: 1rem;
		}

		.beneficio-desc {
			font-size: 0.85rem;
		}

		.galeria-grid {
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 1rem;
		}

		.galeria-imagen {
			height: 180px;
		}

		.galeria-titulo {
			font-size: 1.1rem;
		}

		.galeria-desc {
			font-size: 0.8rem;
		}

		.btn-ver-mas {
			padding: 0.875rem 1.75rem;
			font-size: 1rem;
		}

		.btn-icon {
			width: 18px;
			height: 18px;
		}
	}

	@media (max-width: 480px) {
		.curso-section {
			padding: 2rem 1.5rem;
		}

		.curso-icon {
			width: 60px;
			height: 60px;
		}

		.curso-icon svg {
			width: 30px;
			height: 30px;
		}

		.curso-title {
			font-size: 1.4rem;
		}

		.curso-text {
			font-size: 0.95rem;
		}

		.beneficios-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.beneficio-item {
			padding: 1.25rem 1rem;
		}

		.beneficio-icon {
			width: 40px;
			height: 40px;
		}

		.beneficio-icon svg {
			width: 20px;
			height: 20px;
		}

		.beneficio-title {
			font-size: 0.95rem;
		}

		.beneficio-desc {
			font-size: 0.8rem;
		}

		.galeria-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.galeria-imagen {
			height: 160px;
		}

		.galeria-titulo {
			font-size: 1rem;
		}

		.galeria-desc {
			font-size: 0.75rem;
		}

		.btn-ver-mas {
			padding: 0.75rem 1.5rem;
			font-size: 0.9rem;
		}

		.btn-icon {
			width: 16px;
			height: 16px;
		}
	}

	/* Reseñas Section */
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

	.reinforcement-phrase {
		margin-top: 1.5rem;
		text-align: center;
	}

	.reinforcement-text {
		font-size: 1.2rem;
		font-weight: 600;
		color: #ffffff;
		background: linear-gradient(135deg, rgba(251, 191, 36, 0.9) 0%, rgba(249, 115, 22, 0.9) 50%, rgba(59, 130, 246, 0.9) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		margin: 0;
		padding: 1rem 2rem;
		border-radius: 1rem;
		backdrop-filter: blur(10px);
		background-color: rgba(255, 255, 255, 0.1);
		border: 2px solid rgba(251, 191, 36, 0.3);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
		position: relative;
		overflow: hidden;
		animation: pulseGlow 3s ease-in-out infinite;
	}

	.reinforcement-text::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		animation: shimmer 2s infinite;
	}

	.highlight-number {
		font-size: 1.4rem;
		font-weight: 800;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
		animation: numberPulse 2s ease-in-out infinite;
	}

	@keyframes pulseGlow {
		0%, 100% {
			box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
		}
		50% {
			box-shadow: 0 12px 35px rgba(251, 191, 36, 0.4);
		}
	}

	@keyframes shimmer {
		0% {
			left: -100%;
		}
		100% {
			left: 100%;
		}
	}

	@keyframes numberPulse {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	.reseñas-container {
		max-width: 800px;
		margin: 0 auto;
		position: relative;
		z-index: 2;
	}

	.reseña-item {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 1.5rem;
		margin-bottom: 1.5rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
		transition: all 0.3s ease;
		border: 2px solid rgba(251, 191, 36, 0.3);
		overflow: hidden;
	}

	.reseña-item:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
		border-color: rgba(251, 191, 36, 0.6);
		background: rgba(255, 255, 255, 1);
	}

	.reseña-item.open {
		border-color: rgba(251, 191, 36, 0.6);
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
		background: rgba(255, 255, 255, 1);
	}

	.reseña-header {
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

	.reseña-header:hover {
		background: rgba(251, 191, 36, 0.05);
	}

	.reseña-info {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex: 1;
	}

	.reseña-avatar {
		width: 50px;
		height: 50px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
		flex-shrink: 0;
	}

	.reseña-avatar svg {
		width: 24px;
		height: 24px;
		color: white;
	}

	.reseña-details {
		flex: 1;
	}

	.reseña-nombre {
		font-size: 1.1rem;
		font-weight: 700;
		color: #290040;
		margin: 0 0 0.5rem 0;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	.reseña-rating {
		font-size: 1.2rem;
		line-height: 1;
	}

	.reseña-icon {
		width: 24px;
		height: 24px;
		color: #f97316;
		transition: transform 0.3s ease;
		flex-shrink: 0;
	}

	.reseña-icon.rotated {
		transform: rotate(180deg);
	}

	.reseña-content {
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.3s ease, padding 0.3s ease;
		background: rgba(251, 191, 36, 0.02);
	}

	.reseña-content.open {
		max-height: 200px;
		padding: 0 2rem 1.5rem 2rem;
	}

	.reseña-content p {
		color: #4a5568;
		line-height: 1.6;
		margin: 0;
		font-size: 1rem;
		font-style: italic;
		position: relative;
	}

	.reseña-content p::before {
		content: '"';
		font-size: 3rem;
		color: rgba(249, 115, 22, 0.3);
		position: absolute;
		top: -0.5rem;
		left: -0.5rem;
		font-family: serif;
	}

	.reseña-content p::after {
		content: '"';
		font-size: 3rem;
		color: rgba(249, 115, 22, 0.3);
		position: absolute;
		bottom: -1rem;
		right: -0.5rem;
		font-family: serif;
	}

	/* Responsive para Reseñas */
	@media (max-width: 768px) {
		.faq-section {
			padding: 4rem 0;
		}

		.reinforcement-text {
			font-size: 1.1rem;
			padding: 0.875rem 1.5rem;
		}

		.highlight-number {
			font-size: 1.3rem;
		}

		.reseña-header {
			padding: 1.25rem 1.5rem;
		}

		.reseña-nombre {
			font-size: 1rem;
		}

		.reseña-content.open {
			padding: 0 1.5rem 1.25rem 1.5rem;
		}
	}

	@media (max-width: 480px) {
		.reseña-header {
			padding: 1rem;
		}

		.reseña-content.open {
			padding: 0 1rem 1rem 1rem;
		}

		.reinforcement-text {
			font-size: 1rem;
			padding: 0.75rem 1.25rem;
		}

		.highlight-number {
			font-size: 1.2rem;
		}
	}

	/* Fotos de Reseñas - Carrusel */
	.fotos-reseñas-container {
		margin-top: 0.5rem;
		padding-top: 0.5rem;
		border-top: 2px solid rgba(251, 191, 36, 0.3);
	}

	.fotos-header {
		text-align: center;
		margin-bottom: 2.5rem;
	}

	.fotos-title {
		font-size: 2rem;
		font-weight: 700;
		color: #ffffff;
		margin-bottom: 1rem;
		text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.fotos-subtitle {
		font-size: 1.1rem;
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.6;
		max-width: 600px;
		margin: 0 auto;
	}

	.carousel-container {
		max-width: 900px;
		margin: 0 auto;
		position: relative;
		padding: 0 1rem;
	}

	.carousel-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.carousel-slide {
		flex: 1;
		overflow: hidden;
		border-radius: 2rem;
	}

	.carousel-track {
		display: flex;
		transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		gap: 1.5rem;
	}

	.carousel-item {
		min-width: calc(33.333% - 1rem);
		flex-shrink: 0;
	}

	.foto-item {
		position: relative;
		aspect-ratio: 4/5;
		border-radius: 1.5rem;
		overflow: hidden;
		background: #ffffff;
		cursor: pointer;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}

	.foto-item:hover {
		transform: translateY(-10px) scale(1.02);
		box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
	}

	.foto-imagen {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: all 0.4s ease;
	}

	.foto-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: all 0.3s ease;
	}

	.foto-item:hover .foto-overlay {
		opacity: 1;
	}

	.play-button {
		width: 60px;
		height: 60px;
		background: rgba(255, 255, 255, 0.95);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		transition: all 0.3s ease;
	}

	.foto-item:hover .play-button {
		transform: scale(1.1);
		background: rgba(255, 255, 255, 1);
	}

	.play-button svg {
		width: 24px;
		height: 24px;
		color: #290040;
		margin-left: 4px;
	}

	.foto-info {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
		padding: 1.5rem 1rem 1rem 1rem;
		color: white;
	}

	.foto-logo {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: rgba(249, 115, 22, 0.9);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 1rem;
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.foto-titulo {
		font-size: 1.4rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}

	.foto-desc {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.9);
		line-height: 1.4;
		margin: 0;
	}

	.carousel-btn {
		width: 50px;
		height: 50px;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		border: none;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
		z-index: 10;
	}

	.carousel-btn:hover {
		background: rgba(255, 255, 255, 1);
		transform: scale(1.1);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
	}

	.carousel-btn svg {
		width: 24px;
		height: 24px;
		color: #290040;
	}


	.carousel-controls {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-top: 1rem;
		padding: 0 1rem;
	}

	.control-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border: 2px solid rgba(255, 255, 255, 0.3);
		color: #ffffff;
		padding: 0.75rem 1.5rem;
		border-radius: 2rem;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.control-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.5);
		transform: translateY(-2px);
	}

	.control-btn svg {
		width: 16px;
		height: 16px;
	}

	/* Responsive para Carrusel de Fotos */
	@media (max-width: 1024px) {
		.carousel-item {
			min-width: calc(50% - 0.75rem);
		}
	}

	@media (max-width: 768px) {
		.fotos-title {
			font-size: 1.75rem;
		}

		.fotos-subtitle {
			font-size: 1rem;
		}

		.carousel-container {
			max-width: 100%;
			padding: 0 0.5rem;
		}

		.carousel-wrapper {
			gap: 1rem;
		}

		.carousel-item {
			min-width: calc(100% - 0.5rem);
		}

		.carousel-btn {
			width: 50px;
			height: 50px;
		}

		.carousel-btn svg {
			width: 24px;
			height: 24px;
		}

		.foto-item {
			aspect-ratio: 4/5;
		}

		.foto-info {
			padding: 1.5rem 1rem 1rem 1rem;
		}

		.foto-titulo {
			font-size: 1.2rem;
		}

		.foto-logo {
			top: 0.75rem;
			right: 0.75rem;
			padding: 0.4rem 0.8rem;
			font-size: 0.7rem;
		}

		.control-btn {
			padding: 0.6rem 1.2rem;
			font-size: 0.85rem;
		}
	}

	@media (max-width: 480px) {
		.fotos-reseñas-container {
			margin-top: 0.25rem;
			padding-top: 0.25rem;
		}

		.fotos-title {
			font-size: 1.5rem;
		}

		.carousel-container {
			max-width: 100%;
			padding: 0 0.25rem;
		}

		.carousel-wrapper {
			gap: 0.5rem;
		}

		.carousel-btn {
			width: 40px;
			height: 40px;
		}

		.carousel-btn svg {
			width: 20px;
			height: 20px;
		}

		.play-button {
			width: 60px;
			height: 60px;
		}

		.play-button svg {
			width: 24px;
			height: 24px;
		}

		.foto-info {
			padding: 1rem 0.75rem 0.75rem 0.75rem;
		}

		.foto-titulo {
			font-size: 1.1rem;
		}

		.foto-desc {
			font-size: 0.8rem;
		}

		.carousel-controls {
			flex-direction: column;
			gap: 0.75rem;
		}

		.control-btn {
			padding: 0.5rem 1rem;
			font-size: 0.8rem;
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

	/* Sección de Formulario */
	.formulario-section {
		padding: 0.5rem 0 6rem 0;
		background: linear-gradient(135deg, #290040 0%, #3d0060 50%, #290040 100%);
		position: relative;
		overflow: hidden;
	}

	.formulario-section::before {
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

	.formulario-content {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		z-index: 2;
	}

	.formulario-card {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		padding: 3rem 2.5rem;
		border-radius: 2rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
		transition: all 0.3s ease;
		border: 2px solid rgba(251, 191, 36, 0.3);
		position: relative;
		overflow: hidden;
		text-align: left;
		max-width: 600px;
		width: 100%;
	}

	.formulario-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
	}

	.formulario-card:hover {
		transform: translateY(-8px);
		box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
		border-color: rgba(251, 191, 36, 0.6);
		background: rgba(255, 255, 255, 1);
	}

	.formulario-icon {
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 2rem auto;
		box-shadow: 0 10px 25px rgba(249, 115, 22, 0.3);
		transition: all 0.3s ease;
	}

	.formulario-card:hover .formulario-icon {
		transform: scale(1.1);
		box-shadow: 0 15px 35px rgba(249, 115, 22, 0.4);
	}

	.formulario-icon svg {
		width: 40px;
		height: 40px;
		color: white;
	}

	.formulario-title {
		font-size: 2rem;
		font-weight: 700;
		color: #290040;
		margin-bottom: 1.5rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.formulario-description {
		font-size: 1.1rem;
		color: #4a5568;
		line-height: 1.7;
		margin-bottom: 2.5rem;
		text-align: justify;
	}

	.formulario-actions {
		display: flex;
		justify-content: center;
	}

	.btn-formulario {
		background: linear-gradient(135deg, #8b5cf6 0%, #f97316 50%, #3b82f6 100%);
		color: #ffffff;
		padding: 1.25rem 2.5rem;
		border: none;
		border-radius: 2rem;
		font-weight: 700;
		font-size: 1.2rem;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		position: relative;
		overflow: hidden;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
	}

	.btn-formulario::before {
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

	.btn-formulario:hover::before {
		width: 300px;
		height: 300px;
	}

	.btn-formulario:hover {
		background: linear-gradient(135deg, #7c3aed 0%, #ea580c 50%, #2563eb 100%);
		transform: translateY(-3px);
		box-shadow: 0 15px 40px rgba(139, 92, 246, 0.6);
		text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
	}

	.btn-formulario:active {
		transform: translateY(-1px);
		box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
	}

	.formulario-icon-btn {
		font-size: 1.3em;
		position: relative;
		z-index: 2;
	}

	/* Estilos del formulario */
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
		font-size: 4rem;
		margin-bottom: 1rem;
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

	/* Responsive para Formulario */
	@media (max-width: 768px) {
		.formulario-section {
			padding: 1rem 0;
		}

		.formulario-card {
			padding: 3rem 2rem;
		}

		.formulario-icon {
			width: 70px;
			height: 70px;
		}

		.formulario-icon svg {
			width: 35px;
			height: 35px;
		}

		.formulario-title {
			font-size: 1.6rem;
		}

		.formulario-description {
			font-size: 1rem;
			text-align: left;
		}

		.btn-formulario {
			padding: 1rem 2rem;
			font-size: 1.1rem;
		}
	}

	@media (max-width: 480px) {
		.formulario-card {
			padding: 2.5rem 1.5rem;
		}

		.formulario-icon {
			width: 60px;
			height: 60px;
		}

		.formulario-icon svg {
			width: 30px;
			height: 30px;
		}

		.formulario-title {
			font-size: 1.4rem;
		}

		.formulario-description {
			font-size: 0.95rem;
		}

		.btn-formulario {
			padding: 0.875rem 1.75rem;
			font-size: 1rem;
		}
	}

</style>
