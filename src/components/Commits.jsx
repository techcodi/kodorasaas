import "./Spinner.css";

import "./Commits.css";

function Commits({ repoList, isLoading }) {
  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Fecthing repositories...</p>
        </div>
      ) : (
        <div className="repo-list">
          <div style={{ textAlign: "left" }}>
            <h3>Repositories</h3>
            <p>Here are the repositories analyzed from your GitHub account.</p>
          </div>
          {repoList.map((repo, index) => (
            <div className="repo-card" key={index}>
              <div className="repo-meta">
                <h4>{repo.name}</h4>
                <small>
                  {repo.description || "No description provided."}
                </small>{" "}
                <br />
                {repo.language && (
                  <span style={{ color: "#1e40af" }}>🛠 {repo.language}</span>
                )}
                {/* <span>
              🌐
              <a href={repo.url} target="_blank" rel="noopener noreferrer">
                View Repo
              </a>
            </span> */}
                <span>
                  <i class="fa-solid fa-star"></i> {repo.stars}
                </span>
              </div>

              <div className="">
                <small>⭐</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Commits;
