import React from 'react'
import { NavLink } from 'react-router-dom'
import AiImage from '../assets/AI Image.png'
const Sidebar = () => {
    return (
       <div className="flex justify-between">
         <div className='flex items-center flex-col  gap-4'>
            <div className="flex items-center gap-2">
                <img className='w-[40px] h-[40px] rounded-full' src={AiImage} />
                <h1 className='text-[16px] hover:border-b-1 duration-300 hover:border-purple-400 cursor-pointer'>ImageToCaption</h1>
            </div>

            <div className="link-container w-full flex flex-col gap-5">
                <NavLink to={'/'} className={(e)=>e.isActive ? "bg-blue-500 duration-300 font-semibold py-2 px-2 rounded-md":"bg-gray-600  font-semibold py-2 duration-300 px-2 rounded-md"}>
                    AllPosts
                </NavLink>
                   <NavLink to={'/create-post'} className={(e)=>e.isActive ? "bg-blue-500 duration-300 font-semibold py-2 px-2 rounded-md":"bg-gray-600  font-semibold duration-300 py-2 px-2 rounded-md"}>
                    Create Post
                </NavLink>
                 <NavLink to={'/my-posts'} className={(e)=>e.isActive ? "bg-blue-500 duration-300 font-semibold py-2 px-2 rounded-md":"bg-gray-600  font-semibold duration-300 py-2 px-2 rounded-md"}>
                    My Posts
                </NavLink>
            </div>

        </div>
        <div className="logout">
            
        </div>
       </div>
    )
}

export default Sidebar