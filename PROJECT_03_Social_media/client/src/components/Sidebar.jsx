import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AiImage from '../assets/AI Image.png'
import { BiLogOut } from "react-icons/bi";
import { post } from '../api/Endpoint';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
const Sidebar = () => {
    const {setUser} = useContext(UserContext);
       const logoutHandler = async()=>{
        try {
            const response = await post("/auth/logout");
            if(response.status === 200){
               setUser(null);
               toast.success(response?.data?.message);
            }
        } catch (error) {
            const errorMsg = error?.response?.data?.message || "Something went wrong!";
            toast.error(errorMsg);
        }
    }

    return (
       <div className="flex h-full flex-col justify-between relative">
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
            <button onClick={logoutHandler} className='bg-red-600 flex items-end font-semibold rounded-md  py-2 px-1 duration-300 cursor-pointer  gap-0.5 text-xl'>
                           <BiLogOut className='text-2xl'/> Logout 
            </button>
       </div>
    )
}

export default Sidebar