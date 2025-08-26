// SEO optimization utilities

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  // Preload Google Fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
  fontLink.as = 'style';
  fontLink.onload = () => {
    fontLink.rel = 'stylesheet';
  };
  document.head.appendChild(fontLink);

  // Preload hero video if it exists
  const heroVideo = document.querySelector('video[data-hero]') as HTMLVideoElement;
  if (heroVideo && heroVideo.src) {
    const videoLink = document.createElement('link');
    videoLink.rel = 'preload';
    videoLink.href = heroVideo.src;
    videoLink.as = 'video';
    document.head.appendChild(videoLink);
  }
}

/**
 * Add structured data for SEO
 */
export function addStructuredData(data: any) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Organization structured data
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Reforzo",
  "description": "Strategic consulting solutions that drive measurable operational excellence",
  "url": "https://reforzo.com",
  "logo": "https://reforzo.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://www.linkedin.com/company/reforzo",
    "https://twitter.com/reforzo"
  ]
};

/**
 * Service structured data
 */
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Business Consulting Services",
  "description": "Comprehensive business analysis and strategic planning to optimize operations",
  "provider": {
    "@type": "Organization",
    "name": "Reforzo"
  },
  "serviceType": "Business Consulting",
  "areaServed": "Worldwide"
};