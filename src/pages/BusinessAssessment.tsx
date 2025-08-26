import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Building, User, Briefcase, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  businessType: z.string().min(1, 'Please select a business type'),
  solutions: z.string().min(10, 'Please describe the solutions you need (minimum 10 characters)'),
  honeypot: z.string().optional(),
  timestamp: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const businessTypes = [
  'Technology/Software',
  'Manufacturing',
  'Retail/E-commerce',
  'Healthcare',
  'Finance/Banking',
  'Education',
  'Consulting',
  'Real Estate',
  'Hospitality',
  'Transportation/Logistics',
  'Energy/Utilities',
  'Agriculture',
  'Media/Entertainment',
  'Non-profit',
  'Other'
];

const Assessment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStartTime] = useState(Date.now());
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      businessName: '',
      businessType: '',
      solutions: '',
      honeypot: '',
      timestamp: Date.now().toString(),
    },
  });

  const onSubmit = async (formData: FormValues) => {
    setIsSubmitting(true);

    // Simple bot detection
    if (formData.honeypot) {
      console.log('Bot detected: honeypot field filled');
      setIsSubmitting(false);
      return;
    }

    // Time-based bot detection (form filled too quickly)
    const timeSpent = Date.now() - formStartTime;
    if (timeSpent < 3000) { // Less than 3 seconds
      console.log('Bot detected: form filled too quickly');
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('send-assessment', {
        body: {
          name: formData.name,
          email: formData.email,
          businessName: formData.businessName,
          businessType: formData.businessType,
          solutions: formData.solutions,
        }
      });

      if (error) {
        throw error;
      }

      console.log('Assessment form submitted successfully:', data);
      
      toast({
        title: "Assessment Request Submitted!",
        description: "Thank you for your interest. We'll review your information and get back to you within 24 hours.",
      });

      form.reset();
    } catch (error) {
      console.error('Error submitting assessment form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your assessment request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout showContact={false}>
      <SEO 
        title="Free Business Assessment - Reforzo" 
        description="Get a comprehensive assessment of your business operations and discover opportunities for growth and efficiency improvements."
        keywords={['business assessment', 'operational analysis', 'business consultation', 'efficiency audit']}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Free Business Assessment
            </h1>
            <p className="text-xl text-muted-foreground">
              Help us understand your business needs so we can provide you with a tailored assessment and recommendations.
            </p>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                {...form.register('honeypot')}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              <input
                type="hidden"
                {...form.register('timestamp')}
                value={Date.now().toString()}
              />

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  {...form.register('name')}
                  className={form.formState.errors.name ? 'border-destructive' : ''}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  {...form.register('email')}
                  className={form.formState.errors.email ? 'border-destructive' : ''}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                )}
              </div>

              {/* Business Name Field */}
              <div className="space-y-2">
                <Label htmlFor="businessName" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  placeholder="Your company name"
                  {...form.register('businessName')}
                  className={form.formState.errors.businessName ? 'border-destructive' : ''}
                />
                {form.formState.errors.businessName && (
                  <p className="text-sm text-destructive">{form.formState.errors.businessName.message}</p>
                )}
              </div>

              {/* Business Type Field */}
              <div className="space-y-2">
                <Label htmlFor="businessType" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Business Type
                </Label>
                <Select onValueChange={(value) => form.setValue('businessType', value)}>
                  <SelectTrigger className={form.formState.errors.businessType ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.businessType && (
                  <p className="text-sm text-destructive">{form.formState.errors.businessType.message}</p>
                )}
              </div>

              {/* Solutions Field */}
              <div className="space-y-2">
                <Label htmlFor="solutions" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  What Solutions Are You Looking For?
                </Label>
                <Textarea
                  id="solutions"
                  placeholder="Please describe the challenges you're facing or the improvements you're looking to achieve. Include any specific areas like operational efficiency, process optimization, technology integration, performance metrics, etc."
                  rows={6}
                  {...form.register('solutions')}
                  className={form.formState.errors.solutions ? 'border-destructive' : ''}
                />
                {form.formState.errors.solutions && (
                  <p className="text-sm text-destructive">{form.formState.errors.solutions.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Assessment Request'}
              </Button>
            </form>

            <div className="mt-8 p-6 bg-muted rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">What happens next?</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• We'll review your submission within 24 hours</li>
                <li>• Our experts will analyze your business needs</li>
                <li>• You'll receive a personalized assessment report</li>
                <li>• We'll schedule a consultation to discuss recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Assessment;