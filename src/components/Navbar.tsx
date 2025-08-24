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
    className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-lg transition-all duration-500 ease-in-out" 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.6, 
      ease: [0.4, 0.0, 0.2, 1] 
    }}
  >
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center w-1/3">
            <Link to="/" className="flex items-center justify-start group">
              <motion.span 
                className="text-2xl font-bold tracking-tight cursor-pointer transition-all duration-500 ease-out hover:scale-110 hover:tracking-wide group-hover:drop-shadow-lg transform hover:-translate-y-0.5 text-gray-900 hover:text-primary"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Reforzo
              </motion.span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex w-1/3 justify-end">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/" className={cn(navigationMenuTriggerStyle(), "text-gray-700 hover:text-gray-900")}>
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/about" className={cn(navigationMenuTriggerStyle(), "text-gray-700 hover:text-gray-900")}>
                      About Us
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <ul className="grid gap-3 p-4 w-[400px] bg-white">
                      <li>
                        <Link to="/business-assessment" className="block p-3 space-y-1 rounded-md hover:bg-gray-100 bg-white">
                          <div className="font-medium text-gray-900">Business Assessment</div>
                          <p className="text-sm text-gray-500">Comprehensive analysis of your operational efficiency</p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/resolve" className="block p-3 space-y-1 rounded-md hover:bg-gray-100 bg-white">
                          <div className="font-medium text-gray-900">Re:Solve</div>
                          <p className="text-sm text-gray-500">Customer support automation directly in Gmail</p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/signal" className="block p-3 space-y-1 rounded-md hover:bg-gray-100 bg-white">
                          <div className="font-medium text-gray-900">The Signal</div>
                          <p className="text-sm text-gray-500">Weekly briefing on the future of technology</p>
                        </Link>
                      </li>
                      <li>
                        <div className="block p-3 space-y-1 rounded-md hover:bg-gray-100 bg-white cursor-pointer">
                          <div className="font-medium text-gray-900">Process Optimization</div>
                          <p className="text-sm text-gray-500">Streamline workflows and boost productivity</p>
                        </div>
                      </li>
                      <li>
                        <div className="block p-3 space-y-1 rounded-md hover:bg-gray-100 bg-white cursor-pointer">
                          <div className="font-medium text-gray-900">Strategic Planning</div>
                          <p className="text-sm text-gray-500">Long-term growth strategy and roadmap development</p>
                        </div>
                      </li>
                      <li>
                        <div className="block p-3 space-y-1 rounded-md hover:bg-gray-100 bg-white cursor-pointer">
                          <div className="font-medium text-gray-900">Performance Analytics</div>
                          <p className="text-sm text-gray-500">Data-driven insights and KPI tracking</p>
                        </div>
                      </li>
                      <li>
                        <div className="block p-3 space-y-1 rounded-md hover:bg-gray-100 bg-white cursor-pointer">
                          <div className="font-medium text-gray-900">Team Development</div>
                          <p className="text-sm text-gray-500">Skills training and organizational capability building</p>
                        </div>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/methodology" className={cn(navigationMenuTriggerStyle(), "text-gray-700 hover:text-gray-900")}>
                      Methodology
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/news" className={cn(navigationMenuTriggerStyle(), "text-gray-700 hover:text-gray-900")}>
                      News
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/careers" className={cn(navigationMenuTriggerStyle(), "text-gray-700 hover:text-gray-900")}>
                      Careers
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Auth Buttons */}
            <div className="ml-4 flex items-center space-x-2">
              {!loading && (
                user ? (
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-gray-700">
                      <User size={16} />
                      <span className="text-sm">{user.email?.split('@')[0]}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={signOut}
                      className="flex items-center space-x-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                ) : (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Link to="/auth">Sign In</Link>
                  </Button>
                )
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Enhanced transitions */}
      <motion.div 
        className="md:hidden overflow-hidden w-full"
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
          className="px-3 pt-2 pb-3 space-y-1 shadow-lg overflow-y-auto max-h-80 transition-colors duration-500 bg-white/95 backdrop-blur-md"
          variants={{
            open: { y: 0 },
            closed: { y: -20 }
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Link to="/" className="block px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-50" onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}>
            Home
          </Link>
          
          <Link to="/about" className="block px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-50" onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}>
            About Us
          </Link>
          
          <Link to="/business-assessment" className="block px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-50" onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}>
            Services
          </Link>
          
          <Link to="/methodology" className="block px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-50" onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}>
            Methodology
          </Link>
          
          <Link to="/news" className="block px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-50" onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}>
            News
          </Link>
          
          <Link to="/careers" className="block px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-50" onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}>
            Careers
          </Link>
          
          <Link to="/business-assessment" className="block px-3 py-1.5 rounded-md text-sm text-gray-700 bg-gray-200 hover:bg-gray-300" onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}>
            Request Assessment
          </Link>
          
          {/* Mobile Auth */}
          {!loading && (
            user ? (
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <div className="px-3 py-1.5 text-sm text-gray-600">
                  {user.email}
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="block px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300" 
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                Sign In
              </Link>
            )
          )}
        </motion.div>
      </motion.div>
    </motion.nav>;
};
export default Navbar;