// src/components/ResumeGenerator/fetchGithubData.js
export async function fetchGithubData(username) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
  );

  if (!res.ok) {
    throw new Error("GitHub user not found or API limit reached");
  }

  const repos = await res.json();

  if (!Array.isArray(repos)) {
    throw new Error(repos.message || "GitHub user not found");
  }

  const techStackSet = new Set();
  const repoList = [];

  for (const repo of repos) {
    if (repo.fork || !repo.name) continue;

    // Detect primary language
    if (repo.language) techStackSet.add(repo.language);

    // Fetch languages used in the repo
    const langRes = await fetch(repo.languages_url);
    if (langRes.ok) {
      const langData = await langRes.json();
      Object.keys(langData).forEach((lang) => techStackSet.add(lang));
    }

    // Add repo to list
    repoList.push({
      name: repo.name,
      description: repo.description || "No description provided.",
      stars: repo.stargazers_count,
      url: repo.html_url,
    });
  }

  return {
    repos: repoList.slice(0, 10), // 10 most recent repos
    skills: Array.from(techStackSet),
  };
}
