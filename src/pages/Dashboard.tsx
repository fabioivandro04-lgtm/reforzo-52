import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useRoles } from '@/hooks/useRoles';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';
import { User, Building, Phone, Mail, CreditCard, Calendar, Shield, Settings } from 'lucide-react';
import HomeButton from '@/components/HomeButton';

interface Profile {
  full_name: string;
  email: string;
  company_name: string;
  phone_number: string;
  onboarding_completed: boolean;
  created_at: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  subscribed_at: string;
  status: string;
}

const Dashboard = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut, loading: authLoading } = useAuth();
  const { roles, isAdmin } = useRoles();

  useEffect(() => {
    console.log('Dashboard: Auth state changed - loading:', authLoading, 'user:', !!user);
    
    if (authLoading) return; // Wait for auth to load
    
    if (!user) {
      console.log('Dashboard: No user found, redirecting to login');
      navigate('/login');
      return;
    }

    console.log('Dashboard: User authenticated, fetching data');
    fetchUserData();
  }, [user, navigate, authLoading]);

  const fetchUserData = async () => {
    if (!user) return;
    
    try {
      console.log('Dashboard: Fetching user data for user:', user.id);
      
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      console.log('Dashboard: Profile data:', profileData, 'Error:', profileError);

      if (profileError) {
        console.error('Dashboard: Profile fetch error:', profileError);
        setError('Failed to load profile data');
        return;
      }

      if (!profileData) {
        console.log('Dashboard: No profile found, creating one...');
        // Create profile if it doesn't exist
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            email: user.email,
            onboarding_completed: true
          })
          .select()
          .single();
          
        if (createError) {
          console.error('Dashboard: Profile creation error:', createError);
          setError('Failed to create profile');
          return;
        }
        
        console.log('Dashboard: Created new profile:', newProfile);
        setProfile(newProfile);
      } else if (!profileData.onboarding_completed) {
        console.log('Dashboard: Profile exists but onboarding not completed, redirecting...');
        navigate('/onboarding');
        return;
      } else {
        console.log('Dashboard: Profile loaded successfully');
        setProfile(profileData);
      }

      // Fetch user services
      const { data: servicesData, error: servicesError } = await supabase
        .from('user_services')
        .select(`
          id,
          subscribed_at,
          status,
          services (
            id,
            name,
            description,
            price
          )
        `)
        .eq('user_id', user.id);

      if (servicesError) {
        // Handle services loading error silently
      } else {
        const formattedServices = servicesData.map(item => ({
          id: item.id,
          name: item.services.name,
          description: item.services.description,
          price: item.services.price,
          subscribed_at: item.subscribed_at,
          status: item.status,
        }));
        setServices(formattedServices);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/');
    } catch (err) {
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Dashboard - Reforzo"
        description="Your personalized Reforzo dashboard with client details and services"
      />
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}!</h1>
              <p className="text-muted-foreground">Manage your account and track your services</p>
            </div>
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Button asChild variant="default" size="sm">
                  <a href="/admin">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin Panel
                  </a>
                </Button>
              )}
              <HomeButton />
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>

          {/* Admin Quick Access Card - Only for Admins */}
          {isAdmin && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Shield className="h-5 w-5" />
                  Administrator Access
                </CardTitle>
                <CardDescription>
                  You have administrative privileges. Access advanced management tools.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Admin Panel Features:</p>
                    <p className="text-sm text-muted-foreground">Manage services, users, and system roles</p>
                  </div>
                  <Button asChild>
                    <a href="/admin">
                      <Settings className="w-4 h-4 mr-2" />
                      Open Admin Panel
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Your Profile
              </CardTitle>
              <CardDescription>
                Your account information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Full Name</p>
                      <p className="text-muted-foreground">{profile?.full_name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-muted-foreground">{profile?.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Company</p>
                      <p className="text-muted-foreground">{profile?.company_name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-muted-foreground">{profile?.phone_number}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-muted-foreground">
                      {new Date(profile?.created_at || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Your Services
              </CardTitle>
              <CardDescription>
                Services you're currently subscribed to
              </CardDescription>
            </CardHeader>
            <CardContent>
              {services.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    You haven't subscribed to any services yet.
                  </p>
                  <Button onClick={() => navigate('/')}>
                    Explore Services
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <Card key={service.id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <Badge 
                            variant={service.status === 'active' ? 'default' : 'secondary'}
                          >
                            {service.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                          {service.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Price</span>
                            <span className="font-bold">${service.price.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Subscribed</span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(service.subscribed_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;