import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../components/Dashboard';
import IsAuthenticated from './IsAuthenticated';
import CreatePost from '../components/CreatePost';
import AllPosts from '../components/AllPosts';
import MyPosts from '../components/MyPosts';

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            <Route path='/' element={
                <IsAuthenticated>
                    <Dashboard />
                </IsAuthenticated>
            }>
                {/* Nested Routes inside Dashboard */}
                <Route index element={<AllPosts />} />
                <Route path="create-post" element={<CreatePost />} />
                <Route path="my-posts" element={<MyPosts />} />
            </Route>

        </Routes>
    )
}

export default MainRoutes;