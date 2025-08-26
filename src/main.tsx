
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx'
import './index.css'
import { preloadCriticalResources, addStructuredData, organizationSchema } from './lib/seo.ts';

// Initialize performance optimizations
if (typeof window !== 'undefined') {
  // Preload critical resources
  preloadCriticalResources();
  
  // Add structured data for SEO
  addStructuredData(organizationSchema);
  
  // Clean console in production
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
