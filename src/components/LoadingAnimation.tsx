
import React from 'react';
import { motion } from 'framer-motion';

export const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-16 h-4">
        {[0, 1, 2, 3].map((index) => (
          <motion.span
            key={index}
            className="absolute inline-block w-3 h-3 bg-primary rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 0.15,
              ease: "easeInOut"
            }}
            style={{
              left: `${index * 10}px`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingAnimation;
