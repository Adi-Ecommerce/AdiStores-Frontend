import React,{useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'
import {Navigate} from 'react-router-dom'
function PrivateRoute({chidlren}) {
    const {token}=useContext(AuthContext);
    return token ? chidlren : <Navigate to="/login" replace/>;
}

export default PrivateRoute
