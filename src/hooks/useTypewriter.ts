import { useState, useEffect } from 'react';

export const useTypewriter = (text: string, speed: number = 100) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0); 
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
    setIsFinished(false);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      setIsFinished(false);
      
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1); 
      }, speed);

      return () => clearTimeout(timeoutId);
    } else {
      setIsFinished(true);
    }
  }, [index, text, speed]); 

  return { displayedText, isFinished };
};