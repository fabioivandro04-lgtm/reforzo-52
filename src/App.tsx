
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, Suspense, lazy } from "react";
import PageTransition from "./components/PageTransition";
import LoadingAnimation from "./components/LoadingAnimation";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load pages to reduce initial bundle size
const Index = lazy(() => import("./pages/Index"));
const BusinessAssessment = lazy(() => import("./pages/BusinessAssessment"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const Methodology = lazy(() => import("./pages/Methodology"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const News = lazy(() => import("./pages/News"));
const BlogPostDetail = lazy(() => import("./pages/BlogPostDetail"));
const Auth = lazy(() => import("./pages/Auth"));
const ResolveService = lazy(() => import("./pages/ResolveService"));
const TheSignal = lazy(() => import("./pages/TheSignal"));

// Import Careers directly to avoid lazy loading issues
import Careers from "./pages/Careers";

// New auth pages
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));

// Import Protected routes synchronously to avoid dynamic import fetch issues
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageTransition>
              <Suspense fallback={<LoadingSpinner size="md" text="Loading page..." className="min-h-screen" />}>
                <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/resolve" element={<ResolveService />} />
                <Route path="/signal" element={<TheSignal />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/business-assessment" element={<BusinessAssessment />} />
                <Route path="/about" element={<About />} />
                <Route path="/methodology" element={<Methodology />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:slug" element={<BlogPostDetail />} />
                
                {/* New auth routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Protected routes */}
                <Route path="/onboarding" element={
                  <Suspense fallback={<LoadingSpinner size="md" text="Loading onboarding..." className="min-h-screen" />}>
                    <ProtectedRoute>
                      <Onboarding />
                    </ProtectedRoute>
                  </Suspense>
                } />
                <Route path="/dashboard" element={
                  <Suspense fallback={<LoadingSpinner size="md" text="Loading dashboard..." className="min-h-screen" />}>
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  </Suspense>
                } />
                <Route path="/admin" element={
                  <Suspense fallback={<LoadingSpinner size="md" text="Loading admin panel..." className="min-h-screen" />}>
                    <AdminRoute>
                      <AdminPanel />
                    </AdminRoute>
                  </Suspense>
                } />
                
                <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </PageTransition>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
