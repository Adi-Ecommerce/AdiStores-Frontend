import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../common/Header'
import Footer from '../common/Footer'

function MainLayout() {
  return (
    <div className='flex flex-col min-h-screen justify-between'>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default MainLayout
