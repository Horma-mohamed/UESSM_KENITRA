import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import db from "@/db";
export async function GET(req:NextRequest){
    const token:string = req.headers.get("authorization")?.split(' ')[1] || ''
    let secret = process.env.JWT_ACCESS_KEY || ''
    
    try{
        const result :any =  jwt.verify(token,secret)
        const user = await db.user.findUnique({
            where:{
                id:result?.userId
            }
        })
        
        console.log(result)
        return NextResponse.json({
            tokenIsValid :true,
            user:{
                username:user?.username,
                email:user?.email
            },
            status:200
        })
    }catch(err){
        return NextResponse.json({
            tokenIsValid :false,
            error:err
        },{status:401})
    }
}