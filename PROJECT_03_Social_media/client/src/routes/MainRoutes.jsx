import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../components/Dashboard';
import IsAuthenticated from './IsAuthenticated';

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            <Route path='/' element={
                <IsAuthenticated>
                    <Dashboard />
                </IsAuthenticated>
            } />

            <Route path='/create-post' element={
            <IsAuthenticated>
            </IsAuthenticated>} />

        </Routes>
    )
}

export default MainRoutes;