
import { connectDB } from '@/lib/connectDB';
import { services } from '../../../../lib/services';
import { NextResponse } from 'next/server';

export const GET=async()=>{
    const db=await connectDB();
    const serviceCollection=db.collection('services')
    try {
       await serviceCollection.deleteMany()
       const res=await serviceCollection.insertMany(services) 
       return NextResponse.json({message:"successfully seeded"})
    } catch (error) {
        // console.log(error)
        return NextResponse.json({message:"something gone wrong",error})
        
    }
}