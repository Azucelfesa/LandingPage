<script>
	const currentYear = new Date().getFullYear();

	function joinGroup() {
		// Redirigir a WhatsApp
		window.open('https://wa.me/1234567890', '_blank');
	}

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
			<!-- Logo ADNED -->
			<div class="footer-section footer-logo-section">
				<div class="footer-logo">
					<img src="/photo_2025-09-12_15-08-29.jpg" alt="ADNED Logo" class="adned-logo">
					<span class="logo-text">ADNED</span>
				</div>
				<p class="footer-description">
					La guía que todo padre necesita para que su hijo ingrese a la prepa de sus sueños.
				</p>
			</div>

			<!-- Datos de Contacto -->
			<div class="footer-section">
				<h3 class="footer-title">Contacto</h3>
				<div class="contact-info">
					<div class="contact-item">
						<svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
						</svg>
						<span>WhatsApp: +52 55 1234 5678</span>
					</div>
					<div class="contact-item">
						<svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
							<polyline points="22,6 12,13 2,6"/>
						</svg>
						<span>contacto@adned.com</span>
					</div>
				</div>
			</div>

			<!-- Aviso de Privacidad -->
			<div class="footer-section">
				<h3 class="footer-title">Legal</h3>
				<ul class="footer-links">
					<li><a href="#privacidad" class="footer-link">Aviso de Privacidad</a></li>
					<li><a href="#terminos" class="footer-link">Términos y Condiciones</a></li>
					<li><a href="#cookies" class="footer-link">Política de Cookies</a></li>
				</ul>
			</div>

			<!-- CTA Button -->
			<div class="footer-section footer-cta-section">
				<h3 class="footer-title">¿Listo para empezar?</h3>
				<p class="cta-description">
					Únete a nuestro grupo gratuito y recibe consejos exclusivos para el proceso de admisión ECOEMS 2026.
				</p>
				<button class="footer-cta-btn" on:click={joinGroup}>
					<svg class="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
					</svg>
					Unirme al grupo gratuito
				</button>
			</div>
		</div>

		<!-- Footer Bottom -->
		<div class="footer-bottom">
			<div class="footer-bottom-content">
				<p class="copyright">
					© {currentYear} ADNED. Todos los derechos reservados.
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
		background: #290040;
		color: white;
		padding: 0;
		margin-top: 0;
		border-top: 2px solid rgba(251, 191, 36, 0.3);
		box-shadow: 0 -8px 30px rgba(41, 0, 64, 0.4);
		min-height: 300px;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.footer-main {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1.5fr;
		gap: 1rem;
		margin-bottom: 0;
		padding: 1.5rem 0;
	}

	.footer-section {
		display: flex;
		flex-direction: column;
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		font-size: 1.5rem;
		font-weight: 700;
	}

	.adned-logo {
		width: 50px;
		height: 50px;
		object-fit: contain;
		border-radius: 8px;
	}

	.logo-text {
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #3b82f6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.footer-description {
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.4;
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.95rem;
	}

	.contact-icon {
		width: 20px;
		height: 20px;
		color: #fbbf24;
		flex-shrink: 0;
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

	.footer-cta-section {
		text-align: center;
	}

	.cta-description {
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.85rem;
		margin-bottom: 1rem;
		line-height: 1.4;
	}

	.footer-cta-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #f59e0b 100%);
		color: #ffffff;
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 0.75rem;
		font-weight: 700;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.footer-cta-btn:hover {
		background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(249, 115, 22, 0.6);
		text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
	}

	.cta-icon {
		width: 20px;
		height: 20px;
	}

	.footer-bottom {
		padding: 1rem 0;
		background: rgba(0, 0, 0, 0.2);
		position: relative;
	}

	.footer-bottom::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: rgba(251, 191, 36, 0.3);
		width: 100vw;
		margin-left: calc(-50vw + 50%);
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
			padding: 0;
		}

		.footer-main {
			grid-template-columns: 1fr;
			gap: 1rem;
			padding: 1rem 0;
		}

		.footer-cta-section {
			text-align: center;
		}

		.footer-cta-btn {
			width: 100%;
			justify-content: center;
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
