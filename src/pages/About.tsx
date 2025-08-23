import { ArrowLeft, CheckCircle, ArrowRight, Target, Eye, Heart, Users, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Card, CardContent } from "@/components/ui/card";
const Counter = ({
  end,
  duration = 2
}: {
  end: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const isInView = useInView(countRef, {
    once: true
  });
  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);
  return <span ref={countRef}>{count}</span>;
};
const About = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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
  const stats = [{
    number: 100,
    suffix: "+",
    label: "Successful Projects",
    icon: <Award className="w-6 h-6" />
  }, {
    number: 50,
    suffix: "+",
    label: "Happy Clients",
    icon: <Users className="w-6 h-6" />
  }, {
    number: 95,
    suffix: "%",
    label: "Client Retention",
    icon: <TrendingUp className="w-6 h-6" />
  }, {
    number: 24,
    suffix: "/7",
    label: "Support Available",
    icon: <Heart className="w-6 h-6" />
  }];
  const values = [{
    title: "Discipline",
    description: "We maintain rigorous standards and consistent execution in everything we do.",
    icon: <Target className="w-8 h-8" />
  }, {
    title: "Focus",
    description: "We concentrate our efforts on what matters most for your business success.",
    icon: <Eye className="w-8 h-8" />
  }, {
    title: "Purposeful Efficiency",
    description: "Every process and solution serves a clear business objective.",
    icon: <TrendingUp className="w-8 h-8" />
  }, {
    title: "Applicable Innovation",
    description: "We create practical solutions that can be implemented and sustained.",
    icon: <Award className="w-8 h-8" />
  }];
  return <PageLayout>
      <SEO 
        title="About - Reforzo" 
        description="Learn about Reforzo's mission, vision, and values. We strengthen companies with strategic solutions that create lasting impact and sustainable competitive advantage."
        keywords={['about reforzo', 'company mission', 'business consulting values', 'operational excellence expertise']}
      />
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="text-center">
              <div className="flex justify-center mb-6">
                <img src="/lovable-uploads/2d779bca-15c0-4e61-89fd-621fb3dd9765.png" alt="Reforzo Logo" className="h-20 md:h-24 w-auto transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl hover:-translate-y-2 cursor-pointer transform" />
              </div>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                We believe every company harbors within itself the seed of maximum efficiency. 
                Our mission is to cultivate it and make it flourish.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
          once: true
        }} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => <motion.div key={index} variants={itemVariants} className="text-center group cursor-pointer" whileHover={{
            scale: 1.05
          }} transition={{
            type: "spring",
            stiffness: 400,
            damping: 10
          }}>
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-700 group-hover:bg-gray-200 group-hover:scale-110 transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 group-hover:scale-110 transition-all duration-300">
                  <Counter end={stat.number} />
                  {stat.suffix}
                </div>
                <div className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">{stat.label}</div>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Purpose Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Foundation</h2>
              <p className="text-xl text-gray-600">The principles that guide everything we do</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 group">{/* Reactive hover animations */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.1
            }} whileHover={{
              scale: 1.02,
              y: -5
            }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-200 group-hover:scale-110 transition-all duration-300">
                  <Target className="w-8 h-8 text-gray-700 group-hover:text-gray-900 transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300">Our Purpose</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  We exist to unlock the operational potential of companies, transforming challenges into opportunities for growth.
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }} whileHover={{
              scale: 1.02,
              y: -5
            }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-200 group-hover:scale-110 transition-all duration-300">
                  <Award className="w-8 h-8 text-gray-700 group-hover:text-gray-900 transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  Strengthen companies with strategic solutions that create lasting impact and sustainable competitive advantage.
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.3
            }} whileHover={{
              scale: 1.02,
              y: -5
            }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-200 group-hover:scale-110 transition-all duration-300">
                  <Eye className="w-8 h-8 text-gray-700 group-hover:text-gray-900 transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  Build lasting partnerships that drive continuous evolution and set new standards for operational excellence.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600">The principles that shape our approach and culture</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-12">
              {values.map((value, index) => <motion.div key={index} initial={{
              opacity: 0,
              x: index % 2 === 0 ? -20 : 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: index * 0.1
            }} whileHover={{
              scale: 1.05,
              y: -10,
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)"
            }} className="bg-gray-50 rounded-xl p-8 hover:bg-white transition-all duration-300 cursor-pointer group shadow-md hover:shadow-xl border border-gray-100 hover:border-gray-200">
                  <div className="flex items-start space-x-4">
                    <motion.div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center text-gray-700 shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 group-hover:bg-gray-100" whileHover={{
                  rotate: [0, -5, 5, -5, 0]
                }} transition={{
                  duration: 0.5
                }}>
                      {value.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{value.description}</p>
                    </div>
                  </div>
                </motion.div>)}
            </div>

            {/* Additional Values */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="bg-gray-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 text-center">What Sets Us Apart</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["Commitment to long-term success partnerships", "Measurable results with clear ROI tracking", "Simplicity in complex operational challenges", "Continuous improvement culture and mindset"].map((item, index) => <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </div>)}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Approach</h2>
              <p className="text-xl text-gray-600">How we deliver exceptional results</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="space-y-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Integrated Solutions</h3>
                  <p className="text-gray-600">
                    We don't just provide advice – we create comprehensive solutions that unite people, processes, and technology into a cohesive system that drives real business results.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Co-Working Partnership</h3>
                  <p className="text-gray-600">
                    We work alongside your teams, sharing knowledge and building internal capabilities so improvements are sustainable long after our engagement ends.
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Quality Promise</h3>
                <p className="text-gray-200 mb-6 leading-relaxed">
                  Quality is inseparable from our brand. We measure our success by applicable innovation, simplicity, and measurable results that directly impact your bottom line.
                </p>
                <div className="border-t border-gray-700 pt-6">
                  <p className="text-sm text-gray-300 italic">
                    "Every solution we deliver is designed to be practical, sustainable, and transformative."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 bg-white">
        
      </section>

      {/* CTA Section */}
      
    </PageLayout>;
};
export default About;