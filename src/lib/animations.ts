import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Tipos para los elementos DOM
type HTMLElement = Element | null;
type HTMLElementArray = NodeListOf<Element>;

// Animaciones del Hero
export function animateHero(heroTitle: HTMLElement, heroSubtitle: HTMLElement, registrationForm: HTMLElement): void {
	// Verificar que los elementos existan antes de animar
	if (!heroTitle || !heroSubtitle || !registrationForm) {
		console.log('Elementos no encontrados para animar');
		return;
	}

	// Asegurar que el formulario sea visible
	gsap.set(registrationForm, {
		opacity: 1,
		y: 0,
		display: "block"
	});

	const tl = gsap.timeline();
	
	tl.from(heroTitle, {
		duration: 0.8,
		y: 30,
		opacity: 0,
		ease: "power2.out"
	})
	.from(heroSubtitle, {
		duration: 0.6,
		y: 20,
		opacity: 0,
		ease: "power2.out"
	}, "-=0.2")
	.from(registrationForm, {
		duration: 0.6,
		y: 20,
		opacity: 0.8,
		ease: "power2.out"
	}, "-=0.1");
}

// Animaciones de scroll
export function animateScrollElements(): void {
	// Animación simple de los botones
	setTimeout(() => {
		gsap.from(".btn", {
			duration: 0.5,
			scale: 0.9,
			opacity: 0,
			stagger: 0.1,
			ease: "power2.out"
		});
	}, 500);
	
	// Animación simple de los campos del formulario
	setTimeout(() => {
		gsap.from(".form-group", {
			duration: 0.4,
			x: -20,
			opacity: 0,
			stagger: 0.1,
			ease: "power2.out"
		});
	}, 800);
}

// Animaciones de hover
export function addHoverAnimations(registrationForm: HTMLElement): void {
	if (!registrationForm) return;
	
	registrationForm.addEventListener('mouseenter', () => {
		gsap.to(registrationForm, {
			duration: 0.2,
			scale: 1.01,
			ease: "power2.out"
		});
	});
	
	registrationForm.addEventListener('mouseleave', () => {
		gsap.to(registrationForm, {
			duration: 0.2,
			scale: 1,
			ease: "power2.out"
		});
	});
}

// Animación de pulsación para botones importantes
export function addPulseAnimation(element: HTMLElement): void {
	if (!element) return;
	
	gsap.to(element, {
		duration: 2,
		scale: 1.02,
		ease: "power2.inOut",
		repeat: -1,
		yoyo: true
	});
}

// Animación de escritura para texto
export function typewriterAnimation(element: HTMLElement, text: string, speed: number = 0.05): void {
	if (!element) return;
	
	let i = 0;
	element.textContent = '';
	
	function type(): void {
		if (i < text.length) {
			element.textContent += text.charAt(i);
			i++;
			setTimeout(type, speed * 1000);
		}
	}
	
	type();
}

// Animación de partículas flotantes (deshabilitada)
export function createFloatingParticles(container: HTMLElement): void {
	if (!container) return;
	
	const particles: HTMLElement[] = [];
	const particleCount = 20;
	
	for (let i = 0; i < particleCount; i++) {
		const particle = document.createElement('div');
		particle.className = 'floating-particle';
		particle.style.cssText = `
			position: absolute;
			width: 4px;
			height: 4px;
			background: rgba(255, 255, 255, 0.6);
			border-radius: 50%;
			pointer-events: none;
		`;
		
		// Posición aleatoria
		particle.style.left = Math.random() * 100 + '%';
		particle.style.top = Math.random() * 100 + '%';
		
		container.appendChild(particle);
		particles.push(particle);
		
		// Animación de flotación
		gsap.to(particle, {
			duration: 3 + Math.random() * 2,
			y: -100 - Math.random() * 100,
			x: Math.random() * 200 - 100,
			opacity: 0,
			ease: "power1.out",
			repeat: -1,
			delay: Math.random() * 2
		});
	}
}

// Animación de loading spinner
export function animateSpinner(spinner: HTMLElement): void {
	if (!spinner) return;
	
	gsap.to(spinner, {
		duration: 1,
		rotation: 360,
		ease: "none",
		repeat: -1
	});
}

// Animación de éxito
export function animateSuccess(element: HTMLElement): void {
	if (!element) return;
	
	gsap.fromTo(element, 
		{ scale: 0, opacity: 0 },
		{ 
			duration: 0.5,
			scale: 1.2,
			opacity: 1,
			ease: "back.out(1.7)"
		}
	);
	
	gsap.to(element, {
		duration: 0.3,
		scale: 1,
		ease: "power2.out",
		delay: 0.5
	});
}

