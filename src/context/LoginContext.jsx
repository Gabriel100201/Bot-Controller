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
  const [dockerId, setDockerId] = useState(localStorage.getItem("dockerId") || null);

  useEffect(() => {
    localStorage.setItem("isLogged", isLogged);
    localStorage.setItem("token", infoLogged);
    localStorage.setItem("dockerId", dockerId);
  }, [infoLogged, isLogged, dockerId]);

  const setLogged = (token, id) => {
    setIsLogged(true);
    setInfoLogged(token);
    setDockerId(id);
  };
  const setUnLogged = () => {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("token");
    localStorage.removeItem("dockerId");

    setIsLogged(false);
    setInfoLogged(null);
    setDockerId(null)
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <LoginContext.Provider value={{ isLogged, setLogged, setUnLogged, infoLogged, dockerId, setDockerId }}>
      {children}
    </LoginContext.Provider>
  );
};
