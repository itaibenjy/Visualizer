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


  useEffect(() => {
    const savedTheme = document.cookie.split('; ').find(row => row.startsWith('theme=')).split('=')[1];
    console.log(savedTheme)
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  function updateTheme(th) {
    setTheme(th);
    document.cookie = `theme=${th}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
