import Navbar from '@/components/Navbar'
import SideBar, { Sidebar } from '@/components/SideBar'
import { getApiLimitCount } from '@/lib/api-limit'
import React from 'react'

async function DashboardLayout ({children} : {children: React.ReactNode}) {
  const apiLimitCount = await getApiLimitCount()
  return (
    <div className = 'h-full relative'>
      <div className = 'hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900'>
      <Sidebar  apiLimitCount = {apiLimitCount}/>
      </div>
      <main className = "md:pl-72">
        <Navbar apiLimitCount = {apiLimitCount}/>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout