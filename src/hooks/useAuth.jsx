import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useCallback } from 'react';

import { LoginContext } from 'src/context/LoginContext';

const useAuth = () => {
  const { setLogged, infoLogged, setUnLogged } = useContext(LoginContext);
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
      const { token, dockerId } = response.data;
      setLogged(token, dockerId)
      navigate("/")
    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
    }
  }, [setLogged, navigate]);

  const logout = useCallback(() => {
    setUnLogged()
  }, [setUnLogged]);

  return { login, logout, validateToken };
};

export default useAuth;
