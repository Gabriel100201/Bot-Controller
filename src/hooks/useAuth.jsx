import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useCallback } from 'react';

import { URL_API } from 'src/config/URL_API';
import { LoginContext } from 'src/context/LoginContext';


const useAuth = () => {
  const { setLogged, infoUser, setUnLogged } = useContext(LoginContext);
  const navigate = useNavigate()

  const validateToken = async () => {
    try {
      const response = await axios.post(
        `${URL_API()}/verifyToken`,
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
      const response = await axios.post(`${URL_API()}/login`, {
        username,
        password,
      });
      const { token, userInfo } = response.data;
      setLogged(token, userInfo)
      navigate('/')
    } catch (error) {
      console.log(error.response.data.error)
      throw error
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLogged]);

  const logout = useCallback(() => {
    setUnLogged()
  }, [setUnLogged]);

  return { login, logout, validateToken };
};

export default useAuth;
