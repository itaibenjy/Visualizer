import React, { useState, useEffect, createContext } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    var linkElement = document.getElementById('mdb-stylesheet');

      if (theme === 'light') {
        linkElement.href = "./mdb.min.css";
      } 
      if (theme === 'dark') {
        linkElement.href = "./mdb.dark.min.css";
      }

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
