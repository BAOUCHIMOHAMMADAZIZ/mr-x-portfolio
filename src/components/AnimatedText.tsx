'use client';

import { useState, useEffect } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export default function AnimatedText({
  text,
  className = '',
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseDuration = 1500,
}: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      // Typing animation
      if (displayText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      // Deleting animation
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deleteSpeed);
      } else {
        // Pause before typing again
        timeout = setTimeout(() => {
          setIsTyping(true);
        }, pauseDuration);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, text, typeSpeed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
