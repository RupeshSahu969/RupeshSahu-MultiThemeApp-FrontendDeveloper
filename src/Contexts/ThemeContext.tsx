import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define theme types
export type ThemeName = 'theme1' | 'theme2' | 'theme3';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (themeName: ThemeName) => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme from localStorage, default to 'theme1' [cite: 10, 27]
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const storedTheme = localStorage.getItem('appTheme');
    return (storedTheme as ThemeName) || 'theme1';
  });

  // Apply theme classes to the body or root element
  useEffect(() => {
    document.documentElement.className = ''; // Clear existing classes
    document.documentElement.classList.add(theme); // Add the current theme class
    localStorage.setItem('appTheme', theme); // Persist theme [cite: 27]
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

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};