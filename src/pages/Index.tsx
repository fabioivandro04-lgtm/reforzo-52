
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import Features from '@/components/Features';
import Projects from '@/components/Projects';
import WhyWrlds from '@/components/WhyWrlds';
import BlogPreview from '@/components/BlogPreview';
import SEO from '@/components/SEO';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

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
      <ScrollProgressBar />
      <SEO 
        title="Reforzo - Reinforce your business" 
        description="Use innovative metrics to evolve and modernize your business. Reforzo helps SMEs and corporations achieve measurable operational excellence through integrated people, processes, and technology."
        imageUrl="/lovable-uploads/526dc38a-25fa-40d4-b520-425b23ae0464.png"
        keywords={['business consulting', 'operational efficiency', 'productivity optimization', 'process improvement', 'performance growth', 'SME consulting']}
      />
      <Hero />
      
      {/* New Section */}
      <section className="h-screen bg-white flex items-center relative overflow-hidden">
        {/* Fade Effect Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/95 to-white"
          initial={{ opacity: 0.8 }}
          animate={{ 
            opacity: [0.8, 0.95, 0.8],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: [0.4, 0, 0.2, 1],
            repeatType: "reverse"
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Transform Your Business Today
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of businesses that have revolutionized their operations with our proven methodology and innovative approach.
            </p>
          </div>
        </div>
      </section>
      
    </PageLayout>
  );
};

export default Index;
