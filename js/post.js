document.addEventListener("DOMContentLoaded", () => {
  /* route_to_assets/screenshots/ */
  marked.use({
    renderer: {
      image(href, title, text) {
        let imgSrc = href;
        if (!href.startsWith('http') && !href.startsWith('assets/')) {
          imgSrc = `assets/screenshots/${href}`;
        }
        return `<img src="${imgSrc}" alt="${text || ''}" class="md-img" />`;
      }
    }
  });

  loadPost();
});

async function loadPost() {
  const params = new URLSearchParams(location.search);
  const id = params.get('file');
  if (!id) { showErr('No writeup specified. <a href="blog.html">← Back to blog</a>'); return; }

  /* update_sidebar_terminal */
  document.getElementById('term-fn').textContent = `writeups/${id}.md`;

  try {
    /* parallel_fetch:meta_&_markdown */
    const [postsRes, mdRes] = await Promise.all([
      fetch('posts.json'),
      fetch(`writeups/${id}.md`)
    ]);

    if (!mdRes.ok) throw new Error(`writeups/${id}.md not found (${mdRes.status})`);

    const posts  = await postsRes.json();
    const mdText = await mdRes.text();
    const meta   = posts.find(p => p.id === id) || null;

    /* populate_header */
    if (meta) populateHeader(meta, posts);
    else {
      document.getElementById('post-title').textContent = id;
      document.getElementById('bc-title').textContent   = id;
    }

    /* render_markdown */
    const article = document.getElementById('article');
    article.innerHTML = marked.parse(mdText);

    /* post_process_rendered_html_(func_by_main.js) */
    if (typeof convertFlagBlocks === 'function') convertFlagBlocks(article);
    if (typeof wrapCodeBlocks === 'function') wrapCodeBlocks(article);
    if (typeof buildTOC === 'function') buildTOC(article, document.getElementById('toc-list'));
    
    article.querySelectorAll('pre code:not(.hljs)').forEach(b => hljs.highlightElement(b));

    /* update_sidebar_stats */
    const allTags = [...new Set(posts.flatMap(p => p.tags))];
    const statPosts = document.getElementById('stat-posts');
    const statTags = document.getElementById('stat-tags');
    if (statPosts) statPosts.textContent = posts.length;
    if (statTags) statTags.textContent = allTags.length;

    document.title = `${meta ? meta.title : id} — ~/λ`;

  } catch(e) {
    showErr(`Failed to load writeup: <code>${e.message}</code>`);
  }
}

function populateHeader(meta, allPosts) {
  document.getElementById('post-title').textContent = meta.title;
  const thumbWrap = document.getElementById('post-thumb-wrap');
  const thumbImg  = document.getElementById('post-thumb-img');
  if (thumbWrap && thumbImg && meta.thumbnail) {
  thumbImg.src = meta.thumbnail;
  thumbImg.alt = meta.title;
  thumbWrap.style.display = 'block';
}
  document.getElementById('bc-cat').textContent     = meta.category;
  document.getElementById('bc-title').textContent   = meta.title.split('—')[0].trim();
  document.getElementById('post-date').textContent  = meta.date;

  const catEl = document.getElementById('post-cat');
  catEl.textContent = meta.category;
  catEl.className   = `pc-cat ${meta.catClass}`;

  document.getElementById('post-tags').innerHTML = meta.tags
    .map(t => `<span class="ptag">${t}</span>`).join('');

  /* chall box */
  if (meta.challenge) {
    const ch = meta.challenge;
    document.getElementById('chal-box').style.display = '';

    const diffClass = ({
      hard:   'diff-hard',
      medium: 'diff-med',
      med:    'diff-med',
      easy:   'diff-easy',
    })[(ch.difficulty || '').toLowerCase()] || '';

    const fields = [
      ['Challenge',  ch.name       || meta.title.split('—')[0].trim()],
      ['Category',   meta.category],
      ['Difficulty', ch.difficulty || '—'],
      ['Points',     ch.points     || '—'],
      ['Solves',     ch.solves     || '—'],
      ['Tools',      ch.tools      || '—'],
    ];

    document.getElementById('chal-grid').innerHTML = fields.map(([l, v]) => `
      <div class="chal-cell">
        <div class="cc-label">${l}</div>
        <div class="cc-val ${l === 'Difficulty' ? diffClass : ''}">${v}</div>
      </div>
    `).join('');
  }

  /* prev_/_next */
  const idx = allPosts.findIndex(p => p.id === meta.id);
  let nav = '';
  if (idx > 0) {
    const prev = allPosts[idx - 1];
    nav += `<a href="post.html?file=${prev.id}" class="pn-card">
              <div class="pn-dir">← Previous</div>
              <div class="pn-title">${prev.title}</div>
            </a>`;
  } else { nav += `<div></div>`; }

  if (idx < allPosts.length - 1) {
    const next = allPosts[idx + 1];
    nav += `<a href="post.html?file=${next.id}" class="pn-card pn-right">
              <div class="pn-dir">Next →</div>
              <div class="pn-title">${next.title}</div>
            </a>`;
  }
  document.getElementById('post-nav').innerHTML = nav;
}

function showErr(msg) {
  document.getElementById('article').innerHTML =
    `<p style="color:var(--text-lo);font-size:.77rem;line-height:1.8;">${msg}</p>`;
  document.getElementById('post-title').textContent = 'Error';
}
