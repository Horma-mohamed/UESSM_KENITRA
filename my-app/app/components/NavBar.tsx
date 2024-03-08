"use client"

import Link from 'next/link'
import { useRouter,usePathname } from 'next/navigation'
import React, {useState,useEffect} from 'react'
import {MdDashboard} from 'react-icons/md'
import {TbLogout2} from 'react-icons/tb'
 


export default function NavBar({user}:any) {
  let pathname = usePathname()
  const [scrollTop,setScrollTop] = useState(0)
   
  const NavLinks = [
    {
      name:'Home',
      href:'/',

    },
    {
      name:'Blog',
      href:'/blog',

    },
    {
      name:'About',
      href:'/about',

    },
    {
      name:'Fqa',
      href:'/fqa',

    }
  ]
    

  const handleScroll = () => {
      setScrollTop(window.scrollY);
    };
    
    useEffect(() => {
      window.addEventListener("scroll", handleScroll); 
      return () => window.removeEventListener("scroll", handleScroll);
    });
  return (
    <nav id='nav' 
    className={` w-full ${scrollTop>=75?" h-auto  ":" h-auto"}`}
    
    >
<div 
    className={` w-full ${scrollTop>=75?" h-[6rem]  ":" h-0"}`}

></div>
    <div  
    className={`
  ${scrollTop>=75?'transition-all  py-6 w-full translate-y-[0px] bg-[linear-gradient(white,white,white,transparent)]  z-40 fixed top-0 transform duration-300 ':' transform duration-300 translate-y-0   border-collapse'}
       px-[100px] w-full min-h-[6rem] -top-[200px] transition-all py-6 bg-slate-00 flex justify-between items-center   `}
    >
    {/* Logo Part */}
    <div className="flex space-x-3 items-center">
    <div className="w-14 h-14 rounded-full bg-gray-00">
        <img src="/assets/logo.png" alt="" />
    </div>
    <h1 className="text-xl  text-emerald-600 font-primary font-semibold">
        UESMM-kenitra
    </h1>
    </div>
    {/* Navigation Part */}
    <ul className="min-w-40  flex space-x-8">
        
        {
         NavLinks.map(navLink =>(<li
         key={navLink.name}
          className={` ${pathname===navLink.href?'before:w-[30%] text-emerald-600 ':'text-gray-800'} relative before:absolute before:w-0 before:h-0.5 before:bottom-0 before:left-0 before:bg-emerald-600 hover:before:w-[30%]  before:transform before:duration-200 hover:text-emerald-600  font-primary font-[400] text-lg`}>
         <Link  href={navLink.href}>{navLink.name}</Link>
        </li>))
        }
        
       
    </ul>
    {/* login & signup Part */}
    {/* {
        user?
                <div className="relative z-40" >
                    
                    <Link className="peer" href={'/'}>
                <div  className="  relative   group min-w-20 flex space-x-4 items-center p-4  " >
                    
            <h1 className="text-gray-600 font-primary font-medium text-md group-hover:underline underline-offset-6 group-hover:text-emerald-600 ">
                <span className="capetalize">{user?.username}</span> 
            </h1>
            <div className=" w-10 h-10 bg-gray-100 rounded-full shadow-md overflow-hidden">
                <img className=" w-full " src={'https://i.pravatar.cc/300  '} alt="" />
            </div>
            </div></Link>
            <div id="" className=" bg-opacity-60 shadow-md bg-gray-100  absolute   peer-hover:visible hover:visible invisible    -translate-y-6 peer-hover:translate-y-0 hover:translate-y-0 opacity-0 peer-hover:opacity-100 hover:opacity-100  duration-300 w-60 z-[99999]  b rounded-md  min-w-40">
                        <ul>
                            <li className="w-full border-b px-2 py-4 border-gray-200 last-of-type:borde-b-0">
                            <Link href={'/dashboard'} className="w-full group flex justify-center space-x-5 items-center">
                                        <span className="text-md  font-primary font-normal text-gray-500 hover:text-gray-600">Dashboard</span><MdDashboard className=" text-gray-500 hover:text-gray-600" />
                                    </Link>
                            </li>
                            <li className="w-full border-b px-2 py-4 border-gray-200 last-of-type:borde-b-0">
                                   <form method="post" action="/auth/logout" className="">
                                   <button type="submit" className="w-full group flex justify-center space-x-5 items-center">
                                        <span className="text-md group-hover:text-red-500 font-primary font-normal text-gray-500">Logout</span><TbLogout2 className=" text-gray-500 group-hover:text-red-500" />
                                    </button>
                                   </form>
                            </li>
                           
                        </ul>
                    </div>
                </div>
        
        :<div className="min-w-20 flex space-x-4 ">
        <Link href={'auth/login'} >
            <div className="  bg-transparent relative   before:absolute before:w-0 before:h-0.5 before:bottom-0 before:left-0 inline-block before:bg-gray-600 hover:before:w-[30%]  before:transform before:duration-200   transform duration-300 text-gray-600  font-primary font-normal" >
                Login
            </div>
        </Link>
        <span className="text-md font-primary text-gray-400 font-light underline ">
            Or
        </span>
        <Link href={'auth/register'} >
            <div className="  bg-transparent relative   before:absolute before:w-0 before:h-0.5 before:bottom-0 before:left-0 inline-block before:bg-emerald-600 hover:before:w-[30%]  before:transform before:duration-200   transform duration-300 text-emerald-600  font-primary font-normal" >
                Register
            </div>
        </Link>
    </div>
    } */}
</div>
</nav>
  )
}

