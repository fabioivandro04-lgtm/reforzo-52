import { useState } from 'react';
import { Menu, X, User, LogOut } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent border-b border-border/20 transition-all duration-300">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-foreground">Reforzo</span>
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
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-7 h-7 bg-muted rounded-full flex items-center justify-center">
                      <User size={14} />
                    </div>
                    <span className="font-medium">{user.email?.split('@')[0]}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={signOut}>
                    <LogOut size={14} className="mr-1.5" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button asChild size="sm">
                  <Link to="/auth">Sign In</Link>
                </Button>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
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
                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            <div className="pt-4 mt-4 border-t border-border">
              {!loading && (
                user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-3 py-2 bg-muted rounded-md">
                      <div className="w-8 h-8 bg-muted-foreground/20 rounded-full flex items-center justify-center">
                        <User size={14} />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{user.email?.split('@')[0]}</div>
                        <div className="text-xs text-muted-foreground">Signed in</div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full justify-start"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button asChild size="sm" className="w-full">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
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