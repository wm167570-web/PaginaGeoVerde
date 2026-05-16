import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

// Configuración
const DATA_PATH = path.join(process.cwd(), 'src/data/extendedBlog.json');
const API_KEY = process.env.GEMINI_API_KEY;

async function generateArticle() {
  if (!API_KEY) {
    console.error('Error: GEMINI_API_KEY no está configurada.');
    process.exit(1);
  }

  // 1. Leer artículos existentes
  const rawData = fs.readFileSync(DATA_PATH, 'utf-8');
  const articles = JSON.parse(rawData);

  // 2. Extraer contexto (títulos, resúmenes y categorías)
  const context = articles.map(a => ({
    titulo: a.title,
    resumen: a.excerpt,
    categoria: a.category || 'General'
  }));

  const lastIdNum = Math.max(...articles.map(a => parseInt(a.id.replace('post-', ''))));
  const newId = `post-${lastIdNum + 1}`;

  // 3. Preparar el Prompt para Gemini
  const genAI = new GoogleGenAI({ apiKey: API_KEY });
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `
    Eres un escritor experto en medio ambiente y sostenibilidad para Latinoamérica. 
    Escribe un artículo nuevo para el blog de GeoVerde Vida Consciente.

    CONTEXTO DE ARTÍCULOS EXISTENTES (NO REPETIR TEMAS):
    ${JSON.stringify(context)}

    DIRECTRICES:
    - El nuevo artículo NO debe repetir ningún tema abordado directa ni indirectamente por los anteriores.
    - Elige el tema con mayor potencial SEO en Latinoamérica que aún no haya sido cubierto.
    - Temas sugeridos: cambio climático, biodiversidad, energías renovables, vida consciente, economía circular, ecología urbana.
    - Mínimo 400 palabras en el campo 'content'.
    - Imagen de Unsplash coherente: https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&q=80&w=2000 (o usa keywords en el formato https://source.unsplash.com/800x600/?[keywords]).
    - Datos reales y ejemplos de Latam (Colombia, México, Brasil, Argentina, etc.).

    ESTRUCTURA DE SALIDA (JSON PURO):
    {
      "id": "${newId}",
      "title": "Título impactante",
      "date": "${new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}",
      "author": "GEOVERDE",
      "image": "URL_DE_IMAGEN",
      "category": "Categoría",
      "excerpt": "Resumen de máximo 2 oraciones",
      "content": "Contenido completo con marcadores markdown para negritas y secciones",
      "keywords": ["keyword1", "keyword2"]
    }

    IMPORTANTE: Entrega SOLO el objeto JSON, nada más.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Limpiar posibles bloques de código markdown
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const newArticle = JSON.parse(text);

    // 4. Insertar al inicio del array
    const updatedArticles = [newArticle, ...articles];

    // 5. Guardar el archivo
    fs.writeFileSync(DATA_PATH, JSON.stringify(updatedArticles, null, 2), 'utf-8');
    
    console.log(`✅ Artículo generado e insertado: ${newArticle.title}`);
  } catch (error) {
    console.error('Error generando el artículo:', error);
    process.exit(1);
  }
}

generateArticle();
