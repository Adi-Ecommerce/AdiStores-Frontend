import React from 'react'
import {createContext,useState,useEffect} from "react";

const AuthContext = createContext();
export default AuthContext

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (!storedUser || storedUser === "undefined") return null;
            return JSON.parse(storedUser);
        } catch (error) {
            console.error("Error parsing stored user:", error);
            return null;
        }
    });
    const [productsId,setProductId] = useState(67)
    const [token,setToken] = useState(localStorage.getItem('token') || null);

    useEffect(()=>{
        if(token){
            localStorage.setItem('token',token)

        }else {
            localStorage.removeItem('token')
        }
    },[token])

    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
    }, [user]);

    const login = (userData , jwttoken) => {
        setUser(userData);
        setToken(jwttoken);
    }
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    }
    const value = {user,token,login,logout,productsId,setProductId};

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}


