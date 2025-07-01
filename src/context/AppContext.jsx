import { createContext, useContext, useEffect, useState } from "react";

const Application = createContext();

function AppContext({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-theme" : "light-theme";
  }, [isDarkMode]);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Application.Provider value={{ toggleTheme, isDarkMode }}>
      {children}
    </Application.Provider>
  );
}

export const useAuth = () => useContext(Application);

export default AppContext;
