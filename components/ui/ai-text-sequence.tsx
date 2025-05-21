'use client';
import { useState, useEffect } from 'react';
import { TextShimmer } from './text-shimmer';
import { TypewriterText } from './typewriter-text';

type AITextSequenceProps = {
  finalText: string;
  thinkingText?: string;
  thinkingDuration?: number;
  className?: string;
  typingSpeed?: number;
};

export function AITextSequence({
  finalText,
  thinkingText = 'thinking...',
  thinkingDuration = 2000,
  className = '',
  typingSpeed = 40,
}: AITextSequenceProps) {
  const [isThinking, setIsThinking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsThinking(false);
    }, thinkingDuration);

    return () => clearTimeout(timer);
  }, [thinkingDuration]);

  return (
    <div className={className}>
      {isThinking ? (
        <TextShimmer className="text-sm leading-snug text-white">
          {thinkingText}
        </TextShimmer>
      ) : (
        <TypewriterText 
          text={finalText} 
          className="text-sm leading-snug text-white" 
          speed={typingSpeed}
        />
      )}
    </div>
  );
} 