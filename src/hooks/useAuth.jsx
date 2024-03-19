import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useCallback } from 'react';

import { LoginContext } from 'src/context/LoginContext';

const useAuth = () => {
  const { setLogged, infoUser, isLogged, setUnLogged } = useContext(LoginContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (isLogged === true && validateToken()) {
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoUser, isLogged, navigate])

  const validateToken = async () => {
    try {
      const response = await axios.post(
        "https://bots-technodevs.online/verifyToken",
        null,
        {
          headers: {
            Authorization: `${infoUser.token}`,
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
      const response = await axios.post('https://bots-technodevs.online:3000/login', {
        username,
        password,
      });
      const { token, userInfo } = response.data;
      setLogged(token, userInfo)
    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
    }
  }, [setLogged]);

  const logout = useCallback(() => {
    setUnLogged()
  }, [setUnLogged]);

  return { login, logout, validateToken };
};

export default useAuth;
