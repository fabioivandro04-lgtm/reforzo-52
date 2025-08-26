import { useEffect } from 'react';

/**
 * Hook to monitor Core Web Vitals and performance metrics
 */
export function usePerformanceMonitor() {
  useEffect(() => {
    // Only run performance monitoring in production
    if (process.env.NODE_ENV !== 'production') return;

    // Monitor First Contentful Paint (FCP)
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          if (entry.startTime > 2500) {
            console.warn('FCP is slower than recommended:', entry.startTime);
          }
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // Browser doesn't support Performance Observer
    }

    // Monitor Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry && lastEntry.startTime > 2500) {
        console.warn('LCP is slower than recommended:', lastEntry.startTime);
      }
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Browser doesn't support LCP
    }

    // Monitor Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as any;
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value;
        }
      }
      
      if (clsValue > 0.1) {
        console.warn('CLS is higher than recommended:', clsValue);
      }
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Browser doesn't support CLS
    }

    // Cleanup observers
    return () => {
      observer.disconnect();
      lcpObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);
}

/**
 * Hook to monitor bundle size and loading performance
 */
export function useBundleMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    // Monitor resource loading
    const checkResourceSizes = () => {
      const resources = performance.getEntriesByType('resource');
      
      resources.forEach((resource) => {
        const resourceEntry = resource as any;
        if (resource.name.includes('.js') && resourceEntry.transferSize > 500000) {
          console.warn('Large JS bundle detected:', resource.name, resourceEntry.transferSize);
        }
        if (resource.name.includes('.css') && resourceEntry.transferSize > 100000) {
          console.warn('Large CSS bundle detected:', resource.name, resourceEntry.transferSize);
        }
      });
    };

    // Check after page load
    setTimeout(checkResourceSizes, 2000);
  }, []);
}