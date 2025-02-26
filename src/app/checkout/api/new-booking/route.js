import { connectDB } from "@/lib/connectDB"

export const POST=async(request)=>{
const newBooking=await request.json()

const db= await connectDB()
const bookingCollection=await db.collection('bookings')
try {
    const resp=await bookingCollection.insertOne(newBooking)
    return Response.json({message:'successfuly booked'},{status:200})
} catch (error) {
    return Response.json({message:'something went wrong'})
}
}