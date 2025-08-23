import { ArrowRight, Code, Cpu, Layers, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
const Hero = () => {
  const isMobile = useIsMobile();
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };
  const navigateToAssessment = () => {
    window.location.href = '/business-assessment';
  };
  return <motion.div className="relative w-full" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="banner-container bg-transparent relative overflow-hidden h-screen w-full">
        <div className="absolute inset-0 bg-black w-full">
          <img 
            src="/lovable-uploads/a6a5233b-326c-4bb6-9745-7a84778df6ed.png" 
            alt="Abstract geometric background" 
            className={`w-full h-full object-cover opacity-70 grayscale ${isMobile ? 'object-right' : 'object-center'}`} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-white"></div>
        </div>
        
        <div className="banner-overlay bg-black/40 absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
            <motion.div className="w-full max-w-4xl text-center" variants={itemVariants}>
              <motion.h1 className="banner-title text-white" variants={itemVariants}>Reinforce your business</motion.h1>
              <motion.p className="banner-subtitle text-gray-300 mt-4 sm:mt-6" variants={itemVariants}>
                Use innovative metrics to evolve and modernize your business
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center items-center" variants={itemVariants}>
                {/* Primary CTA - Request Free Diagnosis */}
                <button className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all shadow-lg hover:shadow-xl hover:shadow-gray-300/20 flex items-center justify-center group text-sm sm:text-base font-medium" onClick={navigateToAssessment}>
                  Get your free assessment
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                {/* Secondary CTA - Learn about approach */}
                
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      
    </motion.div>;
};
export default Hero;