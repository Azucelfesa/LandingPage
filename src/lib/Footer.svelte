<script>
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{
			name: 'Facebook',
			url: '#',
			icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'
		},
		{
			name: 'Twitter',
			url: '#',
			icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
		},
		{
			name: 'Instagram',
			url: '#',
			icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.388c-.49 0-.98-.196-1.297-.49-.49-.49-.49-1.297 0-1.787.49-.49 1.297-.49 1.787 0 .49.49.49 1.297 0 1.787-.317.294-.807.49-1.297.49z'
		},
		{
			name: 'LinkedIn',
			url: '#',
			icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
		}
	];

	const quickLinks = [
		{ name: 'Inicio', url: '#inicio' },
		{ name: 'Características', url: '#caracteristicas' },
		{ name: 'Servicios', url: '#servicios' },
		{ name: 'Contacto', url: '#contacto' }
	];

	const companyLinks = [
		{ name: 'Sobre nosotros', url: '#sobre' },
		{ name: 'Equipo', url: '#equipo' },
		{ name: 'Carreras', url: '#carreras' },
		{ name: 'Prensa', url: '#prensa' }
	];

	const supportLinks = [
		{ name: 'Centro de ayuda', url: '#ayuda' },
		{ name: 'Documentación', url: '#docs' },
		{ name: 'Comunidad', url: '#comunidad' },
		{ name: 'Estado del servicio', url: '#estado' }
	];
</script>

<footer class="footer">
	<div class="container">
		<!-- Main Footer Content -->
		<div class="footer-main">
			<!-- Company Info -->
			<div class="footer-section">
				<div class="footer-logo">
					<svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
					</svg>
					<span class="logo-text">LandingPage</span>
				</div>
				<p class="footer-description">
					Construimos experiencias digitales excepcionales que conectan marcas con sus audiencias de manera efectiva y memorable.
				</p>
				<div class="social-links">
					{#each socialLinks as social}
						<a 
							href={social.url} 
							class="social-link" 
							aria-label={social.name}
							target="_blank" 
							rel="noopener noreferrer"
						>
							<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
								<path d={social.icon} />
							</svg>
						</a>
					{/each}
				</div>
			</div>

			<!-- Quick Links -->
			<div class="footer-section">
				<h3 class="footer-title">Enlaces rápidos</h3>
				<ul class="footer-links">
					{#each quickLinks as link}
						<li>
							<a href={link.url} class="footer-link">{link.name}</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Company Links -->
			<div class="footer-section">
				<h3 class="footer-title">Empresa</h3>
				<ul class="footer-links">
					{#each companyLinks as link}
						<li>
							<a href={link.url} class="footer-link">{link.name}</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Support Links -->
			<div class="footer-section">
				<h3 class="footer-title">Soporte</h3>
				<ul class="footer-links">
					{#each supportLinks as link}
						<li>
							<a href={link.url} class="footer-link">{link.name}</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Newsletter -->
			<div class="footer-section">
				<h3 class="footer-title">Newsletter</h3>
				<p class="newsletter-description">
					Mantente al día con nuestras últimas noticias y actualizaciones.
				</p>
				<form class="newsletter-form">
					<div class="newsletter-input-group">
						<input 
							type="email" 
							placeholder="Tu email" 
							class="newsletter-input"
							required
						>
						<button type="submit" class="newsletter-btn">
							<svg class="newsletter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
							</svg>
						</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Footer Bottom -->
		<div class="footer-bottom">
			<div class="footer-bottom-content">
				<p class="copyright">
					© {currentYear} LandingPage. Todos los derechos reservados.
				</p>
				<div class="footer-bottom-links">
					<a href="#privacidad" class="footer-bottom-link">Política de privacidad</a>
					<a href="#terminos" class="footer-bottom-link">Términos de servicio</a>
					<a href="#cookies" class="footer-bottom-link">Cookies</a>
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
		color: white;
		padding: 2rem 0 0;
		margin-top: 0;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.footer-main {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.footer-section {
		display: flex;
		flex-direction: column;
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
		font-size: 1.5rem;
		font-weight: 700;
	}

	.logo-icon {
		width: 32px;
		height: 32px;
		color: var(--color-primary, #3b82f6);
	}

	.footer-description {
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.6;
		margin-bottom: 1.5rem;
		font-size: 0.95rem;
	}

	.social-links {
		display: flex;
		gap: 1rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		color: white;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.social-link:hover {
		background: var(--color-primary, #3b82f6);
		transform: translateY(-2px);
	}

	.social-icon {
		width: 20px;
		height: 20px;
	}

	.footer-title {
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: white;
	}

	.footer-links {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.footer-links li {
		margin-bottom: 0.5rem;
	}

	.footer-link {
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		transition: color 0.3s ease;
		font-size: 0.95rem;
	}

	.footer-link:hover {
		color: var(--color-primary, #3b82f6);
	}

	.newsletter-description {
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.9rem;
		margin-bottom: 1rem;
		line-height: 1.5;
	}

	.newsletter-form {
		width: 100%;
	}

	.newsletter-input-group {
		display: flex;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 0.5rem;
		overflow: hidden;
		backdrop-filter: blur(10px);
	}

	.newsletter-input {
		flex: 1;
		padding: 0.75rem 1rem;
		background: transparent;
		border: none;
		color: white;
		font-size: 0.9rem;
		outline: none;
	}

	.newsletter-input::placeholder {
		color: rgba(255, 255, 255, 0.6);
	}

	.newsletter-btn {
		padding: 0.75rem 1rem;
		background: var(--color-primary, #3b82f6);
		border: none;
		color: white;
		cursor: pointer;
		transition: background 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.newsletter-btn:hover {
		background: var(--color-primary-dark, #2563eb);
	}

	.newsletter-icon {
		width: 18px;
		height: 18px;
	}

	.footer-bottom {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding: 2rem 0;
	}

	.footer-bottom-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.copyright {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.9rem;
		margin: 0;
	}

	.footer-bottom-links {
		display: flex;
		gap: 2rem;
	}

	.footer-bottom-link {
		color: rgba(255, 255, 255, 0.6);
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.3s ease;
	}

	.footer-bottom-link:hover {
		color: var(--color-primary, #3b82f6);
	}

	/* Mobile Styles */
	@media (max-width: 1024px) {
		.footer-main {
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
		}
	}

	@media (max-width: 768px) {
		.footer {
			padding: 1.5rem 0 0;
		}

		.footer-main {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.footer-bottom-content {
			flex-direction: column;
			text-align: center;
		}

		.footer-bottom-links {
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.footer-bottom-links {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