// Animación de shake para errores
export function shakeElement(element: HTMLElement): void {
	if (!element) return;
	
	gsap.to(element, {
		duration: 0.1,
		x: -10,
		repeat: 5,
		yoyo: true,
		ease: "power2.inOut",
		onComplete: () => {
			gsap.set(element, { x: 0 });
		}
	});
}

// Animación de entrada espectacular para el hero
export function spectacularHeroAnimation(heroTitle: HTMLElement, heroSubtitle: HTMLElement, registrationForm: HTMLElement): void {
	if (!heroTitle || !heroSubtitle || !registrationForm) return;

	const tl = gsap.timeline();
	
	// Efecto de partículas de fondo
	createBackgroundParticles();
	
	// Animación del título con efecto de escritura
	tl.from(heroTitle, {
		duration: 1.2,
		y: 100,
		opacity: 0,
		scale: 0.8,
		rotationX: 90,
		ease: "power3.out"
	})
	// Efecto de resplandor en el título
	.to(heroTitle, {
		duration: 0.5,
		textShadow: "0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(251, 191, 36, 0.4)",
		ease: "power2.out"
	}, "-=0.3")
	// Animación del subtítulo con efecto de deslizamiento
	.from(heroSubtitle, {
		duration: 0.8,
		x: -50,
		opacity: 0,
		ease: "power2.out"
	}, "-=0.5")
	// Animación del formulario con efecto de zoom
	.from(registrationForm, {
		duration: 1,
		scale: 0.7,
		opacity: 0,
		rotationY: 15,
		ease: "back.out(1.7)"
	}, "-=0.3");
}

// Crear partículas de fondo animadas
export function createBackgroundParticles(): void {
	const hero = document.querySelector('.hero');
	if (!hero) return;

	// Crear contenedor de partículas
	const particleContainer = document.createElement('div');
	particleContainer.className = 'particle-container';
	particleContainer.style.cssText = `
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		overflow: hidden;
		z-index: 1;
	`;
	
	hero.appendChild(particleContainer);

	// Crear partículas más sutiles
	for (let i = 0; i < 40; i++) {
		const particle = document.createElement('div');
		particle.className = 'bg-particle';
		particle.style.cssText = `
			position: absolute;
			width: ${Math.random() * 6 + 1}px;
			height: ${Math.random() * 6 + 1}px;
			background: rgba(251, 191, 36, ${Math.random() * 0.7 + 0.2});
			border-radius: 50%;
			left: ${Math.random() * 100}%;
			top: 100%;
			box-shadow: 0 0 12px rgba(251, 191, 36, 0.6);
		`;
		
		particleContainer.appendChild(particle);
		
		// Animación de flotación suave
		gsap.to(particle, {
			duration: 10 + Math.random() * 6,
			y: -150,
			x: Math.random() * 200 - 100,
			rotation: Math.random() * 180,
			opacity: 0,
			scale: 0.3,
			ease: "power2.out",
			repeat: -1,
			delay: Math.random() * 8
		});
	}
}

// Crear partículas de fondo para la sección de beneficios
export function createBackgroundParticlesForBenefits(container: HTMLElement): void {
	if (!container) return;

	// Crear contenedor de partículas
	const particleContainer = document.createElement('div');
	particleContainer.className = 'benefits-particle-container';
	particleContainer.style.cssText = `
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		overflow: hidden;
		z-index: 1;
	`;
	
	container.appendChild(particleContainer);

	// Crear partículas más sutiles para beneficios
	for (let i = 0; i < 25; i++) {
		const particle = document.createElement('div');
		particle.className = 'benefits-particle';
		particle.style.cssText = `
			position: absolute;
			width: ${Math.random() * 5 + 1}px;
			height: ${Math.random() * 5 + 1}px;
			background: rgba(251, 191, 36, ${Math.random() * 0.6 + 0.3});
			border-radius: 50%;
			left: ${Math.random() * 100}%;
			top: 100%;
			pointer-events: none;
			box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
		`;
		
		particleContainer.appendChild(particle);
		
		// Animación de flotación suave
		gsap.to(particle, {
			duration: 12 + Math.random() * 8,
			y: -120,
			x: Math.random() * 150 - 75,
			rotation: Math.random() * 120,
			opacity: 0,
			scale: 0.2,
			ease: "power2.out",
			repeat: -1,
			delay: Math.random() * 10
		});
	}
}

