import Image from 'next/image'
import Link from 'next/link'
import NavBar from './components/NavBar'
import { Box, Button, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
    <NavBar user=''/>
    <main className='w-full min-h-full  overflow-x-hidden px-[100px] '>
    
      
      {/* Hero section */}
      <section className="relative w-full  mt-10 flex justify-between space-x-10 ">
      
      {/* Hero Title */}
      
      <div className="  relative  flex items-center   space-y-4 ">
       <div className="">
       <h1 className="text-3xl  text-emerald-500 font-primary font-semibold">
        Welcome to UESMM, where opportunities and friendships flourish
        </h1>
        <h2 className="text-gray-500 mt-4 font-light text-xl">
        Together We Thrive.
        </h2>
        <div className="flex items-center space-x-8 mt-10">
       
        <Link  href={'/about'} className="text-lg text-gray-500 font-primary font-normal hover:underline ">
          {"Learn more about us -->"}
        </Link>
        </div>
       </div>
        
      </div>
      {/* Hero img */}
      <img  src="/assets/coop.png" className=" relative right-14  -z-10" alt="" />
      </section>
    {/* Divide */}
      
    {/* Events Section */}
      <div className='w-full mt-20 ' >
        <h1 className='text-3xl  font-semibold text-emerald-700 font-primary ' >
          
        </h1>
        <div className="w-full  mt-10 flex  text-emerald-700">
       
        </div>
      </div>
    {/* End Events Section */}
     {/* Divide */}
     <div className="w-full h-40  bg-gray-0"></div>
    {/* Articles Section */}
    
    {/* End Articles Section */}

    
      
  
    </main>
    </>
  )
}
