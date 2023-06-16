import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * A custom hook that provides access to the theme context.
 * @returns {Object} The theme context object.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
