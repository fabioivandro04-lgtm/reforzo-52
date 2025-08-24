import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };
  return <motion.nav 
    className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.3, 
      ease: "easeOut" 
    }}
  >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-semibold text-gray-900 tracking-tight hover:text-gray-700 transition-colors duration-200">
                Reforzo
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <nav className="flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 py-2"
              >
                Home
              </Link>
              
              <Link 
                to="/about" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 py-2"
              >
                About
              </Link>
              
              {/* Services Dropdown */}
              <div className="relative group">
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 py-2 flex items-center space-x-1">
                  <span>Services</span>
                  <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-sm shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link to="/business-assessment" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150">
                      <div className="font-medium">Business Assessment</div>
                      <div className="text-xs text-gray-500 mt-0.5">Operational efficiency analysis</div>
                    </Link>
                    <Link to="/resolve" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150">
                      <div className="font-medium">Re:Solve</div>
                      <div className="text-xs text-gray-500 mt-0.5">Gmail automation solutions</div>
                    </Link>
                    <Link to="/signal" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150">
                      <div className="font-medium">The Signal</div>
                      <div className="text-xs text-gray-500 mt-0.5">Technology insights & reports</div>
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-medium">Additional Services</div>
                      <div className="px-4 py-2 text-sm text-gray-600">Process Optimization</div>
                      <div className="px-4 py-2 text-sm text-gray-600">Strategic Consulting</div>
                      <div className="px-4 py-2 text-sm text-gray-600">Performance Analytics</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/methodology" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 py-2"
              >
                Methodology
              </Link>
              
              <Link 
                to="/news" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 py-2"
              >
                News
              </Link>
              
              <Link 
                to="/careers" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 py-2"
              >
                Careers
              </Link>
            </nav>
            
            {/* Auth Section */}
            <div className="ml-8 flex items-center space-x-4">
              {!loading && (
                user ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                        <User size={14} className="text-gray-600" />
                      </div>
                      <span className="font-medium">{user.email?.split('@')[0]}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={signOut}
                      className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                    >
                      <LogOut size={14} className="mr-1.5" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    <Link to="/auth">Sign In</Link>
                  </Button>
                )
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu} 
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors duration-200"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div 
        className="lg:hidden border-t border-gray-100"
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          closed: { height: 0, opacity: 0 }
        }}
        transition={{ 
          duration: 0.2, 
          ease: "easeInOut" 
        }}
      >
        <div className="px-4 py-4 bg-white space-y-1">
          <Link 
            to="/" 
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded text-sm font-medium transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          
          <Link 
            to="/about" 
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded text-sm font-medium transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          
          <div className="py-2">
            <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Services</div>
            <Link 
              to="/business-assessment" 
              className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Business Assessment
            </Link>
            <Link 
              to="/resolve" 
              className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Re:Solve
            </Link>
            <Link 
              to="/signal" 
              className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              The Signal
            </Link>
          </div>
          
          <Link 
            to="/methodology" 
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded text-sm font-medium transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Methodology
          </Link>
          
          <Link 
            to="/news" 
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded text-sm font-medium transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            News
          </Link>
          
          <Link 
            to="/careers" 
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded text-sm font-medium transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Careers
          </Link>
          
          {/* Mobile Auth */}
          <div className="pt-3 border-t border-gray-100">
            {!loading && (
              user ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={12} className="text-gray-600" />
                    </div>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors duration-200"
                  >
                    <LogOut size={14} className="inline mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  className="block w-full px-3 py-2 bg-gray-900 text-white text-center rounded text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>;
};
export default Navbar;