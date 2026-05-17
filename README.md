# GeoVerde Vida Consciente

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployment-brightgreen)](https://geoverdevidaconsciente.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

Bienvenido al repositorio oficial de **GeoVerde Vida Consciente**, una plataforma digital dedicada a fomentar la conciencia ambiental y la sostenibilidad en Latinoamérica.

## Descripción del Proyecto

GeoVerde es una plataforma que ofrece más de 150 artículos de alta calidad sobre ecología, cambio climático, biodiversidad y estilos de vida sostenibles. Nuestro objetivo es informar, educar e inspirar a la comunidad latinoamericana para adoptar hábitos más conscientes con el medio ambiente.

## Tecnologías Utilizadas

- **Frontend:** React, Vite, Tailwind CSS.
- **Backend:** Node.js, Express.
- **Lenguaje:** TypeScript.
- **IA (Generación de Contenido):** Google Gemini API.
- **Despliegue:** Vercel.

## Estructura del Proyecto

```text
├── .github/        # Workflows de GitHub Actions
├── scripts/        # Scripts para automatización (generación de artículos)
├── src/            # Código fuente (React, componentes, datos)
│   ├── data/       # Archivos de datos del blog
├── server.ts       # Servidor Express
├── vite.config.ts  # Configuración de Vite
└── vercel.json     # Configuración para despliegue en Vercel
```

## Cómo Correr Localmente

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura tus variables de entorno (consulta `.env.example`).
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Automatización de Artículos

La plataforma cuenta con una automatización robusta para la generación de contenido nuevo:

* **GitHub Actions:** Ejecuta un script en Node.js cada 5 días.
* **Gemini API:** El script (`scripts/generate-article.mjs`) utiliza Google Gemini para redactar artículos originales, verificando el contexto de los artículos ya publicados en `src/data/extendedBlog.json` para evitar repeticiones y asegurar calidad SEO y relevancia regional para Latinoamérica.

---

Sitio web: [https://geoverdevidaconsciente.com](https://geoverdevidaconsciente.com)
