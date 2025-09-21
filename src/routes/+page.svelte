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
	let youtubeVideoUrl = 'https://www.youtube.com/embed/NsE4zkiyFZ8'; // Video de YouTube

	// Contador regresivo
	let timeLeft = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};
	let countdownInterval: number | null = null;

	// Fecha objetivo: 15 de enero de 2026
	const targetDate = new Date('2026-01-15T23:59:59').getTime();

	function updateCountdown() {
		const now = new Date().getTime();
		const distance = targetDate - now;

		// Debug: mostrar información en consola
		console.log('Fecha actual:', new Date(now));
		console.log('Fecha objetivo:', new Date(targetDate));
		console.log('Diferencia en ms:', distance);

		if (distance < 0) {
			timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
			if (countdownInterval) {
				clearInterval(countdownInterval);
			}
			console.log('Contador terminado');
			return;
		}

		timeLeft = {
			days: Math.floor(distance / (1000 * 60 * 60 * 24)),
			hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
			minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
			seconds: Math.floor((distance % (1000 * 60)) / 1000)
		};

		console.log('Tiempo restante:', timeLeft);
	}

	function startCountdown() {
		updateCountdown();
		countdownInterval = setInterval(updateCountdown, 1000);
	}

	
	// Estado para controlar qué FAQ está abierto
	let openFaq: number | null = null;

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}

	// Estado para los carruseles de reseñas
	let currentReviewIndex = 0;
	let reviewInterval: number;

	// Estados para los 5 carruseles
	let carousel1Index = 0;
	let carousel2Index = 0;
	let carousel3Index = 0;
	let carousel4Index = 0;
	let carousel5Index = 0;
	let aboutCarouselIndex = 0;
	
	let carousel1Interval: number;
	let carousel2Interval: number;
	let carousel3Interval: number;
	let carousel4Interval: number;
	let carousel5Interval: number;
	let aboutCarouselInterval: number;
	
	// Estado para mostrar carruseles adicionales
	let showAdditionalCarousels = false;
	
	// Estado para el modal de zoom
	let showImageModal = false;
	let selectedImage = '';
	let selectedImageAlt = '';

	
	// Lista de imágenes para cada carrusel
	const carousel1Images = [
		'1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
		'11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg',
		'21.jpg', '22.jpg', '23.jpg', '24.jpg'
	];

	const carousel2Images = [
		'1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
		'11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'
	];

	const carousel3Images = [
		'1.jpg', '2.jpg', '3.jpg'
	];

	const carousel4Images = [
		'1.jpg', '2.jpg', '3.jpg'
	];

	const carousel5Images = [
		'1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
		'11.jpg', '12.jpg', '13.jpg', '14.jpg', '16.jpg', '17.jpg', '18.jpg', '20.jpg', '21.jpg', '22.jpg',
		'23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg', '31.jpg', '32.jpg',
		'33.jpg', '34.jpg', '35.jpg', '36.jpg', '37.jpg', '38.jpg', '39.jpg'
	];

	// Lista de imágenes de reseñas (mantenida para compatibilidad)
	const reviewImages = [
		'WhatsApp Image 2025-08-18 at 23.37.17.jpeg',
		'WhatsApp Image 2025-08-18 at 23.38.17.jpeg',
		'WhatsApp Image 2025-08-18 at 23.40.10.jpeg',
		'WhatsApp Image 2025-08-18 at 23.41.14.jpeg',
		'WhatsApp Image 2025-08-19 at 10.44.18 (1).jpeg',
		'WhatsApp Image 2025-08-19 at 10.44.18.jpeg',
		'WhatsApp Image 2025-08-19 at 10.44.19 (1).jpeg',
		'WhatsApp Image 2025-08-19 at 10.44.19.jpeg',
		'WhatsApp Image 2025-08-19 at 10.44.20 (1).jpeg',
		'WhatsApp Image 2025-08-19 at 10.44.22.jpeg'
	];

	function nextReview() {
		currentReviewIndex = (currentReviewIndex + 1) % reviewImages.length;
	}

	function prevReview() {
		currentReviewIndex = currentReviewIndex === 0 ? reviewImages.length - 1 : currentReviewIndex - 1;
	}

	function goToReview(index: number) {
		currentReviewIndex = index;
	}

	// Auto-play del carrusel
	function startAutoPlay() {
		reviewInterval = setInterval(nextReview, 40000);
	}

	function stopAutoPlay() {
		if (reviewInterval) {
			clearInterval(reviewInterval);
		}
	}

	// Funciones para carrusel 1
	function nextCarousel1() {
		carousel1Index = (carousel1Index + 1) % carousel1Images.length;
	}

	function prevCarousel1() {
		carousel1Index = carousel1Index === 0 ? carousel1Images.length - 1 : carousel1Index - 1;
	}

	function goToCarousel1(index: number) {
		carousel1Index = index;
	}

	// Funciones para carrusel 2
	function nextCarousel2() {
		carousel2Index = (carousel2Index + 1) % carousel2Images.length;
	}

	function prevCarousel2() {
		carousel2Index = carousel2Index === 0 ? carousel2Images.length - 1 : carousel2Index - 1;
	}

	function goToCarousel2(index: number) {
		carousel2Index = index;
	}

	// Funciones para carrusel 3
	function nextCarousel3() {
		carousel3Index = (carousel3Index + 1) % carousel3Images.length;
	}

	function prevCarousel3() {
		carousel3Index = carousel3Index === 0 ? carousel3Images.length - 1 : carousel3Index - 1;
	}

	function goToCarousel3(index: number) {
		carousel3Index = index;
	}

	// Funciones para carrusel 4
	function nextCarousel4() {
		carousel4Index = (carousel4Index + 1) % carousel4Images.length;
	}

	function prevCarousel4() {
		carousel4Index = carousel4Index === 0 ? carousel4Images.length - 1 : carousel4Index - 1;
	}

	function goToCarousel4(index: number) {
		carousel4Index = index;
	}

	// Funciones para carrusel 5
	function nextCarousel5() {
		carousel5Index = (carousel5Index + 1) % carousel5Images.length;
	}

	function prevCarousel5() {
		carousel5Index = carousel5Index === 0 ? carousel5Images.length - 1 : carousel5Index - 1;
	}

	function goToCarousel5(index: number) {
		carousel5Index = index;
	}

	// Funciones para carrusel de Quiénes Somos
	function nextAboutSlide() {
		aboutCarouselIndex = (aboutCarouselIndex + 1) % 3;
		updateAboutCarousel();
	}

	function prevAboutSlide() {
		aboutCarouselIndex = aboutCarouselIndex === 0 ? 2 : aboutCarouselIndex - 1;
		updateAboutCarousel();
	}

	function goToAboutSlide(index: number) {
		aboutCarouselIndex = index;
		updateAboutCarousel();
	}

	function updateAboutCarousel() {
		if (aboutCarouselTrack) {
			const slides = aboutCarouselTrack.querySelectorAll('.about-slide');
			const dots = document.querySelectorAll('.about-dot');
			
			// Remover clase active de todos los slides y dots
			slides.forEach(slide => slide.classList.remove('active'));
			dots.forEach(dot => dot.classList.remove('active'));
			
			// Agregar clase active al slide y dot actual
			slides[aboutCarouselIndex].classList.add('active');
			dots[aboutCarouselIndex].classList.add('active');
			
			// Mover el track con transición suave
			aboutCarouselTrack.style.transform = `translateX(-${aboutCarouselIndex * 33.333}%)`;
		}
	}


	// Función para toggle de carruseles adicionales
	function toggleAdditionalCarousels() {
		console.log('Botón clickeado, estado actual:', showAdditionalCarousels);
		showAdditionalCarousels = !showAdditionalCarousels;
		console.log('Nuevo estado:', showAdditionalCarousels);
		
		if (showAdditionalCarousels) {
			// Iniciar carruseles adicionales cuando se muestran
			carousel4Interval = setInterval(nextCarousel4, 55000);
			carousel5Interval = setInterval(nextCarousel5, 60000);
			console.log('Carruseles adicionales iniciados');
		} else {
			// Detener carruseles adicionales cuando se ocultan
			if (carousel4Interval) clearInterval(carousel4Interval);
			if (carousel5Interval) clearInterval(carousel5Interval);
			console.log('Carruseles adicionales detenidos');
		}
	}

	// Auto-play para todos los carruseles
	function startAllCarousels() {
		carousel1Interval = setInterval(nextCarousel1, 40000);
		carousel2Interval = setInterval(nextCarousel2, 45000);
		carousel3Interval = setInterval(nextCarousel3, 50000);
		aboutCarouselInterval = setInterval(nextAboutSlide, 60000);
		// Solo iniciar carruseles adicionales si están visibles
		if (showAdditionalCarousels) {
			carousel4Interval = setInterval(nextCarousel4, 55000);
			carousel5Interval = setInterval(nextCarousel5, 60000);
		}
	}

	// Inicializar carrusel de Quiénes Somos
	function initAboutCarousel() {
		// Inicializar el carrusel
		updateAboutCarousel();
		
		// Iniciar auto-play después de un pequeño delay
		setTimeout(() => {
			aboutCarouselInterval = setInterval(nextAboutSlide, 60000);
		}, 1000);
	}

	function stopAllCarousels() {
		if (carousel1Interval) clearInterval(carousel1Interval);
		if (carousel2Interval) clearInterval(carousel2Interval);
		if (carousel3Interval) clearInterval(carousel3Interval);
		if (aboutCarouselInterval) clearInterval(aboutCarouselInterval);
		if (carousel4Interval) clearInterval(carousel4Interval);
		if (carousel5Interval) clearInterval(carousel5Interval);
	}

	// Funciones para el modal de zoom
	function openImageModal(imageSrc: string, imageAlt: string) {
		selectedImage = imageSrc;
		selectedImageAlt = imageAlt;
		showImageModal = true;
		// Detener todos los carruseles cuando se abre el modal
		stopAllCarousels();
	}

	function closeImageModal() {
		showImageModal = false;
		selectedImage = '';
		selectedImageAlt = '';
		// Reiniciar carruseles cuando se cierra el modal
		startAllCarousels();
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
	let aboutCarouselTrack: HTMLElement;
	let sectionTitles: HTMLElement[] = [];
	let benefitCards: HTMLElement[] = [];
	let testimonialCards: HTMLElement[] = [];
	

	function toggleMoreCursos() {
		showMoreCursos = !showMoreCursos;
	}


	
	onMount(() => {
		// Iniciar contador regresivo
		startCountdown();
		
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
			
			// Inicializar carrusel de reseñas
			startAutoPlay();
			
			// Inicializar carrusel de Quiénes Somos
			initAboutCarousel();
			
			// Iniciar todos los carruseles
			startAllCarousels();
			
		}, 200);

	});

	onDestroy(() => {
		// Limpiar el timer si existe cuando el componente se desmonte
		if (redirectTimer) {
			clearTimeout(redirectTimer);
			redirectTimer = null;
		}
		// Limpiar el intervalo del carrusel
		stopAutoPlay();
		// Limpiar todos los carruseles
		stopAllCarousels();
		// Limpiar el contador regresivo
		if (countdownInterval) {
			clearInterval(countdownInterval);
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

		<!-- Hero Section -->
		<section class="hero" bind:this={heroSection}>
			<div class="container">
				<div class="hero-content">
					<!-- Texto a la izquierda -->
					<div class="hero-text">
					<h1 class="hero-title text-glow text-zoom-ultra" bind:this={heroTitle}>
						La guía que todo padre necesita para que su hijo ingrese a la prepa de sus sueños
					</h1>
					<h2 class="hero-subtitle text-zoom-smooth" bind:this={heroSubtitle}>
						Regístrate <strong>GRATIS</strong> y recibe en tu WhatsApp consejos, guías y recordatorios clave del proceso de admisión <strong>ECOEMS 2026</strong>.
					</h2>
					
					<!-- Botón para ir al formulario -->
					<div class="cta-container">
							<button class="btn btn-whatsapp floating-button" on:click={scrollToForm}>
							<span class="whatsapp-icon">📱</span>
								Regístrate gratis
						</button>
					</div>

						<!-- Contenedor horizontal para temporizador y mensaje promocional -->
						<div class="countdown-promo-container">
						<!-- Contador regresivo -->
						<div class="countdown-container">
							<h3 class="countdown-title">INICIAMOS EN:</h3>
							<div class="countdown-timer">
								<div class="countdown-item" style="--item-index: 0;">
									<div class="countdown-number">{timeLeft.days.toString().padStart(2, '0')}</div>
									<div class="countdown-label">Días</div>
								</div>
								<div class="countdown-item" style="--item-index: 1;">
									<div class="countdown-number">{timeLeft.hours.toString().padStart(2, '0')}</div>
									<div class="countdown-label">Horas</div>
								</div>
								<div class="countdown-item" style="--item-index: 2;">
									<div class="countdown-number">{timeLeft.minutes.toString().padStart(2, '0')}</div>
									<div class="countdown-label">Min</div>
								</div>
								<div class="countdown-item" style="--item-index: 3;">
									<div class="countdown-number">{timeLeft.seconds.toString().padStart(2, '0')}</div>
									<div class="countdown-label">Seg</div>
								</div>
								</div>
							</div>

							<!-- Mensaje promocional -->
							<div class="promotional-message">
								<div class="promo-icon">💰</div>
								<p class="promo-text">
									<strong>No lo dejes pasar:</strong> al inscribirte ahora obtienes un costo más accesible y la posibilidad de pagar con facilidades diseñadas para ti. <strong>Actúa hoy mismo y asegura el futuro académico de tu hijo.</strong>
								</p>
							</div>
						</div>
					</div>
					
					<!-- Video a la derecha -->
					<div class="hero-video">
						<div class="video-container">
							<div class="video-frame">
								<!-- Iframe de YouTube -->
								<iframe 
									src={youtubeVideoUrl}
									title="Video del curso"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen
									class="youtube-iframe">
								</iframe>
							</div>
						</div>
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
					Conoce nuestra misión, visión y el equipo que te acompaña
				</p>
			</div>

			<!-- Carrusel de diapositivas -->
			<div class="about-carousel-container">
				<div class="about-carousel-track" bind:this={aboutCarouselTrack}>
					<!-- Slide 1: Nuestra Historia -->
					<div class="about-slide active">
						<div class="about-main-card">
							<div class="card-header">
								<div class="icon-wrapper">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
										<circle cx="9" cy="7" r="4"/>
										<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
										<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
							</svg>
						</div>
								<h3 class="card-title">Nuestra Historia</h3>
							</div>
							<div class="card-content">
								<p class="main-description">
									ADNED es mucho más que un curso de preparación: es una comunidad que acompaña a los estudiantes en cada paso de su camino académico, brindando innovación, motivación y cercanía. Nacimos con la misión de ofrecer cursos accesibles y de calidad que permitan a los jóvenes enfrentar con confianza y seguridad los exámenes de admisión al bachillerato y la universidad, especialmente bajo los nuevos procesos ECOEMS, UNAM, IPN y UAM.
							</p>
						</div>
					</div>
				</div>

					<!-- Slide 2: Misión -->
					<div class="about-slide">
						<div class="about-card mission-card">
							<div class="card-icon">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
								</svg>
							</div>
							<div class="card-content">
								<h3 class="card-title">Misión</h3>
								<p class="card-description">
									Ofrecer cursos innovadores, accesibles y de calidad que preparen a los estudiantes para superar los exámenes de admisión al bachillerato y la universidad, brindándoles confianza, motivación y herramientas modernas que los acerquen a lograr sus sueños académicos.
							</p>
						</div>
						</div>
					</div>

					<!-- Slide 3: Visión -->
					<div class="about-slide">
						<div class="about-card vision-card">
							<div class="card-icon">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
								<circle cx="12" cy="12" r="3"/>
							</svg>
						</div>
							<div class="card-content">
								<h3 class="card-title">Visión</h3>
								<p class="card-description">
									Convertirse en la comunidad educativa líder en México para la preparación de exámenes de admisión, reconocida por su enfoque futurista, juvenil y motivador, que acompaña a cada alumno en su camino al éxito académico.
								</p>
					</div>
				</div>
			</div>
		</div>

				<!-- Controles de navegación -->
				<div class="about-carousel-controls">
					<button class="about-prev-btn" on:click={prevAboutSlide}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M15 18l-6-6 6-6"/>
						</svg>
					</button>
					<div class="about-dots">
						<button class="about-dot active" on:click={() => goToAboutSlide(0)}></button>
						<button class="about-dot" on:click={() => goToAboutSlide(1)}></button>
						<button class="about-dot" on:click={() => goToAboutSlide(2)}></button>
			</div>
					<button class="about-next-btn" on:click={nextAboutSlide}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M9 18l6-6-6-6"/>
						</svg>
					</button>
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
						<!-- Grid Responsive con Diferentes Tamaños -->
						<div class="responsive-grid">
							<div class="grid-item large">
								<img src="/mentor/IMG_7655.jpg" alt="Ambiente de Estudio" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Ambiente de Estudio</h4>
										<p class="grid-desc">Espacios diseñados para el aprendizaje</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item medium">
								<img src="/mentor/IMG_7660.jpg" alt="Clases Interactivas" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Clases Interactivas</h4>
										<p class="grid-desc">Aprendizaje dinámico</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item small">
								<img src="/mentor/IMG_7661.jpg" alt="Material Didáctico" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Material Didáctico</h4>
										<p class="grid-desc">Recursos de calidad</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item medium">
								<img src="/mentor/IMG_7662.jpg" alt="Tecnología Educativa" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Tecnología Educativa</h4>
										<p class="grid-desc">Herramientas modernas</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item small">
								<img src="/mentor/IMG_7675.jpg" alt="Resultados" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Resultados</h4>
										<p class="grid-desc">Éxito garantizado</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item large">
								<img src="/mentor/IMG_7676.jpg" alt="Mentoría Personalizada" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Mentoría Personalizada</h4>
										<p class="grid-desc">Acompañamiento individual</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item medium">
								<img src="/mentor/IMG_7677.jpg" alt="Comunidad de Aprendizaje" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Comunidad de Aprendizaje</h4>
										<p class="grid-desc">Estudiantes comprometidos</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item small">
								<img src="/mentor/IMG_7687.jpg" alt="Preparación" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Preparación</h4>
										<p class="grid-desc">Para el éxito</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item small">
								<img src="/mentor/IMG_7690.jpg" alt="Confianza" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Confianza</h4>
										<p class="grid-desc">En cada paso</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item medium">
								<img src="/mentor/WhatsApp Image 2025-08-19 at 12.42.47.jpg" alt="Metodología Innovadora" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Metodología Innovadora</h4>
										<p class="grid-desc">Técnicas probadas</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item large">
								<img src="/mentor/WhatsApp Image 2025-08-19 at 12.42.47 (2).jpg" alt="Trabajo en Equipo" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Trabajo en Equipo</h4>
										<p class="grid-desc">Colaboración efectiva</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item small">
								<img src="/mentor/WhatsApp Image 2025-08-19 at 12.42.47 (4).jpg" alt="Motivación" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Motivación</h4>
										<p class="grid-desc">Constante inspiración</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item medium">
								<img src="/mentor/WhatsApp Image 2025-08-19 at 12.43.14.jpg" alt="Dedicación" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Dedicación</h4>
										<p class="grid-desc">Compromiso total</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item small">
								<img src="/mentor/WhatsApp Image 2025-08-19 at 12.45.54.jpg" alt="Experiencia Práctica" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Experiencia Práctica</h4>
										<p class="grid-desc">Aplicación real</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item large">
								<img src="/mentor/WhatsApp Image 2025-08-19 at 12.45.54 (2).jpg" alt="Innovación" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Innovación</h4>
										<p class="grid-desc">Métodos actualizados</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item medium">
								<img src="/mentor/WhatsApp Image 2025-08-19 at 12.45.54 (3).jpg" alt="Crecimiento" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Crecimiento</h4>
										<p class="grid-desc">Desarrollo continuo</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item small">
								<img src="/mentor/WhatsApp Image 2025-08-19 at 12.45.54 (4).jpg" alt="Excelencia" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Excelencia</h4>
										<p class="grid-desc">Calidad superior</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item medium">
								<img src="/mentor/WhatsApp Image 2025-08-19 at 12.45.54 (5).jpg" alt="Transformación" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Transformación</h4>
										<p class="grid-desc">Cambio positivo</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item large">
								<img src="/mentor/WhatsApp Image 2025-08-19 at 12.45.54 (6).jpg" alt="Logros" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Logros</h4>
										<p class="grid-desc">Objetivos cumplidos</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item small">
								<img src="/mentor/WhatsApp Image 2025-08-19 at 12.45.54 (7).jpg" alt="Futuro" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Futuro</h4>
										<p class="grid-desc">Oportunidades brillantes</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item medium">
								<img src="/mentor/WhatsApp Image 2025-08-19 at 12.45.55 (1).jpg" alt="Éxito" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">Éxito</h4>
										<p class="grid-desc">Meta alcanzada</p>
									</div>
								</div>
							</div>
							
							<div class="grid-item large">
								<img src="/mentor/WhatsApp Image 2025-08-19 at 12.45.55.jpg" alt="ADNED" class="grid-image">
								<div class="grid-overlay">
									<div class="grid-content">
										<h4 class="grid-title">ADNED</h4>
										<p class="grid-desc">Tu camino al éxito académico</p>
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

			<!-- Grid de Carruseles -->
			<div class="carousels-grid">
				<!-- Carrusel 1 -->
				<div class="carousel-item">
					<h3 class="carousel-title">"Así nos despidieron nuestros alumnos"</h3>
			<div class="reviews-carousel-container">
				<div class="carousel-wrapper">
							<button class="carousel-btn prev-btn" on:click={prevCarousel1} on:mouseenter={stopAllCarousels} on:mouseleave={startAllCarousels}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="15,18 9,12 15,6"/>
						</svg>
					</button>
							<div class="carousel-track">
								{#each carousel1Images as image, index}
									<div class="carousel-slide" class:active={index === carousel1Index}>
										<img 
											src="/carrusel/1/{image}" 
											alt="Carrusel 1 - Imagen {index + 1}" 
											loading="lazy"
											on:click={() => openImageModal(`/carrusel/1/${image}`, `Carrusel 1 - Imagen ${index + 1}`)}
											class="carousel-image-clickable"
										/>
									</div>
								{/each}
							</div>
							<button class="carousel-btn next-btn" on:click={nextCarousel1} on:mouseenter={stopAllCarousels} on:mouseleave={startAllCarousels}>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<polyline points="9,18 15,12 9,6"/>
								</svg>
							</button>
						</div>
						<div class="carousel-indicators">
							{#each carousel1Images.slice(0, 3) as _, index}
								<button class="indicator" class:active={index === carousel1Index} on:click={() => goToCarousel1(index)}></button>
							{/each}
							{#if carousel1Images.length > 3}
								<span class="more-indicator">+{carousel1Images.length - 3}</span>
							{/if}
						</div>
					</div>
				</div>

				<!-- Carrusel 2 -->
				<div class="carousel-item">
					<h3 class="carousel-title">"Del no puedo al sí puedo"</h3>
					<div class="reviews-carousel-container">
						<div class="carousel-wrapper">
							<button class="carousel-btn prev-btn" on:click={prevCarousel2} on:mouseenter={stopAllCarousels} on:mouseleave={startAllCarousels}>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<polyline points="15,18 9,12 15,6"/>
								</svg>
							</button>
					<div class="carousel-track">
								{#each carousel2Images as image, index}
									<div class="carousel-slide" class:active={index === carousel2Index}>
										<img 
											src="/carrusel/2/{image}" 
											alt="Carrusel 2 - Imagen {index + 1}" 
											loading="lazy"
											on:click={() => openImageModal(`/carrusel/2/${image}`, `Carrusel 2 - Imagen ${index + 1}`)}
											class="carousel-image-clickable"
										/>
							</div>
						{/each}
							</div>
							<button class="carousel-btn next-btn" on:click={nextCarousel2} on:mouseenter={stopAllCarousels} on:mouseleave={startAllCarousels}>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<polyline points="9,18 15,12 9,6"/>
								</svg>
							</button>
						</div>
						<div class="carousel-indicators">
							{#each carousel2Images.slice(0, 3) as _, index}
								<button class="indicator" class:active={index === carousel2Index} on:click={() => goToCarousel2(index)}></button>
							{/each}
							{#if carousel2Images.length > 3}
								<span class="more-indicator">+{carousel2Images.length - 3}</span>
							{/if}
						</div>
					</div>
					</div>

				<!-- Carrusel 3 -->
				<div class="carousel-item">
					<h3 class="carousel-title">"Estuvieron en otro curso pero no fue lo mismo"</h3>
					<div class="reviews-carousel-container">
						<div class="carousel-wrapper">
							<button class="carousel-btn prev-btn" on:click={prevCarousel3} on:mouseenter={stopAllCarousels} on:mouseleave={startAllCarousels}>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<polyline points="15,18 9,12 15,6"/>
								</svg>
							</button>
								<div class="carousel-track">
									{#each carousel3Images as image, index}
										<div class="carousel-slide" class:active={index === carousel3Index}>
											<img 
												src="/carrusel/3/{image}" 
												alt="Carrusel 3 - Imagen {index + 1}" 
												loading="lazy"
												on:click={() => openImageModal(`/carrusel/3/${image}`, `Carrusel 3 - Imagen ${index + 1}`)}
												class="carousel-image-clickable"
											/>
										</div>
									{/each}
								</div>
							<button class="carousel-btn next-btn" on:click={nextCarousel3} on:mouseenter={stopAllCarousels} on:mouseleave={startAllCarousels}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="9,18 15,12 9,6"/>
						</svg>
					</button>
						</div>
						<div class="carousel-indicators">
							{#each carousel3Images.slice(0, 3) as _, index}
								<button class="indicator" class:active={index === carousel3Index} on:click={() => goToCarousel3(index)}></button>
							{/each}
							{#if carousel3Images.length > 3}
								<span class="more-indicator">+{carousel3Images.length - 3}</span>
							{/if}
						</div>
					</div>
				</div>

				<!-- Botón para mostrar carruseles adicionales -->
				<button class="carousel-item expand-button" on:click={toggleAdditionalCarousels} type="button" aria-label={showAdditionalCarousels ? 'Ocultar carruseles adicionales' : 'Mostrar carruseles adicionales'}>
					<div class="expand-content">
						<div class="expand-icon" class:rotated={showAdditionalCarousels}>
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="6,9 12,15 18,9"/>
							</svg>
						</div>
						<h3 class="expand-title">
							{showAdditionalCarousels ? 'VER MENOS' : 'VER MÁS'}
						</h3>
					</div>
				</button>

				<!-- Carruseles adicionales (solo se muestran si showAdditionalCarousels es true) -->
				{#if showAdditionalCarousels}
					<!-- Carrusel 4 -->
					<div class="carousel-item">
						<h3 class="carousel-title">"Los papás confiaron y así lo reconocen"</h3>
						<div class="reviews-carousel-container">
							<div class="carousel-wrapper">
								<button class="carousel-btn prev-btn" on:click={prevCarousel4} on:mouseenter={stopAllCarousels} on:mouseleave={startAllCarousels}>
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<polyline points="15,18 9,12 15,6"/>
									</svg>
								</button>
								<div class="carousel-track">
									{#each carousel4Images as image, index}
										<div class="carousel-slide" class:active={index === carousel4Index}>
											<img 
												src="/carrusel/4/{image}" 
												alt="Carrusel 4 - Imagen {index + 1}" 
												loading="lazy"
												on:click={() => openImageModal(`/carrusel/4/${image}`, `Carrusel 4 - Imagen ${index + 1}`)}
												class="carousel-image-clickable"
											/>
										</div>
									{/each}
								</div>
								<button class="carousel-btn next-btn" on:click={nextCarousel4} on:mouseenter={stopAllCarousels} on:mouseleave={startAllCarousels}>
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<polyline points="9,18 15,12 9,6"/>
									</svg>
								</button>
							</div>
				<div class="carousel-indicators">
								{#each carousel4Images.slice(0, 3) as _, index}
									<button class="indicator" class:active={index === carousel4Index} on:click={() => goToCarousel4(index)}></button>
					{/each}
								{#if carousel4Images.length > 3}
									<span class="more-indicator">+{carousel4Images.length - 3}</span>
								{/if}
							</div>
						</div>
				</div>

					<!-- Carrusel 5 -->
					<div class="carousel-item">
						<h3 class="carousel-title">"Y mira lograron cumplir su misión"</h3>
						<div class="reviews-carousel-container">
							<div class="carousel-wrapper">
								<button class="carousel-btn prev-btn" on:click={prevCarousel5} on:mouseenter={stopAllCarousels} on:mouseleave={startAllCarousels}>
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<polyline points="15,18 9,12 15,6"/>
									</svg>
								</button>
								<div class="carousel-track">
									{#each carousel5Images as image, index}
										<div class="carousel-slide" class:active={index === carousel5Index}>
											<img 
												src="/carrusel/5/{image}" 
												alt="Carrusel 5 - Imagen {index + 1}" 
												loading="lazy"
												on:click={() => openImageModal(`/carrusel/5/${image}`, `Carrusel 5 - Imagen ${index + 1}`)}
												class="carousel-image-clickable"
											/>
										</div>
									{/each}
								</div>
								<button class="carousel-btn next-btn" on:click={nextCarousel5} on:mouseenter={stopAllCarousels} on:mouseleave={startAllCarousels}>
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<polyline points="9,18 15,12 9,6"/>
									</svg>
								</button>
							</div>
							<div class="carousel-indicators">
								{#each carousel5Images.slice(0, 3) as _, index}
									<button class="indicator" class:active={index === carousel5Index} on:click={() => goToCarousel5(index)}></button>
								{/each}
								{#if carousel5Images.length > 3}
									<span class="more-indicator">+{carousel5Images.length - 3}</span>
								{/if}
							</div>
				</div>
					</div>

				{/if}
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

	<!-- Modal de Zoom para Imágenes -->
	{#if showImageModal}
		<div class="image-modal-overlay" on:click={closeImageModal}>
			<div class="image-modal-content" on:click|stopPropagation>
				<button class="image-modal-close" on:click={closeImageModal}>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
				<img src={selectedImage} alt={selectedImageAlt} class="image-modal-image">
			</div>
		</div>
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
		background: linear-gradient(135deg, #290040 0%, #3d0060 50%, #290040 100%);
		color: var(--bg-white);
		padding: 4rem 0;
		min-height: 80vh;
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

	.hero-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
		max-width: 1400px;
		margin: 0 auto;
		position: relative;
		z-index: 2;
	}

	.hero-text {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.hero-video {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		height: 100%;
		min-height: 500px;
		padding-top: 0;
		margin-top: -2rem;
	}

	.video-container {
		position: relative;
		width: 100%;
		max-width: 600px;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.video-frame {
		position: relative;
		width: 500px;
		height: 500px;
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
		background: #1e293b;
		transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
		transition: all 0.3s ease;
		margin: 0 auto;
	}

	.video-frame:hover {
		transform: perspective(1000px) rotateY(-2deg) rotateX(2deg) scale(1.02);
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
	}

	.video-thumbnail {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
	}

	.youtube-iframe {
		width: 100%;
		height: 100%;
		border: none;
		border-radius: 50%;
	}


	.video-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ai-robot {
		position: absolute;
		top: 20px;
		right: 20px;
		font-size: 2rem;
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-10px); }
	}

	.play-button {
		width: 80px;
		height: 80px;
		background: rgba(255, 255, 255, 0.9);
		border: none;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.play-button:hover {
		background: rgba(255, 255, 255, 1);
		transform: scale(1.1);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
	}

	.play-button svg {
		width: 30px;
		height: 30px;
		color: #1e293b;
		margin-left: 3px;
	}

	.video-shapes {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
	}

	.shape {
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		animation: float 4s ease-in-out infinite;
	}

	.shape-1 {
		width: 20px;
		height: 20px;
		top: 30%;
		left: 10%;
		animation-delay: 0s;
	}

	.shape-2 {
		width: 15px;
		height: 15px;
		top: 60%;
		right: 15%;
		animation-delay: 1s;
	}

	.shape-3 {
		width: 25px;
		height: 25px;
		bottom: 20%;
		left: 20%;
		animation-delay: 2s;
	}

	.hero-title {
		font-size: 3rem;
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

	/* Contenedor horizontal para temporizador y mensaje promocional */
	.countdown-promo-container {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
		margin-top: 2.5rem;
	}

	/* Contador regresivo */
	.countdown-container {
		flex: 0.8;
		text-align: center;
	}

	.countdown-title {
		color: #ffffff;
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 1.5rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		animation: titlePulse 2s ease-in-out infinite;
		position: relative;
	}

	@keyframes titlePulse {
		0%, 100% { 
			transform: scale(1);
			text-shadow: 
				0 2px 4px rgba(0, 0, 0, 0.3),
				0 0 10px rgba(251, 191, 36, 0.3);
		}
		50% { 
			transform: scale(1.05);
			text-shadow: 
				0 2px 4px rgba(0, 0, 0, 0.3),
				0 0 20px rgba(251, 191, 36, 0.6),
				0 0 30px rgba(251, 191, 36, 0.4);
		}
	}

	.countdown-timer {
		display: flex;
		justify-content: center;
		gap: 0.8rem;
		flex-wrap: nowrap;
	}

	.countdown-item {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		padding: 1rem 0.8rem;
		min-width: 70px;
		text-align: center;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
		transition: all 0.3s ease;
	}

	.countdown-item:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
		background: rgba(255, 255, 255, 0.15);
	}

	/* Mensaje promocional */
	.promotional-message {
		flex: 1.5;
		padding: 1.5rem;
		background: linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(251, 191, 36, 0.15) 50%, rgba(59, 130, 246, 0.15) 100%);
		backdrop-filter: blur(10px);
		border: 2px solid rgba(251, 191, 36, 0.3);
		border-radius: 1rem;
		text-align: left;
		position: relative;
		overflow: hidden;
		animation: promotionalPulse 3s ease-in-out infinite;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 0;
	}

	.promotional-message::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
	}

	.promo-icon {
		font-size: 2rem;
		margin-bottom: 0.75rem;
		animation: bounce 2s ease-in-out infinite;
	}

	.promo-text {
		color: #ffffff;
		font-size: 1.1rem;
		line-height: 1.5;
		margin: 0;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		text-align: left;
		padding: 0.5rem 0;
	}

	.promo-text strong {
		color: #fbbf24;
		font-weight: 700;
		text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
	}

	@keyframes promotionalPulse {
		0%, 100% { 
			transform: scale(1);
			box-shadow: 0 4px 15px rgba(251, 191, 36, 0.2);
		}
		50% { 
			transform: scale(1.02);
			box-shadow: 0 8px 25px rgba(251, 191, 36, 0.4);
		}
	}

	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
		40% { transform: translateY(-10px); }
		60% { transform: translateY(-5px); }
	}

	.countdown-number {
		font-size: 2.2rem;
		font-weight: 800;
		color: #ffffff;
		line-height: 1;
		margin-bottom: 0.5rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		animation: numberGlow 3s ease-in-out infinite;
		animation-delay: calc(var(--item-index) * 0.2s);
	}

	@keyframes numberGlow {
		0%, 100% { 
			transform: scale(1);
			text-shadow: 
				0 2px 4px rgba(0, 0, 0, 0.3),
				0 0 8px rgba(251, 191, 36, 0.2);
		}
		50% { 
			transform: scale(1.08);
			text-shadow: 
				0 2px 4px rgba(0, 0, 0, 0.3),
				0 0 15px rgba(251, 191, 36, 0.5),
				0 0 25px rgba(251, 191, 36, 0.3);
		}
	}

	.countdown-label {
		font-size: 0.9rem;
		font-weight: 600;
		color: #fbbf24;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
		animation: labelFloat 4s ease-in-out infinite;
		animation-delay: calc(var(--item-index) * 0.3s);
	}

	@keyframes labelFloat {
		0%, 100% { 
			transform: translateY(0px);
			opacity: 0.8;
		}
		50% { 
			transform: translateY(-3px);
			opacity: 1;
		}
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

	/* Imágenes clickeables del carrusel */
	.carousel-image-clickable {
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.carousel-image-clickable:hover {
		transform: scale(1.05);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
	}

	/* Modal de Zoom */
	.image-modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.9);
		backdrop-filter: blur(10px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
		animation: modalFadeIn 0.3s ease;
	}

	.image-modal-content {
		position: relative;
		max-width: 90vw;
		max-height: 90vh;
		width: auto;
		height: auto;
		background: transparent;
		border-radius: 1rem;
		overflow: visible;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
		animation: modalSlideIn 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image-modal-close {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 40px;
		height: 40px;
		background: rgba(0, 0, 0, 0.7);
		border: none;
		border-radius: 50%;
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10001;
		transition: all 0.3s ease;
	}

	.image-modal-close:hover {
		background: rgba(0, 0, 0, 0.9);
		transform: scale(1.1);
	}

	.image-modal-close svg {
		width: 20px;
		height: 20px;
	}

	.image-modal-image {
		max-width: 90vw;
		max-height: 90vh;
		width: auto;
		height: auto;
		object-fit: contain;
		display: block;
		border-radius: 0.5rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	@keyframes modalFadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes modalSlideIn {
		from { 
			opacity: 0;
			transform: scale(0.8) translateY(20px);
		}
		to { 
			opacity: 1;
			transform: scale(1) translateY(0);
		}
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

	/* Efecto de flotación para el botón */
	.floating-button {
		animation: floating 4s ease-in-out infinite;
		box-shadow: 
			0 15px 35px rgba(251, 191, 36, 0.5),
			0 0 25px rgba(251, 191, 36, 0.3),
			0 0 0 1px rgba(255, 255, 255, 0.1);
	}

	@keyframes floating {
		0%, 100% { 
			transform: translateY(0px) scale(1);
			box-shadow: 
				0 15px 35px rgba(251, 191, 36, 0.5),
				0 0 25px rgba(251, 191, 36, 0.3),
				0 0 0 1px rgba(255, 255, 255, 0.1);
		}
		20% { 
			transform: translateY(-10px) scale(1.03);
			box-shadow: 
				0 20px 40px rgba(251, 191, 36, 0.6),
				0 0 30px rgba(251, 191, 36, 0.4),
				0 0 0 2px rgba(255, 255, 255, 0.2);
		}
		40% { 
			transform: translateY(-15px) scale(1.05);
			box-shadow: 
				0 25px 45px rgba(251, 191, 36, 0.7),
				0 0 35px rgba(251, 191, 36, 0.5),
				0 0 0 3px rgba(255, 255, 255, 0.3);
		}
		60% { 
			transform: translateY(-10px) scale(1.03);
			box-shadow: 
				0 20px 40px rgba(251, 191, 36, 0.6),
				0 0 30px rgba(251, 191, 36, 0.4),
				0 0 0 2px rgba(255, 255, 255, 0.2);
		}
		80% { 
			transform: translateY(-5px) scale(1.01);
			box-shadow: 
				0 18px 38px rgba(251, 191, 36, 0.55),
				0 0 28px rgba(251, 191, 36, 0.35),
				0 0 0 1.5px rgba(255, 255, 255, 0.15);
		}
	}

	.floating-button:hover {
		animation-play-state: paused;
		transform: translateY(-15px) scale(1.08);
		box-shadow: 
			0 30px 50px rgba(251, 191, 36, 0.8),
			0 0 40px rgba(251, 191, 36, 0.6),
			0 0 0 4px rgba(255, 255, 255, 0.4);
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
		.image-modal-content {
			max-width: 95vw;
			max-height: 95vh;
			margin: 1rem;
		}

		.image-modal-image {
			max-width: 95vw;
			max-height: 95vh;
		}

		.image-modal-close {
			width: 35px;
			height: 35px;
			top: 0.5rem;
			right: 0.5rem;
		}

		.image-modal-close svg {
			width: 18px;
			height: 18px;
		}
	}

	@media (max-width: 480px) {
		.image-modal-content {
			max-width: 98vw;
			max-height: 98vh;
			margin: 0.5rem;
		}

		.image-modal-image {
			max-width: 98vw;
			max-height: 98vh;
		}

		.image-modal-close {
			width: 30px;
			height: 30px;
			top: 0.25rem;
			right: 0.25rem;
		}

		.image-modal-close svg {
			width: 16px;
			height: 16px;
		}

		.hero {
			padding: 2rem 0;
			min-height: auto;
		}

		.hero-content {
			grid-template-columns: 1fr;
			gap: 2rem;
			text-align: center;
		}

		.hero-title {
			font-size: 2.2rem;
		}

		.hero-subtitle {
			font-size: 1rem;
		}

		.video-frame {
			width: 350px;
			height: 350px;
			transform: none;
		}

		.hero-video {
			min-height: 400px;
			padding-top: 0;
			margin-top: -1.5rem;
		}

		/* Contenedor horizontal para tablets */
		.countdown-promo-container {
			flex-direction: column;
			gap: 1.5rem;
		}

		.video-frame:hover {
			transform: scale(1.02);
		}


		.play-button {
			width: 60px;
			height: 60px;
		}

		.play-button svg {
			width: 24px;
			height: 24px;
		}

		.registration-form {
			padding: 1.25rem;
		}

		/* Contador responsivo */
		.countdown-container {
			margin-top: 2rem;
		}

		.countdown-title {
			font-size: 1.1rem;
		}

		.countdown-timer {
			gap: 0.4rem;
			flex-wrap: nowrap;
		}

		.countdown-item {
			padding: 0.6rem 0.4rem;
			min-width: 45px;
		}

		.countdown-number {
			font-size: 1.6rem;
		}

		.countdown-label {
			font-size: 0.7rem;
		}
	}

	@media (max-width: 480px) {
		.hero-title {
			font-size: 1.8rem;
		}

		.hero-subtitle {
			font-size: 0.9rem;
		}

		.video-frame {
			width: 300px;
			height: 300px;
		}

		.hero-video {
			min-height: 350px;
			padding-top: 0;
			margin-top: -1rem;
		}


		/* Contenedor horizontal responsivo */
		.countdown-promo-container {
			flex-direction: column;
			gap: 1.5rem;
		}

		/* Mensaje promocional móvil */
		.promotional-message {
			padding: 1rem;
			text-align: left;
		}

		.promo-icon {
			font-size: 1.5rem;
		}

		.promo-text {
			font-size: 0.9rem;
			line-height: 1.3;
		}

		/* Contador móvil pequeño */
		.countdown-timer {
			gap: 0.3rem;
			flex-wrap: nowrap;
		}

		.countdown-item {
			padding: 0.5rem 0.3rem;
			min-width: 40px;
		}

		.countdown-number {
			font-size: 1.4rem;
		}

		.countdown-label {
			font-size: 0.6rem;
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



	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 6rem 2rem 4rem 2rem;
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




	/* Quiénes Somos Section */
	.quienes-somos-section {
		padding: 4rem 0 6rem 0;
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

	/* Carrusel de Quiénes Somos */
	.about-carousel-container {
		max-width: 95%;
		width: 100%;
		margin: 0 auto;
		position: relative;
		z-index: 2;
		overflow: hidden;
		border-radius: 2rem;
	}

	.about-carousel-track {
		display: flex;
		transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
		width: 300%;
	}

	.about-slide {
		width: 33.333%;
		flex-shrink: 0;
		padding: 0 3rem;
		opacity: 0.6;
		transform: scale(0.9);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
		filter: blur(1px);
	}

	.about-slide.active {
		opacity: 1;
		transform: scale(1);
		filter: blur(0);
	}

	/* Card principal - ocupa toda la slide */
	.about-main-card {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
		backdrop-filter: blur(20px);
		border-radius: 2rem;
		padding: 5rem 4rem;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.3);
		position: relative;
		overflow: hidden;
		transition: all 0.4s ease;
	}

	.about-main-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #f97316 100%);
	}

	.about-main-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 35px 70px rgba(0, 0, 0, 0.3);
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.icon-wrapper {
		width: 70px;
		height: 70px;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
		transition: all 0.3s ease;
	}

	.icon-wrapper svg {
		width: 35px;
		height: 35px;
		color: white;
	}

	.about-main-card:hover .icon-wrapper {
		transform: scale(1.1) rotate(5deg);
		box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
	}

	.main-description {
		font-size: 1.1rem;
		line-height: 1.8;
		color: #374151;
		margin: 0;
		text-align: left;
	}

	/* Cards secundarias */
	.about-card {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%);
		backdrop-filter: blur(15px);
		border-radius: 1.5rem;
		padding: 4rem 3rem;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.2);
		position: relative;
		overflow: hidden;
		transition: all 0.4s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.about-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
	}

	.about-card:hover {
		transform: translateY(-8px) scale(1.02);
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
	}

	.mission-card:hover {
		border-color: rgba(249, 115, 22, 0.4);
	}

	.vision-card:hover {
		border-color: rgba(59, 130, 246, 0.4);
	}


	.card-icon {
		width: 60px;
		height: 60px;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.5rem;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
		transition: all 0.3s ease;
	}

	.mission-card .card-icon {
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 100%);
	}

	.vision-card .card-icon {
		background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
	}


	.card-icon svg {
		width: 30px;
		height: 30px;
		color: white;
	}

	.about-card:hover .card-icon {
		transform: scale(1.1) rotate(-5deg);
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
	}

	.card-title {
		font-size: 1.4rem;
		font-weight: 700;
		color: #1f2937;
		margin-bottom: 1rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.card-description {
		font-size: 0.95rem;
		line-height: 1.6;
		color: #4b5563;
		margin: 0;
		text-align: left;
	}

	/* Controles del carrusel */
	.about-carousel-controls {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1.5rem;
		margin-top: 1.5rem;
		opacity: 0.8;
	}

	.about-prev-btn,
	.about-next-btn {
		width: 40px;
		height: 40px;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(139, 92, 246, 0.8) 100%);
		border: none;
		border-radius: 50%;
		color: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
	}

	.about-prev-btn:hover,
	.about-next-btn:hover {
		transform: scale(1.05);
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
		box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
	}

	.about-prev-btn svg,
	.about-next-btn svg {
		width: 16px;
		height: 16px;
	}

	.about-dots {
		display: flex;
		gap: 0.5rem;
	}

	.about-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.4);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.about-dot.active {
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
		transform: scale(1.3);
		box-shadow: 0 2px 10px rgba(59, 130, 246, 0.4);
	}

	.about-dot:hover {
		background: rgba(255, 255, 255, 0.7);
		transform: scale(1.1);
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
	@media (max-width: 1024px) {
		.about-carousel-container {
			max-width: 98%;
		}
	}

	@media (max-width: 768px) {
		.quienes-somos-section {
			padding: 3rem 0;
		}

		.about-carousel-container {
			max-width: 100%;
			margin: 0 1rem;
		}

		.about-slide {
			padding: 0 2rem;
		}

		.about-main-card {
			padding: 4rem 2.5rem;
		}

		.card-header {
			flex-direction: column;
			text-align: center;
			gap: 1rem;
		}

		.icon-wrapper {
			width: 60px;
			height: 60px;
		}

		.icon-wrapper svg {
			width: 30px;
			height: 30px;
		}

		.main-description {
			font-size: 1rem;
			text-align: center;
		}

		.about-card {
			padding: 1.5rem;
		}

		.card-title {
			font-size: 1.3rem;
		}

		.card-description {
			font-size: 0.9rem;
			text-align: center;
		}

		.about-carousel-controls {
			gap: 1.5rem;
		}

		.about-prev-btn,
		.about-next-btn {
			width: 45px;
			height: 45px;
		}
	}

	@media (max-width: 480px) {
		.quienes-somos-section {
			padding: 2rem 0;
		}

		.about-carousel-container {
			margin: 0 0.5rem;
		}

		.about-main-card {
			padding: 3rem 2rem;
		}

		.about-card {
			padding: 3rem 2rem;
		}

		.card-icon {
			width: 50px;
			height: 50px;
			margin-bottom: 1rem;
		}

		.card-icon svg {
			width: 25px;
			height: 25px;
		}

		.card-title {
		font-size: 1.2rem;
			margin-bottom: 0.8rem;
		}

		.card-description {
			font-size: 0.85rem;
			line-height: 1.5;
		}

		.main-description {
			font-size: 0.95rem;
		}

		.about-carousel-controls {
			gap: 1rem;
		}

		.about-prev-btn,
		.about-next-btn {
			width: 40px;
			height: 40px;
		}

		.about-prev-btn svg,
		.about-next-btn svg {
			width: 16px;
			height: 16px;
		}

		.about-dot {
			width: 10px;
			height: 10px;
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

		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
		border-color: rgba(251, 191, 36, 0.6);
		background: rgba(255, 255, 255, 1);
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

	/*
	.curso-section:hover {
		transform: translateY(-8px);
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
		border-color: rgba(251, 191, 36, 0.6);
		background: rgba(255, 255, 255, 1);
	}
	*/

	.curso-intro {
		border-color: rgba(249, 115, 22, 0.4);
		/*background: linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(251, 191, 36, 0.05) 50%, rgba(59, 130, 246, 0.05) 100%);*/
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
		max-width: 1000px;
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

	/* Grid Responsive Styles */
	.responsive-grid {
		margin-top: 2rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		grid-auto-rows: 200px;
	}

	.grid-item {
		position: relative;
		border-radius: 1.5rem;
		overflow: hidden;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		background: #ffffff;
		cursor: pointer;
		grid-row: span 1;
	}

	.grid-item:hover {
		transform: translateY(-8px) scale(1.02);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
		z-index: 10;
	}

	.grid-item.large {
		grid-row: span 2;
		grid-column: span 1;
	}

	.grid-item.medium {
		grid-row: span 1.5;
		grid-column: span 1;
	}

	.grid-item.small {
		grid-row: span 1;
		grid-column: span 1;
	}

	.grid-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.grid-item:hover .grid-image {
		transform: scale(1.05);
	}

	.grid-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			135deg, 
			rgba(139, 92, 246, 0.9) 0%, 
			rgba(59, 130, 246, 0.8) 25%,
			rgba(249, 115, 22, 0.9) 75%,
			rgba(251, 191, 36, 0.9) 100%
		);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		backdrop-filter: blur(2px);
	}

	.grid-item:hover .grid-overlay {
		opacity: 1;
	}

	.grid-content {
		text-align: center;
		color: white;
		padding: 1.5rem;
		transform: translateY(15px);
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.grid-item:hover .grid-content {
		transform: translateY(0);
	}

	.grid-title {
		font-size: 1.3rem;
		font-weight: 800;
		margin-bottom: 0.5rem;
		text-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
		background: linear-gradient(135deg, #ffffff 0%, #fbbf24 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.grid-desc {
		font-size: 0.9rem;
		opacity: 0.95;
		line-height: 1.4;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		font-weight: 500;
		margin: 0;
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

		/* Grid Responsive - Tablet */
		.responsive-grid {
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 1rem;
			grid-auto-rows: 180px;
		}

		.grid-item.large {
			grid-row: span 2;
		}

		.grid-item.medium {
			grid-row: span 1.5;
		}

		.grid-item.small {
			grid-row: span 1;
		}

		.grid-title {
			font-size: 1.1rem;
		}

		.grid-desc {
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

		/* Grid Responsive - Mobile */
		.responsive-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
			grid-auto-rows: 200px;
		}

		.grid-item.large,
		.grid-item.medium,
		.grid-item.small {
			grid-row: span 1;
			grid-column: span 1;
		}

		.grid-content {
			padding: 1rem;
		}

		.grid-title {
			font-size: 1.1rem;
			margin-bottom: 0.5rem;
		}

		.grid-desc {
			font-size: 0.85rem;
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
		padding: 2rem 0 1rem 0;
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
		/*background-color: rgba(255, 255, 255, 0.1);*/
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

	/* Grid de Carruseles */
	.carousels-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(300px, 1fr));
		gap: 1.5rem;
		margin: 2rem auto;
		padding: 2rem 0;
		max-width: 1200px;
		width: 100%;
		justify-items: center;
		align-items: start;
	}

	.carousel-item {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(10px);
		border-radius: 1rem;
		padding: 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
		transition: all 0.3s ease;
		width: 100%;
		max-width: 500px;
		min-width: 300px;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.carousel-item:hover {
		transform: translateY(-5px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
		background: rgba(255, 255, 255, 0.08);
	}

	.carousel-title {
		color: #fbbf24;
		font-size: 1.2rem;
		font-weight: 700;
		text-align: center;
		margin-bottom: 1rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	/* Botón de expansión flotante */
	.expand-button {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #87ceeb 100%);
		border: none;
		border-radius: 50px;
		padding: 0.6rem 1.2rem;
		box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		width: fit-content;
		height: fit-content;
		margin: 2rem auto;
		grid-column: 1 / -1;
		justify-self: center;
		max-width: 1200px;
		min-width: auto;
	}

	.expand-button::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
		border-radius: 50px;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.expand-button:hover {
		transform: translateY(-3px);
		box-shadow: 0 12px 35px rgba(255, 107, 53, 0.4);
	}

	.expand-button:hover::before {
		opacity: 1;
	}

	.expand-content {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		position: relative;
		z-index: 1;
	}

	.expand-icon {
		width: 18px;
		height: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.3s ease;
	}

	.expand-icon svg {
		width: 16px;
		height: 16px;
		color: white;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
		transition: transform 0.3s ease;
	}

	.expand-icon.rotated {
		transform: rotate(180deg);
	}

	.expand-icon.rotated svg {
		transform: rotate(180deg);
	}

	.expand-title {
		color: white;
		font-size: 0.9rem;
		font-weight: 700;
		margin: 0;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	/* Carrusel de Reseñas */
	.reviews-carousel-container {
		max-width: 100%;
		position: relative;
		z-index: 2;
		padding: 1rem 0;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.carousel-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 2rem;
		flex: 1;
	}

	.carousel-track {
		position: relative;
		width: 100%;
		max-width: 700px;
		height: 400px;
		overflow: hidden;
		border-radius: 1.5rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px);
		border: 2px solid rgba(255, 255, 255, 0.2);
	}

	.carousel-slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transform: translateX(100%);
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.carousel-slide.active {
		opacity: 1;
		transform: translateX(0);
	}

	.carousel-slide img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		border-radius: 1rem;
		transition: transform 0.3s ease;
		background: rgba(255, 255, 255, 0.95);
		padding: 0.2rem;
	}

	.carousel-slide:hover img {
		transform: scale(1.02);
	}

	.carousel-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(20px);
		border: 2px solid rgba(251, 191, 36, 0.3);
		border-radius: 50%;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		z-index: 10;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
	}

	.carousel-btn:hover {
		background: rgba(251, 191, 36, 0.9);
		border-color: rgba(251, 191, 36, 0.8);
		transform: translateY(-50%) scale(1.1);
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
	}

	.carousel-btn svg {
		width: 24px;
		height: 24px;
		color: #290040;
		transition: color 0.3s ease;
	}

	.carousel-btn:hover svg {
		color: white;
	}

	.prev-btn {
		left: -25px;
	}

	.next-btn {
		right: -25px;
	}

	.carousel-indicators {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
		margin-top: auto;
	}

	.indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.4);
		border: 2px solid rgba(255, 255, 255, 0.6);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.indicator:hover {
		background: rgba(251, 191, 36, 0.6);
		border-color: rgba(251, 191, 36, 0.8);
		transform: scale(1.2);
	}

	.indicator.active {
		background: rgba(251, 191, 36, 0.9);
		border-color: rgba(251, 191, 36, 1);
		transform: scale(1.3);
		box-shadow: 0 0 15px rgba(251, 191, 36, 0.5);
	}

	.more-indicator {
		color: #fbbf24;
		font-size: 0.8rem;
		font-weight: 600;
		margin-left: 0.5rem;
		background: rgba(251, 191, 36, 0.1);
		padding: 0.2rem 0.5rem;
		border-radius: 10px;
		border: 1px solid rgba(251, 191, 36, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 24px;
		height: 20px;
	}

	.carousel-counter {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		font-size: 1rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.9);
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(10px);
		padding: 0.5rem 1rem;
		border-radius: 2rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		width: fit-content;
		margin: 0 auto;
	}

	.carousel-counter .current {
		color: #fbbf24;
		font-size: 1.1rem;
	}

	.carousel-counter .separator {
		color: rgba(255, 255, 255, 0.6);
	}

	.carousel-counter .total {
		color: rgba(255, 255, 255, 0.8);
	}

	/* Responsive para Carrusel de Reseñas */
	@media (max-width: 768px) {
		.faq-section {
			padding: 2rem 0 1rem 0;
		}

		.reinforcement-text {
			font-size: 1.1rem;
			padding: 0.875rem 1.5rem;
		}

		.highlight-number {
			font-size: 1.3rem;
		}

		.carousels-grid {
			grid-template-columns: repeat(3, minmax(250px, 1fr));
			gap: 1rem;
			max-width: 1000px;
		}

		.carousel-item {
			padding: 1rem;
		}

		.carousel-title {
			font-size: 1rem;
		}

		.expand-button {
			padding: 0.5rem 1rem;
			margin: 1.5rem auto;
		}

		.expand-icon {
			width: 16px;
			height: 16px;
		}

		.expand-icon svg {
			width: 14px;
			height: 14px;
		}

		.expand-title {
			font-size: 0.85rem;
		}

		.reviews-carousel-container {
			padding: 1.5rem 0;
		}

		.carousel-track {
			max-width: 650px;
			height: 400px;
		}

		.carousel-btn {
			width: 45px;
			height: 45px;
		}

		.carousel-btn svg {
			width: 20px;
			height: 20px;
		}

		.prev-btn {
			left: -22px;
		}

		.next-btn {
			right: -22px;
		}

		.carousel-indicators {
			gap: 0.5rem;
		}

		.indicator {
			width: 10px;
			height: 10px;
		}

		.carousel-counter {
			font-size: 0.9rem;
			padding: 0.4rem 0.8rem;
		}
	}

	@media (max-width: 480px) {
		.reinforcement-text {
			font-size: 1rem;
			padding: 0.75rem 1.25rem;
		}

		.highlight-number {
			font-size: 1.2rem;
		}

		.carousels-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
			max-width: 400px;
		}

		.carousel-item {
			min-width: 280px;
		}

		.carousel-item {
			padding: 0.8rem;
		}

		.carousel-title {
			font-size: 0.9rem;
		}

		.carousel-track {
			max-width: 600px;
			height: 400px;
		}

		.expand-button {
			padding: 0.5rem 0.9rem;
			margin: 1rem auto;
			max-width: 400px;
		}

		.expand-icon {
			width: 14px;
			height: 14px;
		}

		.expand-icon svg {
			width: 12px;
			height: 12px;
		}

		.expand-title {
			font-size: 0.8rem;
		}

		.reviews-carousel-container {
			padding: 1rem 0;
		}

		.carousel-track {
			max-width: 350px;
			height: 300px;
		}

		.carousel-btn {
			width: 40px;
			height: 40px;
		}

		.carousel-btn svg {
			width: 18px;
			height: 18px;
		}

		.prev-btn {
			left: -20px;
		}

		.next-btn {
			right: -20px;
		}

		.carousel-indicators {
			gap: 0.4rem;
			margin-bottom: 1rem;
		}

		.indicator {
			width: 8px;
			height: 8px;
		}

		.carousel-counter {
			font-size: 0.8rem;
			padding: 0.3rem 0.6rem;
		}
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
		max-width: 700px;
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
