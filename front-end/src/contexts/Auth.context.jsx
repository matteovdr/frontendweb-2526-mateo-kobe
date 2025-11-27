// src/contexts/Auth.context.jsx
import { useState, useCallback, useMemo } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import * as api from '../api';
import { JWT_TOKEN_KEY, AuthContext } from './auth';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(JWT_TOKEN_KEY));
 
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useSWR(token ? 'users/me' : null, api.getById);

  const {
    trigger: doLogin,
    isMutating: loginLoading,
    error: loginError,
  } = useSWRMutation('sessions', api.post);
 
  const {
    trigger: doRegister,
    isMutating: registerLoading,
    error: registerError,
  } = useSWRMutation('users', api.post);

  const setSession = useCallback((newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem(JWT_TOKEN_KEY, newToken);
    } else {
      localStorage.removeItem(JWT_TOKEN_KEY);
    }
  }, []);

  const login = useCallback(
    async (email, password) => {
      try {
        const { token: newToken } = await doLogin({ email, password });
        setSession(newToken);
        return true;
      } catch (error) {
        console.error('Login failed', error);
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
