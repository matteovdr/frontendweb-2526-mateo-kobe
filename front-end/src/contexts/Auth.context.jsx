// src/contexts/Auth.context.jsx
import { useState, useCallback, useMemo } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import * as api from '../api';
import { JWT_TOKEN_KEY, AuthContext } from './auth';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(JWT_TOKEN_KEY));

  const fetcher = useCallback(async () => {
    if (!token) return null;
    return api.getMe(token);
  }, [token]);

  const { data: user, isLoading: userLoading, error: userError, mutate: mutateUser } = useSWR(
    token ? 'personen/me' : null,
    fetcher,
  );

  const {
    trigger: doLogin,
    isMutating: loginLoading,
    error: loginError,
  } = useSWRMutation('sessions', api.post);
 
  const {
    trigger: doRegister,
    isMutating: registerLoading,
    error: registerError,
  } = useSWRMutation('personen/register', api.post);

  const setSession = useCallback((newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem(JWT_TOKEN_KEY, newToken);
      mutateUser(); // refresh SWR user data
    } else {
      localStorage.removeItem(JWT_TOKEN_KEY);
    }
  }, [mutateUser]);

  const login = useCallback(
    async (email, password) => {
      try {
        console.log('🔐 [Auth] Login attempt', { email, masked_password: '***' });
        console.log('🔐 [Auth] doLogin function:', typeof doLogin);
        
        const response = await doLogin({ email, password });
        
        console.log('✅ [Auth] Login response received:', response);
        console.log('✅ [Auth] Response type:', typeof response);
        console.log('✅ [Auth] Response keys:', Object.keys(response || {}));
        
        const { token: newToken } = response;
        console.log('✅ [Auth] Extracted token:', newToken ? newToken.substring(0, 20) + '...' : 'NO TOKEN!');
        
        if (!newToken) {
          console.error('❌ [Auth] No token in response!');
          return false;
        }
        
        setSession(newToken);
        console.log('✅ [Auth] setSession called');
        return true;
      } catch (error) {
        console.error('❌ [Auth] Login failed with error:', error.message || String(error));
        console.error('❌ [Auth] Error details:', error);
        return false;
      }
    },
    [doLogin, setSession],
  );

  const register = useCallback(
    async (data) => {
      
      try {
        const { token: newToken } = await doRegister(data);
        setSession(newToken);
        return true;
      } catch (error) {
        console.error('Register failed', error);
        return false;
      }
    },
    [doRegister, setSession],
  );

  const logout = useCallback(() => {
    setSession(null);
  }, [setSession]);

  const value = useMemo(
    () => ({
      token,
      user,
      error: loginError || userError || registerError,
      loading: loginLoading || userLoading || registerLoading,
      isAuthed: Boolean(token),
      ready: !userLoading,
      login,
      logout,
      register,
    }),
    [
      token,
      user,
      loginError,
      loginLoading,
      userError,
      userLoading,
      registerError,
      registerLoading,
      login,
      logout,
      register,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
