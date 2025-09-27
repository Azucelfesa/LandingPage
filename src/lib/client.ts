import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { HTTPRouter } from '@backend'; // Asegúrate de que la ruta es correcta
import { env } from '$env/dynamic/public';
import { dev } from '$app/environment';

// Obtener la URL del servidor tRPC desde las variables de entorno
const trpcUrl = env.PUBLIC_TRPC_URL || (dev ? 'http://localhost:3000' : 'https://adnetdigital.org/trpc');

// Log para debugging en desarrollo
if (dev) {
  console.log('🚀 tRPC Client configurado para:', trpcUrl);
}

const trpcHttpClient = createTRPCProxyClient<HTTPRouter>({
  links: [
    httpBatchLink({
      url: trpcUrl,
      // Configuración adicional para headers si es necesario
      headers: () => ({
        'Content-Type': 'application/json',
      }),
    }),
  ],
});

export default trpcHttpClient;
