import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { PUBLIC_TRPC_URL } from '$env/static/public';
import { dev } from '$app/environment';
import type { HTTPRouter } from '@backend'; // Asegúrate de que la ruta es correcta

// Debug environment variables
console.log('🔍 Environment check:');
console.log('- Dev mode:', dev);
console.log('- PUBLIC_TRPC_URL:', PUBLIC_TRPC_URL);
console.log('- Raw env:', import.meta.env.PUBLIC_TRPC_URL);

const trpcHttpClient = createTRPCProxyClient<HTTPRouter>({
  links: [
    httpBatchLink({
      url: PUBLIC_TRPC_URL,
      // Only add debugging in development
      ...(dev && {
        fetch(url, options) {
          console.log('tRPC request to:', url);
          console.log('Request options:', options);
          return fetch(url, options);
        },
      }),
    }),
  ],
});
export default trpcHttpClient;
