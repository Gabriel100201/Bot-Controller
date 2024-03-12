/* eslint-disable import/no-extraneous-dependencies */
import axios from "axios";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../../context/LoginContext";

// eslint-disable-next-line react/prop-types
export const ProtectedView = ({ children }) => {
  const { isLogged, infoLogged } = useContext(LoginContext);

  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/verifyToken", // Reemplaza con la URL de tu servidor
        null,
        {
          headers: {
            Authorization: `${infoLogged}`, // Envia el token en el encabezado
          },
        }
      );

      return response.data.valid;
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    const checkToken = async () => {
      console.log("TOKEN VALIDATE: ", await validateToken())
      if (!isLogged || !(await validateToken())) {
        navigate("/login");
      }
    };

    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged, infoLogged, navigate]);

  return <div>{children}</div>;
};