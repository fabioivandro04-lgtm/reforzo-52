import { useState } from 'react';
import { Menu, X, User, LogOut, Shield } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { useRoles } from '@/hooks/useRoles';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const { isAdmin } = useRoles();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-black border-b border-gray-800 transition-all duration-300">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-white">Reforzo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Services', path: '/business-assessment' },
              { name: 'News', path: '/news' },
              { name: 'Careers', path: '/careers' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && (
              user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <div className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center">
                      <User size={14} className="text-gray-300" />
                    </div>
                    <span className="font-medium text-white">{user.email?.split('@')[0]}</span>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  {isAdmin && (
                    <Button asChild variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                      <Link to="/admin">
                        <Shield size={14} className="mr-1.5" />
                        Admin
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={signOut} className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                    <LogOut size={14} className="mr-1.5" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button asChild variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild size="sm" className="bg-white text-black hover:bg-gray-200">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-black">
          <div className="px-4 py-4 space-y-2">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Services', path: '/business-assessment' },
              { name: 'News', path: '/news' },
              { name: 'Careers', path: '/careers' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            <div className="pt-4 mt-4 border-t border-gray-800">
              {!loading && (
                user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-3 py-2 bg-gray-800 rounded-md">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <User size={14} className="text-gray-300" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{user.email?.split('@')[0]}</div>
                        <div className="text-xs text-gray-400">Signed in</div>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        Dashboard
                      </Link>
                    </Button>
                    {isAdmin && (
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                          <Shield size={16} className="mr-2" />
                          Admin
                        </Link>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button asChild variant="ghost" size="sm" className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white">
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="w-full bg-white text-black hover:bg-gray-200">
                      <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;