
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import Features from '@/components/Features';
import Projects from '@/components/Projects';
import WhyWrlds from '@/components/WhyWrlds';
import BlogPreview from '@/components/BlogPreview';
import SEO from '@/components/SEO';
import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDailyCounter } from '@/hooks/useDailyCounter';

const Index = () => {
  const { currentValue: businessesTransformed, isAnimating } = useDailyCounter({
    baseValue: 500,
    storageKey: 'businessesTransformed',
    minIncrement: 0,
    maxIncrement: 5
  });

  // Memoize animation variants for better performance
  const animationVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    scale: { opacity: 0, scale: 0.9 },
    scaleVisible: { opacity: 1, scale: 1 }
  }), []);

  // Clean up any duplicate IDs on mount
  useEffect(() => {
    const contactElements = document.querySelectorAll('[id="contact"]');
    if (contactElements.length > 1) {
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
      
      {/* Professional Value Proposition Section */}
      <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center relative overflow-hidden py-10 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 sm:mb-6 tracking-wide px-2"
              initial={animationVariants.hidden}
              whileInView={animationVariants.visible}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Excellence in Business
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-gray-300 mt-1 sm:mt-2">
                Transformation
              </span>
            </motion.h2>
            <motion.div 
              className="w-16 sm:w-20 lg:w-24 h-px bg-white mx-auto mb-6 sm:mb-8"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />
            <motion.p 
              className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light px-4"
              initial={animationVariants.hidden}
              whileInView={animationVariants.visible}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Reforzo delivers strategic consulting solutions that drive measurable operational excellence through innovative metrics and proven methodologies.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12 lg:mb-16 px-2">
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-white/10 transition-all duration-300">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Strategic Consulting</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed px-2">
                Comprehensive business analysis and strategic planning to optimize your operations
              </p>
            </motion.div>

            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-white/10 transition-all duration-300">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Process Innovation</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed px-2">
                Advanced process optimization and technology integration for maximum efficiency
              </p>
            </motion.div>

            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-white/10 transition-all duration-300">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Performance Analytics</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed px-2">
                Data-driven insights and metrics that enable continuous improvement and growth
              </p>
            </motion.div>
          </div>
          
          {/* Professional Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <motion.div 
              className="bg-white/[0.02] border border-white/10 rounded-lg p-4 sm:p-6 lg:p-8 text-center backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-2 sm:mb-3">40%</div>
              <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest">Efficiency Gain</div>
            </motion.div>
            
            <motion.div 
              className="bg-white/[0.02] border border-white/10 rounded-lg p-4 sm:p-6 lg:p-8 text-center backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-2 sm:mb-3">98%</div>
              <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest">Client Retention</div>
            </motion.div>
            
            <motion.div 
              className="bg-white/[0.02] border border-white/10 rounded-lg p-4 sm:p-6 lg:p-8 text-center backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className={`text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-2 sm:mb-3 ${isAnimating ? 'animate-pulse' : ''}`}>{businessesTransformed}+</div>
              <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest">Transformations</div>
            </motion.div>
            
            <motion.div 
              className="bg-white/[0.02] border border-white/10 rounded-lg p-4 sm:p-6 lg:p-8 text-center backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-2 sm:mb-3">24/7</div>
              <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest">Support</div>
            </motion.div>
          </div>
        </div>
      </section>
      
    </PageLayout>
  );
};

export default Index;
