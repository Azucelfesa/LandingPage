import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { HTTPRouter } from '@backend'; // Asegúrate de que la ruta es correcta

const trpcHttpClient = createTRPCProxyClient<HTTPRouter>({
  links: [
    httpBatchLink({
      url: `${window.location.protocol}//${window.location.hostname}/trpc`,
    }),
  ],
});
export default trpcHttpClient;
