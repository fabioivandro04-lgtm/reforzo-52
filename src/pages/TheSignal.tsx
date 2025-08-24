import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Filter, Edit3, BarChart3, Clock, Users, CheckSquare, Tag, Signal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

// Animated Counter Component (reused from ResolveService)
const AnimatedCounter = ({ 
  target, 
  suffix = '', 
  delay = 0 
}: { 
  target: number; 
  suffix?: string; 
  delay?: number;
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && !hasStarted) {
      const timer = setTimeout(() => {
        setHasStarted(true);
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        const stepDuration = duration / steps;

        let current = 0;
        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current));
          }
        }, stepDuration);

        return () => clearInterval(counter);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [inView, target, delay, hasStarted]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const TheSignal = () => {
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
  const heroRef = useRef<HTMLElement>(null);
  const overviewRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);
  const audienceRef = useRef<HTMLElement>(null);
  const nextStepsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const refs = [
      { ref: heroRef, key: 'hero' },
      { ref: overviewRef, key: 'overview' },
      { ref: howItWorksRef, key: 'howItWorks' },
      { ref: featuresRef, key: 'features' },
      { ref: benefitsRef, key: 'benefits' },
      { ref: audienceRef, key: 'audience' },
      { ref: nextStepsRef, key: 'nextSteps' },
      { ref: ctaRef, key: 'cta' }
    ];

    refs.forEach(({ ref, key }) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <PageLayout>
      <SEO
        title="The Signal - Weekly Technology Intelligence | Reforzo"
        description="Cut through the noise with The Signal - your weekly briefing on the future of technology. Curated intelligence, no noise."
        keywords={["technology briefing", "tech intelligence", "weekly newsletter", "curated content", "tech trends", "signal vs noise"]}
      />

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <motion.div
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={visibleSections.hero ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm mb-6">
              <Signal className="w-4 h-4" />
              Weekly Intelligence Briefing
            </div>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            The <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Signal</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Your weekly briefing on the future of technology
          </motion.p>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto"
          >
            Curated intelligence. No noise. Get only what matters in technology, delivered weekly.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Subscribe Now
            </Button>
            <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3">
              View Sample Issue
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Overview Section */}
      <section 
        ref={overviewRef}
        className="py-20 bg-slate-50"
      >
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate={visibleSections.overview ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Cut through the noise. Stay ahead.
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              In a world drowning in information, The Signal delivers curated technology intelligence. 
              We scan, filter, and distill the most important developments into a clear, actionable weekly brief.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <AnimatedCounter target={5} suffix=" min" />
              </div>
              <p className="text-slate-600">Average read time</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                <AnimatedCounter target={0} suffix="%" />
              </div>
              <p className="text-slate-600">Noise content</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                <AnimatedCounter target={100} suffix="%" />
              </div>
              <p className="text-slate-600">Curated intelligence</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section 
        ref={howItWorksRef}
        className="py-20 bg-white"
      >
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate={visibleSections.howItWorks ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              How The Signal Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="p-8 h-full border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Tag className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">01</div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Curate</h3>
                <p className="text-slate-600">
                  We scan signals across technology, policy, research, and markets to identify what truly matters.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-8 h-full border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Edit3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">02</div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Distill</h3>
                <p className="text-slate-600">
                  What happened, why it matters, and what to do next. Clear analysis without the noise.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-8 h-full border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">03</div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Deliver</h3>
                <p className="text-slate-600">
                  A clear weekly briefing delivered directly to your inbox every week.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section 
        ref={featuresRef}
        className="py-20 bg-slate-50"
      >
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate={visibleSections.features ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Choose Your Signal
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Multiple naming and positioning options to find the perfect fit for your audience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants}>
              <Card className="p-6 h-full border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">The Signal Weekly</h3>
                <p className="text-slate-600 text-sm mb-3">Your curated intelligence. No noise.</p>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">Weekly Focus</Badge>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 h-full border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Signal Brief</h3>
                <p className="text-slate-600 text-sm mb-3">The weekly brief on what actually matters.</p>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Concise</Badge>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 h-full border-l-4 border-l-emerald-500 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">ClearSignal</h3>
                <p className="text-slate-600 text-sm mb-3">Clarity on the future of tech. Every week.</p>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Clear</Badge>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 h-full border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">The Essential Signal</h3>
                <p className="text-slate-600 text-sm mb-3">Your weekly dose of what's next.</p>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">Essential</Badge>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 h-full border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Signal & Substance</h3>
                <p className="text-slate-600 text-sm mb-3">Beyond the headlines. Into what matters.</p>
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">Depth</Badge>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 h-full border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">The Impact Signal</h3>
                <p className="text-slate-600 text-sm mb-3">The weekly developments that will change everything.</p>
                <Badge variant="secondary" className="bg-red-100 text-red-700">Impact</Badge>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 h-full bg-slate-100 border-slate-300">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Tech-Forward Options</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Signal One</Badge>
                  <Badge variant="outline">The Signal Report</Badge>
                  <Badge variant="outline">Next Signal</Badge>
                  <Badge variant="outline">Signal Alpha</Badge>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 h-full bg-slate-100 border-slate-300">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Metaphor Options</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Signal Fire</Badge>
                  <Badge variant="outline">Boosting The Signal</Badge>
                  <Badge variant="outline">The Clean Signal</Badge>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section 
        ref={benefitsRef}
        className="py-20 bg-white"
      >
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate={visibleSections.benefits ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Why The Signal Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="p-8 h-full text-center border-slate-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Filter className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Clarity over noise</h3>
                <p className="text-slate-600">
                  Get only what matters. No fluff, no filler, no overwhelming information overload.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-8 h-full text-center border-slate-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Save time</h3>
                <p className="text-slate-600">
                  A 5-minute brief that feels like a full-day scan of the technology landscape.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-8 h-full text-center border-slate-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Actionable</h3>
                <p className="text-slate-600">
                  Clear takeaways for founders, operators, and teams who need to act on insights.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Target Audience */}
      <section 
        ref={audienceRef}
        className="py-20 bg-slate-900"
      >
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate={visibleSections.audience ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Who Reads The Signal
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Technology leaders who need to stay informed without drowning in information.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              'Founders & Operators',
              'Product Leaders',
              'Investors & Analysts', 
              'Researchers',
              'Executives',
              'Curious Generalists'
            ].map((audience, index) => (
              <motion.div 
                key={audience}
                variants={itemVariants}
                className="text-center"
              >
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                  <Users className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-sm font-medium text-white mb-2">{audience}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How to Choose & Next Steps */}
      <section 
        ref={nextStepsRef}
        className="py-20 bg-slate-50"
      >
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate={visibleSections.nextSteps ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              How to Choose & Next Steps
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">



            <Card className="p-8 border-l-4 border-l-blue-500 bg-blue-50">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Final Thought</h3>
              <p className="text-slate-700 mb-4">
                The Signal is a fantastic, strong name on its own. The simplest option is often the best. 
                You could easily just go with:
              </p>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="text-xl font-bold text-slate-900 mb-2">The Signal</h4>
                <p className="text-slate-600 italic">Your weekly briefing on the future of technology.</p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section 
        ref={ctaRef}
        className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"
      >
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={visibleSections.cta ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to get the Signal?
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
              Your weekly briefing on the future of technology. Curated intelligence, delivered weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Subscribe Now
              </Button>
              <Button variant="outline" size="lg" className="border-slate-400 text-slate-300 hover:bg-slate-800 px-8 py-3">
                Get a Sample
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </PageLayout>
  );
};

export default TheSignal;