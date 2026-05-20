import https from 'https';

const getPexelsImages = (query) => {
    return new Promise((resolve) => {
        https.get(`https://www.pexels.com/search/${query}/`, (res) => {
            let data = '';
            res.on('data', d => data += d);
            res.on('end', () => {
                const regex = /<img[^>]+src="https:\/\/images.pexels.com\/photos\/(\d+)\//g;
                let match;
                const ids = new Set();
                while ((match = regex.exec(data)) !== null) {
                    ids.add(match[1]);
                }
                resolve(Array.from(ids));
            });
        }).on('error', () => resolve([]));
    });
};

getPexelsImages('solar').then(console.log);
