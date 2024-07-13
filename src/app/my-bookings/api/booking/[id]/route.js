import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const bookingCollection = await db.collection("bookings");

  try {
    const resp = await bookingCollection.deleteOne({
      _id: new ObjectId(params.id),
    });
    return Response.json({ message: "deleted successfully", response: resp });
  } catch (error) {
    return Response.json({ message: "something went wrong" });
  }
};

export const PATCH = async (request, { params }) => {
    const {date,phone,address}=await request.json()
  const db = await connectDB();
  const bookingCollection = await db.collection("bookings");

  try {
    const resp = await bookingCollection.updateOne(
        {_id: new ObjectId(params.id)},
     {
         $set:{
        date,phone,address
      }
    },
    {
        upsert:true
    }
    
    
    );
    return Response.json({ message: "updated successfully", response: resp });
  } catch (error) {
    return Response.json({ message: "something went wrong" });
  }
};
