import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Tag, Edit3, CheckSquare, Zap, Folder, MessageSquare, BarChart3, ArrowRight, Mail, Users, Clock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ target, suffix = '', delay = 0 }: { target: number; suffix?: string; delay?: number }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target, hasStarted]);

  return <span>{count}{suffix}</span>;
};

const ResolveService = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const whoForRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleBenefits, setVisibleBenefits] = useState<number[]>([]);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [whoForVisible, setWhoForVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const benefitCards = benefitsRef.current?.querySelectorAll('.benefit-card');
    if (!benefitCards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleBenefits(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-50px' }
    );

    benefitCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWhoForVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (whoForRef.current) {
      observer.observe(whoForRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <PageLayout>
      <SEO 
        title="Re:Solve - Customer Support in Gmail | Reforzo"
        description="Automate and manage customer support directly from Gmail. Re:Solve helps you respond faster, organize tickets, and resolve issues without leaving your inbox."
        keywords={['gmail customer support', 'email automation', 'support ticketing', 'customer service', 'email management']}
      />
      
      {/* Hero Section - Asymmetric Design */}
      <section className="relative pt-20 pb-24 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-600/20 to-transparent animate-pulse-slow"></div>
        
        {/* Floating background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-slate-400/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gray-400/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-slate-300/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in">
              <Badge className="mb-6 bg-slate-500/20 text-slate-200 border-slate-400/30 animate-bounce-subtle">
                Gmail Integration
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight animate-slide-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                Re:Solve
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-gray-100 animate-shimmer">
                  Customer Support
                </span>
                <span className="block text-2xl md:text-3xl font-normal text-gray-300">
                  in Gmail
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                Transform your inbox into a powerful support hub. Automate responses, manage requests, and solve customer issues faster—all without switching tabs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                <Button size="lg" className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 text-lg group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  Get Started with Gmail
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg transform transition-all duration-300 hover:scale-105">
                  Watch Demo
                </Button>
              </div>
            </div>
            
            <div className="relative animate-float">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105">
                  <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-6 h-6 text-slate-300" />
                    <span className="text-white font-medium">Gmail Interface Enhanced</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 space-y-2 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Support Tickets</span>
                      <Badge className="bg-emerald-600/20 text-emerald-300">Auto-Tagged</Badge>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-2 bg-slate-600 rounded-full w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section - Diagonal Layout */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Support, <span className="text-slate-700">Solved.</span>
                <br />Right Inside Gmail.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Customer queries shouldn't mean chaos in your inbox. Re:Solve integrates seamlessly with Gmail to help you automate repetitive replies, track open requests, and ensure every customer gets a timely, accurate response.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                  <div className="text-3xl font-bold text-slate-700 hover:scale-110 transition-transform duration-300">
                    <AnimatedCounter target={90} suffix="%" delay={200} />
                  </div>
                  <div className="text-sm text-gray-500">Faster Responses</div>
                </div>
                <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                  <div className="text-3xl font-bold text-slate-700 hover:scale-110 transition-transform duration-300">Zero</div>
                  <div className="text-sm text-gray-500">Setup Complexity</div>
                </div>
                <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                  <div className="text-3xl font-bold text-slate-700 hover:scale-110 transition-transform duration-300">100%</div>
                  <div className="text-sm text-gray-500">Gmail Native</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-0">
                  <Users className="w-8 h-8 text-slate-600 mb-3" />
                  <h3 className="font-semibold mb-2">Team Collaboration</h3>
                  <p className="text-sm text-gray-600">Share context seamlessly</p>
                </CardContent>
              </Card>
              <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 mt-8">
                <CardContent className="p-0">
                  <Clock className="w-8 h-8 text-slate-600 mb-3" />
                  <h3 className="font-semibold mb-2">Real-time Updates</h3>
                  <p className="text-sm text-gray-600">Instant notifications</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Vertical Timeline */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              How Re:Solve <span className="text-slate-700">Works</span> in Your Inbox
            </h2>
            
            <div className="space-y-12">
              <div className="flex items-start space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-500 rounded-full flex items-center justify-center">
                    <Tag className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-px h-16 bg-gradient-to-b from-slate-500 to-transparent mx-auto mt-4"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">1. Automatically Categorize</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Re:Solve scans incoming support emails and instantly tags them by type (e.g., "Billing," "Feature Request," "Bug").
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center">
                    <Edit3 className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-px h-16 bg-gradient-to-b from-gray-500 to-transparent mx-auto mt-4"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">2. Suggest Instant Replies</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    For common questions, it suggests one-click, on-brand responses that you can send instantly or customize.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full flex items-center justify-center">
                    <CheckSquare className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">3. Organize & Resolve</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Track the status of each request, set reminders for follow-ups, and mark tickets as solved—all within Gmail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features - Bento Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
              Power Up Your <span className="text-slate-700">Gmail Inbox</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="md:col-span-2 p-8 bg-gradient-to-br from-slate-700 to-slate-800 text-white hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-0">
                  <Zap className="w-12 h-12 text-slate-200 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Automated Response Suggestions</h3>
                  <p className="text-slate-100">Instant, relevant reply suggestions for frequent inquiries that save hours of typing.</p>
                </CardContent>
              </Card>

              <Card className="p-6 bg-white hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-200 transition-colors">
                    <Folder className="w-6 h-6 text-slate-700" />
                  </div>
                  <h3 className="font-bold mb-2">Smart Email Tagging</h3>
                  <p className="text-sm text-gray-600">Automatic categorization and labeling</p>
                </CardContent>
              </Card>

              <Card className="p-6 bg-white hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                    <MessageSquare className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h3 className="font-bold mb-2">Internal Ticket Threading</h3>
                  <p className="text-sm text-gray-600">Organized message history</p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 p-8 bg-gradient-to-br from-gray-700 to-gray-800 text-white hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-0">
                  <BarChart3 className="w-12 h-12 text-gray-200 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Performance Insights</h3>
                  <p className="text-gray-100">Track response times, resolution rates, and identify trends in customer inquiries.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - Side-by-side Cards */}
      <section className="py-20 bg-white">
        <div ref={sectionRef} className={`container mx-auto px-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        <div ref={benefitsRef} className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
              Why Use <span className="text-slate-700">Re:Solve?</span>
            </h2>
            
            <div className={`space-y-12 ${visibleBenefits.length > 0 ? 'animate-fade-in' : ''}`}>
              <div className={`grid lg:grid-cols-2 gap-12 items-center benefit-card transition-all duration-700 ${
                visibleBenefits.includes(0) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`} data-index="0">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Work Where You Already Are</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Eliminate complex ticketing systems. Manage support seamlessly within the tool your team uses every day—Gmail.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-12 h-12 text-slate-700" />
                  </div>
                </div>
              </div>

              <div className={`grid lg:grid-cols-2 gap-12 items-center benefit-card transition-all duration-700 ${
                visibleBenefits.includes(1) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`} data-index="1">
                <div className="text-center order-2 lg:order-1">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-12 h-12 text-emerald-700" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl order-1 lg:order-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Cut Response Times Dramatically</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Reduce resolution time from hours to minutes with instant reply suggestions and automated sorting.
                  </p>
                </div>
              </div>

              <div className={`grid lg:grid-cols-2 gap-12 items-center benefit-card transition-all duration-700 ${
                visibleBenefits.includes(2) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`} data-index="2">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Never Drop the Ball</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Ensure every customer email is acknowledged, categorized, and tracked until it's resolved.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckSquare className="w-12 h-12 text-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For - Modern Grid */}
      <section className="py-20 bg-gray-900 text-white">
        <div ref={whoForRef} className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            whoForVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              Perfect <span className="text-slate-700">For:</span>
            </h2>
            <p className={`text-xl text-gray-300 mb-12 transition-all duration-700 delay-400 ${
              whoForVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>Teams that value simplicity without sacrificing power</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Startups and small teams using Gmail for everything",
                "Freelancers and consultants managing client questions", 
                "E-commerce stores handling order inquiries",
                "SaaS companies providing timely customer support",
                "Service businesses managing client communications",
                "Any team wanting simpler support without complexity"
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                    whoForVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
                  }`}
                  style={{ 
                    transitionDelay: whoForVisible ? `${600 + index * 150}ms` : '0ms',
                    animationFillMode: 'both'
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 bg-slate-500 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      whoForVisible ? 'animate-pulse-slow' : ''
                    }`}>
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-left">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Split Design */}
      <section className="relative py-20 bg-gradient-to-r from-slate-800 via-gray-800 to-slate-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-slate-400/10 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-400/10 rounded-full translate-x-48 translate-y-48"></div>
        </div>
        
        <div ref={ctaRef} className="container mx-auto px-4 relative z-10">
          <div className={`max-w-4xl mx-auto text-center text-white transition-all duration-1000 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-700 delay-200 ${
              ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              Ready to Re:Solve Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-gray-100">
                Customer Support?
              </span>
            </h2>
            <p className={`text-xl mb-10 opacity-90 max-w-2xl mx-auto transition-all duration-700 delay-400 ${
              ctaVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              Start providing faster, more organized support today without leaving Gmail. Join thousands of teams already saving hours daily.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-600 ${
              ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <Button 
                size="lg" 
                className={`bg-white text-slate-700 hover:bg-gray-50 px-10 py-4 text-lg font-semibold group transform transition-all duration-300 hover:scale-105 ${
                  ctaVisible ? 'animate-pulse-slow' : ''
                }`}
              >
                Add to Gmail
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-10 py-4 text-lg transform transition-all duration-300 hover:scale-105"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ResolveService;