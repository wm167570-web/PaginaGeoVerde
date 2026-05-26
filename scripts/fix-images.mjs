import { readFileSync, writeFileSync, existsSync } from 'fs';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const PROGRESS_FILE = 'scripts/.fix-progress.json';

// Diccionario experto de keywords ambientales español→inglés
// Cubre los temas principales de un blog ambiental latinoamericano
const TOPIC_KEYWORDS = {
  // Agua
  'glaciar': 'glacier ice melting arctic',
  'glaciares': 'glacier ice arctic landscape',
  'hídrico': 'water river management',
  'agua dulce': 'freshwater river lake',
  'océano': 'ocean sea waves',
  'marino': 'marine ocean underwater',
  'manglar': 'mangrove coastal ecosystem',
  'lluvia': 'rain storm water',
  // Tierra y vegetación
  'deforestación': 'deforestation logging forest destruction',
  'reforestación': 'reforestation tree planting',
  'bosque': 'forest trees woodland',
  'bosques urbanos': 'urban forest city trees',
  'agricultura regenerativa': 'regenerative agriculture soil farming',
  'suelo': 'soil earth farming agriculture',
  'biodiversidad': 'biodiversity wildlife species nature',
  'flora': 'plants flora botanical garden',
  'fauna': 'wildlife animals nature',
  'ecosistema': 'ecosystem nature habitat',
  // Energía
  'solar': 'solar panels renewable energy',
  'energía renovable': 'renewable energy wind solar',
  'eólica': 'wind turbines energy',
  'hidrógeno': 'hydrogen green energy',
  // Contaminación
  'aire': 'air pollution smog city',
  'contaminación': 'pollution environment damage',
  'plástico': 'plastic pollution ocean waste',
  'residuos': 'waste recycling garbage',
  'reciclaje': 'recycling waste management',
  // Ciudades
  'ciudad': 'sustainable city urban green',
  'ciudades esponja': 'urban flooding city resilience',
  'transporte': 'electric transport sustainable mobility',
  'edificio': 'green building sustainable architecture',
  // Clima
  'cambio climático': 'climate change global warming',
  'carbono': 'carbon footprint emissions',
  'huella': 'carbon footprint sustainability',
  'calentamiento': 'global warming climate',
  // Economía sostenible
  'economía circular': 'circular economy recycling',
  'moda sostenible': 'sustainable fashion clothing',
  'turismo': 'ecotourism nature travel',
  'alimentación': 'healthy food sustainable agriculture',
  'vegano': 'plant based food vegan',
  // Tecnología ambiental
  'inteligencia artificial': 'artificial intelligence technology nature',
  'blockchain': 'technology digital innovation',
  'satélite': 'satellite earth observation',
  // Otros temas ambientales
  'abejas': 'bees pollination flowers',
  'coral': 'coral reef ocean underwater',
  'minería': 'mining extraction environment',
  'petróleo': 'oil spill pollution sea',
  'acuicultura': 'aquaculture fish farming water',
  'algas': 'algae seaweed ocean green',
  'semillas': 'seeds agriculture farming',
  'compost': 'composting organic waste soil',
};

function getKeywordsFromTitle(title) {
  const lower = title.toLowerCase();
  // Buscar match exacto primero (frases compuestas)
  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (lower.includes(topic)) return keywords;
  }
  // Fallback: extraer sustantivos del título
  const stopWords = ['el','la','los','las','de','del','en','un','una','y','e','o','para','por','con','su','sus','que','como','sobre'];
  const words = lower.split(/\s+/).filter(w => w.length > 4 && !stopWords.includes(w));
  return words.slice(0,3).join(' ') + ' environment nature';
}

async function getGroqKeywords(title) {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{
          role: 'user',
          content: `You are an expert in environmental photography. For this Spanish article title: "${title}", provide 3-4 specific English keywords that would find a HIGHLY RELEVANT, PROFESSIONAL photo on Pexels. The photo must visually represent the article's core topic. Reply ONLY with keywords separated by spaces.`
        }],
        max_tokens: 20,
        temperature: 0.3
      })
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch { return null; }
}

async function getPexelsImage(query, usedUrls, fallbackQuery) {
  for (const q of [query, fallbackQuery].filter(Boolean)) {
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=15&orientation=landscape`,
        { headers: { Authorization: PEXELS_API_KEY } }
      );
      if (!res.ok) continue;
      const data = await res.json();
      const available = (data.photos || []).filter(p => !usedUrls.has(p.src.large));
      const selected = available[0];
      if (selected) return selected.src.large;
    } catch { continue; }
    await new Promise(r => setTimeout(r, 500));
  }
  return null;
}

// Sistema de progreso para reanudar si falla
function loadProgress() {
  try {
    return existsSync(PROGRESS_FILE)
      ? JSON.parse(readFileSync(PROGRESS_FILE, 'utf8'))
      : { processed: [] };
  } catch { return { processed: [] }; }
}

function saveProgress(processed) {
  writeFileSync(PROGRESS_FILE, JSON.stringify({ processed }, null, 2));
}

const articles = JSON.parse(readFileSync('src/data/extendedBlog.json', 'utf8'));
const progress = loadProgress();
const processedIds = new Set(progress.processed);

// Registrar URLs Pexels ya usadas (artículos que ya tienen imagen correcta)
const usedUrls = new Set(
  articles
    .filter(a => a.image?.includes('pexels.com'))
    .map(a => a.image)
);

// Identificar artículos que necesitan actualización
const needsUpdate = articles.filter(a =>
  !a.image?.includes('pexels.com') && !processedIds.has(a.id || a.title)
);

console.log(`\n📊 Estado inicial:`);
console.log(`   Total: ${articles.length}`);
console.log(`   Ya tienen Pexels: ${usedUrls.size}`);
console.log(`   Necesitan actualización: ${needsUpdate.length}\n`);

let fixed = 0;
let failed = 0;

for (const article of needsUpdate) {
  const id = article.id || article.title;
  console.log(`🔄 [${fixed + failed + 1}/${needsUpdate.length}] ${article.title}`);

  // Estrategia dual: diccionario + Groq como respaldo
  const dictKeywords = getKeywordsFromTitle(article.title);
  const groqKeywords = await getGroqKeywords(article.title);
  const finalKeywords = groqKeywords || dictKeywords;

  console.log(`   🔑 Keywords: ${finalKeywords}`);
  await new Promise(r => setTimeout(r, 400));

  const imageUrl = await getPexelsImage(finalKeywords, usedUrls, dictKeywords);

  if (imageUrl) {
    article.image = imageUrl;
    usedUrls.add(imageUrl);
    processedIds.add(id);
    fixed++;
    console.log(`   ✅ Imagen actualizada`);
  } else {
    failed++;
    console.log(`   ⚠️  Sin resultado — imagen original conservada`);
  }

  // Guardar progreso cada 10 artículos
  if ((fixed + failed) % 10 === 0) {
    writeFileSync('src/data/extendedBlog.json', JSON.stringify(articles, null, 2));
    saveProgress([...processedIds]);
    console.log(`   💾 Progreso guardado`);
  }

  await new Promise(r => setTimeout(r, 900));
}

// Guardar resultado final
writeFileSync('src/data/extendedBlog.json', JSON.stringify(articles, null, 2));
saveProgress([...processedIds]);

console.log(`\n✅ COMPLETADO:`);
console.log(`   Actualizados: ${fixed}`);
console.log(`   Sin cambios: ${failed}`);
console.log(`   Total Pexels ahora: ${[...usedUrls].length}`);
