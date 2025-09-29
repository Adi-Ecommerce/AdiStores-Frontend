import React from 'react'
import { Outlet } from 'react-router-dom';
import logo from "../../assets/ChatGPT_Image_Sep_27__2025__12_04_37_AM-removebg-preview (1).png";
function AuthLayout() {
  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-3 py-10">
        <img src={logo} alt="" className='h-15 w-fit'/>
      <div className="w-full max-w-[60%] lg:max-w-[50%] bg-white p-8 rounded-xl shadow-md border-2 border-[#dee1e6ff]">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout