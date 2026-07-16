const PLATFORM_ICONS = {
  spotify: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.4a.6.6 0 01-.83.2c-2.27-1.39-5.13-1.7-8.5-.93a.6.6 0 11-.27-1.17c3.68-.84 6.84-.48 9.4 1.07a.6.6 0 01.2.83zm1.22-2.72a.75.75 0 01-1.03.25c-2.6-1.6-6.56-2.06-9.64-1.13a.75.75 0 11-.43-1.44c3.52-1.06 7.9-.55 10.85 1.29a.75.75 0 01.25 1.03zm.1-2.83C14.98 9.1 9.9 8.92 6.9 9.84a.9.9 0 11-.53-1.72c3.44-1.05 9.1-.85 12.7 1.31a.9.9 0 11-.93 1.54z"/></svg>`,
  soundcloud: `<svg viewBox="0 0 24 24"><path d="M9.5 8.5v7h9.2a2.65 2.65 0 000-5.3 3.5 3.5 0 00-6.55-1.9 3 3 0 00-2.65.2zM8.5 9.2v6.3h-.7V9.4l.7-.2zM7 9.6v5.9h-.6V9.9l.6-.3zM5.6 10v5.5H5V10.3l.6-.3z"/></svg>`,
  ytmusic: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 16.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13zM10 8.5l6 3.5-6 3.5v-7z"/></svg>`,
};
const PLATFORM_LABEL = { spotify: 'Spotify', soundcloud: 'SoundCloud', ytmusic: 'YouTube Music' };

document.addEventListener('DOMContentLoaded', async () => {
  const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const rail = document.getElementById('timeline-rail');
  try {
    let tracks = await fetch('discography.json').then(r => r.json());
    tracks = tracks.sort((a, b) => new Date(b.date) - new Date(a.date));

    rail.innerHTML = tracks.map((t, i) => {
      const dir = i % 2 === 0 ? 'up' : 'down';
      const card = `
        <div class="t-card">
          <img class="t-cover" src="${esc(t.cover)}" alt="${esc(t.title)}" loading="lazy">
          <div class="t-body" style="background-image:url('${esc(t.infoBg || t.cover)}');">
            <div class="t-title">${esc(t.title)}</div>
            <div class="t-meta">${esc(t.genre)} ♫ ${esc(t.date)}</div>
            <div class="t-desc">${esc(t.description)}</div>
            <div class="t-platforms">
              ${(t.links || []).map((l, li) => `
                <button type="button" class="t-plat-btn" data-embed="${esc(l.embed || '')}" data-idx="${i}-${li}" title="${PLATFORM_LABEL[l.platform] || l.platform}">
                  ${PLATFORM_ICONS[l.platform] || ''}
                </button>`).join('')}
            </div>
            <div class="t-embed-slot" data-slot="${i}"></div>
          </div>
        </div>`;
      const label = `<div class="t-node-label">${esc(t.date)}</div>`;

      return `
        <div class="t-node ${dir}">
          <div class="t-slot t-slot-top">${dir === 'up' ? card : ''}</div>
          <div class="t-dot"></div>
          <div class="t-slot t-slot-bottom">${dir === 'up' ? '' : card}</div>
        </div>`;
    }).join('') || `<p style="color:var(--text-lo);font-size:.74rem;padding:0 1.5rem;">No tracks yet.</p>`;

    // highlight
    const nodes = [...rail.querySelectorAll('.t-node')];
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => e.target.classList.toggle('active', e.isIntersecting));
    }, { root: rail, threshold: 0.6 });
    nodes.forEach(n => io.observe(n));

    rail.querySelectorAll('.t-plat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const trackIdx = btn.dataset.idx.split('-')[0];
        const slot = rail.querySelector(`.t-embed-slot[data-slot="${trackIdx}"]`);
        const embedUrl = btn.dataset.embed;
        const alreadyOpenForThisBtn = btn.classList.contains('active');

        slot.parentElement.querySelectorAll('.t-plat-btn').forEach(b => b.classList.remove('active'));
        slot.innerHTML = '';

        if (alreadyOpenForThisBtn || !embedUrl) return;

        btn.classList.add('active');
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.loading = 'lazy';
        iframe.allow = 'autoplay; encrypted-media; clipboard-write; picture-in-picture';
        iframe.style.cssText = 'width:100%;border:0;';
        slot.appendChild(iframe);
      });
    });
  } catch (e) {
    rail.innerHTML = `<p style="color:var(--text-lo);font-size:.74rem;padding:0 1.5rem;">Could not load discography.</p>`;
  }
});
