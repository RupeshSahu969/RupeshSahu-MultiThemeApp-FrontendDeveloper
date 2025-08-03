import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export type ThemeName = 'theme1' | 'theme2' | 'theme3';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (themeName: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const storedTheme = localStorage.getItem('appTheme');
    return (storedTheme as ThemeName) || 'theme1';
  });
  useEffect(() => {
    document.documentElement.className = ''; 
    document.documentElement.classList.add(theme);
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};