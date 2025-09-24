import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { captchaToken } = await request.json();

		if (!captchaToken) {
			return json({ success: false, error: 'No captcha token provided' }, { status: 400 });
		}

		// Clave secreta de reCAPTCHA (debes obtenerla de Google reCAPTCHA Console)
		// Para la clave de prueba, usa: 6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
		const RECAPTCHA_SECRET_KEY = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

		// Validar el CAPTCHA con Google
		const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `secret=${RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
		});

		const data = await response.json();

		if (data.success) {
			return json({ 
				success: true, 
				message: 'CAPTCHA verificado correctamente',
				score: data.score || null // Para reCAPTCHA v3
			});
		} else {
			return json({ 
				success: false, 
				error: 'CAPTCHA inválido',
				errors: data['error-codes'] || []
			}, { status: 400 });
		}

	} catch (error) {
		console.error('Error verificando CAPTCHA:', error);
		return json({ 
			success: false, 
			error: 'Error interno del servidor' 
		}, { status: 500 });
	}
};
