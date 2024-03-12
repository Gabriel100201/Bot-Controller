/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "src/hooks/useAuth";

import { LoginContext } from "../../context/LoginContext";

// eslint-disable-next-line react/prop-types
export const ProtectedView = ({ children }) => {
  const { isLogged, infoLogged } = useContext(LoginContext);
  const { validateToken } = useAuth()
  const navigate = useNavigate();


  useEffect(() => {
    const checkToken = async () => {
      if (!isLogged || !(await validateToken())) {
        navigate("/login");
      }
    };

    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged, infoLogged, navigate]);

  return <div>{children}</div>;
};