// Animación de ondas en botones
export function addRippleEffect(button: HTMLElement): void {
	if (!button) return;
	
	button.addEventListener('click', function(e: Event) {
		const ripple = document.createElement('span');
		const rect = button.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const x = (e as MouseEvent).clientX - rect.left - size / 2;
		const y = (e as MouseEvent).clientY - rect.top - size / 2;
		
		ripple.style.cssText = `
			position: absolute;
			width: ${size}px;
			height: ${size}px;
			left: ${x}px;
			top: ${y}px;
			background: rgba(255, 255, 255, 0.3);
			border-radius: 50%;
			transform: scale(0);
			pointer-events: none;
		`;
		
		(button as HTMLElement).style.position = 'relative';
		(button as HTMLElement).style.overflow = 'hidden';
		button.appendChild(ripple);
		
		gsap.to(ripple, {
			duration: 0.6,
			scale: 2,
			opacity: 0,
			ease: "power2.out",
			onComplete: () => ripple.remove()
		});
	});
}

// Animación de entrada escalonada para elementos
export function staggeredEntryAnimation(selector: string, delay: number = 0.1): void {
	const elements = document.querySelectorAll(selector);
	
	gsap.fromTo(elements, 
		{
			y: 50,
			opacity: 0,
			scale: 0.9
		},
		{
			duration: 0.8,
			y: 0,
			opacity: 1,
			scale: 1,
			stagger: delay,
			ease: "power2.out",
			delay: 0.5
		}
	);
}

// Animación de hover mejorada para formularios
export function enhancedFormHover(form: HTMLElement): void {
	if (!form) return;
	
	form.addEventListener('mouseenter', () => {
		gsap.to(form, {
			duration: 0.3,
			scale: 1.02,
			y: -5,
			boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 3px rgba(251, 191, 36, 0.3)",
			ease: "power2.out"
		});
	});
	
	form.addEventListener('mouseleave', () => {
		gsap.to(form, {
			duration: 0.3,
			scale: 1,
			y: 0,
			boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 0 3px rgba(251, 191, 36, 0.1)",
			ease: "power2.out"
		});
	});
}

// Animación de typing para el título
export function typewriterTitle(element: HTMLElement, text: string, speed: number = 100): void {
	if (!element) return;
	
	element.textContent = '';
	let i = 0;
	
	function type(): void {
		if (i < text.length) {
			element.textContent += text.charAt(i);
			i++;
			setTimeout(type, speed);
		}
	}
	
	type();
}

// Animación de pulso mejorada
export function enhancedPulseAnimation(element: HTMLElement): void {
	if (!element) return;
	
	gsap.to(element, {
		duration: 2,
		scale: 1.05,
		boxShadow: "0 0 30px rgba(251, 191, 36, 0.6)",
		ease: "power2.inOut",
		repeat: -1,
		yoyo: true
	});
}

// Animación de entrada desde diferentes direcciones
export function slideInFromDirection(element: HTMLElement, direction: 'left' | 'right' | 'top' | 'bottom' = 'left', delay: number = 0): void {
	if (!element) return;
	
	const directions = {
		left: { x: -100, y: 0 },
		right: { x: 100, y: 0 },
		top: { x: 0, y: -100 },
		bottom: { x: 0, y: 100 }
	};
	
	const startPos = directions[direction] || directions.left;
	
	gsap.fromTo(element, 
		{
			...startPos,
			opacity: 0
		},
		{
			duration: 0.8,
			x: 0,
			y: 0,
			opacity: 1,
			ease: "power2.out",
			delay: delay
		}
	);
}

// Animación de resplandor en texto
export function textGlowAnimation(element: HTMLElement): void {
	if (!element) return;
	
	gsap.to(element, {
		duration: 2,
		textShadow: "0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(251, 191, 36, 0.4), 0 0 60px rgba(251, 191, 36, 0.2)",
		ease: "power2.inOut",
		repeat: -1,
		yoyo: true
	});
}

// Animación de rotación 3D en hover
export function add3DHoverEffect(element: HTMLElement): void {
	if (!element) return;
	
	element.addEventListener('mouseenter', () => {
		gsap.to(element, {
			duration: 0.3,
			rotationY: 5,
			rotationX: 5,
			scale: 1.05,
			ease: "power2.out"
		});
	});
	
	element.addEventListener('mouseleave', () => {
		gsap.to(element, {
			duration: 0.3,
			rotationY: 0,
			rotationX: 0,
			scale: 1,
			ease: "power2.out"
		});
	});
}
