# Landing Page - SvelteKit

Una landing page moderna y responsive creada con SvelteKit y TypeScript.

## Características

- ⚡ **Rápido**: Construido con SvelteKit para un rendimiento óptimo
- 🔒 **Confiable**: Desarrollado con TypeScript para mayor seguridad
- 📱 **Responsive**: Diseño que se adapta a todos los dispositivos
- 🎨 **Moderno**: Interfaz limpia y atractiva

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:5173`

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run check` - Verifica el código con svelte-check

## Estructura del proyecto

```
src/
├── app.html          # Plantilla HTML principal
├── app.css           # Estilos globales
├── lib/              # Componentes reutilizables
└── routes/           # Páginas de la aplicación
    ├── +layout.svelte # Layout principal
    └── +page.svelte   # Página de inicio
```

## Tecnologías utilizadas

- [SvelteKit](https://kit.svelte.dev/) - Framework web
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje de programación
- [Vite](https://vitejs.dev/) - Herramienta de build
