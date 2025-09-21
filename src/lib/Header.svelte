<script>
	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<header class="header">
	<div class="container">
		<div class="header-content">
			<!-- Mobile Menu Button -->
			<button 
				class="mobile-menu-btn" 
				on:click={toggleMenu}
				aria-label="Toggle menu"
			>
				<span class="hamburger" class:hamburger-open={isMenuOpen}></span>
				<span class="hamburger" class:hamburger-open={isMenuOpen}></span>
				<span class="hamburger" class:hamburger-open={isMenuOpen}></span>
			</button>

			<!-- Logo -->
			<div class="logo">
				<a href="/" class="logo-link">
					<img src="/photo_2025-09-12_15-08-29.jpg" alt="ADNED Logo" class="logo-image">
				</a>
			</div>

			<!-- Navigation -->
			<nav class="nav" class:nav-open={isMenuOpen}>
				<ul class="nav-list">
					<li class="nav-item">
						<a href="/" class="nav-link" on:click={closeMenu}>Inicio</a>
					</li>
					<li class="nav-item">
						<a href="/#quienes-somos" class="nav-link" on:click={closeMenu}>Quiénes Somos</a>
					</li>
					<li class="nav-item">
						<a href="/#beneficios" class="nav-link" on:click={closeMenu}>Misión y Visión</a>
					</li>
					<li class="nav-item">
						<a href="/#nuestros-cursos" class="nav-link" on:click={closeMenu}>Nuestros Cursos</a>
					</li>
                <li class="nav-item">
                    <a href="#reseñas" class="nav-link" on:click={closeMenu}>Reseñas</a>
                </li>
					<li class="nav-item">
						<a href="/formulario" class="nav-link" on:click={closeMenu}>Formulario</a>
					</li>
					<li class="nav-item mobile-cta">
						<button class="btn btn-primary mobile-cta-btn" on:click={closeMenu}>
							Empezar ahora
						</button>
					</li>
				</ul>
			</nav>

			<!-- CTA Button -->
			<div class="header-cta">
				<a href="/formulario" class="btn btn-primary">
					EMPEZAR AHORA
				</a>
			</div>
		</div>
	</div>
	<!-- Línea separadora -->
	<div class="header-separator"></div>
