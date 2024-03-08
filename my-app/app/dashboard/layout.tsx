import React from 'react'
import SideBar from '../components/dashboard/SideBar'
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    
  return (
    <section className='relative flex w-full h-full lg:fixed'>
        <div className=" w-full lg:w-64 fixed lg:static ">
           <SideBar  /> 
        </div>
        <div className=" w-[calc(100%-256px)] h-full p-4 ">
            {children}
        </div>
    </section>
  )
}
