<script>
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';

	/** @type {HTMLDivElement} */
	let container;
	/** @type {HTMLDivElement[]} */
	let molecules = [];
	/** @type {number} */
	let animationId;

	onMount(() => {
		createMolecules();
		startAnimationLoop();
	});

	onDestroy(() => {
		if (animationId) {
			cancelAnimationFrame(animationId);
		}
		// Limpiar todas las animaciones GSAP
		molecules.forEach(molecule => {
			gsap.killTweensOf(molecule);
		});
	});

	function createMolecules() {
		if (!container) return;

		// Limpiar moléculas existentes
		container.innerHTML = '';
		molecules = [];

		const moleculeCount = 35;
		const colors = [
			'rgba(168, 85, 247, 0.8)', // Púrpura
			'rgba(147, 51, 234, 0.7)', // Púrpura más oscuro
			'rgba(139, 92, 246, 0.9)', // Violeta
			'rgba(236, 72, 153, 0.7)', // Rosa
			'rgba(59, 130, 246, 0.8)', // Azul
			'rgba(251, 191, 36, 0.7)', // Amarillo dorado
			'rgba(255, 255, 255, 0.6)' // Blanco
		];

		for (let i = 0; i < moleculeCount; i++) {
			const molecule = document.createElement('div');
			molecule.className = 'floating-molecule';
			
			// Tamaño aleatorio entre 4-12px
			const size = Math.random() * 8 + 4;
			const color = colors[Math.floor(Math.random() * colors.length)];
			
			// Posición inicial aleatoria
			const startX = Math.random() * 100;
			const startY = Math.random() * 100;
			
			molecule.style.cssText = `
				position: absolute;
				width: ${size}px;
				height: ${size}px;
				background: ${color};
				border-radius: 50%;
				left: ${startX}%;
				top: ${startY}%;
				box-shadow: 0 0 ${size * 4}px ${color}, 0 0 ${size * 8}px ${color};
				pointer-events: none;
				opacity: 0;
			`;

			container.appendChild(molecule);
			molecules.push(molecule);
		}
	}

	function startAnimationLoop() {
		function animate() {
			// Seleccionar una molécula aleatoria para animar
			if (molecules.length > 0) {
				const randomMolecule = molecules[Math.floor(Math.random() * molecules.length)];
				animateSingleMolecule(randomMolecule);
			}
			
			// Programar la siguiente animación con delay aleatorio
			const nextDelay = Math.random() * 800 + 300; // 0.3-1.1 segundos
			animationId = setTimeout(animate, nextDelay);
		}
		
		// Iniciar la primera animación después de un delay
		setTimeout(animate, 500);
	}

	/**
	 * @param {HTMLDivElement} molecule
	 */
	function animateSingleMolecule(molecule) {
		// Resetear la molécula
		gsap.set(molecule, {
			opacity: 0,
			scale: 0,
			x: 0,
			y: 0,
			rotation: 0
		});

		// Posición inicial aleatoria
		const startX = (Math.random() - 0.5) * 200;
		const startY = (Math.random() - 0.5) * 200;

		gsap.set(molecule, {
			x: startX,
			y: startY
		});

		// Timeline de animación
		const tl = gsap.timeline();

		// Aparecer
		tl.to(molecule, {
			opacity: 1,
			scale: 1,
			duration: 1,
			ease: "power2.out"
		})
		// Movimiento flotante
		.to(molecule, {
			x: startX + (Math.random() - 0.5) * 100,
			y: startY + (Math.random() - 0.5) * 100,
			rotation: Math.random() * 360,
			duration: 3 + Math.random() * 2,
			ease: "power1.inOut"
		}, "-=1")
		// Pulso más intenso
		.to(molecule, {
			scale: 1.5,
			duration: 0.8,
			ease: "power2.inOut",
			yoyo: true,
			repeat: 2
		}, "-=2")
		// Desaparecer
		.to(molecule, {
			opacity: 0,
			scale: 0,
			duration: 1,
			ease: "power2.in"
		});
	}

	function recreateMolecules() {
		createMolecules();
		startAnimationLoop();
	}
</script>

<div 
	bind:this={container}
	class="floating-molecules-container"
	on:click={recreateMolecules}
	on:keydown={(e) => e.key === 'Enter' && recreateMolecules()}
	role="button"
	tabindex="0"
	aria-label="Recrear moléculas flotantes"
>
	<!-- Las moléculas se crean dinámicamente -->
</div>

<style>
	.floating-molecules-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
		overflow: hidden;
	}

	.floating-molecules-container:hover {
		pointer-events: auto;
		cursor: pointer;
	}

	.floating-molecule {
		will-change: transform, opacity;
		backface-visibility: hidden;
		transform-style: preserve-3d;
	}

	/* Efecto de fondo sutil */
	.floating-molecules-container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: 
			radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
			radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.12) 0%, transparent 50%),
			radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
		animation: backgroundPulse 15s ease-in-out infinite;
	}

	@keyframes backgroundPulse {
		0%, 100% { 
			opacity: 0.6;
			transform: scale(1);
		}
		50% { 
			opacity: 0.9;
			transform: scale(1.1);
		}
	}

	/* Partículas de fondo adicionales */
	.floating-molecules-container::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: 
			radial-gradient(1px 1px at 25px 35px, rgba(168, 85, 247, 0.2), transparent),
			radial-gradient(1px 1px at 50px 70px, rgba(147, 51, 234, 0.15), transparent),
			radial-gradient(1px 1px at 100px 45px, rgba(139, 92, 246, 0.12), transparent),
			radial-gradient(1px 1px at 150px 80px, rgba(236, 72, 153, 0.1), transparent);
		background-repeat: repeat;
		background-size: 200px 120px;
		animation: particleFloat 25s linear infinite;
		opacity: 0.6;
	}

	@keyframes particleFloat {
		0% { 
			transform: translateY(0px) translateX(0px) rotate(0deg);
			opacity: 0.6;
		}
		50% { 
			opacity: 0.8;
		}
		100% { 
			transform: translateY(-120px) translateX(60px) rotate(180deg);
			opacity: 0.4;
		}
	}

	/* Responsive */
	@media (max-width: 768px) {
		.floating-molecules-container::before,
		.floating-molecules-container::after {
			opacity: 0.4;
		}
	}

	@media (max-width: 480px) {
		.floating-molecules-container::before,
		.floating-molecules-container::after {
			opacity: 0.2;
		}
	}
</style>
