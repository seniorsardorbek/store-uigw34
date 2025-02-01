/** @format */

import { Route, Routes, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Default from './layouts/Default.jsx';
import Blank from './layouts/Blank.jsx';
import Intro from './Components/Intro.jsx';
import React, { useEffect } from 'react';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProductDetails from './pages/Product.jsx';
import Orders from './pages/Orders.jsx';
const routes = [
    {
        path: '/',
        element: <Intro />,
        target: 'default',
    },
    {
        path: '/login',
        element: <Login />,
        target: 'blank',
    },
    {
        path: '/register',
        element: <Register />,
        target: 'blank',
    },
    {
        path: '/products/:id',
        element: <ProductDetails />,
        target: 'default',
    },
    {
        path: '/orders',
        element: <Orders />,
        target: 'default',
    },
    
];

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: route.target === 'blank' ? <Blank>{route.element}</Blank> : <Default>{route.element}</Default>,
    };
});

const router = createBrowserRouter(finalRoutes);

const App = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
