import supabase from "../services/supabase";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AppContext";
import { LineChart } from "@mui/x-charts/LineChart";
import Loader from "./Loader";

import "./Skill.css";
import { useCareerAdvice } from "../utils/useCareerAdvice";

function Skill() {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: ["user_skills", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_skills")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: skills, isPending, error } = query;

  const skillData = skills
    ? skills.reduce((acc, curr) => {
        const name = curr.skill_name;
        const found = acc.find((s) => s.name === name);
        if (found) found.count++;
        else acc.push({ name, count: 1 });
        return acc;
      }, [])
    : [];

  const { data: insights, isLoading: insightsLoading } =
    useCareerAdvice(skillData);
  const xLabels = skillData.map((s) => s.name);
  const yValues = skillData.map((s) => s.count);

  const skillMeta = {
    HTML: {
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    CSS: {
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    JavaScript: {
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    React: {
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    Node: {
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    Python: {
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    Supabase: {
      category: "Backend",
      icon: "https://supabase.com/docs/images/supabase-logo-icon.svg",
    },
    PostgreSQL: {
      category: "Database",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    Docker: {
      category: "DevOps",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    GitHubActions: {
      category: "DevOps",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    Git: {
      category: "Version Control",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    TypeScript: {
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    NextJS: {
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    Vue: {
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    },
    Angular: {
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    },
    GraphQL: {
      category: "API",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    },
    AWS: {
      category: "Cloud",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    },
    Azure: {
      category: "Cloud",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    },
    Firebase: {
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    },
    MongoDB: {
      category: "Database",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    Kubernetes: {
      category: "DevOps",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    },
    Redis: {
      category: "Database",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    },
    TailwindCSS: {
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    },
    Bootstrap: {
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    },
    MaterialUI: {
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    },
    jQuery: {
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
    },
    Sass: {
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    },
    PHP: {
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    },
    Ruby: {
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
    },
    Java: {
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    CSharp: {
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    },
    Go: {
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    },
    Swift: {
      category: "Mobile",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    },
    Kotlin: {
      category: "Mobile",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    },
    Flutter: {
      category: "Mobile",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    },
    Android: {
      category: "Mobile",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    },
    iOS: {
      category: "Mobile",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
    },
    SQL: {
      category: "Database",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    NoSQL: {
      category: "Database",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nosql/nosql-original.svg",
    },
    WebAssembly: {
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webassembly/webassembly-original.svg",
    },
    Webpack: {
      category: "Build Tools",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
    },
    Babel: {
      category: "Build Tools",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg",
    },
    ESLint: {
      category: "Linting",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg",
    },
    Prettier: {
      category: "Formatting",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prettier/prettier-original.svg",
    },
    Cypress: {
      category: "Testing",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypress/cypress-original.svg",
    },
    Jest: {
      category: "Testing",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
    },
    Mocha: {
      category: "Testing",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-original.svg",
    },
  };

  if (isPending) return <Loader />;
  if (error) return <p>Error loading skills: {error.message}</p>;

  return (
    <div>
      {status === "initial" ? (
        <Loader />
      ) : (
        <div>
          {" "}
          <h3 style={{ fontSize: "2.2rem" }}>Skill Management</h3>
          <div className="skill-intro">
            <p>Manage your skills and expertise here.</p>
            {skills?.length === 0 && (
              <p>No repositories analyzed yet. Start by syncing your GitHub!</p>
            )}
          </div>
          <div className="all-skills">
            <div className="skill-list">
              {skills.map((skill) => {
                const meta = skillMeta[skill.skill_name] || {};
                return (
                  <div key={skill.id} className="skill-card">
                    <div className="skill-header">
                      {meta.icon && (
                        <img
                          src={meta.icon}
                          alt={skill.skill_name}
                          className="skill-icon"
                        />
                      )}
                      <div>
                        <div className="skill-name">
                          {skill.skill_name || "🧠 Unknown Skill"}
                        </div>
                        <div className="skill-tag">
                          {meta.category || "Other"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="skill-chart">
              {" "}
              <div className="chart-pie">
                <LineChart
                  xAxis={[{ scaleType: "point", data: xLabels }]}
                  series={[
                    {
                      data: yValues,
                      showMark: ({ index }) => index % 2 === 0,
                      color: "#1976d2", // optional: blue MUI primary
                    },
                  ]}
                  height={300}
                />
              </div>
              {insightsLoading ? (
                <div className="spinner-container">
                  <div className="spinner"></div>
                  <p>Getting you some advice...</p>
                </div>
              ) : insights ? (
                <div className="ai-insight-json">
                  <h2>Recommendations for you</h2>
                  <h3>🔍 Strengths</h3>
                  <ul>
                    {insights.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                  <h3>🚀 Recommended Skills</h3>
                  <ul>
                    {insights.recommendations.map((r, i) => (
                      <li key={i}>
                        <strong>{r.name}:</strong> {r.reason}
                      </li>
                    ))}
                  </ul>
                  <h3>💡 Project Ideas</h3>
                  <ul>
                    {insights.projectIdeas.map((idea, i) => (
                      <li key={i}>{idea}</li>
                    ))}
                  </ul>
                  <h3>🎯 Career Advice</h3>
                  <p style={{ marginLeft: "2.2rem" }}>
                    {insights.careerAdvice}
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    No insights available yet. Analyze your GitHub repos to get
                    recommendations!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Skill;
