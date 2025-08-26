import { useState, useEffect } from 'react';

interface UseDailyCounterProps {
  baseValue: number;
  storageKey: string;
  minIncrement?: number;
  maxIncrement?: number;
}

export const useDailyCounter = ({ 
  baseValue, 
  storageKey, 
  minIncrement = 0, 
  maxIncrement = 5 
}: UseDailyCounterProps) => {
  const [currentValue, setCurrentValue] = useState(baseValue);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem(storageKey);
    
    if (stored) {
      const data = JSON.parse(stored);
      
      if (data.lastUpdate === today) {
        // Same day, use stored value
        setCurrentValue(data.value);
      } else {
        // New day, add random increment
        const randomIncrement = Math.floor(Math.random() * (maxIncrement - minIncrement + 1)) + minIncrement;
        const newValue = data.value + randomIncrement;
        
        setIsAnimating(true);
        
        // Animate the counter
        let start = data.value;
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(start + (newValue - start) * easeOut);
          
          setCurrentValue(current);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setIsAnimating(false);
            // Store the new value
            localStorage.setItem(storageKey, JSON.stringify({
              value: newValue,
              lastUpdate: today
            }));
          }
        };
        
        requestAnimationFrame(animate);
      }
    } else {
      // First time, store base value
      localStorage.setItem(storageKey, JSON.stringify({
        value: baseValue,
        lastUpdate: today
      }));
      setCurrentValue(baseValue);
    }
  }, [baseValue, storageKey, minIncrement, maxIncrement]);

  return { currentValue, isAnimating };
};