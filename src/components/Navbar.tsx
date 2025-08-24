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
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.6, 
      ease: [0.4, 0.0, 0.2, 1] 
    }}
  >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-start h-14 sm:h-16 lg:h-18 w-full gap-8 lg:gap-12">
          {/* Logo - Responsive sizing */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link to="/" className="flex items-center space-x-2 group">
            </Link>
          </motion.div>
          
          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <div className="hidden xl:flex items-center">
            <motion.nav 
              className="flex items-center space-x-6 lg:space-x-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Methodology', path: '/methodology' },
                { name: 'News', path: '/news' },
                { name: 'Careers', path: '/careers' }
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <Link 
                    to={item.path}
                    className="relative text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300 py-2 group"
                  >
                    {item.name}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
              
              {/* Animated Services Dropdown */}
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <motion.button 
                  className="relative text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300 py-2 flex items-center space-x-1 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <span>Services</span>
                  <motion.svg 
                    className="w-3 h-3" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                
                <motion.div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible z-50"
                  initial={{ y: 10, opacity: 0, scale: 0.95 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="py-3">
                    {[
                      { name: 'Business Assessment', path: '/business-assessment', desc: 'Operational efficiency analysis' },
                      { name: 'Re:Solve', path: '/resolve', desc: 'Gmail automation solutions' },
                      { name: 'The Signal', path: '/signal', desc: 'Technology insights & reports' }
                    ].map((service, index) => (
                      <motion.div
                        key={service.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <Link 
                          to={service.path} 
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200 group"
                        >
                          <motion.div 
                            className="font-medium text-gray-900 group-hover:text-gray-700"
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            {service.name}
                          </motion.div>
                          <div className="text-xs text-gray-500 mt-0.5">{service.desc}</div>
                        </Link>
                      </motion.div>
                    ))}
                    
                    <motion.div 
                      className="border-t border-gray-100 mt-3 pt-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-medium">Additional Services</div>
                      {['Process Optimization', 'Strategic Consulting', 'Performance Analytics'].map((service, index) => (
                        <motion.div 
                          key={service}
                          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                          whileHover={{ x: 4 }}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                        >
                          {service}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.nav>
            
            {/* Auth Section - Responsive */}
            <motion.div 
              className="ml-6 lg:ml-8 flex items-center space-x-3 lg:space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {!loading && (
                user ? (
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="flex items-center space-x-2 text-sm text-gray-600"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1, backgroundColor: "#e5e7eb" }}
                        transition={{ duration: 0.2 }}
                      >
                        <User size={14} className="text-gray-600" />
                      </motion.div>
                      <span className="font-medium hidden lg:block">{user.email?.split('@')[0]}</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={signOut}
                        className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                      >
                        <LogOut size={14} className="mr-1.5" />
                        <span className="hidden lg:inline">Sign Out</span>
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      asChild
                      variant="default"
                      size="sm"
                      className="bg-gray-900 hover:bg-gray-800 text-white px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-300 hover:shadow-md"
                    >
                      <Link to="/auth">Sign In</Link>
                    </Button>
                  </motion.div>
                )
              )}
            </motion.div>
          </div>
          
          {/* Mobile/Tablet menu button - Positioned to the right */}
          <div className="xl:hidden ml-auto">
            <motion.button 
              onClick={toggleMenu} 
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile/Tablet Navigation Menu */}
      <motion.div 
        className="xl:hidden border-t border-gray-100 overflow-hidden"
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { 
            height: "auto", 
            opacity: 1,
            transition: {
              height: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] },
              opacity: { duration: 0.3, delay: 0.1 }
            }
          },
          closed: { 
            height: 0, 
            opacity: 0,
            transition: {
              height: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
              opacity: { duration: 0.2 }
            }
          }
        }}
      >
        <motion.div 
          className="px-3 sm:px-4 py-4 bg-white space-y-1 max-h-screen overflow-y-auto"
          variants={{
            open: { 
              y: 0,
              transition: {
                y: { duration: 0.4, delay: 0.1, ease: "easeOut" },
                staggerChildren: 0.05,
                delayChildren: 0.2
              }
            },
            closed: { 
              y: -20,
              transition: {
                y: { duration: 0.3, ease: "easeIn" }
              }
            }
          }}
        >
          {/* Main Navigation Items */}
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Methodology', path: '/methodology' },
            { name: 'News', path: '/news' },
            { name: 'Careers', path: '/careers' }
          ].map((item, index) => (
            <motion.div
              key={item.name}
              variants={{
                open: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.3, ease: "easeOut" }
                },
                closed: { 
                  opacity: 0, 
                  x: -20,
                  transition: { duration: 0.2, ease: "easeIn" }
                }
              }}
            >
              <Link 
                to={item.path}
                className="block px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg text-sm font-medium transition-all duration-200 hover:translate-x-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          
          {/* Services Section */}
          <motion.div 
            className="py-2"
            variants={{
              open: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.3, ease: "easeOut" }
              },
              closed: { 
                opacity: 0, 
                x: -20,
                transition: { duration: 0.2, ease: "easeIn" }
              }
            }}
          >
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Services</div>
            {[
              { name: 'Business Assessment', path: '/business-assessment' },
              { name: 'Re:Solve', path: '/resolve' },
              { name: 'The Signal', path: '/signal' }
            ].map((service, index) => (
              <motion.div
                key={service.name}
                variants={{
                  open: { 
                    opacity: 1, 
                    x: 0,
                    transition: { duration: 0.3, delay: index * 0.05, ease: "easeOut" }
                  },
                  closed: { 
                    opacity: 0, 
                    x: -20,
                    transition: { duration: 0.2, ease: "easeIn" }
                  }
                }}
              >
                <Link 
                  to={service.path}
                  className="block px-3 py-2 ml-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:translate-x-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {service.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Mobile Auth Section */}
          <motion.div 
            className="pt-4 mt-4 border-t border-gray-100"
            variants={{
              open: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.4, delay: 0.3, ease: "easeOut" }
              },
              closed: { 
                opacity: 0, 
                y: 20,
                transition: { duration: 0.2, ease: "easeIn" }
              }
            }}
          >
            {!loading && (
              user ? (
                <div className="space-y-3">
                  <motion.div 
                    className="flex items-center space-x-3 px-3 py-3 bg-gray-50 rounded-lg"
                    whileHover={{ scale: 1.01, backgroundColor: "#f3f4f6" }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <User size={14} className="text-gray-600" />
                    </motion.div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.email?.split('@')[0]}</div>
                      <div className="text-xs text-gray-500">Signed in</div>
                    </div>
                  </motion.div>
                  <motion.button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-3 py-3 text-left text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium group"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <LogOut size={16} className="inline mr-2 group-hover:animate-pulse" />
                    Sign Out
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Link 
                    to="/auth" 
                    className="block w-full px-4 py-3 bg-gray-900 text-white text-center rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-200 hover:shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.nav>;
};
export default Navbar;