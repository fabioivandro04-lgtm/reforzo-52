
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, Suspense, lazy } from "react";
import PageTransition from "./components/PageTransition";
import LoadingAnimation from "./components/LoadingAnimation";

// Lazy load pages to reduce initial bundle size
const Index = lazy(() => import("./pages/Index"));
const BusinessAssessment = lazy(() => import("./pages/BusinessAssessment"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const Methodology = lazy(() => import("./pages/Methodology"));
const Careers = lazy(() => import("./pages/Careers"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const News = lazy(() => import("./pages/News"));
const BlogPostDetail = lazy(() => import("./pages/BlogPostDetail"));
const Auth = lazy(() => import("./pages/Auth"));
const ResolveService = lazy(() => import("./pages/ResolveService"));
const TheSignal = lazy(() => import("./pages/TheSignal"));

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageTransition>
            <Suspense fallback={<LoadingAnimation />}>
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageTransition>
        </BrowserRouter>
      
    </QueryClientProvider>
  );
};

export default App;
