import { connectDB } from "@/lib/connectDB";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";


export const POST=async(request)=>{
const newUser=await request.json()
try{
    const db=await connectDB();
    const userCollection=await db.collection('users')
    const exist=await userCollection.findOne({email:newUser.email})
    if(exist){
        return NextResponse.json({message:'user already exist'})
    }
    const hashPassword=bcrypt.hashSync(newUser.password,14);
    const newUserwithPass={...newUser,password:hashPassword}
    const resp=await userCollection.insertOne(newUserwithPass);
    return NextResponse.json({message:'user craeted successfully'})
}
catch(error){
    return NextResponse.json({message:'something went wrong',error})
}
}











