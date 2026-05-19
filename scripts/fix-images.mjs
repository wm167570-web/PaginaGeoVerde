import { readFileSync, writeFileSync } from 'fs';

const KEYWORD_MAP = {
  'agua': 'water resources', 'glaciar': 'glacier melting',
  'glaciares': 'glaciers ice', 'carbono': 'carbon footprint',
  'huella': 'carbon footprint', 'plástico': 'plastic ocean pollution',
  'agricultura': 'regenerative agriculture soil', 'ciudad': 'sustainable city',
  'esponja': 'urban flooding resilience', 'bosque': 'forest nature',
  'energía': 'renewable energy', 'solar': 'solar panels',
  'biodiversidad': 'biodiversity wildlife', 'suelo': 'healthy soil farming',
  'residuos': 'waste recycling', 'clima': 'climate change',
  'océano': 'ocean conservation', 'marino': 'marine ecosystem',
  'hídrico': 'water management river', 'sostenible': 'sustainability green',
  'manglares': 'mangrove forest', 'deforestación': 'deforestation',
  'contaminación': 'air pollution', 'reciclaje': 'recycling waste'
};

function getKeywords(title) {
  const lower = title.toLowerCase();
  for (const [es, en] of Object.entries(KEYWORD_MAP)) {
    if (lower.includes(es)) return en;
  }
  return 'environmental sustainability nature';
}

const articles = JSON.parse(readFileSync('src/data/extendedBlog.json', 'utf8'));

for (const article of articles) {
  const query = getKeywords(article.title);
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
  });
  const data = await res.json();
  if (data.results?.[0]?.urls?.regular) {
    article.image = data.results[0].urls.regular;
    console.log(`✅ ${article.title} → ${query}`);
  } else {
    console.log(`⚠️ Sin imagen para: ${article.title}`);
  }
  await new Promise(r => setTimeout(r, 700));
}

writeFileSync('src/data/extendedBlog.json', JSON.stringify(articles, null, 2));
console.log('JSON actualizado correctamente');
