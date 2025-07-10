import axios from "axios";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const axiosGet = async () => {
      try {
        const { data } = await axios.get("/users/profile", {
          withCredentials: true,
        });
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário: ", error);
        setUser(null);
      }
    };

    axiosGet();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
