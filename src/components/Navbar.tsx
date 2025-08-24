import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
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
  return <motion.nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full", isScrolled ? "bg-white shadow-sm" : "bg-black")} initial={{
    opacity: 1,
    y: 0
  }} animate={{
    opacity: 1,
    y: 0
  }}>
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center w-1/3">
            <Link to="/" className="flex items-center justify-start group">
              <span className={cn("text-2xl font-bold tracking-tight transition-all duration-300 cursor-pointer", "hover:scale-110 hover:tracking-wide", "group-hover:drop-shadow-lg", "transform hover:-translate-y-0.5", isScrolled ? "text-gray-900 hover:text-primary" : "text-white hover:text-primary-foreground")}>
                Reforzo
              </span>
            </Link>
          </div>
          
          {/* Center Image */}
          <div className="hidden md:flex w-1/3 justify-center">
            <img 
              src="/lovable-uploads/3841b91f-6deb-4b58-849b-267bbd7cbed4.png" 
              alt="Center Logo" 
              className="h-4 sm:h-6 md:h-8 lg:h-10 xl:h-12 w-auto transition-all duration-300 hover:scale-110"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex w-1/3 justify-end">
            <NavigationMenu className={cn(isScrolled ? "" : "text-white")}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/" className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/about" className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      About Us
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
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
                    <Link to="/methodology" className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      Methodology
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/news" className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      News
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/careers" className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
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
                    <div className={cn("flex items-center space-x-1", isScrolled ? "text-gray-700" : "text-white")}>
                      <User size={16} />
                      <span className="text-sm">{user.email?.split('@')[0]}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={signOut}
                      className={cn(
                        "flex items-center space-x-1",
                        isScrolled 
                          ? "border-gray-300 text-gray-700 hover:bg-gray-50" 
                          : "border-gray-300 text-gray-700 hover:bg-white"
                      )}
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
                    className={cn(
                      isScrolled 
                        ? "border-gray-300 text-gray-700 hover:bg-gray-50" 
                        : "border-white text-white hover:bg-white hover:text-gray-900"
                    )}
                  >
                    <Link to="/auth">Sign In</Link>
                  </Button>
                )
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className={cn("focus:outline-none", isScrolled ? "text-gray-700" : "text-white")}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Reduced height and simplified */}
      <div className={cn("md:hidden transition-all duration-300 overflow-hidden w-full", isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0")}>
        <div className={cn("px-3 pt-2 pb-3 space-y-1 shadow-sm overflow-y-auto max-h-80", isScrolled ? "bg-white" : "bg-black")}>
          <Link to="/" className={cn("block px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}>
            Home
          </Link>
          
          <Link to="/about" className={cn("block px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}>
            About Us
          </Link>
          
          <Link to="/business-assessment" className={cn("block px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}>
            Services
          </Link>
          
          <Link to="/methodology" className={cn("block px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}>
            Methodology
          </Link>
          
          <Link to="/news" className={cn("block px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}>
            News
          </Link>
          
          <Link to="/careers" className={cn("block px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}>
            Careers
          </Link>
          
          <Link to="/business-assessment" className={cn("block px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 bg-gray-200 hover:bg-gray-300" : "text-white bg-gray-700 hover:bg-gray-600")} onClick={() => {
          setIsMenuOpen(false);
          window.scrollTo(0, 0);
        }}>
            Request Assessment
          </Link>
          
          {/* Mobile Auth */}
          {!loading && (
            user ? (
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <div className={cn("px-3 py-1.5 text-sm", isScrolled ? "text-gray-600" : "text-gray-300")}>
                  {user.email}
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className={cn("block w-full text-left px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className={cn("block px-3 py-1.5 rounded-md text-sm font-medium", isScrolled ? "text-gray-700 bg-gray-200 hover:bg-gray-300" : "text-white bg-blue-600 hover:bg-blue-700")} 
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                Sign In
              </Link>
            )
          )}
        </div>
      </div>
    </motion.nav>;
};
export default Navbar;