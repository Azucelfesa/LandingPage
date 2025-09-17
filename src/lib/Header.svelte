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
			<!-- Logo -->
			<div class="logo">
				<a href="/" class="logo-link">
					<svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
					</svg>
					<span class="logo-text">LandingPage</span>
				</a>
			</div>

			<!-- Navigation -->
			<nav class="nav" class:nav-open={isMenuOpen}>
				<ul class="nav-list">
					<li class="nav-item">
						<a href="#inicio" class="nav-link" on:click={closeMenu}>Inicio</a>
					</li>
					<li class="nav-item">
						<a href="#caracteristicas" class="nav-link" on:click={closeMenu}>Características</a>
					</li>
					<li class="nav-item">
						<a href="#servicios" class="nav-link" on:click={closeMenu}>Servicios</a>
					</li>
					<li class="nav-item">
						<a href="#contacto" class="nav-link" on:click={closeMenu}>Contacto</a>
					</li>
				</ul>
			</nav>

			<!-- CTA Button -->
			<div class="header-cta">
				<button class="btn btn-primary btn-sm">
					Empezar ahora
				</button>
			</div>

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
		</div>
	</div>
</header>

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		z-index: 1000;
		transition: all 0.3s ease;
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
		height: 70px;
	}

	.logo {
		flex-shrink: 0;
	}

	.logo-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: var(--color-text);
		font-weight: 700;
		font-size: 1.25rem;
		transition: color 0.3s ease;
	}

	.logo-link:hover {
		color: var(--color-primary);
	}

	.logo-icon {
		width: 32px;
		height: 32px;
		color: var(--color-primary);
	}

	.logo-text {
		font-size: 1.5rem;
	}

	.nav {
		display: flex;
		align-items: center;
	}

	.nav-list {
		display: flex;
		align-items: center;
		gap: 2rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-item {
		margin: 0;
	}

	.nav-link {
		text-decoration: none;
		color: var(--color-text-2);
		font-weight: 500;
		transition: color 0.3s ease;
		position: relative;
	}

	.nav-link:hover {
		color: var(--color-primary);
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 0;
		height: 2px;
		background: var(--color-primary);
		transition: width 0.3s ease;
	}

	.nav-link:hover::after {
		width: 100%;
	}

	.header-cta {
		display: flex;
		align-items: center;
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
	@media (max-width: 768px) {
		.nav {
			position: fixed;
			top: 70px;
			left: 0;
			right: 0;
			background: white;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			transform: translateY(-100%);
			opacity: 0;
			visibility: hidden;
			transition: all 0.3s ease;
		}

		.nav-open {
			transform: translateY(0);
			opacity: 1;
			visibility: visible;
		}

		.nav-list {
			flex-direction: column;
			padding: 2rem 1rem;
			gap: 1.5rem;
		}

		.nav-link {
			font-size: 1.1rem;
		}

		.header-cta {
			display: none;
		}

		.mobile-menu-btn {
			display: flex;
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
		background: var(--color-primary);
		color: white;
	}

	.btn-primary:hover {
		background: var(--color-primary-dark);
		transform: translateY(-1px);
	}

	.btn-sm {
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
	}
</style>
