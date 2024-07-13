
import { connectDB } from '@/lib/connectDB';
import { NextResponse } from 'next/server';


export const GET=async(request,{params})=>{
    const db=await connectDB();
    const serviceCollection=db.collection('services')
    try {
       const service=await serviceCollection.findOne({_id:params.id})
       return NextResponse.json(service)
    } catch (error) {
        // console.log(error)
        return NextResponse.json({message:"something went wrong",error})
        
    }
}