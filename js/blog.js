
const PER_PAGE = 8;
let allPosts = [], filtered = [], currentPage = 1;

/* helpers */
function esc(s) {
  return String(s ?? '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* fetch + boot */
async function init() {
  try {
    allPosts = await fetch('posts.json').then(r => r.json());
    filtered = allPosts;

    const el = id => document.getElementById(id);
    if (el('stat-posts')) el('stat-posts').textContent = allPosts.length;

    fetch('projects.json')
      .then(r => r.json())
      .then(projects => { if (el('stat-projects')) el('stat-projects').textContent = projects.length; })
      .catch(() => {});

    const uniqTags = [...new Set(allPosts.flatMap(p => p.tags))];
    if (el('stat-tags')) el('stat-tags').textContent = uniqTags.length;

    renderPosts();
    renderRecent();
    renderTagCloud(uniqTags);
  } catch (e) {
    const list = document.getElementById('post-list');
    if (list) list.innerHTML = `
      <p style="color:var(--text-lo);font-size:.74rem;padding:1.5rem 0;line-height:1.9;">
        Could not load posts.<br>
      </p>`;
  }
}

/* render_post_cards */
function renderPosts() {
  const start = (currentPage - 1) * PER_PAGE;
  const page  = filtered.slice(start, start + PER_PAGE);
  const list  = document.getElementById('post-list');
  if (!list) return;

  list.innerHTML = page.map(p => {
    const thumbHtml = p.thumbnail
      ? `<div class="pc-thumb">
           <img src="${esc(p.thumbnail)}" alt="${esc(p.title)}" loading="lazy">
         </div>`
      : '';

    return `
      <a href="post.html?file=${encodeURIComponent(p.id)}" class="post-card">
        ${thumbHtml}
        <div class="pc-body">
          <div class="pc-meta">
            <span class="pc-date">${esc(p.date)}</span>
            <span class="pc-cat ${esc(p.catClass)}">${esc(p.category)}</span>
          </div>
          <div class="pc-title">${esc(p.title)}</div>
          <div class="pc-excerpt">${esc(p.excerpt)}</div>
          <div class="pc-tags">
            ${p.tags.map(t =>
              `<span class="ptag" data-tag="${esc(t)}">${esc(t)}</span>`
            ).join('')}
          </div>
        </div>
      </a>`;
  }).join('') || `<p style="color:var(--text-lo);font-size:.74rem;padding:1rem 0;">No posts found.</p>`;

  /* title glitch + tag click */
  list.querySelectorAll('.pc-title').forEach(attachGlitch);
  list.querySelectorAll('.ptag[data-tag]').forEach(el =>
    el.addEventListener('click', e => { e.preventDefault(); filterByTag(el.dataset.tag); })
  );

  renderPagination();
}

/* title_gl1tch_ascii_anim */
const GLITCH_POOL = '░▒▓│─╋+=-_.~*#:!?/\\^<>⠿⠾⠻⠷⠯⠟⣿λΛ';

function attachGlitch(el) {
  const original = el.textContent;
  let tid = null;

  el.addEventListener('mouseenter', () => {
    if (tid) return;
    let step = 0;
    const STEPS = 15;

    tid = setInterval(() => {
      step++;
      const resolved = Math.floor((step / STEPS) * original.length);
      el.textContent = [...original].map((c, i) => {
        if (c === ' ' || c === '\u2014' || c === '·') return c;
        if (i < resolved) return c;
        return GLITCH_POOL[~~(Math.random() * GLITCH_POOL.length)];
      }).join('');

      if (step >= STEPS) {
        clearInterval(tid);
        tid = null;
        el.textContent = original;
      }
    }, 69);
  });

  el.addEventListener('mouseleave', () => {
    if (tid) { clearInterval(tid); tid = null; }
    el.textContent = original;
  });
}

/* pagination */
function renderPagination() {
  const total = Math.ceil(filtered.length / PER_PAGE);
  const el    = document.getElementById('pagination');
  if (!el) return;
  if (total <= 1) { el.innerHTML = ''; return; }

  let h = currentPage > 1
    ? `<a class="pg-btn" onclick="goPage(${currentPage - 1})">←</a>` : '';
  for (let i = 1; i <= total; i++)
    h += `<a class="pg-btn ${i === currentPage ? 'cur' : ''}" onclick="goPage(${i})">${i}</a>`;
  if (currentPage < total)
    h += `<a class="pg-btn" onclick="goPage(${currentPage + 1})">→</a>`;
  el.innerHTML = h;
}

function goPage(n) {
  currentPage = n;
  renderPosts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* filters */
function filterByTag(tag) {
  filtered = allPosts.filter(p => p.tags.includes(tag));
  currentPage = 1;
  const hd = document.getElementById('sec-hd');
  if (hd) hd.textContent = `#${tag}`;
  const fb = document.getElementById('filter-bar');
  const fl = document.getElementById('filter-label');
  if (fb) fb.style.display = 'flex';
  if (fl) fl.textContent  = tag;
  renderPosts();
}

function clearFilter() {
  filtered = allPosts;
  currentPage = 1;
  const hd = document.getElementById('sec-hd');
  if (hd) hd.textContent = 'latest posts';
  const fb = document.getElementById('filter-bar');
  if (fb) fb.style.display = 'none';
  renderPosts();
}

/* right bar */
function renderRecent() {
  const el = document.getElementById('rb-recent');
  if (!el) return;
  el.innerHTML = allPosts.slice(0, 5).map(p => `
    <a href="post.html?file=${encodeURIComponent(p.id)}" class="rb-post">
      <div class="rb-post-t">${esc(p.title)}</div>
      <div class="rb-post-d">${esc(p.date)}</div>
    </a>`).join('');
}

function renderTagCloud(tags) {
  const el = document.getElementById('rb-tags');
  if (!el) return;
  el.innerHTML = tags.map(t =>
    `<span class="tcloud" onclick="filterByTag('${esc(t)}')">${esc(t)}</span>`
  ).join('');
}

/* boot */
document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();
