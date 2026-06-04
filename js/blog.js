document.addEventListener("DOMContentLoaded", initBlog);

async function initBlog() {
  try {
    // fetch_posts_data
    const res = await fetch('posts.json');
    if (!res.ok) throw new Error("Failed to fetch posts");
    const posts = await res.json();

    // upd_sidebar_stats
    const statPosts = document.getElementById('stat-posts');
    if (statPosts) statPosts.textContent = posts.length;

    // get_all_unique_tags
    const allTags = [...new Set(posts.flatMap(p => p.tags))];
    const statTags = document.getElementById('stat-tags');
    if (statTags) statTags.textContent = allTags.length;

    // main_post_renderer
    renderPostList(posts);

    // right_sidebar_renderer
    renderRightSidebar(posts, allTags);

  } catch (error) {
    console.error("Error loading blog posts:", error);
    document.getElementById('post-list').innerHTML = 
      `<p style="color:var(--text-lo);font-size:.75rem;">Failed to load posts. Check console.</p>`;
  }
}

function renderPostList(posts) {
  const listContainer = document.getElementById('post-list');
  
  if (!posts || posts.length === 0) {
    listContainer.innerHTML = `<p style="color:var(--text-lo);font-size:.75rem;">No posts found.</p>`;
    return;
  }

  // replace_skeleton_with_real_posts
  listContainer.innerHTML = posts.map(p => `
    <a href="post.html?file=${p.id}" class="post-card">
      <div class="pc-meta">
        <span class="pc-date">${p.date}</span>
        <span class="pc-cat ${p.catClass || ''}">${p.category}</span>
      </div>
      <div class="pc-title">${p.title}</div>
      <div class="pc-excerpt">${p.excerpt || ''}</div>
      <div class="pc-tags">
        ${p.tags.map(t => `<span class="ptag">${t}</span>`).join('')}
      </div>
    </a>
  `).join('');
}

function renderRightSidebar(posts, tags) {
  // left_recently_updated_sidebar
  const recentContainer = document.getElementById('rb-recent');
  if (recentContainer) {
    recentContainer.innerHTML = posts.slice(0, 3).map(p => `
      <a href="post.html?file=${p.id}" class="rb-post">
        <div class="rb-post-t">${p.title}</div>
        <div class="rb-post-d">${p.date}</div>
      </a>
    `).join('');
  }

  // left_trending_tags_sidebar
  const tagsContainer = document.getElementById('rb-tags');
  if (tagsContainer) {
    tagsContainer.innerHTML = tags.map(t => `
      <span class="tcloud">${t}</span>
    `).join('');
  }
}
