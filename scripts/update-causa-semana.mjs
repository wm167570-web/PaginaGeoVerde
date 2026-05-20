import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

  if (!GROQ_API_KEY || !PEXELS_API_KEY) {
    console.error('Faltan las claves de API de Groq o Pexels.');
    process.exit(1);
  }

  try {
    // 1. Obtener la causa de Groq
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'Eres un experto en medio ambiente y ecología. Responde ÚNICAMENTE con un objeto JSON válido, sin formato markdown ni texto adicional.'
          },
          {
            role: 'user',
            content: 'Genera una causa ambiental urgente e importante para esta semana en Latinoamérica. Devuelve SOLO un JSON con esta estructura exacta:\n{"titulo": "título impactante máximo 6 palabras", "descripcion": "descripción breve máximo 15 palabras"}'
          }
        ],
        temperature: 0.7
      })
    });

    if (!groqResponse.ok) {
      throw new Error(`Error en Groq API: ${groqResponse.status} ${await groqResponse.text()}`);
    }

    const groqData = await groqResponse.json();
    let content = groqData.choices[0].message.content.trim();
    
    // Limpiar posibles bloques markdown (```json ... ```)
    content = content.replace(/^```json/g, '').replace(/```$/g, '').trim();
    
    const causa = JSON.parse(content);
    console.log('Causa generada:', causa);

    // 2. Obtener la imagen de Pexels
    // Usamos el título como término de búsqueda
    const query = encodeURIComponent(causa.titulo);
    const pexelsResponse = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1&locale=es-ES`, {
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    });

    if (!pexelsResponse.ok) {
      throw new Error(`Error en Pexels API: ${pexelsResponse.status} ${await pexelsResponse.text()}`);
    }

    const pexelsData = await pexelsResponse.json();
    let imagenUrl = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'; // Fallback
    
    if (pexelsData.photos && pexelsData.photos.length > 0) {
      imagenUrl = pexelsData.photos[0].src.large2x || pexelsData.photos[0].src.large;
      console.log('Imagen obtenida de Pexels:', imagenUrl);
    } else {
      console.log('No se encontraron imágenes en Pexels para la búsqueda, usando imagen por defecto.');
      // Intentar una segunda búsqueda con un término más general si falla la primera
      const fallbackResponse = await fetch(`https://api.pexels.com/v1/search?query=nature&per_page=1`, {
        headers: { 'Authorization': PEXELS_API_KEY }
      });
      if (fallbackResponse.ok) {
        const fallData = await fallbackResponse.json();
        if (fallData.photos && fallData.photos.length > 0) {
          imagenUrl = fallData.photos[0].src.large2x || fallData.photos[0].src.large;
          console.log('Imagen por defecto de Pexels obtenida:', imagenUrl);
        }
      }
    }

    // 3. Escribir el resultado en src/data/causaSemana.json
    const finalData = {
      titulo: causa.titulo,
      descripcion: causa.descripcion,
      imagen: imagenUrl
    };

    const targetPath = path.join(__dirname, '../src/data/causaSemana.json');
    fs.writeFileSync(targetPath, JSON.stringify(finalData, null, 2));
    console.log('causaSemana.json actualizado con éxito en:', targetPath);

  } catch (error) {
    console.error('Error durante la actualización de la causa de la semana:', error);
    process.exit(1);
  }
}

main();
