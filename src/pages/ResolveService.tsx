import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Tag, Edit3, CheckSquare, Zap, Folder, MessageSquare, BarChart3 } from 'lucide-react';

const ResolveService = () => {
  return (
    <PageLayout>
      <SEO 
        title="Re:Solve - Customer Support in Gmail | Reforzo"
        description="Automate and manage customer support directly from Gmail. Re:Solve helps you respond faster, organize tickets, and resolve issues without leaving your inbox."
        keywords={['gmail customer support', 'email automation', 'support ticketing', 'customer service', 'email management']}
      />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Re:Solve Customer Support in Gmail
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Turn your inbox into a powerful support hub. Automate responses, manage requests, and solve customer issues faster without ever switching tabs.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg">
              Get Started with Gmail
            </Button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Support, Solved. Right Inside Gmail.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Customer queries shouldn't mean chaos in your inbox. Re:Solve integrates seamlessly with Gmail to help you automate repetitive replies, track open requests, and ensure every customer gets a timely, accurate response. It's the simplest way to scale your support and keep your focus where it belongs.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              How Re:Solve Works in Your Inbox
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Tag className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">1. Automatically Categorize</h3>
                  <p className="text-gray-600">
                    Re:Solve scans incoming support emails and instantly tags them by type (e.g., "Billing," "Feature Request," "Bug").
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Edit3 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2. Suggest Instant Replies</h3>
                  <p className="text-gray-600">
                    For common questions, it suggests one-click, on-brand responses that you can send instantly or customize.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckSquare className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">3. Organize & Resolve</h3>
                  <p className="text-gray-600">
                    Track the status of each request, set reminders for follow-ups, and mark tickets as solved—all within Gmail.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Power Up Your Gmail Inbox
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Automated Response Suggestions</h3>
                <p className="text-sm text-gray-600">Instant, relevant reply suggestions for frequent inquiries.</p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Folder className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Smart Email Tagging</h3>
                <p className="text-sm text-gray-600">Automatic categorization and labeling of support emails.</p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Internal Ticket Threading</h3>
                <p className="text-sm text-gray-600">Keep all related messages and notes in one organized thread.</p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Performance Insights</h3>
                <p className="text-sm text-gray-600">Track response times, resolution rates, and common request types.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Why Use Re:Solve?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Work Where You Already Are</h3>
                  <p className="text-gray-600">
                    Eliminate complex ticketing systems. Manage support seamlessly within the tool your team uses every day—Gmail.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Cut Response Times Dramatically</h3>
                  <p className="text-gray-600">
                    Reduce resolution time from hours to minutes with instant reply suggestions and automated sorting.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Never Drop the Ball</h3>
                  <p className="text-gray-600">
                    Ensure every customer email is acknowledged, categorized, and tracked until it's resolved.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
              Perfect For:
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">Startups and small teams using Gmail for everything</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">Freelancers and consultants managing client questions</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">E-commerce stores handling order inquiries</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">SaaS companies providing timely customer support</span>
              </div>
              <div className="flex items-start space-x-3 md:col-span-2">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-700">Any team that wants simpler, faster support without a bulky system</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Re:Solve Your Customer Support?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start providing faster, more organized support today without leaving Gmail.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-50 px-8 py-3 text-lg"
            >
              Add to Gmail
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ResolveService;