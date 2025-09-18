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
					<img src="/photo_2025-09-12_15-08-29.jpg" alt="ADNED Logo" class="logo-image">
				
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
		background: linear-gradient(135deg, #000000 0%, #1e1b4b 30%, #312e81 60%, #4c1d95 100%);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		z-index: 1000;
		transition: all 0.3s ease;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
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
		height: 80px;
	}

	.logo {
		flex-shrink: 0;
	}

	.logo-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		color: #ffffff;
		font-weight: 700;
		font-size: 1.5rem;
		transition: all 0.3s ease;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.logo-link:hover {
		color: #fbbf24;
		transform: scale(1.02);
		text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
	}

	.logo-image {
		width: 60px;
		height: 60px;
		object-fit: contain;
		border-radius: 8px;
		transition: all 0.3s ease;
	}

	.logo-link:hover .logo-image {
		transform: scale(1.1);
		filter: brightness(1.2);
	}

	.logo-text {
		font-size: 1.5rem;
		font-weight: 800;
		background: linear-gradient(135deg, #FF0000, #FFFF00, #0000FF);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
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
		color: rgba(255, 255, 255, 0.9);
		font-weight: 500;
		transition: all 0.3s ease;
		position: relative;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.nav-link:hover {
		color: #fbbf24;
		background: rgba(251, 191, 36, 0.2);
		transform: translateY(-1px);
		text-shadow: 0 0 8px rgba(251, 191, 36, 0.6);
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 2px;
		background: linear-gradient(135deg, #FF0000, #FFFF00, #0000FF);
		transition: width 0.3s ease;
	}

	.nav-link:hover::after {
		width: 80%;
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
			top: 80px;
			left: 0;
			right: 0;
			background: linear-gradient(135deg, #000000 0%, #1e1b4b 30%, #312e81 60%, #4c1d95 100%);
			backdrop-filter: blur(20px);
			border-bottom: 2px solid rgba(255, 255, 255, 0.1);
			transform: translateY(-100%);
			opacity: 0;
			visibility: hidden;
			transition: all 0.3s ease;
			box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
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
		background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
		color: #1f2937;
		font-weight: 700;
		border-radius: 0.75rem;
		position: relative;
		overflow: hidden;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
	}

	.btn-primary:hover {
		background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(251, 191, 36, 0.4);
	}

	.btn-sm {
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
	}
</style>
