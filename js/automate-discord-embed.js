/* automating_embed_links_for_discord */

   ⢰⠋⠉⠒⢄  ⣠⠤⠔⢒⠎    ⠈⠳⣤⢤⡀
 ⢀⡏      ⠔⠉            ⢄    ⠘⢦⠈⠑⢤⡀  ⢀⣤⣤⡀
 ⢸⢠⢆                    ⠈⡆    ⢈⠆    ⠙⢔⠋⢀⡼⠃
 ⠸⢨⠊                    ⠈⠃              ⠈⢯⠁
 ⡰⠁                                          ⠈⡆
⣰⠁⢀⣀                                          ⣷
⡇⣂⢸⣿⠂⠠⣀⡠  ⢰⣿⣷  ⣀                      ⡏
⢳⡀                ⠉⠁⠐⠄                  ⢀⡜⠁
 ⠙⢤⡀                                  ⣀⡴⠋
     ⠉⠉⠒⠒⠦⠤⠤⣤⣤⣤⣤⣤⠤⠤⠶⠒⠚⠉⠁ 

const fs = require('fs');
const path = require('path');

const SITE = 'https://he7yz.github.io';
const ROOT = path.join(__dirname, '..');
const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'posts.json'), 'utf8'));
const outDir = path.join(ROOT, 'w');
fs.mkdirSync(outDir, { recursive: true });

const slugify = s => s.toLowerCase()
  .replace(/[{}]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const esc = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

for (const p of posts) {
  const slug = slugify(p.id);
  const url = `${SITE}/post.html?file=${encodeURIComponent(p.id)}`;
  const image = `${SITE}/${p.thumbnail}`;
  const desc = `${p.excerpt}${p.tags?.length ? ` — Tags: ${p.tags.join(', ')}` : ''}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="0; url=${esc(url)}">
<title>${esc(p.id)}</title>

<meta property="og:type" content="article">
<meta property="og:title" content="${esc(p.id)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="${esc(url)}">
<meta property="article:published_time" content="${esc(p.date)}">
<meta name="theme-color" content="#6b66c6">
<meta name="twitter:card" content="summary_large_image">

<script>location.replace(${JSON.stringify(url)});</script>
</head>
<body>
<p>Redirecting to <a href="${esc(url)}">${esc(p.title || p.id)}</a>...</p>
</body>
</html>
`;

  fs.writeFileSync(path.join(outDir, `${slug}.html`), html);
  console.log(`w/${slug}.html -> ${url}`);
}
