import {useState, useEffect} from 'react';


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
    }, 80);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text]);

  return typingState;
}

