import { ArrowRight, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
const Hero = () => {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
        duration: 1
      }
    }
  };
  
  const itemVariants = {
    hidden: {
      y: 30,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const scrollIndicatorVariants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  const navigateToAssessment = () => {
    window.location.href = '/business-assessment';
  };
  return (
    <motion.div className="relative w-full" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="banner-container bg-transparent relative overflow-hidden h-screen w-full">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 bg-black w-full"
          style={{ y: backgroundY }}
        >
          <video 
            src="https://nvpnweczvrhijljvrips.supabase.co/storage/v1/object/public/media/background%201.mp4"
            autoPlay
            muted
            loop
            playsInline
            className={`w-full h-full object-cover opacity-70 ${isMobile ? 'object-right' : 'object-center'}`}
          />
        </motion.div>
        
        {/* Content with Parallax */}
        <motion.div 
          className="banner-overlay bg-gradient-to-b from-transparent via-black/20 to-black absolute inset-0 w-full h-full flex items-center justify-center"
          style={{ y: contentY }}
        >
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
            <motion.div className="w-full max-w-4xl text-center" variants={itemVariants}>
              <motion.h1 
                className="banner-title text-white drop-shadow-lg" 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Reinforce your business
              </motion.h1>
              <motion.p 
                className="banner-subtitle text-gray-300 mt-4 sm:mt-6 drop-shadow-md" 
                variants={itemVariants}
              >
                Use innovative metrics to evolve and modernize your business
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center items-center" 
                variants={itemVariants}
              >
                <motion.button 
                  className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 bg-white/90 text-gray-800 rounded-md hover:bg-white transition-all shadow-lg hover:shadow-xl hover:shadow-white/20 flex items-center justify-center group text-sm sm:text-base font-medium backdrop-blur-sm"
                  onClick={navigateToAssessment}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Get your free assessment
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;