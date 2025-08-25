import React from 'react';
import { useRoles } from '@/hooks/useRoles';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: rolesLoading } = useRoles();

  if (authLoading || rolesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-sm text-muted-foreground mt-3">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Security: Strict authentication check
  if (!user) {
    console.warn('Unauthorized access attempt to admin route');
    return <Navigate to="/login" replace />;
  }

  // Security: Strict admin role check
  if (!isAdmin) {
    console.warn(`Access denied to admin route for user: ${user.id}`);
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;