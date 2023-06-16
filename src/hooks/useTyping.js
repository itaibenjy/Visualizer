import {useState, useEffect} from 'react';

/**
 * A custom hook that simulates typing of a given text.
 * @param {string} text - The text to be typed.
 * @returns {string} - The current state of the typing simulation.
 */
export function useTyping(text) {

  // symulate Ai typing with string passed in just useTyping(string) instead of passing string as state
  const [typingState, setTypingState] = useState('');

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      setTypingState((prevState) => {
        if (currentIndex >= text.length) {
          clearInterval(typingInterval);
          return prevState;
        }

        currentIndex++;
        return text.substring(0, currentIndex);
      });
    }, 60);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text]);

  return typingState;
}
