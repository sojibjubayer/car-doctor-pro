import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const bookingCollection = await db.collection("bookings");

  try {
    const resp = await bookingCollection.deleteOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json({ message: "deleted successfully", NextResponse: resp });
  } catch (error) {
    return NextResponse.json({ message: "something went wrong" });
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
    return NextResponse.json({ message: "updated successfully", NextResponse: resp });
  } catch (error) {
    return NextResponse.json({ message: "something went wrong",error });
  }
};
