import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/data/extendedBlog.json', 'utf8'));
const articles = Array.isArray(data) ? data : data.articles || data.posts || [];
const seen_images = {};

console.log('=== AUDITORÍA DE IMÁGENES ===');

articles.forEach((a, i) => {
    const title = a.title || 'SIN TÍTULO';
    const image = a.image || 'SIN IMAGEN';
    const short_img = image ? image.split('?')[0].split('/').pop() : 'VACÍA';
    const duplicate = seen_images[short_img] ? ' ⚠️ DUPLICADA' : '';
    
    if (!seen_images[short_img]) {
        seen_images[short_img] = [];
    }
    seen_images[short_img].push(i);
    console.log(`[${i.toString().padStart(2, '0')}] ${title.substring(0, 50).padEnd(50)} | ${short_img}${duplicate}`);
});

console.log('\n=== IMÁGENES DUPLICADAS ===');
for (const [img, indices] of Object.entries(seen_images)) {
    if (indices.length > 1) {
        console.log(`${img} → artículos: [${indices.join(', ')}]`);
    }
}
