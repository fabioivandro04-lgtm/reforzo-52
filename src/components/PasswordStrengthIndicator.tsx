import { getPasswordStrength } from '@/utils/validation';
import { cn } from '@/lib/utils';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

const PasswordStrengthIndicator = ({ password, className }: PasswordStrengthIndicatorProps) => {
  if (!password) return null;
  
  const { level, score } = getPasswordStrength(password);
  
  const getColor = () => {
    switch (level) {
      case 'weak': return 'bg-destructive';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-muted';
    }
  };
  
  const getLabel = () => {
    switch (level) {
      case 'weak': return 'Weak password';
      case 'medium': return 'Medium strength';
      case 'strong': return 'Strong password';
      default: return '';
    }
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-1">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < score ? getColor() : 'bg-muted'
            )}
          />
        ))}
      </div>
      <p className={cn(
        "text-xs",
        level === 'weak' && 'text-destructive',
        level === 'medium' && 'text-yellow-600',
        level === 'strong' && 'text-green-600'
      )}>
        {getLabel()}
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;