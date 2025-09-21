import { gsap } from 'gsap';

// Tipos para los elementos DOM
type HTMLElement = Element | null;
type HTMLElementArray = NodeListOf<Element>;

// Helper to load and register ScrollTrigger only in the browser
async function ensureScrollTrigger() {
	if (typeof window !== 'undefined' && !gsap.core.globals().ScrollTrigger) {
		const pkg = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(pkg.ScrollTrigger);
	}
}


// Animación de texto tipo máquina de escribir
export function typewriterEffect(element: HTMLElement, text: string, speed: number = 0.05): gsap.core.Timeline {
	if (!element) return gsap.timeline();
	
	const tl = gsap.timeline();
	
	element.textContent = '';
	
	for (let i = 0; i < text.length; i++) {
		tl.to(element, {
			duration: speed,
			onComplete: () => {
				element.textContent += text[i];
			}
		});
	}
	
	return tl;
}

// Animación de ondas expansivas
export function createRippleEffect(button: HTMLElement): void {
	if (!button) return;
	
	button.addEventListener('click', (e: Event) => {
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

// Animación de parallax
export function createParallaxEffect(): void {
	gsap.utils.toArray('.parallax').forEach((element: Element) => {
		gsap.to(element, {
			yPercent: -50,
			ease: "none",
			scrollTrigger: {
				trigger: element,
				start: "top bottom",
				end: "bottom top",
				scrub: true
			}
		});
	});
}

// Animación de contador numérico
export function animateCounter(element: HTMLElement, endValue: number, duration: number = 2): void {
	if (!element) return;
	
	const startValue = 0;
	const increment = endValue / (duration * 60); // 60 FPS
	
	gsap.to({}, {
		duration: duration,
		onUpdate: function() {
			const currentValue = Math.floor(this.progress() * endValue);
			element.textContent = currentValue.toLocaleString();
		}
	});
}

// Animación de morphing de formas
export function morphShape(element: HTMLElement, fromPath: string, toPath: string, duration: number = 1): void {
	if (!element) return;
	
	gsap.to(element, {
		duration: duration,
		attr: { d: toPath },
		ease: "power2.inOut"
	});
}

// Animación de partículas que siguen el mouse
export function createMouseFollower(container: HTMLElement): void {
	if (!container) return;
	
	const follower = document.createElement('div');
	follower.className = 'mouse-follower';
	follower.style.cssText = `
		position: fixed;
		width: 20px;
		height: 20px;
		background: rgba(37, 211, 102, 0.3);
		border-radius: 50%;
		pointer-events: none;
		z-index: 9999;
		mix-blend-mode: difference;
	`;
	
	document.body.appendChild(follower);
	
	gsap.set(follower, { xPercent: -50, yPercent: -50 });
	
	document.addEventListener('mousemove', (e: MouseEvent) => {
		gsap.to(follower, {
			duration: 0.3,
			x: e.clientX,
			y: e.clientY,
			ease: "power2.out"
		});
	});
}

// Animación de scroll horizontal
export function createHorizontalScroll(container: HTMLElement): void {
	if (!container) return;
	
	gsap.to(container, {
		x: () => -(container.scrollWidth - window.innerWidth),
		ease: "none",
		scrollTrigger: {
			trigger: container,
			start: "top top",
			end: () => `+=${container.scrollWidth - window.innerWidth}`,
			pin: true,
			scrub: 1
		}
	});
}

// Animación de revelado de texto por palabras
export function revealTextByWords(element: HTMLElement): void {
	if (!element) return;
	
	const words = element.textContent?.split(' ') || [];
	element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
	
	gsap.fromTo('.word', 
		{ opacity: 0, y: 20 },
		{
			opacity: 1,
			y: 0,
			duration: 0.5,
			stagger: 0.1,
			ease: "power2.out"
		}
	);
}

// Animación de loading con barras
export function createLoadingBars(container: HTMLElement): void {
	if (!container) return;
	
	const bars: HTMLElement[] = [];
	
	for (let i = 0; i < 5; i++) {
		const bar = document.createElement('div');
		bar.className = 'loading-bar';
		bar.style.cssText = `
			width: 4px;
			height: 20px;
			background: #25D366;
			margin: 0 2px;
			border-radius: 2px;
		`;
		container.appendChild(bar);
		bars.push(bar);
	}
	
	gsap.to(bars, {
		scaleY: 0.3,
		duration: 0.5,
		stagger: 0.1,
		repeat: -1,
		yoyo: true,
		ease: "power2.inOut"
	});
}

// Animación de entrada con efecto de deslizamiento
export function slideInFromDirection(element: HTMLElement, direction: 'left' | 'right' | 'top' | 'bottom' = 'left', delay: number = 0): void {
	if (!element) return;
	
	const directions = {
		left: { x: -100, y: 0 },
		right: { x: 100, y: 0 },
		top: { x: 0, y: -100 },
		bottom: { x: 0, y: 100 }
	};
	
	gsap.fromTo(element, 
		{ 
			...directions[direction], 
			opacity: 0 
		},
		{
			x: 0,
			y: 0,
			opacity: 1,
			duration: 1,
			delay: delay,
			ease: "power3.out"
		}
	);
}

// Animación de rotación 3D
export function rotate3D(element: HTMLElement, rotationX: number = 0, rotationY: number = 0, rotationZ: number = 0): void {
	if (!element) return;
	
	gsap.to(element, {
		rotationX: rotationX,
		rotationY: rotationY,
		rotationZ: rotationZ,
		duration: 1,
		ease: "power2.out",
		transformPerspective: 1000
	});
}

// Animación de zoom con efecto de lente
export function lensEffect(element: HTMLElement): void {
	if (!element) return;
	
	element.addEventListener('mouseenter', () => {
		gsap.to(element, {
			scale: 1.1,
			filter: 'brightness(1.2)',
			duration: 0.3,
			ease: "power2.out"
		});
	});
	
	element.addEventListener('mouseleave', () => {
		gsap.to(element, {
			scale: 1,
			filter: 'brightness(1)',
			duration: 0.3,
			ease: "power2.out"
		});
	});
}
