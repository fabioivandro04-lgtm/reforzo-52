import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HomeButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showIcon?: boolean;
}

const HomeButton = ({ 
  variant = 'outline', 
  size = 'sm', 
  className = '',
  showIcon = true 
}: HomeButtonProps) => {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link to="/">
        {showIcon && <Home className="w-4 h-4 mr-2" />}
        Home
      </Link>
    </Button>
  );
};

export default HomeButton;