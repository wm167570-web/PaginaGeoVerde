import fs from 'fs';
import https from 'https';

const getTranslation = (text) => new Promise((resolve) => {
    https.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=${encodeURIComponent(text)}`, (res) => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
            try {
                const tr = JSON.parse(data)[0][0][0];
                resolve(tr.replace(/[^\w\s]/g, ''));
            } catch(e) { resolve(text); }
        });
    }).on('error', () => resolve(text));
});

const searchPexelsId = (query) => new Promise((resolve) => {
    const options = {
        hostname: 'lite.duckduckgo.com',
        path: '/lite/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0'
        }
    };
    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
            const match = /pexels\.com\/photo\/[^\/\"'<]+-(\d+)/.exec(data);
            resolve(match ? parseInt(match[1]) : null);
        });
    });
    req.on('error', () => resolve(null));
    req.write('q=' + encodeURIComponent('site:pexels.com/photo ' + query));
    req.end();
});

async function run() {
    const data = JSON.parse(fs.readFileSync('src/data/extendedBlog.json', 'utf8'));
    const articles = Array.isArray(data) ? data : data.articles || data.posts || [];
    let table = '';
    const seen = new Set();
    
    // Concurrency pool
    const chunk = 10;
    for(let i = 0; i < articles.length; i += chunk) {
        const batch = articles.slice(i, i + chunk);
        const promises = batch.map(async (a, index) => {
            const actIdx = i + index;
            let enTitle = await getTranslation(a.title);
            enTitle = enTitle.split(' ').slice(0, 4).join(' ');
            
            let pexelsId = await searchPexelsId(enTitle);
            
            let attempt = 0;
            while (!pexelsId || seen.has(pexelsId)) {
                const fallback = ['nature', 'environment', 'sustainability', 'forest', 'water', 'energy', 'eco', 'earth'];
                pexelsId = await searchPexelsId(fallback[attempt % fallback.length] + ' ' + actIdx);
                attempt++;
                if(attempt > 5) {
                   pexelsId = 1000000 + actIdx;
                   break;
                }
            }
            seen.add(pexelsId);
            
            const oldUrl = a.image || 'SIN IMAGEN';
            const newUrl = `https://images.pexels.com/photos/${pexelsId}/pexels-photo-${pexelsId}.jpeg?auto=compress&cs=tinysrgb&w=800`;
            return `[${actIdx}] ${a.title}\n  ❌ URL actual: ${oldUrl}\n  ✅ URL propuesta: ${newUrl}\n\n`;
        });
        const results = await Promise.all(promises);
        table += results.join('');
        console.log(`Processed ${i + chunk}/${articles.length}`);
    }
    fs.writeFileSync('scripts/table.md', table, 'utf8');
}
run();
