import { Upload, Search, BarChart3, CheckCircle, Target, Users, TrendingUp, Smartphone, Shield, MousePointer } from 'lucide-react';
import SEO from '@/components/SEO';

const LandingPageAnalysis = () => {
  return (
    <>
      <SEO 
        title="Landing Page Analysis | Data-Driven Optimization for Higher Conversion"
        description="Get a detailed, metrics-based analysis of your landing page performance. Our expert service identifies friction points and provides actionable tips to increase conversion rates and ROI."
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
            <div className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                Transform Clicks into Conversions
              </h1>
              <div className="w-20 h-1 bg-blue-600 mb-6" />
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl">
                Unlock the full potential of your landing pages with a detailed performance analysis and actionable optimization strategy.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors">
                Request Your Analysis
              </button>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-6xl mx-auto px-6 md:px-8 py-16">
          {/* Overview Section */}
          <div className="bg-gray-50 p-8 rounded-lg mb-12">
            <h2 className="text-3xl font-bold mb-6">Precision Analysis for High-Performance Landing Pages</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Your landing page is your digital storefront. Even the smallest elements—from headline clarity to call-to-action placement—can significantly impact conversion rates. Our Landing Page Analysis Service delivers a comprehensive, data-informed review of your page's effectiveness, providing you with a clear roadmap to enhance user experience, strengthen messaging, and boost conversions.
            </p>
          </div>
          
          {/* How It Works Section */}
          <h2 className="text-3xl font-bold mb-8 text-center">How Our Analysis Works</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-100 text-center">
              <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-800">1. Share Your Link</h3>
              <p className="text-gray-600">Provide the URL of the landing page you want us to evaluate. No lengthy forms—just a direct link.</p>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-100 text-center">
              <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-800">2. Expert Evaluation</h3>
              <p className="text-gray-600">Our specialists conduct a thorough audit based on proven principles of conversion rate optimization, usability, and persuasive design.</p>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-100 text-center">
              <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-800">3. Get Your Optimization Report</h3>
              <p className="text-gray-600">We deliver a detailed report with prioritized recommendations—from headline and layout adjustments to trust signals and CTA effectiveness.</p>
            </div>
          </div>
          
          {/* What We Analyze Section */}
          <h2 className="text-3xl font-bold mb-8">What's Included in Your Analysis?</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-6">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">Clarity & Messaging</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Headline effectiveness and value proposition clarity</li>
                    <li>• Subheadline and supporting copy relevance</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start">
                <Smartphone className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">Design & User Experience (UX)</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Layout structure and visual hierarchy</li>
                    <li>• Mobile responsiveness and load time considerations</li>
                    <li>• Use of whitespace and readability</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">Trust & Credibility</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Presence and placement of testimonials, logos, or certifications</li>
                    <li>• Security indicators and privacy assurances</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MousePointer className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">Conversion Elements</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Call-to-action (CTA) prominence, wording, and design</li>
                    <li>• Form length and field optimization</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start">
                <Target className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">Overall Effectiveness</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Alignment between ad copy and landing page message</li>
                    <li>• Competitive positioning and uniqueness of offer</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Benefits Section */}
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Our Analysis Service?</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-100 text-center">
              <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Data-Backed Recommendations</h3>
              <p className="text-gray-600">Move beyond guesswork. Our experts base every suggestion on industry best practices and performance data.</p>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-100 text-center">
              <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Actionable & Prioritized</h3>
              <p className="text-gray-600">Receive a clear, easy-to-follow report with recommendations ranked by potential impact and ease of implementation.</p>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-100 text-center">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Boost ROI</h3>
              <p className="text-gray-600">Even minor tweaks can lead to major conversion lifts, maximizing the return on your advertising spend.</p>
            </div>
          </div>
          
          {/* Who It's For Section */}
          <div className="bg-blue-50 p-8 rounded-lg mb-16">
            <h2 className="text-3xl font-bold mb-6">Who Benefits from This Service?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Marketing Directors managing campaign performance</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">UX Designers seeking data-informed feedback</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Startup Founders optimizing their sign-up funnel</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">E-commerce Managers aiming to lower acquisition cost</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Digital Agencies offering added value to clients</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Final CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Landing Page?</h2>
            <p className="text-xl mb-8 opacity-90">Get expert insights and start converting more of your visitors today.</p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors">
              Request Your Analysis
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPageAnalysis;