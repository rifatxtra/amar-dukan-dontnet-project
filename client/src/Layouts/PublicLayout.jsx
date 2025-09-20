
import React from 'react'
import { Outlet } from 'react-router-dom'
import PublicNavbar from '../Components/PublicNavbar'
import PublicFooter from '../Components/PublicFooter'

export default function PublicLayout() {
  return (
    <div className='bg-white w-[100vw]'>
        <PublicNavbar/>
        <Outlet className="w-[full]"/>
        <PublicFooter/>
    </div>
  )
}
