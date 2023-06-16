import React, { useState, useEffect, createContext } from 'react';

/**
 * Context object that provides the current theme and a function to update it.
 * @typedef {Object} ThemeContext
 * @property {string} theme - The current theme ('light' or 'dark').
 * @property {function} updateTheme - A function to update the current theme.
 */

const ThemeContext = createContext();

/**
 * A provider component that manages the current theme and provides it to its children.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} - The rendered component.
 */
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  /**
   * A side effect that updates the stylesheet link element when the theme changes.
   */
  useEffect(() => {
    var linkElement = document.getElementById('mdb-stylesheet');

    if (theme === 'light') {
      linkElement.href = "./mdb.min.css";
    } 
    if (theme === 'dark') {
      linkElement.href = "./mdb.dark.min.css";
    }

  }, [theme]);

  /**
   * A side effect that loads the saved theme from cookies when the component mounts.
   */
  useEffect(() => {
    try{
      const savedTheme = document.cookie.split('; ').find(row => row.startsWith('theme=')).split('=')[1];
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  /**
   * A function that updates the current theme and saves it to cookies.
   * @param {string} th - The new theme ('light' or 'dark').
   */
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
