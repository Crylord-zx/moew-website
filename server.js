const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = process.env.PORT || 8899;

const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.gif': 'image/gif',
  '.mp3': 'audio/mpeg',
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const filePath = path.join(root, urlPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found: ' + urlPath);
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}`);
  console.log(`Templates:`);
  console.log(`  http://localhost:${port}/templates/girlfriends-day.html`);
  console.log(`  http://localhost:${port}/templates/girlfriends-day-v2.html`);
  console.log(`  http://localhost:${port}/templates/netflix-story.html`);
  console.log(`  http://localhost:${port}/templates/apology-site.html`);
  console.log(`  http://localhost:${port}/templates/bestfriends-day.html`);
  console.log(`  http://localhost:${port}/templates/brothers-day.html`);
  console.log(`  http://localhost:${port}/templates/mothers-day-special-v2.html`);
  console.log(`  http://localhost:${port}/templates/anniversary-special.html`);
  console.log(`  http://localhost:${port}/templates/bday-wish-1.html`);
  console.log(`  http://localhost:${port}/templates/wedding-special.html`);
  console.log(`  http://localhost:${port}/templates/bday-wish-4.html`);
  console.log(`  http://localhost:${port}/templates/cute-birthday.html`);
  console.log(`  http://localhost:${port}/templates/cute-website-v2.html`);
  console.log(`  http://localhost:${port}/templates/special-apology.html`);
  console.log(`  http://localhost:${port}/templates/sweet-birthday.html`);
  console.log(`  http://localhost:${port}/templates/bday-wish-3.html`);
});
