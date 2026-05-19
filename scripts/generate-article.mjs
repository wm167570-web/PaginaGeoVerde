import fs from 'fs';
import path from 'path';

// Configuración de rutas y variables
const DATA_PATH = path.join(process.cwd(), 'src/data/extendedBlog.json');
const API_KEY = process.env.GROQ_API_KEY;

// Diccionario de IDs de imágenes reales de Unsplash sobre temas ambientales
const ENVIRONMENTAL_IMAGES = {
  'cambio climático': '1501854140801-50d01698950b', // Glaciar
  'biodiversidad': '1446941611757-b55cc246903d', // Bosque
  'energía limpia': '1464822759023-fed622ff2c3b', // Energía solar
  'movilidad sostenible': '1506012841743-12d46e38708c', // Bicicleta ciudad
  'estilo de vida': '1532996122748-685b8823f6e8', // Reciclaje
  'tecnología verde': '1531973576160-7d72657e2f5b', // Hojas tecnología
  'default': '1542601906111-2d1f68d8557d'
};

function getSafeImageUrl(category = 'default') {
  const id = ENVIRONMENTAL_IMAGES[category.toLowerCase()] || ENVIRONMENTAL_IMAGES['default'];
  return `https://images.unsplash.com/photo-${id}?w=800&q=80`;
}

async function generateArticle() {
  // Verificación de API KEY
  if (!API_KEY) {
    console.error('Error: La variable GROQ_API_KEY no está configurada en los Secrets de GitHub.');
    process.exit(1);
  }

  try {
    // 1. Leer artículos actuales para el contexto
    if (!fs.existsSync(DATA_PATH)) {
      console.error(`Error: No se encontró el archivo de datos en ${DATA_PATH}`);
      process.exit(1);
    }

    const rawData = fs.readFileSync(DATA_PATH, 'utf-8');
    let articles = [];
    try {
      articles = JSON.parse(rawData);
    } catch (parseError) {
      console.error('Error: El archivo extendedBlog.json contiene un formato JSON inválido.');
      process.exit(1);
    }

    // 2. Validar y corregir imágenes de artículos existentes
    let needsUpdate = false;
    articles = articles.map(article => {
      if (!article.image || article.image.includes('source.unsplash.com') || !article.image.includes('images.unsplash.com/photo-')) {
        article.image = getSafeImageUrl(article.category);
        needsUpdate = true;
      }
      return article;
    });

    if (needsUpdate) {
      console.log('✅ Imágenes de artículos existentes actualizadas.');
      fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2), 'utf-8');
    }

    // 3. Extraer títulos y resúmenes para evitar repeticiones (Contexto para la IA)
    const context = articles.slice(0, 15).map(article => ({
      title: article.title,
      excerpt: article.excerpt,
      category: article.category
    }));

    // Calcular el próximo ID incremental
    let maxId = 0;
    articles.forEach(article => {
      const idMatch = article.id.match(/\d+/);
      if (idMatch) {
        const idNum = parseInt(idMatch[0]);
        if (idNum > maxId) maxId = idNum;
      }
    });
    const nextId = `post-${maxId + 1}`;

    // 4. Definir el Prompt con las directrices de calidad GeoVerde
    const prompt = `
      Eres un redactor experto en ecología y sostenibilidad para el portal "GeoVerde: Vida Consciente".
      Tu misión es redactar un artículo ORIGINAL y de alta calidad para un público latinoamericano.

      TEMAS YA PUBLICADOS (PROHIBIDO REPETIR ESTOS TEMAS O SUS ENFOQUES):
      ${JSON.stringify(context)}

      REQUISITOS DEL ARTÍCULO:
      - Título: Impactante, con palabras clave para SEO en español.
      - Extensión: Mínimo 450 palabras en el campo 'content'.
      - Estructura del 'content': 
        1. Introducción atractiva.
        2. Al menos 3 secciones con subencabezados en negrita (ejemplo: **El Impacto en las Cuencas**).
        3. Datos técnicos reales y estadísticas actuales sobre Latinoamérica (países como México, Colombia, Brasil, Chile, Argentina, etc.).
        4. Conclusión con una reflexión profunda o llamado a la acción.
      - Imagen: Genera una URL de imagen usando el formato: https://images.unsplash.com/photo-PHOTOID?w=800&q=80. Elige un PHOTOID coherente con el tema. Keywords para la búsqueda interna de la imagen: usa keywords ultra específicos en inglés directamente relacionados con el tema central del artículo (ejemplo si trata de basura: waste-management,recycling,latin-america).
      - Categoría: Una de estas (Cambio Climático, Biodiversidad, Energía Limpia, Movilidad Sostenible, Estilo de Vida, Tecnología Verde).

      FORMATO DE SALIDA (ESTRICTAMENTE JSON):
      {
        "id": "${nextId}",
        "title": "Título del artículo",
        "date": "${new Date().toISOString().split('T')[0]}",
        "author": "GEOVERDE",
        "image": "https://images.unsplash.com/photo-[ID]?w=800&q=80",
        "category": "Categoría elegida",
        "excerpt": "Resumen de 2 oraciones para la vista previa.",
        "content": "Introducción... \\n\\n **Subtítulo 1** \\n Texto... \\n\\n **Subtítulo 2** \\n Texto... \\n\\n **Subtítulo 3** \\n Texto... \\n\\n Conclusión.",
        "keywords": ["keyword1", "keyword2", "keyword3"]
      }

      IMPORTANTE: Responde ÚNICAMENTE con el objeto JSON. No incluyas explicaciones ni bloques de código markdown (\`\`\`json).
    `;

    // 5. Generar contenido con la API de Groq
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }]
      })
    });
    
    if (!response.ok) {
       console.error('Error al llamar a la API de Groq:', await response.text());
       process.exit(1);
    }
    
    const data = await response.json();
    const textResponse = data.choices[0].message.content.trim();


    // 6. Extraer y parsear el JSON de forma segura
    const jsonStartIndex = textResponse.indexOf('{');
    const jsonEndIndex = textResponse.lastIndexOf('}');
    
    if (jsonStartIndex === -1 || jsonEndIndex === -1) {
      throw new Error('La respuesta de la IA no contiene un objeto JSON válido.');
    }

    const jsonString = textResponse.substring(jsonStartIndex, jsonEndIndex + 1);
    const newArticle = JSON.parse(jsonString);

    // 7. Validación básica del artículo generado
    if (!newArticle.title || !newArticle.content || newArticle.content.length < 400) {
      throw new Error('El artículo generado no cumple con los requisitos de longitud o campos obligatorios.');
    }

    // 8. Insertar al inicio de la lista (para que sea el nuevo destacado)
    const updatedArticles = [newArticle, ...articles];

    // 9. Sobrescribir el archivo de datos
    fs.writeFileSync(DATA_PATH, JSON.stringify(updatedArticles, null, 2), 'utf-8');

    console.log(`✅ Artículo generado exitosamente: "${newArticle.title}"`);
    console.log(`📅 Fecha: ${newArticle.date} | ID: ${newArticle.id}`);

  } catch (error) {
    console.error('❌ Error durante la ejecución del script:');
    console.error(error.message);
    process.exit(1);
  }
}

// Iniciar proceso
generateArticle();
