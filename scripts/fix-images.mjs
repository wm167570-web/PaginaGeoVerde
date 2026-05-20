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
          content: `Give me 2-3 specific English keywords for a photo search that visually represents: "${title}". Reply ONLY with the keywords, nothing else.`
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

async function getPexelsImage(query, usedUrls) {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&orientation=landscape`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );
    if (!res.ok) {
      console.log(`   ⚠️ Pexels error ${res.status}`);
      return null;
    }
    const data = await res.json();
    const available = (data.photos || []).filter(p => !usedUrls.has(p.src.large));
    const selected = available[0] || data.photos?.[0];
    return selected?.src?.large || null;
  } catch (err) {
    console.log(`   ⚠️ Error Pexels: ${err.message}`);
    return null;
  }
}

const articles = JSON.parse(readFileSync('src/data/extendedBlog.json', 'utf8'));

const imageCount = {};
articles.forEach(a => {
  if (a.image) imageCount[a.image] = (imageCount[a.image] || 0) + 1;
});
const problematicImages = new Set(
  Object.entries(imageCount)
    .filter(([, count]) => count > 1)
    .map(([url]) => url)
);

const usedUrls = new Set(
  articles
    .filter(a => a.image && !problematicImages.has(a.image))
    .map(a => a.image)
);

let fixed = 0;
for (const article of articles) {
  const needsUpdate = !article.image || problematicImages.has(article.image);
  if (!needsUpdate) {
    console.log(`✅ OK: ${article.title}`);
    continue;
  }
  console.log(`🔄 Procesando: ${article.title}`);
  const keywords = await getKeywords(article.title);
  console.log(`   Keywords: ${keywords}`);
  await new Promise(r => setTimeout(r, 400));
  const imageUrl = await getPexelsImage(keywords, usedUrls);
  if (imageUrl) {
    article.image = imageUrl;
    usedUrls.add(imageUrl);
    fixed++;
    console.log(`   ✅ Actualizado`);
  } else {
    console.log(`   ⚠️ Manteniendo imagen original`);
  }
  await new Promise(r => setTimeout(r, 800));
}

writeFileSync('src/data/extendedBlog.json', JSON.stringify(articles, null, 2));
console.log(`\n✅ Completado: ${fixed} artículos actualizados`);
