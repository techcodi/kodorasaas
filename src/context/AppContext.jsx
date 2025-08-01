import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";

const Application = createContext();

function AppContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark-theme)").matches
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

  // Auth
  useEffect(() => {
    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    initAuth();
    // supabase.auth.getSession().then(({ data }) => {
    //   setUser.data.session?.user || null;
    //   setIsLoading(false);
    // });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <Application.Provider
      value={{ toggleTheme, isDarkMode, user, loading, setUser }}
    >
      {children}
    </Application.Provider>
  );
}

export const useAuth = () => useContext(Application);

export default AppContext;
