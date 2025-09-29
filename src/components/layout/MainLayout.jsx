import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../common/Header'
import Footer from '../common/Footer'

function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header stays at the top */}
            <Header />

            {/* Main content grows to fill space */}
            <main className="flex-1 min-h-full">
                <Outlet />
            </main>

            {/* Footer stays at the bottom */}
            <Footer />
        </div>
    )
}

export default MainLayout
