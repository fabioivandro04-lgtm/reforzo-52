
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { ArrowLeft, Mail, Linkedin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect } from 'react';

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <PageLayout showContact={false}>
      <SEO 
        title="Careers - Join Our Team | Reforzo" 
        description="Join Reforzo and help us revolutionize business operations. Discover career opportunities in business consulting and drive meaningful change."
        keywords={['careers', 'jobs', 'business consulting careers', 'join reforzo']}
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                We're looking for passionate innovators to help us revolutionize business operations and drive meaningful change.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">Why Join Reforzo?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    title: "Innovation",
                    description: "Work on cutting-edge methodologies that transform how businesses operate and grow."
                  },
                  {
                    title: "Impact",
                    description: "Create solutions that drive measurable results and sustainable competitive advantages."
                  },
                  {
                    title: "Growth",
                    description: "Develop your expertise in a rapidly evolving field with diverse challenges and opportunities."
                  }
                ].map((benefit, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <h3 className="font-bold text-xl mb-4 text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gray-900 rounded-2xl p-8 text-white"
              >
                <h3 className="font-bold text-2xl mb-6 text-center">Contact Our Leadership</h3>
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex flex-col items-center text-center">
                    <img 
                      src="/lovable-uploads/a9bb9110-964a-43b0-a5ab-7162140cd133.png"
                      alt="Love Anderberg"
                      className="w-32 h-32 rounded-full mb-4 object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    <h3 className="text-xl font-bold text-white">Love Anderberg</h3>
                    <p className="text-gray-300 mb-6">Chief Operating Officer</p>
                    <div className="flex flex-col space-y-3">
                      <a href="mailto:love@reforzo.com" className="flex items-center text-gray-200 hover:text-white transition-colors">
                        <Mail className="w-5 h-5 mr-2" />
                        love@reforzo.com
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/love-anderberg-67549a174/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-200 hover:text-white transition-colors"
                      >
                        <Linkedin className="w-5 h-5 mr-2" />
                        LinkedIn Profile
                      </a>
                      <a href="tel:+46760149508" className="flex items-center text-gray-200 hover:text-white transition-colors">
                        <Phone className="w-5 h-5 mr-2" />
                        076-014 95 08
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Careers;
