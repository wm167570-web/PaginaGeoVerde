import { readFileSync, writeFileSync } from 'fs';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

async function getKeywords(title) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [{
        role: 'user',
        content: `Give me 3 specific English keywords for an Unsplash photo search that visually represents this Spanish article title: "${title}". Reply with ONLY the keywords separated by spaces, nothing else. Be specific and visual, not abstract.`
      }],
      max_tokens: 20
    })
  });
  const data = await res.json();
  return data.choices[0].message.content.trim();
}

async function getUnsplashImage(query, usedUrls) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape`,
    { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` } }
  );
  const data = await res.json();
  const available = (data.results || []).filter(r => !usedUrls.has(r.urls.regular));
  const selected = available[0] || data.results?.[0];
  return selected?.urls?.regular || null;
}

const articles = JSON.parse(readFileSync('src/data/extendedBlog.json', 'utf8'));

// Detectar imágenes duplicadas
const imageCount = {};
articles.forEach(a => {
  imageCount[a.image] = (imageCount[a.image] || 0) + 1;
});
const duplicatedImages = new Set(
  Object.entries(imageCount).filter(([, count]) => count > 1).map(([url]) => url)
);

const usedUrls = new Set(
  articles.filter(a => !duplicatedImages.has(a.image)).map(a => a.image)
);

let fixed = 0;
for (const article of articles) {
  if (!duplicatedImages.has(article.image)) {
    console.log(`✅ Omitiendo (imagen única): ${article.title}`);
    continue;
  }
  console.log(`🔄 Procesando: ${article.title}`);
  const keywords = await getKeywords(article.title);
  console.log(`   Keywords: ${keywords}`);
  await new Promise(r => setTimeout(r, 1000));
  const imageUrl = await getUnsplashImage(keywords, usedUrls);
  if (imageUrl) {
    article.image = imageUrl;
    usedUrls.add(imageUrl);
    fixed++;
    console.log(`   ✅ Imagen actualizada`);
  } else {
    console.log(`   ⚠️ Sin resultado para: ${keywords}`);
  }
  await new Promise(r => setTimeout(r, 1000));
}

writeFileSync('src/data/extendedBlog.json', JSON.stringify(articles, null, 2));
console.log(`\n✅ Completado: ${fixed} artículos actualizados`);
