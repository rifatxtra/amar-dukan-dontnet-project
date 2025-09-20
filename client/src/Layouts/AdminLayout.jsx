import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../Components/AdminNavbar'

export default function AdminLayout() {
  return (
    <div className='bg-white w-full'>
        <AdminNavbar/>
        <Outlet className="w-[full]"/>
    </div>
  )
}
