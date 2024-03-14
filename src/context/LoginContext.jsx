import { useState, useEffect, createContext } from "react";

export const LoginContext = createContext();

// eslint-disable-next-line react/prop-types
export const LoginProvider = ({ children }) => {
  // Obtension de valores almacenados en la base de datos
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") || false
  );
  const [infoUser, setInfoUser] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );

  // Seteo de valores cuando alguna dependencia cambia
  useEffect(() => {
    localStorage.setItem("isLogged", isLogged);
    localStorage.setItem("userInfo", JSON.stringify(infoUser));
  }, [infoUser, isLogged]);

  // Login y seteo de info
  const setLogged = (token, uInfo) => {
    setIsLogged(true);
    setInfoUser({ token, userInfo: uInfo });
  };

  // Unloged y borrado de la info
  const setUnLogged = () => {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("userInfo");

    setIsLogged(false);
    setInfoUser(null);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <LoginContext.Provider value={{ isLogged, setLogged, setUnLogged, infoUser }}>
      {children}
    </LoginContext.Provider>
  );
};
