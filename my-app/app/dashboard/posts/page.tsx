import Actions from '@/app/components/dashboard/posts/Actions';
import CreatePostModal from '@/app/components/dashboard/posts/ceatePostModal';
import db from '@/db';
import Link from 'next/link';
import moment from "moment"
import PaginationNavButtons from '@/app/components/PaginationNavButtons';
import { Post } from '@prisma/client';
import UpdatePostModal from '@/app/components/dashboard/posts/updatedPostModal';

const getPosts = async (start:number,end:number,perPage:number)=>{
   
  let posts  = await db.post.findMany({
    include:{
      author:true
    }
    
  })
  const totalPages = (posts.length/perPage )%1===0 ?posts.length/perPage :Math.floor(posts.length/perPage)+1



  return {posts:posts.slice(start,end),totalPages}
}

export default  async function DashaboardPosts({searchParams}:any) {
    let perPage = 5
    const page :number = Number(searchParams?.page) || 1
    const start = ((page) -1)*perPage
    const end = start + perPage
    
   const {posts,totalPages} = await getPosts(start,end,perPage) 

  return (
    <>
    
    <div className="sm:px-6 w-full   ">
        
            <div className="">
                <div className="flex items-center justify-between">
                    <p  className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Posts</p>
                    <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                        <p>Sort By:</p>
                        <select aria-label="select" className="focus:text-emerald-600 focus:outline-none bg-transparent ml-1">
                            <option className="text-sm text-emerald-800">Latest</option>
                            <option className="text-sm text-emerald-800">Oldest</option>
                            <option className="text-sm text-emerald-800">Latest</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="bg-white py-4 md:py-7 ">
                <div className="sm:flex items-center justify-between">
                    <div className="flex items-center">
                        <a className="rounded-full focus:outline-none focus:ring-2  focus:bg-emerald-50 focus:ring-emerald-800" href=" javascript:void(0)">
                            <div className="py-2 px-8 bg-emerald-100 text-emerald-700 rounded-full">
                                <p>All</p>
                            </div>
                        </a>
                        <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-emerald-50 focus:ring-emerald-800 ml-4 sm:ml-8" href="javascript:void(0)">
                            <div className="py-2 px-8 text-gray-600 hover:text-emerald-700 hover:bg-emerald-100 rounded-full ">
                                <p>Done</p>
                            </div>
                        </a>
                        <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-emerald-50 focus:ring-emerald-800 ml-4 sm:ml-8" href="javascript:void(0)">
                            <div className="py-2 px-8 text-gray-600 hover:text-emerald-700 hover:bg-emerald-100 rounded-full ">
                                <p>Pending</p>
                            </div>
                        </a>
                    </div>
                    <CreatePostModal />
                    <UpdatePostModal />
                </div>
                <div className="mt-7 min-h-[60vh]  overflow-x-scroll    ">
                    <table className="w-full whitespace-nowrap">
                        <tbody>
                           {
                          posts.map(post=> ( 
                          <>
                            <tr tabIndex={0} className="focus:outline-none h-16 border-b border-gray-100 rounded-sm">
                                {/* <td>
                                    <div className="ml-5">
                                        <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                            <input placeholder="checkbox" type="checkbox" className=" absolute  accent-emerald-500 cursor-pointer w-full h-full" />
                                            
                                        </div>
                                    </div>
                                </td> */}
                                <td className="">
                                    <div className="flex items-center pl-5">
                                      <Link href={'#'}>
                                      <p className="text-base capitalize hover:text-emerald-600 hover:underline  font-medium leading-none text-gray-700 mr-2">{post.title}</p>

                                      </Link>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676" stroke="#3B82F6" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333" stroke="#3B82F6" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </td>
                                <td className="pl-5">
                                  <div className={`px-1.5 py-1.5 text-center uppercase rounded-sm font-medium text-xs
                                   ${post.published?"bg-emerald-200  text-emerald-800":"bg-orange-200 text-orange-700"}
                                  `}>

                                    {post.published?"Published":"Not Published"}
                                  </div>
                                 
                                </td>
                                <td className="pl-24">
                                    <div className="flex items-center">
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667" stroke="#52525B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <circle cx="7.50004" cy="7.49967" r="1.66667" stroke="#52525B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></circle>
                                        </svg> */}
                                        <p className="text-sm leading-none text-gray-600 ml-2 capitalize ">{post.type}</p>
                                    </div>
                                </td>
                                <td className="pl-5 whitespace-nowrap ">
                                    <div className="flex  items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M17.6177 5.9681L19.0711 4.51472L20.4853 5.92893L19.0319 7.38231C20.2635 8.92199 21 10.875 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.02944 7.02944 4 12 4C14.125 4 16.078 4.73647 17.6177 5.9681ZM12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20ZM11 8H13V14H11V8ZM8 1H16V3H8V1Z" fill="rgba(128,128,135,1)"></path></svg>
                                        <p className="text-sm leading-none text-gray-600 ml-2">{moment(post.createdAt).format('lll')}</p>
                                    </div>
                                </td>
                                <td className="pl-5">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M3.33331 17.4998V6.6665C3.33331 6.00346 3.59671 5.36758 4.06555 4.89874C4.53439 4.4299 5.17027 4.1665 5.83331 4.1665H14.1666C14.8297 4.1665 15.4656 4.4299 15.9344 4.89874C16.4033 5.36758 16.6666 6.00346 16.6666 6.6665V11.6665C16.6666 12.3295 16.4033 12.9654 15.9344 13.4343C15.4656 13.9031 14.8297 14.1665 14.1666 14.1665H6.66665L3.33331 17.4998Z" stroke="#52525B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M10 9.1665V9.17484" stroke="#52525B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M6.66669 9.1665V9.17484" stroke="#52525B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M13.3333 9.1665V9.17484" stroke="#52525B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                        <p className="text-sm leading-none text-gray-600 ml-2">23</p>
                                    </div>
                                </td>
                                
                                <td className="pl-5">
                                    <div className="py-3 px-3 text-sm  ">Publisher : <span className="text-sm font-medium text-emerald-700 capitalize hover:underline"> {post.author.username}</span></div>
                                </td>
                                <td className="pl-5   ">
                                  <Actions lastOfType={posts?.length===(posts?.indexOf(post)+1)&&posts?.length>1}  id={post.id} />
                                </td>
                                
                            </tr>
                            <tr className="h-3"></tr> 
                          </>
                            ))
                           }
                            
                        </tbody>
                    </table>
                   
                </div>
            </div>
            
        </div>
        <div className="w-full flex mt-5 ">
                            <div className="float-right flex space-x-4">
                            <PaginationNavButtons 
                            page={page} 
                            start={start} 
                            end={end} 
                            hasNextPage={end<=posts?.length} 
                            hasPrevPage={start>0}  
                            totalPages={totalPages}
                            
                            />
                            </div>
            </div>
    </>
  );
}
