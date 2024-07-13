import { connectDB } from "@/lib/connectDB"



export const GET=async(request,{params})=>{
 
    const db=await connectDB()
    const bookingCollection=await db.collection('bookings')

    const myBookings=await bookingCollection.find({email:params.email}).toArray()
    return Response.json({myBookings})
}