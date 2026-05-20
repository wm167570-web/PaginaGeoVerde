import { readFileSync, writeFileSync } from 'fs';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

async function getKeywords(title) {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{
          role: 'user',
          content: `Give me 2-3 specific English keywords for a Pexels photo search that VISUALLY represents this article title: "${title}". Be concrete and visual. Reply ONLY with the keywords, nothing else.`
        }],
        max_tokens: 15
      })
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || title.split(' ').slice(0,3).join(' ');
  } catch {
    return title.split(' ').slice(0,3).join(' ');
  }
}

async function getPexelsImage(query, usedUrls, attempt = 1) {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&orientation=landscape&page=${attempt}`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );
    if (!res.ok) {
      console.log(`   ⚠️ Pexels ${res.status}`);
      return null;
    }
    const data = await res.json();
    const available = (data.photos || []).filter(p => !usedUrls.has(p.src.large));
    if (available.length === 0 && attempt < 3) {
      return getPexelsImage(query, usedUrls, attempt + 1);
    }
    const selected = available[0] || data.photos?.[0];
    return selected?.src?.large || null;
  } catch (err) {
    console.log(`   ⚠️ Error: ${err.message}`);
    return null;
  }
}

const articles = JSON.parse(readFileSync('src/data/extendedBlog.json', 'utf8'));

// Registrar URLs de Pexels ya usadas (estas están bien, no se tocan)
const usedUrls = new Set(
  articles
    .filter(a => a.image?.includes('pexels.com'))
    .map(a => a.image)
);

console.log(`Total artículos: ${articles.length}`);
console.log(`Ya tienen imagen Pexels: ${usedUrls.size}`);
console.log(`Necesitan actualización: ${articles.filter(a => !a.image?.includes('pexels.com')).length}\n`);

let fixed = 0;
for (const article of articles) {
  // Solo procesar artículos sin imagen de Pexels
  if (article.image?.includes('pexels.com')) {
    console.log(`✅ Pexels OK: ${article.title}`);
    continue;
  }
  console.log(`🔄 Actualizando: ${article.title}`);
  const keywords = await getKeywords(article.title);
  console.log(`   Keywords: ${keywords}`);
  await new Promise(r => setTimeout(r, 500));
  const imageUrl = await getPexelsImage(keywords, usedUrls);
  if (imageUrl) {
    article.image = imageUrl;
    usedUrls.add(imageUrl);
    fixed++;
    console.log(`   ✅ Actualizado`);
  } else {
    console.log(`   ⚠️ Sin resultado — imagen original conservada`);
  }
  await new Promise(r => setTimeout(r, 1000));
}

writeFileSync('src/data/extendedBlog.json', JSON.stringify(articles, null, 2));
console.log(`\n✅ Proceso completado: ${fixed} artículos actualizados`);
