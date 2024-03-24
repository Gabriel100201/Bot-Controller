/* eslint-disable import/no-extraneous-dependencies */
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAuth from "src/hooks/useAuth";

import { LoginContext } from "../../context/LoginContext";

// eslint-disable-next-line react/prop-types
export const ProtectedView = ({ children }) => {
  const { isLogged } = useContext(LoginContext);
  const { validateToken } = useAuth();
  const location = useLocation();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const isValidToken = await validateToken();
      if (!isLogged || !isValidToken) {
        navigate("/login");
      } else {
        setIsLoading(false);
      }
    };
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};