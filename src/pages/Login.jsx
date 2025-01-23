/** @format */

// Login.jsx
import React, { useState } from 'react';
import api from '../shared/axios.js';
import Cookies from 'js-cookie';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    console.log(formData);
    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/login', formData)
            .then((res) => {
                console.log(res.data);
            Cookies.set('passport', res.data?.token);
            localStorage.setItem('user' , JSON.stringify(res.data?.user))
            window.location.href = '/';
            })
            .catch((err) => {
                console.log(err);
            });
        // Handle form submission logic here (e.g., API call)
        console.log(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                            Login
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Don’t have an account?{' '}
                            <a href="/register" className="text-blue-500 hover:text-blue-700">
                                Register
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
