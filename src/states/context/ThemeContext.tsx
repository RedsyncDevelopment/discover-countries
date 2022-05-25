import React, { useState, FC } from "react";

interface IThemeContext {
  dark: boolean;
  toggleTheme?: () => void;
}

const defaultState = {
  dark: true,
};

export const ThemeContext = React.createContext<IThemeContext>(defaultState);

export const ThemeProvider: FC = ({ children }) => {
  const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    setDark((current) => !current);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
