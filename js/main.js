document.addEventListener("DOMContentLoaded", () => {
  // === ICON POP ANIMATION ===
  const icons = document.querySelectorAll('.icon-btn');
  icons.forEach((icon, i) => {
    setTimeout(() => {
      icon.classList.add('pop');
    }, 100 * i);
  });

  // === GITHUB PROJECT LOADER ===
  const githubContainer = document.getElementById('github-projects');

  fetch('https://api.github.com/users/downbad-hu/repos?sort=updated')
    .then(res => {
      if (!res.ok) throw new Error("GitHub API fetch failed");
      return res.json();
    })
    .then(repos => {
      const visibleRepos = repos
        .filter(repo => !repo.fork && !repo.private)
        .slice(0, 6);

      if (visibleRepos.length === 0) {
        githubContainer.innerHTML = '<p>No repositories found.</p>';
        return;
      }

      githubContainer.innerHTML = ''; // Clear loading message

      visibleRepos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || 'No description provided.'}</p>
          <a href="${repo.html_url}" target="_blank" class="github-btn">View on GitHub</a>
        `;
        githubContainer.appendChild(card);
      });
    })
    .catch(error => {
      githubContainer.innerHTML = `<p style="color:red;">Error loading GitHub projects.</p>`;
      console.error('[GitHub API Error]', error);
    });
});
