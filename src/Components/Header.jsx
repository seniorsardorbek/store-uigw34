/** @format */
import { Avatar, Typography } from '@material-tailwind/react';
import { Menu, MenuHandler, MenuList, MenuItem, Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
    const [data, setData] = useState(JSON.parse(localStorage.getItem('user') || "null"));
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

                <Menu>
                    <MenuHandler>
                        <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                    </MenuHandler>
                    <MenuList>
                        <MenuItem>
                        {
                            data  && <>
                            <Typography variant="h6">{data?.fullname}</Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                                username: {data?.username} <br />
                            </Typography>
                            </>
                        }
                        </MenuItem>
                        <MenuItem>
                            <Link to={'/login'}>Login</Link>
                        </MenuItem>
                    </MenuList>
                   
                </Menu>
               
            </div>
        </header>
    );
};

export default Header;
