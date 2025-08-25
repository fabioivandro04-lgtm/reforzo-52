import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { validateEmail, validatePassword, detectBot } from '@/utils/validation';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';
import SEO from '@/components/SEO';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, initializing } = useAuth();
  const formStartTime = useRef(Date.now());

  useEffect(() => {
    if (!initializing && user) {
      navigate('/dashboard');
    }
  }, [user, navigate, initializing]);

  // Real-time validation
  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'email':
        const emailValidation = validateEmail(value);
        if (!emailValidation.isValid && value) {
          newErrors.email = emailValidation.message || '';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'password':
        const passwordValidation = validatePassword(value);
        if (!passwordValidation.isValid && value) {
          newErrors.password = passwordValidation.message || '';
        } else {
          delete newErrors.password;
        }
        
        // Also check confirm password if it exists
        if (confirmPassword && confirmPassword !== value) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else if (confirmPassword) {
          delete newErrors.confirmPassword;
        }
        break;
        
      case 'confirmPassword':
        if (value !== password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess(false);

    // Bot detection
    if (detectBot(formStartTime.current)) {
      setErrors({ general: 'Please take a moment to review your information.' });
      setLoading(false);
      return;
    }

    // Final validation
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    
    const validationErrors: Record<string, string> = {};
    
    if (!emailValidation.isValid) {
      validationErrors.email = emailValidation.message || '';
    }
    
    if (!passwordValidation.isValid) {
      validationErrors.password = passwordValidation.message || '';
    }
    
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const redirectUrl = `${window.location.origin}/onboarding`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            email_confirm: true
          }
        }
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          setErrors({ 
            general: 'An account with this email already exists. Please sign in instead.' 
          });
        } else if (error.message.includes('Password should be at least')) {
          setErrors({ 
            password: 'Password must meet security requirements' 
          });
        } else {
          setErrors({ general: error.message });
        }
      } else if (data.user && !data.session) {
        // Email confirmation required
        setEmailSent(true);
        setSuccess(true);
        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account before signing in.",
          duration: 6000,
        });
      } else if (data.session) {
        // Auto-signed in (email confirmation disabled)
        setSuccess(true);
        toast({
          title: "Welcome to Reforzo!",
          description: "Your account has been created successfully.",
        });
        navigate('/onboarding');
      }
    } catch (err) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Show success state if email was sent
  if (success && emailSent) {
    return (
      <>
        <SEO 
          title="Check Your Email - Reforzo"
          description="Please verify your email to complete your Reforzo account setup"
        />
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
              <CardDescription>
                We've sent a verification link to <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground text-center">
                <p>Click the link in the email to verify your account and complete the setup process.</p>
                <p className="mt-2">Can't find the email? Check your spam folder.</p>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm">
                  <Link to="/login" className="text-primary hover:underline">
                    Already verified? Sign in
                  </Link>
                </p>
                <p>
                  <Link to="/" className="text-muted-foreground hover:underline text-sm">
                    ← Back to home
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Sign Up - Reforzo"
        description="Create your Reforzo account to access our business consulting services"
      />
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Join Reforzo to access our premium business services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateField('email', e.target.value);
                  }}
                  className={errors.email ? 'border-destructive' : ''}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validateField('password', e.target.value);
                    }}
                    className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
                <PasswordStrengthIndicator password={password} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      validateField('confirmPassword', e.target.value);
                    }}
                    className={errors.confirmPassword ? 'border-destructive pr-10' : 'pr-10'}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
              </div>
              
              {errors.general && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || Object.keys(errors).length > 0}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
              <p className="mt-4">
                <Link to="/" className="text-muted-foreground hover:underline">
                  ← Back to home
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Signup;