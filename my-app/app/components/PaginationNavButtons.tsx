"use client"

import { useRouter,useSearchParams } from 'next/navigation'
import React from 'react'
function PaginationNavButtons({page,start,end,hasNextPage,hasPrevPage,totalPages}:{
    page:number,
    start?:number,
    end:number,
    totalPages:number,
    hasNextPage:boolean,
    hasPrevPage:boolean
}) {
    const router = useRouter()
    // const sarchParams  = useSearchParams() 
  return (
    <>
    <nav aria-label="Page navigation example">
  <div className="float-right flex w-60">
    <ul className="list-style-none flex ">
    <li>
      <button
        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm 
        text-neutral-500 transition-all duration-300 
        dark:text-neutral-400

        ${!hasPrevPage?"cursor-not-allowed bg-gray-100":" hover:bg-emerald-300  hover:text-white"}
        `}
        disabled={!hasPrevPage}
        onClick={()=>router.push(`/dashboard/posts?page=${page-1}`)}

       >Previous</button>
      
    </li>
    {
      (new Array(totalPages)).map((page)=>(
        <li key={page} >
        <button
          className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
          
          >{page}</button>
        
      </li>
      ))
    }
   
    <li>
      <button
        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm 
        text-neutral-500 transition-all duration-300 
        dark:text-neutral-400
        
        
        ${!hasNextPage?"cursor-not-allowed bg-gray-100":" hover:bg-emerald-300  hover:text-white"}
        `}
      
        disabled={!hasNextPage}
        onClick={()=>router.push(`/dashboard/posts?page=${page+1}`)}
        >Next</button>
      
    </li>
    </ul>
    <h1 className="font-light text-sm text-gray-600">
      Total pages : {totalPages}
    </h1>
  </div>
</nav>
    
    </>
  )
}

export default PaginationNavButtons