</header>

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: #290040;
		backdrop-filter: blur(20px);
		border-bottom: 2px solid rgba(251, 191, 36, 0.3);
		z-index: 1000;
		transition: all 0.3s ease;
		box-shadow: 0 8px 30px rgba(41, 0, 64, 0.4);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 140px;
		position: relative;
		padding: 0 1rem;
		gap: 1rem;
	}

	.logo {
		position: relative;
		z-index: 1001;
		flex-shrink: 0;
	}

	.logo-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		color: #ffffff;
		font-weight: 700;
		font-size: 1.2rem;
		transition: all 0.3s ease;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}


	.logo-image {
		width: 130px;
		height: 130px;
		object-fit: contain;
		border-radius: 8px;
	}



	.nav {
		display: flex;
		align-items: center;
		z-index: 1000;
	}

	.nav-list {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		list-style: none;
		margin: 0;
		padding: 0;
		flex-wrap: nowrap;
	}

	.nav-item {
		margin: 0;
	}

	.mobile-cta {
		display: none;
	}

	.mobile-menu-btn {
		display: none;
		order: -1;
	}

	.nav-link {
		text-decoration: none;
		color: #ffffff;
		font-weight: 600;
		transition: all 0.3s ease;
		position: relative;
		padding: 0.4rem 0.5rem;
		border-radius: 0.5rem;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.3px;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		white-space: nowrap;
	}

	.nav-link:hover {
		color: #fbbf24;
		background: linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0.1) 100%);
		transform: translateY(-2px);
		text-shadow: 0 0 12px rgba(251, 191, 36, 0.8);
		box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 3px;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		transition: width 0.3s ease;
		border-radius: 2px;
	}

	.nav-link:hover::after {
		width: 80%;
	}

	.header-cta {
		display: flex;
		align-items: center;
		z-index: 1002;
		position: relative;
	}

	.mobile-menu-btn {
		display: none;
		flex-direction: column;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		gap: 4px;
	}

	.hamburger {
		width: 25px;
		height: 3px;
		background: var(--color-text);
		transition: all 0.3s ease;
		transform-origin: center;
	}

	.hamburger-open:nth-child(1) {
		transform: rotate(45deg) translate(6px, 6px);
	}

	.hamburger-open:nth-child(2) {
		opacity: 0;
	}

	.hamburger-open:nth-child(3) {
		transform: rotate(-45deg) translate(6px, -6px);
	}

	/* Mobile Styles */
	/* Tablet Styles */
	@media (max-width: 1024px) {
		.nav-list {
			gap: 0.4rem;
		}
		
		.nav-link {
			font-size: 0.8rem;
			padding: 0.3rem 0.4rem;
		}
		
		.logo-image {
			width: 120px;
			height: 120px;
		}
		
		.logo-link {
			font-size: 1.1rem;
			gap: 0.5rem;
		}
		
		.btn-primary {
			padding: 0.6rem 1.2rem;
			font-size: 0.8rem;
		}
	}

	/* Mobile Styles */
	@media (max-width: 768px) {
		.header-content {
			height: 120px;
		}
		
		.logo-image {
			width: 100px;
			height: 100px;
		}
		
		
		.nav {
			position: fixed;
			top: 120px;
			left: 0;
			right: 0;
			background: #290040;
			backdrop-filter: blur(20px);
			border-bottom: 2px solid rgba(251, 191, 36, 0.3);
			transform: translateY(-100%);
			opacity: 0;
			visibility: hidden;
			transition: all 0.3s ease;
			box-shadow: 0 12px 40px rgba(41, 0, 64, 0.4);
			padding: 1rem 0;
		}

		.nav-open {
			transform: translateY(0);
			opacity: 1;
			visibility: visible;
		}

		.nav-list {
			flex-direction: column;
			gap: 0;
			width: 100%;
		}

		.nav-item {
			width: 100%;
			border-bottom: 1px solid rgba(251, 191, 36, 0.1);
		}

		.nav-item:last-child {
			border-bottom: none;
		}

		.mobile-cta {
			padding: 1rem 1.5rem;
			text-align: center;
		}

		.mobile-cta-btn {
			width: 100%;
			justify-content: center;
			font-size: 1rem;
			padding: 0.75rem 1.5rem;
		}

		.nav-link {
			display: block;
			padding: 1rem 1.5rem;
			text-align: center;
			font-size: 1rem;
			font-weight: 600;
			transition: all 0.3s ease;
			border-radius: 0;
		}

		.nav-link:hover {
			background: linear-gradient(135deg, rgba(249, 115, 22, 0.3) 0%, rgba(251, 191, 36, 0.2) 100%);
			transform: none;
			text-shadow: 0 0 12px rgba(249, 115, 22, 0.8);
			box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
		}

		.header-cta {
			display: flex;
		}
		
		.mobile-menu-btn {
			display: flex;
		}

		.mobile-cta {
			display: block;
		}

		.mobile-menu-btn {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 40px;
			height: 40px;
			background: none;
			border: none;
			cursor: pointer;
			padding: 0;
			z-index: 1001;
			order: -1;
		}

		.hamburger {
			width: 25px;
			height: 3px;
			background: #fbbf24;
			margin: 3px 0;
			transition: all 0.3s ease;
			border-radius: 2px;
		}

		.hamburger-open:nth-child(1) {
			transform: rotate(45deg) translate(6px, 6px);
		}

		.hamburger-open:nth-child(2) {
			opacity: 0;
		}

		.hamburger-open:nth-child(3) {
			transform: rotate(-45deg) translate(6px, -6px);
		}
	}

	/* Small Mobile Styles */
	@media (max-width: 480px) {
		.container {
			padding: 0 0.75rem;
		}
		
		.logo-image {
			width: 85px;
			height: 85px;
		}
		
		
		.nav-link {
			padding: 0.875rem 1rem;
			font-size: 0.95rem;
		}
	}

	/* Button Styles */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.5rem;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.btn-primary {
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 100%);
		color: #ffffff;
		font-weight: 700;
		border-radius: 2rem;
		position: relative;
		overflow: hidden;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		padding: 0.75rem 1.5rem;
		font-size: 0.9rem;
		min-width: 140px;
		white-space: nowrap;
	}

	.btn-primary:hover {
		background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
		transform: translateY(-3px);
		box-shadow: 0 8px 25px rgba(249, 115, 22, 0.6);
		text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
	}


	.header-separator {
		height: 2px;
		background: linear-gradient(90deg, transparent 0%, #fbbf24 50%, transparent 100%);
		position: relative;
		z-index: 1;
	}

	.header-separator::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
	}
</style>
