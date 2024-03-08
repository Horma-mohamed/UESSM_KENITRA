"use client"
import { BiDotsHorizontalRounded } from "react-icons/bi"; 
import { AiTwotoneDelete } from "react-icons/ai"; 
import { MdModeEditOutline } from "react-icons/md"; 
import { MdDeleteOutline } from "react-icons/md"; 
import { FiEdit2 } from "react-icons/fi"; 
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import axios from "axios";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import useAuthHttp from "@/utils/useAuthHttp"
import { toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "react-cookie";
const DeletePost = async(id:string,token:string,refresh:()=>void)=>{
    const data = (await axios.delete('/api/posts',{
      headers:{
        Authorization:`Bearer ${token}`
      },
     params:{
      ids:[id]
     }
    
    })).data
refresh()
  if(data?.deleted){
    toast.success("Deleted")
  }else{
    toast.error('Not Deleted')
  }
  
}


export default function Actions({id,lastOfType}:{
  id:string,
  lastOfType:boolean
}) {
  const pathname = usePathname()
  const page = useSearchParams().get('page')
  const {refresh,push} = useRouter()
  const [cookies] =useCookies(['auth-token'])
  return (
      <Menu as="div" className="relative inline-block text-left h-10 ">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-50  p-2  text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
           <BiDotsHorizontalRounded />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className={
          `
          absolute z-[9999] right-0 origin-top-right mt-2 w-56 
          ${lastOfType?"bottom-[calc(100%+12px)]":""} divide-y 
          divide-gray-100 rounded-md bg-white shadow-lg ring-1 
        ring-black ring-opacity-5 focus:outline-none
          `
        }
          >
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }:any) => (
                  <button
                    className={`${
                      active ? 'bg-emerald-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm
                      
                    `}
                    onClick={()=>{
                      push(`${pathname}${page?`?page=${page}&`:'?'}postId=${id}`)
                    
                    }}
                  >
                    
                      <MdModeEditOutline 
                           className={`mr-2 h-5 w-5  ${active?"text-white":"text-emerald-400"} `}

                      />
                    
                    Edit
                  </button>
                )}
              </Menu.Item>
              
            </div>
           
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                     onClick={()=>{
                      DeletePost(id,cookies['auth-token'],()=>refresh)
                    
                    }}
                     className={`${
                      active ? 'bg-emerald-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                   
                      <AiTwotoneDelete    
                           className={`mr-2 h-5 w-5  ${active?"text-white":"text-emerald-400"} `}
                           
                      />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
  )
}

