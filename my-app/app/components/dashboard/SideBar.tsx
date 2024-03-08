"use client"
import { GiGraduateCap } from "react-icons/gi"; 
import { BsCalendar2EventFill } from "react-icons/bs"; 
import { MdArticle } from "react-icons/md"; 
import { MdDashboard } from "react-icons/md"; 
import Image from 'next/image';
import Logo from '@/public/assets/logo.png'
import HorisontalLogo from './HorisontalLogo';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { Avatar } from "@chakra-ui/react";
import {useEffect, useState} from 'react'
import useAuthHttp from '@/utils/useAuthHttp'
export default function SideBar() {
    const pathname = usePathname()
    const [user,setUser] = useState<any>()
    const useAuth =useAuthHttp()
    const routes ={ 
        menu:[
        {
            name:'Dashboard',
            href:'/dashboard',
            icon:<MdDashboard />
        },
        {
            name:'Posts',
            href:'/dashboard/posts',
            icon:<MdArticle />
        },
        {
            name:'Events',
            href:'/dashboard/events',
            icon:<BsCalendar2EventFill />
        },
        
        

    ],
    settings:[
        {
            name:'Settings',
            href:'/dashboard/settings'
        },
        {
            name:'Porfile',
            href:'/porfile'
        },
        {
            name:'Logout',
            href:'/logout'
        }
],
    edu:[
        
            {
                name:'Programs',
                href:'/',
                icon:<GiGraduateCap />
            }, 
            {
                name:'Students',
                href:'/',
             icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                
            }
        
    ]
}
useEffect(() => {
async function fetchUser(){
try{
  const user = (await useAuth.get('/auth/verifytoken')).data?.user
  setUser(user)
}catch(err){
  console.error(err)
}
}

  fetchUser()
}, [])
  return (
    <>
    <div className=" relative min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
  <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
    <div className="flex items-center justify-center h-14 ">
    <HorisontalLogo/>
    </div>
    <div className="overflow-y-auto overflow-x-hidden flex-grow">
      <ul className="flex flex-col py-4 space-y-1">
        <li className="px-5">
          <div className="flex flex-row items-center h-8">
            <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
          </div>
        </li>
        {
            routes.menu.map(route=>(
                <li key={route.name} >
          <Link href={route.href} 
          className={`
          relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 
          text-gray-600 hover:text-gray-800 ${route.href===pathname?'border-emerald-500 bg-gray-50 ':'border-transparent'}
           border-l-4  hover:border-emerald-500 pr-6`
           }>
            <span className="inline-flex justify-center items-center ml-4">
              <span className="w-5 h-5 text-lg" >
                {route.icon}
              </span>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">{route.name}</span>
          </Link>
        </li>
            ))
        }
       
        <li className="px-5">
          <div className="flex flex-row items-center h-8">
            <div className="text-sm font-light tracking-wide text-gray-500">Students</div>
          </div>
        </li>
        {
            routes.edu.map(route=>(
                <li key={route.name} >
          <Link href={route.href} 
          className={`
          relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 
          text-gray-600 hover:text-gray-800 ${route.href===pathname&&('border-emerald-500 bg-gray-50 ')}
           border-l-4 border-transparent hover:border-emerald-500 pr-6`
           }>
            <span className="inline-flex justify-center items-center ml-4">
              <span className="w-5 h-5 text-lg" >
                {route.icon}
              </span>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">{route.name}</span>
          </Link>
        </li>
            ))
        }
        <li className="px-5">
          <div className="flex flex-row items-center h-8">
            <div className="text-sm font-light tracking-wide text-gray-500">Settings</div>
          </div>
        </li>
        <li>
          <Link href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span className="inline-flex justify-center items-center ml-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">Profile</span>
          </Link>
        </li>
        <li>
          <Link href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span className="inline-flex justify-center items-center ml-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">Settings</span>
          </Link>
        </li>
        <li>
          <Link href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span className="inline-flex justify-center items-center ml-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
          </Link>
        </li>
      </ul>
      <div className="w-full absolute bottom-0   px-5 py-2 flex space-x-3 items-center ">
                <div className="w-8 h-8 rounded bg-emerald-900  text-white font-bold text-xl flex justify-center items-center ">
                  <span className="">S</span>
                </div>
                 <div className="space-">
                    <h1 className="text-md capitalize font-medium text-gray-600">
                        {user?.username}
                    </h1>
                    <h4 className="text-xs font-medium text-gray-400">
                    {user?.email}
                    </h4>
                 </div>
      </div>
    </div>
  </div>
</div>
    </>
  );
}
