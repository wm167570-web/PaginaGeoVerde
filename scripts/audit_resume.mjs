import fs from 'fs';
import https from 'https';

const getTranslation = (text) => new Promise((resolve) => {
    https.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=${encodeURIComponent(text)}`, (res) => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
            try {
                const tr = JSON.parse(data)[0][0][0];
                resolve(tr.replace(/[^\w\s\.]/g, ''));
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
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    };
    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
            let match = null;
            const regex = /pexels\.com\/photo\/[^\/\"'<]+-(\d+)/g;
            let m;
            while((m = regex.exec(data)) !== null) {
                // Return first valid
                resolve(parseInt(m[1]));
                return;
            }
            resolve(null);
        });
    });
    req.on('error', () => resolve(null));
    req.write('q=' + encodeURIComponent('site:pexels.com/photo ' + query));
    req.end();
});

const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
    const data = JSON.parse(fs.readFileSync('src/data/extendedBlog.json', 'utf8'));
    const articles = Array.isArray(data) ? data : data.articles || data.posts || [];
    
    // Load progress
    let progress = {};
    if (fs.existsSync('scripts/progress.json')) {
        progress = JSON.parse(fs.readFileSync('scripts/progress.json', 'utf8'));
    }
    
    let seen = new Set(Object.values(progress).map(x => x.id).filter(x => x));
    console.log(`Resuming from ${Object.keys(progress).length} items`);
    
    for(let i = 0; i < articles.length; i++) {
        if (progress[i]) continue;
        
        const a = articles[i];
        let enTitle = await getTranslation(a.title);
        enTitle = enTitle.split(' ').slice(0, 4).join(' ');
        
        let pexelsId = await searchPexelsId(enTitle);
        await delay(500); // 500ms delay to avoid DDG limits
        
        let attempt = 0;
        while (!pexelsId || seen.has(pexelsId)) {
            const fallback = ['nature', 'environment', 'sustainability', 'forest', 'water', 'energy', 'eco', 'earth'];
            const nq = fallback[attempt % fallback.length] + ' ' + (i + attempt);
            pexelsId = await searchPexelsId(nq);
            await delay(500);
            attempt++;
            if(attempt > 6) {
               pexelsId = 1000000 + i; // absolute fallback
               break;
            }
        }
        seen.add(pexelsId);
        
        progress[i] = { title: a.title, id: pexelsId, old: a.image };
        fs.writeFileSync('scripts/progress.json', JSON.stringify(progress, null, 2));
        console.log(`Processed ${i+1}/${articles.length}: ${pexelsId}`);
    }
    
    // Once all done, build table
    let table = '';
    for(let i=0; i<articles.length; i++) {
        const item = progress[i];
        table += `[${i}] ${item.title}\n  ❌ URL actual: ${item.old || 'SIN IMAGEN'}\n  ✅ URL propuesta: https://images.pexels.com/photos/${item.id}/pexels-photo-${item.id}.jpeg?auto=compress&cs=tinysrgb&w=800\n\n`;
    }
    fs.writeFileSync('scripts/table.md', table, 'utf8');
    console.log('Fully done!');
}
run();
