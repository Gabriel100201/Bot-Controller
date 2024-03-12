/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useCallback } from 'react';

import { LoginContext } from 'src/context/LoginContext';

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const { setLogged, infoLogged } = useContext(LoginContext);
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/verifyToken",
        null,
        {
          headers: {
            Authorization: `${infoLogged}`,
          },
        }
      );

      return response.data.valid;
    } catch (error) {
      return false;
    }
  }

  const login = useCallback(async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      // eslint-disable-next-line no-shadow
      const { token } = response.data;
      setToken(token);
      setLogged(token)
      navigate("/")
    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  return { token, login, logout, validateToken };
};

export default useAuth;
