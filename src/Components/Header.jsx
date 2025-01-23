/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl font-bold">Logo</h1>

                {/* Navigation */}
                <nav>
                    <ul className="flex space-x-8">
                        <li>
                            <Link to="/" className="hover:text-blue-400 transition">
                                Home
                            </Link>
                        </li>
                        
                        <li>
                            <Link to="/about" className="hover:text-blue-400 transition">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-blue-400 transition">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Login Button */}
                <Link to={'/login'} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    Login
                </Link>
            </div>
        </header>
    );
};

export default Header;
