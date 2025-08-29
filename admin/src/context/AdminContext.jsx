import { useState, createContext } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [atoken, setAToken] = useState(localStorage.getItem("atoken") || "");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    atoken,
    setAToken,
    backendUrl,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
