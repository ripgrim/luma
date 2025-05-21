'use client';
import { type JSX } from 'react';
import { motion, Transition } from 'framer-motion';
import { cn } from '@/lib/utils';

type TextShimmerProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
  transition?: Transition;
};

export function TextShimmer({
  children,
  as: Component = 'p',
  className,
  duration = 1,
  spread = 1,
  transition,
}: TextShimmerProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements
  );

  return (
    <MotionComponent
      className={cn(
        'relative inline-block',
        '[--base-color:#a1a1aa] [--highlight-color:#D8C8FC]',
        'dark:[--base-color:#71717a] dark:[--highlight-color:#D8C8FC]',
        className
      )}
      style={{ color: 'var(--base-color)' }}
    >
      {children.split('').map((char, i) => {
        const delay = (i * duration * (1 / spread)) / children.length;

        return (
          <motion.span
            key={i}
            className={cn(
              'inline-block whitespace-pre'
            )}
            initial={{
              color: 'var(--base-color)',
            }}
            animate={{
              color: [
                'var(--base-color)',
                'var(--highlight-color)',
                'var(--base-color)',
              ],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatDelay: (children.length * 0.05) / spread,
              delay,
              ease: 'easeInOut',
              ...transition,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
} 