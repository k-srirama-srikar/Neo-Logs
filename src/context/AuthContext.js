import { createContext, useState, useEffect } from "react";
// import {jwtDecode} from "jwt-decode";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (on page refresh)
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUser({ username });
    }
    // console.log("User data:",token);
    // try{
    //     const decoded = jwtDecode(token);
    //     console.log("User name:", decoded);
    // }catch (error) {
    //     console.error("Invalid token", error);
    //     // localStorage.removeItem("token");
    //   }

  }, []);

  const login = (username, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setUser({ username });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
