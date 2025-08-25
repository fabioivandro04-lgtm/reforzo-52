import { useState, useEffect, useRef, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initializing: boolean;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    initializing: true
  });
  
  const initialized = useRef(false);

  // Optimized state updater
  const updateAuthState = useCallback((session: Session | null, isInitial = false) => {
    setState(prev => ({
      ...prev,
      session,
      user: session?.user ?? null,
      loading: false,
      initializing: isInitial ? false : prev.initializing
    }));
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        updateAuthState(session);
        
        // Handle specific auth events for better UX
        if (event === 'SIGNED_IN') {
          // User just signed in, minimal loading state
          setState(prev => ({ ...prev, loading: false }));
        } else if (event === 'SIGNED_OUT') {
          // Clear all state on sign out
          setState({
            user: null,
            session: null,
            loading: false,
            initializing: false
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateAuthState(session, true);
    });

    return () => {
      subscription.unsubscribe();
      initialized.current = false;
    };
  }, [updateAuthState]);

  const signOut = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    const { error } = await supabase.auth.signOut();
    if (error) {
      setState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  }, []);

  return {
    user: state.user,
    session: state.session,
    loading: state.loading,
    initializing: state.initializing,
    signOut,
    isAuthenticated: !!state.user
  };
};