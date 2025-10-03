import React from 'react'
import {createContext,useState,useEffect} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [token,setToken] = useState(localStorage.getItem('token') || null);
    useEffect(()=>{
        if(token){
            localStorage.setItem('token',token)

        }else {
            localStorage.removeItem('token')
        }
    },[token])
    const login = (userData , jwttoken) => {
        setUser(userData);
        setToken(jwttoken);
    }
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    }
    const value = {user,token,login,logout};

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}


