// src/components/ResumeGenerator/RepoSelector.jsx
import "./RepoSelector.css";
function RepoSelector({ repos, selectedRepos, setSelectedRepos }) {
  if (!repos.length) return null;

  const handleChange = (repo) => {
    if (selectedRepos.some((r) => r.name === repo.name)) {
      setSelectedRepos(selectedRepos.filter((r) => r.name !== repo.name));
    } else {
      setSelectedRepos([...selectedRepos, repo]);
    }
  };

  return (
    <div className="">
      <div className="repo-selector">
        <h4>📌 Select Repositories to Showcase</h4>
        <div className="repos-list">
          {repos.length === 0 && <p>No repositories found.</p>}

          <ul className="repo-items">
            {repos.map((repo) => (
              <li key={repo.name} className="repo-item">
                <span>
                  {" "}
                  <input
                    type="checkbox"
                    checked={selectedRepos.some((r) => r.name === repo.name)}
                    onChange={() => handleChange(repo)}
                  />
                </span>
                <span>
                  {" "}
                  <label>{repo.name}</label>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RepoSelector;
