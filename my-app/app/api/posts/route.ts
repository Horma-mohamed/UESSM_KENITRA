import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import db from "../../../db";


export async function GET(req:NextRequest){
    const token:string = req.headers.get("authorization")?.split(' ')[1] || ''
    let secret = process.env.JWT_ACCESS_KEY || ''
    const postId = req.nextUrl.searchParams.get('postId') || ''
    try{
        const result :any =  jwt.verify(token,secret)
        const post = await db.post.findUnique({
            where:{
                id:postId
            }
        })
        
      
        return NextResponse.json({
            found:true,
            post,
            status:200
        })
    }catch(err){
        return NextResponse.json({
            found :false,
            error:err
        },{status:401})
    }
}


export async function POST(req:NextRequest){
    const token:string = req.headers.get("authorization")?.split(' ')[1] || ''
    let secret = process.env.JWT_ACCESS_KEY || ''
    let body = await (await req.json())
    try{
        const result :any =  jwt.verify(token,secret)
        const post = await db.post.create({
            data:{
            authorId:result?.userId,
            ...body
            }
        })
        
        console.log(result)
        return NextResponse.json({
            created:true,
            post,
            status:200
        })
    }catch(err){
        return NextResponse.json({
            created :false,
            error:err
        },{status:401})
    }
}

export async function PUT(req:NextRequest){
    const token:string = req.headers.get("authorization")?.split(' ')[1] || ''
    let secret = process.env.JWT_ACCESS_KEY || ''
    let body = await (await req.json())
    try{
        const result :any =  jwt.verify(token,secret)
        const post = await db.post.update({
            where:{
                id:body?.postId
            },
            data:{
                ...(body?.updatedData)
            }
        })
        
        console.log(result)
        return NextResponse.json({
            updated:true,
            post,
            status:200
        })
    }catch(err){
        return NextResponse.json({
            updated :false,
            error:err
        },{status:401})
    }
}


export async function DELETE(req:NextRequest){
    const token:string = req.headers.get("authorization")?.split(' ')[1] || ''
    let secret = process.env.JWT_ACCESS_KEY || ''
    let ids = ( req.nextUrl.searchParams.get('ids')) || ''
    try{
        const result :any =  jwt.verify(token,secret)
        const posts = await db.post.deleteMany({
           where:{
            id:{
                
                equals:ids
            }
           }
        })
        
        
        return NextResponse.json({
            deleted:true,
           count:posts.count,
            status:200
        })
    }catch(err){
        return NextResponse.json({
            deleted :false,
            error:err
        },{status:401})
    }
}

