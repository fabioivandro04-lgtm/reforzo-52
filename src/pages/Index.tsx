
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import Features from '@/components/Features';
import Projects from '@/components/Projects';
import WhyWrlds from '@/components/WhyWrlds';
import BlogPreview from '@/components/BlogPreview';
import SEO from '@/components/SEO';
import { useEffect } from 'react';

const Index = () => {
  // Fix any ID conflicts when the page loads
  useEffect(() => {
    const contactElements = document.querySelectorAll('[id="contact"]');
    if (contactElements.length > 1) {
      // If there are multiple elements with id="contact", rename one
      contactElements[1].id = 'contact-footer';
    }
  }, []);

  return (
    <PageLayout showContact={false}>
      <SEO 
        title="Reforzo - Reinforce your business" 
        description="Use innovative metrics to evolve and modernize your business. Reforzo helps SMEs and corporations achieve measurable operational excellence through integrated people, processes, and technology."
        imageUrl="/lovable-uploads/526dc38a-25fa-40d4-b520-425b23ae0464.png"
        keywords={['business consulting', 'operational efficiency', 'productivity optimization', 'process improvement', 'performance growth', 'SME consulting']}
      />
      <Hero />
      
    </PageLayout>
  );
};

export default Index;
