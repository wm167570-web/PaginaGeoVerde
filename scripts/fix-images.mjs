import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/extendedBlog.json');
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const translationDict = {
  'cambio': 'climate',
  'climático': 'change',
  'biodiversidad': 'biodiversity',
  'energía': 'energy',
  'limpia': 'clean',
  'renovable': 'renewable',
  'movilidad': 'mobility',
  'sostenible': 'sustainable',
  'estilo': 'lifestyle',
  'vida': 'lifestyle',
  'tecnología': 'technology',
  'verde': 'green',
  'residuos': 'waste',
  'reciclaje': 'recycling',
  'agua': 'water',
  'glaciares': 'glacier',
  'hielo': 'ice',
  'bosque': 'forest',
  'naturaleza': 'nature',
  'contaminación': 'pollution',
  'océano': 'ocean',
  'planeta': 'planet',
  'tierra': 'earth',
  'plástico': 'plastic',
  'impacto': 'impact',
  'huella': 'footprint',
  'carbono': 'carbon',
  'emisiones': 'emissions',
  'solar': 'solar',
  'eólica': 'wind',
  'urbana': 'urban'
};

function translateToEnglish(text) {
  const words = text.toLowerCase().split(/\s+/);
  let englishWords = words.map(w => {
    const cleanWord = w.replace(/[^\w\sáéíóúüñ]/g, '');
    return translationDict[cleanWord] || cleanWord;
  });
  
  const stopWords = ['el', 'la', 'los', 'las', 'un', 'una', 'de', 'del', 'y', 'en', 'para', 'por', 'con', 'sobre', 'como', 'qué', 'que', 'a', 'al', 'o', 'las', 'su', 'sus'];
  englishWords = englishWords.filter(w => !stopWords.includes(w) && w.length > 1);
  
  return englishWords.slice(0, 4).join(' ');
}

async function fixImages() {
  if (!UNSPLASH_ACCESS_KEY) {
    console.error('Error: UNSPLASH_ACCESS_KEY no está configurada.');
    process.exit(1);
  }

  const data = fs.readFileSync(DATA_PATH, 'utf-8');
  const articles = JSON.parse(data);
  let updated = false;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const query = translateToEnglish(article.title);
    console.log(`Buscando imagen para: "${article.title}" -> "${query}"`);

    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`, {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      });

      if (!response.ok) {
        console.error(`Error API Unsplash (${response.status}):`, await response.text());
        continue;
      }

      const result = await response.json();
      if (result.results && result.results.length > 0) {
        const newImageUrl = result.results[0].urls.regular;
        if (article.image !== newImageUrl) {
            article.image = newImageUrl;
            updated = true;
            console.log(`  Nueva imagen: ${newImageUrl}`);
        } else {
            console.log(`  Imagen ya estaba correcta.`);
        }
      } else {
        console.log(`  No se encontraron fotos para: ${query}`);
      }
    } catch (err) {
      console.error('Error de red:', err);
    }

    // Esperar 500ms entre cada llamada
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  if (updated) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2), 'utf-8');
    console.log('✅ Archivo JSON actualizado con éxito.');
  } else {
    console.log('✅ No fue necesario realizar cambios.');
  }
}

fixImages();
