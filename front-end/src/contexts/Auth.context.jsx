// src/contexts/Auth.context.jsx
import { useState, useCallback, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import * as api from '../api';
import { setUnauthorizedHandler } from '../api';
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

  useEffect(() => {
    setUnauthorizedHandler(() => setSession(null));
    return () => setUnauthorizedHandler(undefined);
  }, [setSession]);

  useEffect(() => {
    if (userError?.response?.status === 401) {
      setSession(null);
    }
  }, [userError, setSession]);

  const login = useCallback(
    async (email, password) => {
      try {
        const response = await doLogin({ email, password });

        const { token: newToken } = response;

        if (!newToken) {
          return false;
        }
        
        setSession(newToken);
        return true;
      } catch {
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
      } catch {
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
