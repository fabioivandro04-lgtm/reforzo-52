
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
  const { currentValue: businessesTransformed, isAnimating } = useDailyCounter({
    baseValue: 500,
    storageKey: 'businessesTransformed',
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
      
      {/* Professional Value Proposition Section */}
      <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-5xl sm:text-6xl font-light text-white mb-6 tracking-wide"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Excellence in Business
              <span className="block text-4xl sm:text-5xl font-normal text-gray-300 mt-2">
                Transformation
              </span>
            </motion.h2>
            <motion.div 
              className="w-24 h-px bg-white mx-auto mb-8"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.p 
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Reforzo delivers strategic consulting solutions that drive measurable operational excellence through innovative metrics and proven methodologies.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 transition-all duration-300">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Strategic Consulting</h3>
              <p className="text-gray-400 leading-relaxed">
                Comprehensive business analysis and strategic planning to optimize your operations
              </p>
            </motion.div>

            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 transition-all duration-300">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Process Innovation</h3>
              <p className="text-gray-400 leading-relaxed">
                Advanced process optimization and technology integration for maximum efficiency
              </p>
            </motion.div>

            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 transition-all duration-300">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Performance Analytics</h3>
              <p className="text-gray-400 leading-relaxed">
                Data-driven insights and metrics that enable continuous improvement and growth
              </p>
            </motion.div>
          </div>
          
          {/* Professional Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            <motion.div 
              className="bg-white/[0.02] border border-white/10 rounded-lg p-8 text-center backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl font-light text-white mb-3">40%</div>
              <div className="text-gray-400 text-sm uppercase tracking-widest">Efficiency Gain</div>
            </motion.div>
            
            <motion.div 
              className="bg-white/[0.02] border border-white/10 rounded-lg p-8 text-center backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-4xl font-light text-white mb-3">98%</div>
              <div className="text-gray-400 text-sm uppercase tracking-widest">Client Retention</div>
            </motion.div>
            
            <motion.div 
              className="bg-white/[0.02] border border-white/10 rounded-lg p-8 text-center backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className={`text-4xl font-light text-white mb-3 ${isAnimating ? 'animate-pulse' : ''}`}>{businessesTransformed}+</div>
              <div className="text-gray-400 text-sm uppercase tracking-widest">Transformations</div>
            </motion.div>
            
            <motion.div 
              className="bg-white/[0.02] border border-white/10 rounded-lg p-8 text-center backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-4xl font-light text-white mb-3">24/7</div>
              <div className="text-gray-400 text-sm uppercase tracking-widest">Support</div>
            </motion.div>
          </div>
        </div>
      </section>
      
    </PageLayout>
  );
};

export default Index;
