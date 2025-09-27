# Configuración de Variables de Entorno

## Variables de Entorno Disponibles

### Variables Públicas (disponibles en el cliente)
- `PUBLIC_TRPC_URL`: URL del servidor tRPC

### Variables Privadas (solo disponibles en el servidor)
- `DATABASE_URL`: URL de conexión a la base de datos
- `PORT`: Puerto del servidor
- `WS_PORT`: Puerto para WebSockets

## Configuración por Entorno

### Desarrollo Local
Crea un archivo `.env.local` con:
```env
PUBLIC_TRPC_URL=http://localhost:3000/trpc
DATABASE_URL="postgresql://postgres:admin123!@localhost:5432/postgres?schema=public"
PORT=3000
WS_PORT=3001
```

### Producción
El archivo `.env` contiene la configuración para producción:
```env
PUBLIC_TRPC_URL=https://adnetdigital.org/trpc
DATABASE_URL="your_production_database_url"
PORT=443
WS_PORT=444
```

## Orden de Precedencia

SvelteKit carga las variables de entorno en este orden:
1. `.env.local` (para desarrollo local, ignorado por git)
2. `.env` (configuración principal)
3. Valores por defecto en el código

## Notas Importantes

- Las variables que empiezan con `PUBLIC_` están disponibles en el cliente
- Las variables sin `PUBLIC_` solo están disponibles en el servidor
- Nunca commits archivos `.env.local` que contengan datos sensibles
- El cliente tRPC se configurará automáticamente según el entorno