import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Search, Puzzle, Settings, TrendingUp, Lightbulb, BarChart3, Users } from 'lucide-react';
const OurApproach = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const frameworkPhases = [{
    phase: 1,
    title: "In-Depth Analysis",
    icon: Search,
    description: "We begin by listening. Through a comprehensive audit of your processes, metrics, and goals, we identify the core opportunities for efficiency and growth. We diagnose the why before prescribing the how.",
    output: "A detailed Strategic Assessment Report"
  }, {
    phase: 2,
    title: "Build the Blueprint",
    icon: Puzzle,
    description: "We transform data into direction. Collaborating with your team, we develop a customized, phased plan with clear priorities, key performance indicators (KPIs), and a definitive roadmap for execution.",
    output: "A Clear Action Plan & Performance Roadmap"
  }, {
    phase: 3,
    title: "Execute with Precision",
    icon: Settings,
    description: "Strategy is nothing without execution. We integrate solutions, optimize workflows, and provide hands-on support to ensure seamless adoption and immediate momentum.",
    output: "Deployed Solutions & Integrated Systems"
  }, {
    phase: 4,
    title: "Measure and Refine",
    icon: TrendingUp,
    description: "Our partnership ensures lasting impact. We continuously monitor performance against KPIs, provide insights, and refine strategies to adapt to new challenges and opportunities, fostering a culture of continuous improvement.",
    output: "Performance Dashboards & Iterative Strategy Reviews"
  }];
  const principles = [{
    number: 1,
    title: "Clarity Over Complexity",
    description: "We avoid jargon and convoluted models. Our solutions are practical, understandable, and built for real-world application.",
    icon: Lightbulb
  }, {
    number: 2,
    title: "Data-Informed, Not Data-Dictated",
    description: "We use metrics as a compass, not a cage. Insights guide our strategy, but your vision and expertise remain the ultimate driver.",
    icon: BarChart3
  }, {
    number: 3,
    title: "Partnership, Not Provision",
    description: "We embed with your team. This collaborative model ensures knowledge transfer, builds internal capability, and guarantees sustainable success long after our engagement.",
    icon: Users
  }];
  return <PageLayout>
      <SEO title="Our Approach - Methodical Path to Growth | Reforzo" description="Discover Reforzo's disciplined four-phase framework that translates data into actionable strategy and strategy into measurable results." keywords={["business strategy", "growth methodology", "operational excellence", "data-driven approach"]} />

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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">A Methodical Path to Growth</h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Our approach is built on clarity, not complexity. We translate data into actionable strategy, 
                and strategy into measurable, tangible results.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Statement */}
      <section className="py-16 bg-white">
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
          }} className="text-center">
              <p className="text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed">
                We believe sustainable growth is not a mystery—it's a method. Our disciplined, four-phase framework 
                ensures every action is intentional and every outcome is quantifiable.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Reforzo Framework */}
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
              <h2 className="text-4xl font-bold text-gray-900 mb-4">The Reforzo Framework</h2>
              <p className="text-xl text-gray-600">A systematic approach that transforms challenges into opportunities through four strategic phases.</p>
            </motion.div>

            <div className="space-y-12">
              {frameworkPhases.map((phase, index) => <motion.div key={phase.phase} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: index * 0.1
            }} whileHover={{
              scale: 1.02,
              y: -5
            }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    {/* Phase Number & Icon */}
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {phase.phase}
                      </div>
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 group-hover:scale-110 transition-all duration-300">
                        <phase.icon className="w-8 h-8 text-gray-700 group-hover:text-gray-900" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="mb-4">
                        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Phase {phase.phase}: {phase.phase === 1 ? 'Diagnose' : phase.phase === 2 ? 'Strategize' : phase.phase === 3 ? 'Implement' : 'Optimize'}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 group-hover:text-gray-700 transition-colors duration-300">
                          {phase.title}
                        </h3>
                      </div>
                      
                      <p className="text-lg text-gray-600 leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-300">
                        {phase.description}
                      </p>
                      
                      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-900 group-hover:bg-gray-100 transition-colors duration-300">
                        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Output:</span>
                        <p className="text-gray-900 font-medium mt-1">{phase.output}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
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
              <h2 className="text-4xl font-bold text-gray-900 mb-4">The Principles Behind Our Practice</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Three foundational beliefs that guide every decision and shape every strategy.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {principles.map((principle, index) => <motion.div key={principle.number} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: index * 0.1
            }} whileHover={{
              scale: 1.05,
              y: -10
            }} className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {principle.number}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:bg-gray-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <principle.icon className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                    {principle.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {principle.description}
                  </p>
                </motion.div>)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      
    </PageLayout>;
};
export default OurApproach;