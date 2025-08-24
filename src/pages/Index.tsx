
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
import { useDailyCounter } from '@/hooks/useDailyCounter';

const Index = () => {
  const { currentValue: clientSatisfaction, isAnimating } = useDailyCounter({
    baseValue: 95,
    storageKey: 'clientSatisfaction',
    minIncrement: 0,
    maxIncrement: 5
  });

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
      
      {/* Value Proposition Section */}
      <section className="h-screen bg-black flex items-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2 
                className="text-4xl sm:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Why Choose Reforzo?
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                We don't just consult – we transform. Our innovative metrics-driven approach helps businesses achieve measurable operational excellence through the perfect integration of people, processes, and technology.
              </motion.p>
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white">Proven methodology with measurable results</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white">Tailored solutions for SMEs and corporations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white">Expert team with industry experience</span>
                </div>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className={`text-3xl font-bold text-white mb-2 ${isAnimating ? 'animate-pulse' : ''}`}>{clientSatisfaction}%</div>
                <div className="text-gray-300 text-sm">Client Satisfaction</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-3xl font-bold text-white mb-2">40%</div>
                <div className="text-gray-300 text-sm">Average Efficiency Gain</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-300 text-sm">Businesses Transformed</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-300 text-sm">Support Available</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
    </PageLayout>
  );
};

export default Index;
