import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [loginInfo, setLoginInfo] = useState({
    token: "",
    loggedIn: false,
  });

  return (
    <UserContext.Provider value={{ loginInfo, setLoginInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}