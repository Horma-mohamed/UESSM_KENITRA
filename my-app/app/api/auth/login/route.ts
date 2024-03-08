import  {type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
type LoginData = {
    username : string
    password: string
}
import cookies from "next-cookies";
import db from "@/db";
import { env } from "process";
import { NextApiResponse } from "next";
export async function POST(req:NextRequest){
    const loginData:LoginData= await (await req.json()) //?.body
    console.log(loginData)
    const user = await db.user.findUnique({
        where:{
            username:loginData?.username?.toLowerCase()
        }
    })
    if(!user){
        return NextResponse.json({
            
            reason:"user does not exist "
        },{
            status:401
        })
    }
    const passwordsMatch = await bcrypt.compare(loginData?.password,user.passwordHashed)

 
    if(!passwordsMatch){
        return NextResponse.json({
            
            reason:"password is not correct"
        },{
            status:401
        })
    }
    const isAdmin = user.role === 'admin'
    const secret = env.JWT_ACCESS_KEY || ''
    const token = jwt.sign({userId:user.id},secret,{expiresIn:"1h"})

        

    return NextResponse.json({
       isAdmin,
       token,
       status:200
    })

}