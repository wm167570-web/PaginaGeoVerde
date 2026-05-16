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
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
    Eres un escritor experto en medio ambiente y sostenibilidad para Latinoamérica. 
    Escribe un artículo nuevo para el blog de GeoVerde Vida Consciente siguiendo estos parámetros de CALIDAD OBLIGATORIOS:

    - Mínimo 400 palabras en el campo 'content'.
    - Introducción enganchadora (2-3 oraciones).
    - 3 secciones con títulos en negrita (**Título de Sección**).
    - Mínimo 3 datos verificables con cifras reales.
    - Ejemplos específicos de Latinoamérica (Colombia, México, Brasil, Argentina, etc.).
    - Conclusión con llamado a la reflexión o acción.

    CONTEXTO DE ARTÍCULOS EXISTENTES (PROHIBIDO REPETIR ESTOS TEMAS O ENFOQUES):
    ${JSON.stringify(context)}

    IDENTIFICACIÓN DE VACÍOS:
    Analiza los temas anteriores y elige un tema fresco con alto potencial SEO en Latam que NUNCA haya sido tratado.

    ESTRUCTURA DE SALIDA (JSON PURO):
    {
      "id": "${newId}",
      "title": "Título impactante con palabra clave SEO",
      "date": "${new Date().toISOString().split('T')[0]}",
      "author": "GEOVERDE",
      "image": "https://source.unsplash.com/800x600/?[keywords-en-ingles-precisos]",
      "category": "Cambio Climático | Sostenibilidad | etc",
      "excerpt": "Resumen corto de 2 oraciones para preview",
      "content": "Párrafo intro... \\n\\n **Sección 1** \\n Desarrollo... \\n\\n **Sección 2** \\n Desarrollo... \\n\\n **Sección 3** \\n Desarrollo... \\n\\n Párrafo conclusión.",
      "keywords": ["keyword1", "keyword2", "keyword3"]
    }

    IMPORTANTE: Entrega SOLO el objeto JSON sin explicaciones adicionales.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Extraer solo el contenido entre llaves para evitar errores de parseo
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No se encontró un JSON válido en la respuesta");
    
    const newArticle = JSON.parse(jsonMatch[0]);

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
