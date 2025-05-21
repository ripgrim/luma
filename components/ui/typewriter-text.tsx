'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type TypewriterTextProps = {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
};

export function TypewriterText({
  text,
  className,
  speed = 40,
  delay = 0,
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setStarted(false);
  }, [text]);

  useEffect(() => {
    if (delay > 0 && !started) {
      const startTimer = setTimeout(() => {
        setStarted(true);
      }, delay);
      
      return () => clearTimeout(startTimer);
    } else {
      setStarted(true);
    }
  }, [delay, started]);

  useEffect(() => {
    if (!started || currentIndex >= text.length) return;
    
    const timer = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setDisplayedText(text.substring(0, currentIndex + 1));
      
      if (currentIndex + 1 >= text.length && onComplete) {
        onComplete();
      }
    }, speed);
    
    return () => clearTimeout(timer);
  }, [currentIndex, onComplete, speed, started, text]);

  return (
    <motion.div
      className={cn('font-medium', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block ml-0.5 -translate-y-px"
        >
          _
        </motion.span>
      )}
    </motion.div>
  );
} 