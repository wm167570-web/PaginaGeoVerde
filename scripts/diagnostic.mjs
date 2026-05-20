import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/data/extendedBlog.json', 'utf8'));
const articles = Array.isArray(data) ? data : data.articles || data.posts || [];

articles.forEach((a, i) => {
    const title = a.title || 'SIN TÍTULO';
    const image = a.image || 'SIN IMAGEN';
    const content = a.content || a.body || a.excerpt || '';
    const words = content.split(/\s+/).filter(Boolean).length;
    console.log(`[${i}] ${title.substring(0, 60)} | ${words} palabras | img: ${image.substring(0, 60)}`);
});
