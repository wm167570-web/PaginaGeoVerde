import fs from 'fs';

const articles = JSON.parse(fs.readFileSync('src/data/extendedBlog.json', 'utf8'));
const counts = {};
articles.forEach(a => {
  counts[a.image] = (counts[a.image] || 0) + 1;
});

const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
console.log("Image counts (sorted by occurrence):");
sorted.forEach(([img, count]) => {
  if (count > 0) {
    console.log(`${count}x: ${img}`);
  }
});
