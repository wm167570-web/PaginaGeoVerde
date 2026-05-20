import https from 'https';

const checkUrl = (url) => {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve({ url, status: res.statusCode });
        }).on('error', () => resolve({ url, status: 500 }));
    });
};

const ids = [
    395537, 2821668, // nature/forest
    259280, 247599, // water/nature
    600114, 544554, // kids nature
    4207892, 4207933, // compost?
    159397, 886521, // solar panels
    314726, // architecture
    761295, 3038756, // food waste?
];

async function run() {
    for (let id of ids) {
        const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;
        const res = await checkUrl(url);
        console.log(res.url, res.status);
    }
}
run();
