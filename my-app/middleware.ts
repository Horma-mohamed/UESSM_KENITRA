



import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
//  import jwt from 'jsonwebtoken'
import * as jose from 'jose'

import { env } from 'process'
import axios from 'axios'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    let token =  request.cookies.get('auth-token')?.value || ''
    let secret = env.JWT_ACCESS_KEY || ''
    let pathname = request.nextUrl.pathname
   
    const res = await fetch(new URL("/api/auth/verifytoken", "http://localhost:3000"), {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:`Bearer ${token}` 

  },
 
})
    const data =await  res.json()

    console.log(data)
    let tokenIsValid =  data?.tokenIsValid
    if(pathname.includes('/dashboard/')||pathname==='/dashboard'){
            if(!token){
                console.log('Token is not accessable')
                return NextResponse.redirect(new URL(`/auth/login?redirectedFrom=${pathname}`, request.url ))
            
            }

     
            if(!tokenIsValid){
                console.log('Token is not valid ')
                return NextResponse.redirect(new URL(`/auth/login?redirectedFrom=${pathname}`, request.url ))
            }
            
            return NextResponse.next()
            
    }else if(pathname.includes('/auth/')||pathname==='/auth'){
        if(!token){
            return NextResponse.next()

        }

        if(!tokenIsValid){
            return NextResponse.next()
        }
        
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    
    return NextResponse.next()
    
//   return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard:path*','/auth:path*'],
}