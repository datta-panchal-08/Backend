import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex gap-3">
      <div className="w-[15%] bg-gray-800 py-5 px-5">
        <Sidebar />
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>

  )
}

export default Dashboard