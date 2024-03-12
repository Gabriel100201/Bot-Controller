import { useState, useEffect, createContext } from "react";

export const LoginContext = createContext();

// eslint-disable-next-line react/prop-types
export const LoginProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") || false
  );
  const [infoLogged, setInfoLogged] = useState(
    localStorage.getItem("token") || null
  );

  useEffect(() => {
    localStorage.setItem("isLogged", isLogged);
    localStorage.setItem("token", infoLogged);
  }, [infoLogged, isLogged]);

  const setLogged = (token) => {
    setIsLogged(true);
    setInfoLogged(token);
  };
  const setUnLogged = () => {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("token");

    setIsLogged(false);
    setInfoLogged(null);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <LoginContext.Provider value={{ isLogged, setLogged, setUnLogged, infoLogged }}>
      {children}
    </LoginContext.Provider>
  );
};
