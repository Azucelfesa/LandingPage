import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animaciones del Hero
export function animateHero(heroTitle, heroSubtitle, registrationForm) {
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
export function animateScrollElements() {
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
export function addHoverAnimations(registrationForm) {
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
export function addPulseAnimation(element) {
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
export function typewriterAnimation(element, text, speed = 0.05) {
	let i = 0;
	element.textContent = '';
	
	function type() {
		if (i < text.length) {
			element.textContent += text.charAt(i);
			i++;
			setTimeout(type, speed * 1000);
		}
	}
	
	type();
}

// Animación de partículas flotantes
export function createFloatingParticles(container) {
	const particles = [];
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
export function animateSpinner(spinner) {
	gsap.to(spinner, {
		duration: 1,
		rotation: 360,
		ease: "none",
		repeat: -1
	});
}

// Animación de éxito
export function animateSuccess(element) {
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
export function shakeElement(element) {
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
