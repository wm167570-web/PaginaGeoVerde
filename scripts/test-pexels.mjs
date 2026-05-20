import fs from 'fs';
import https from 'https';

const getPexelsIds = async (query) => {
    return new Promise((resolve) => {
        https.get(`https://www.pexels.com/search/${query}/`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const ids = [];
                const regex = /href="\/photo\/[^\/]+-(\d+)\/"/g;
                let match;
                while ((match = regex.exec(data)) !== null) {
                    ids.push(match[1]);
                }
                resolve([...new Set(ids)]);
            });
        }).on('error', () => resolve([]));
    });
};

async function run() {
    const ids = await getPexelsIds('nature');
    console.log(ids);
}
run();
