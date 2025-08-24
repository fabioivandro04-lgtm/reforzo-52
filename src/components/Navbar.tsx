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
    className="fixed top-0 left-0 right-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-gray-200/20 shadow-sm"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.6, 
      ease: [0.4, 0.0, 0.2, 1] 
    }}
  >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <motion.span 
                className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                whileHover={{ letterSpacing: "0.05em" }}
                transition={{ duration: 0.3 }}
              >
                Reforzo
              </motion.span>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <nav className="flex items-center space-x-1">
              <Link 
                to="/" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                Home
              </Link>
              
              <Link 
                to="/about" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                About
              </Link>
              
              {/* Services Dropdown */}
              <div className="relative group">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center space-x-1">
                  <span>Services</span>
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                
                <motion.div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                >
                  <div className="p-4 space-y-2">
                    <Link to="/business-assessment" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="font-semibold text-gray-900 text-sm">Business Assessment</div>
                      <p className="text-xs text-gray-500 mt-1">Comprehensive operational analysis</p>
                    </Link>
                    <Link to="/resolve" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="font-semibold text-gray-900 text-sm">Re:Solve</div>
                      <p className="text-xs text-gray-500 mt-1">Gmail automation tools</p>
                    </Link>
                    <Link to="/signal" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="font-semibold text-gray-900 text-sm">The Signal</div>
                      <p className="text-xs text-gray-500 mt-1">Tech briefings & insights</p>
                    </Link>
                  </div>
                </motion.div>
              </div>
              
              <Link 
                to="/methodology" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                Methodology
              </Link>
              
              <Link 
                to="/news" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                News
              </Link>
              
              <Link 
                to="/careers" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                Careers
              </Link>
            </nav>
            
            {/* Auth Section */}
            <div className="ml-6 flex items-center space-x-3">
              {!loading && (
                user ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <User size={12} className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{user.email?.split('@')[0]}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={signOut}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                      <LogOut size={14} className="mr-1" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <Link to="/auth">Sign In</Link>
                  </Button>
                )
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <motion.button 
            onClick={toggleMenu} 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 45 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div 
        className="lg:hidden overflow-hidden"
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          closed: { height: 0, opacity: 0 }
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.4, 0.0, 0.2, 1] 
        }}
      >
        <motion.div 
          className="px-4 pt-4 pb-6 bg-white/95 backdrop-blur-xl border-t border-gray-200/50"
          variants={{
            open: { y: 0 },
            closed: { y: -20 }
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="space-y-2">
            <Link 
              to="/" 
              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link 
              to="/about" 
              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            <div className="space-y-1">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Services</div>
              <Link 
                to="/business-assessment" 
                className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Business Assessment
              </Link>
              <Link 
                to="/resolve" 
                className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Re:Solve
              </Link>
              <Link 
                to="/signal" 
                className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                The Signal
              </Link>
            </div>
            
            <Link 
              to="/methodology" 
              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Methodology
            </Link>
            
            <Link 
              to="/news" 
              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              News
            </Link>
            
            <Link 
              to="/careers" 
              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Careers
            </Link>
            
            {/* Mobile Auth */}
            <div className="pt-4 border-t border-gray-200">
              {!loading && (
                user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{user.email}</span>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      <LogOut size={16} className="inline mr-2" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/auth" 
                    className="block w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.nav>;
};
export default Navbar;