
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <PageLayout>
      <SEO 
        title="404 - Page Not Found | Reforzo" 
        description="The page you're looking for doesn't exist. Return to Reforzo's homepage to explore our business optimization solutions."
        keywords={['404', 'page not found', 'reforzo']}
      />
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <img 
                  src="/lovable-uploads/2d779bca-15c0-4e61-89fd-621fb3dd9765.png" 
                  alt="Reforzo Logo" 
                  className="h-20 md:h-24 w-auto transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl hover:-translate-y-2 cursor-pointer transform"
                />
              </div>
              <h1 className="text-6xl md:text-7xl font-bold mb-6">404</h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                The page you're looking for seems to have moved or doesn't exist.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Let's get you back on track</h2>
              <p className="text-lg text-gray-600 mb-8">
                Don't worry, even the best systems encounter unexpected paths. Let us help you find what you're looking for.
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NotFound;
