let ARTS = [];

document.addEventListener('DOMContentLoaded', async () => {
  const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  try {
    ARTS = await fetch('arts.json').then(r => r.json());
    const grid = document.getElementById('art-grid');
    grid.innerHTML = ARTS.map((a, i) => `
      <div class="art-thumb xp-win" onclick="openArtModal(${i})">
        <div class="xp-titlebar">
          <span class="xp-title"><span class="xp-icon">🖼</span> ${esc(a.title)}.png</span>
          <span class="xp-btns">
            <span class="xp-btn">–</span>
            <span class="xp-btn">□</span>
            <span class="xp-btn xp-close">✕</span>
          </span>
        </div>
        <div class="xp-body"><img src="${esc(a.image)}" alt="${esc(a.title)}" loading="lazy"></div>
        <div class="xp-statusbar">${esc(a.artist || 'Unknown')} · ${esc(a.date || '')}</div>
      </div>`).join('') || `<p style="color:var(--text-lo);font-size:.74rem;">No pieces yet.</p>`;
  } catch (e) {
    document.getElementById('art-grid').innerHTML =
      `<p style="color:var(--text-lo);font-size:.74rem;">Could not load gallery.</p>`;
  }

  document.getElementById('art-modal').addEventListener('click', e => {
    if (e.target.id === 'art-modal') closeArtModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeArtModal(); });
});

function openArtModal(i) {
  const a = ARTS[i];
  document.getElementById('am-img').src         = a.image;
  document.getElementById('am-img').alt         = a.title;
  document.getElementById('am-winlabel').textContent = `${a.title}.png - Image Viewer`;
  document.getElementById('am-title').textContent    = a.title;
  document.getElementById('am-artist').textContent   = a.artist ? `by ${a.artist}` : '';
  document.getElementById('am-desc').textContent     = a.description || '';
  document.getElementById('am-date').textContent     = a.date || '';
  document.getElementById('art-modal').classList.add('open');
}
function closeArtModal() {
  document.getElementById('art-modal').classList.remove('open');
}
