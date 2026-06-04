/* =============================================
   ~/λ — main.js
   ============================================= */

/* -- Sidebar (mobile) -- */
function toggleSB() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}
function closeSB() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSB(); });

/* -- Copy code button -- */
function copyCode(btn) {
  const wrap = btn.closest('.code-wrap');
  const code = wrap.querySelector('pre code') || wrap.querySelector('pre');
  navigator.clipboard.writeText(code.innerText).then(() => {
    btn.textContent = 'copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'copy'; btn.classList.remove('copied'); }, 1800);
  });
}

/* -- Active nav link -- */
(function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* -- Wrap code blocks with header + copy btn (used in post.html) -- */
function wrapCodeBlocks(articleEl) {
  articleEl.querySelectorAll('pre').forEach(pre => {
    if (pre.closest('.code-wrap')) return;
    const code = pre.querySelector('code');
    let lang = 'code';
    if (code) {
      const cls = [...code.classList].find(c => c.startsWith('language-'));
      if (cls) lang = cls.replace('language-', '');
    }
    const wrap = document.createElement('div');
    wrap.className = 'code-wrap';
    wrap.innerHTML =
      `<div class="code-hdr">` +
        `<span class="code-lang">${lang}</span>` +
        `<button class="copy-btn" onclick="copyCode(this)">copy</button>` +
      `</div>`;
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);
  });
}

/* -- Build TOC from article headings + scroll-spy -- */
function buildTOC(articleEl, tocListEl) {
  const headings = articleEl.querySelectorAll('h2, h3');
  tocListEl.innerHTML = '';

  if (headings.length === 0) {
    tocListEl.closest('.toc-bar').style.display = 'none';
    return;
  }

  headings.forEach((h, i) => {
    const id = `h-${i}`;
    h.id = id;
    const li = document.createElement('li');
    li.className = `toc-item ${h.tagName === 'H3' ? 'h3' : ''}`;
    li.innerHTML = `<a href="#${id}">${h.textContent.replace(/^#+\s*/, '')}</a>`;
    tocListEl.appendChild(li);
  });

  /* Scroll-spy */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        tocListEl.querySelectorAll('.toc-item').forEach(i => i.classList.remove('active'));
        const match = tocListEl.querySelector(`a[href="#${e.target.id}"]`);
        if (match) match.closest('.toc-item').classList.add('active');
      }
    });
  }, { rootMargin: '-55px 0px -80% 0px' });

  headings.forEach(h => observer.observe(h));
}

/* -- Convert "> FLAG: ..." blockquotes into styled flag boxes -- */
function convertFlagBlocks(articleEl) {
  articleEl.querySelectorAll('blockquote').forEach(bq => {
    const raw = bq.textContent.trim();
    if (/^FLAG:/i.test(raw)) {
      const flagVal = raw.replace(/^FLAG:\s*/i, '').trim();
      const box = document.createElement('div');
      box.className = 'flag-box';
      box.innerHTML =
        `<div class="flag-hdr">▶ flag captured</div>` +
        `<div class="flag-body">${flagVal}</div>`;
      bq.parentNode.replaceChild(box, bq);
    }
  });
}
