import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { HTTPRouter } from '@backend'; // Asegúrate de que la ruta es correcta

const trpcHttpClient = createTRPCProxyClient<HTTPRouter>({
  links: [
    httpBatchLink({
      url: 'https://adneddigital.org/trpc',
    }),
  ],
});
export default trpcHttpClient;
