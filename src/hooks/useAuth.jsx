/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { useState, useContext, useCallback } from 'react';

import { LoginContext } from 'src/context/LoginContext';

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const { setLogged } = useContext(LoginContext);

  const login = useCallback(async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      // eslint-disable-next-line no-shadow
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
      setLogged(token)
    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  return { token, login, logout };
};

export default useAuth;
