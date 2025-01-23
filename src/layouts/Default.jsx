import React, { useEffect } from 'react'
import Header from "../Components/Header.jsx"
import Footer from "../Components/Footer.jsx"
import Cookies from "js-cookie"

const Default = ({ children }) => {
    useEffect(() => {
        const token = Cookies.get("passport") || null
        if(!token){
            window.location.href = '/login'
        }
       }, [])
    return (
        <div>
            <Header />
            {children}
            <Footer />
            
        </div>
    )
}

export default Default