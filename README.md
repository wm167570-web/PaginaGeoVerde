# GeoVerde Vida Consciente

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

Bienvenido a **GeoVerde Vida Consciente**, el portal líder en Latinoamérica para la conciencia ambiental y consultoría sostenible.

## Descripción del Proyecto

GeoVerde es una plataforma integral que ofrece educación, noticias y consultoría sobre ecología, cambio climático, biodiversidad y estilos de vida sostenibles. Nuestro objetivo es inspirar y capacitar a la comunidad latinoamericana para adoptar hábitos más conscientes con el medio ambiente.

Sitio web: [https://geoverdevidaconsciente.com](https://geoverdevidaconsciente.com)

## Tecnologías Utilizadas

- **Frontend:** React, Vite, Tailwind CSS.
- **Backend:** Node.js, Express.
- **Lenguaje:** TypeScript.
- **IA (Generación de Contenido):** Google Gemini API.

## Estructura del Proyecto

```text
├── .github/        # Workflows de GitHub Actions
├── scripts/        # Scripts para automatización (generación de artículos)
├── src/            # Código fuente (React, componentes, datos)
│   ├── data/       # Archivos de datos del blog
├── server.ts       # Servidor Express de producción
├── vite.config.ts  # Configuración de Vite
└── vercel.json     # Configuración para despliegue en Vercel
```

## Automatización de Artículos

La plataforma cuenta con una robusta automatización para mantener contenido fresco:

* **GitHub Actions:** Ejecuta un script en Node.js cada 5 días.
* **Gemini API:** El script (`scripts/generate-article.mjs`) utiliza Google Gemini (modelo `gemini-2.0-flash`) para redactar artículos originales, verificando el contexto de los artículos ya publicados en `src/data/extendedBlog.json` para evitar repeticiones y asegurar calidad SEO y relevancia regional.

## Requisitos de Variables de Entorno

Para ejecutar el proyecto, se requieren las siguientes variables de entorno:

- `GEMINI_API_KEY`: API Key para la generación de contenido.
- `EMAIL_SMTP_HOST` / `PORT` / `USER` / `PASS`: Configuración para el formulario de contacto.
