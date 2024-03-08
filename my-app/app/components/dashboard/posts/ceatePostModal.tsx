"use client"

import React, { useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from "yup"
import { MdOutlineWarning, MdWarning } from 'react-icons/md';
import useAuthHttp from '@/utils/useAuthHttp'
import { useCookies } from 'react-cookie';
import {toast} from 'react-toastify';
import { useRouter } from 'next/navigation';
export default function CreatePostModal() {
    const [isOpen, setIsOpen]  = useState(false)
const AuthReq = useAuthHttp()
const [cookies]= useCookies(['auth-token'])
const router = useRouter()  
function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const formik = useFormik({
    initialValues:{
        title:'',
        content:'',
        thumbnail:''
    },
    validationSchema:yup.object().shape({
        title:yup.string().min(3).max(255).required(),
        content:yup.string().min(3).max(500).required(),
        thumbnail:yup.string().notRequired()
    }),
    onSubmit:async(values,{resetForm})=>{
       
            const data = (await AuthReq.post('/posts',{
               title:values.title,
               content:values.content 
            },{headers:{
                Authorization:`Bearer ${cookies['auth-token']}`
            }})).data

            if(data?.created){
                toast.success('Post Is Created Successfuly !', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            resetForm()
            closeModal()
            router.refresh()
            }else{

                toast.error( "Post Is Not Created For Some Reason ! ", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            
       
        
    }
  })

  return (
    <>
    <button onClick={openModal}  className="focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-emerald-700 hover:bg-emerald-600 focus:outline-none rounded">
                        <p className="text-sm font-medium leading-none text-white">Add Post</p>
                    </button>
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className=" mb-10 text-lg font-medium leading-6 text-gray-900"
                  >
                    Create New Post
                  </Dialog.Title>
                 
                    <form 
                    onSubmit={formik.handleSubmit}
                    className={`space-y-6`}
                    >
                    
                    <div className="w-full space-y-2">
                        <label htmlFor="title" className="text-gray-800 font-medium text-lg">Title</label>
                        <input  
                        type="text" 
                        name="title" id="title" 
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        className={`w-full pl-4 border h-10 outline-none bg-[#f9f9fc] focus:bg-transparent border-gray-200 rounded-md 
                        text-gray-200 focus:text-gray-700 
                        focus:border-emerald-500
                        ${( formik.touched.title && formik.errors.title)?"focus:border-orange-500":"focus:border-emerald-500"}
                        `} />
                        
                        {
                           ( formik.touched.title && formik.errors.title)&&(
                            <div className='flex space-x-1 items-center '>
                           <MdOutlineWarning className="text-orange-600 " />
                            <p className=" capitalize text-sm font-medium text-orange-600">
                                    {formik.errors.title}
                            </p>
                            </div>
                           )
                        }
                    </div>
                    <div className="w-full relative space-y-2">
                    <div className="absolute right-0 flex space-x-2">
                        <button className="w-5 h-5 rounded-full bg-gray-50"></button>
                        <button className="w-5 h-5 rounded-full bg-gray-50"></button>
                        <button className="w-5 h-5 rounded-full bg-gray-50"></button>

                    </div>
                        <label htmlFor="content" className="text-gray-800 font-medium text-lg">Description</label>
                        <textarea  
                        name="content" 
                        id="content" 
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        className={`w-full pl-4 pt-2 border min-h-44 outline-none bg-[#f9f9fc] focus:bg-transparent border-gray-200 rounded-md
                         text-gray-200 focus:text-gray-700 
                        ${( formik.touched.title && formik.errors.title)?"focus:border-orange-500":"focus:border-emerald-500"}
                         `} />
                        {
                           ( formik.touched.content && formik.errors.content)&&(
                           <div className='flex space-x-1 items-center  '>
                           <MdOutlineWarning className="text-orange-600 " />
                            <p className=" capitalize text-sm font-medium text-orange-600">
                                    {formik.errors.content}
                            </p>
                           </div>
                           )
                        }
                    </div>
                 
                    
                    <button
                      type="submit"
                      className=" float-right mt-4 ml-4 inline-flex justify-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    
                    >
                      Create
                    </button> 
                    <div

                     onClick={closeModal}
                      className="cursor-pointer float-right mt-4 inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    
                    >
                      Cancel
                    </div> 
                    </form>
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
