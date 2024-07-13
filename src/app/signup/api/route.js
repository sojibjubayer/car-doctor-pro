import { connectDB } from "@/lib/connectDB";
import bcrypt from 'bcrypt';

export const POST=async(request)=>{
const newUser=await request.json()
try{
    const db=await connectDB();
    const userCollection=await db.collection('users')
    const exist=await userCollection.findOne({email:newUser.email})
    if(exist){
        return Response.json({message:'user already exist'})
    }
    const hashPassword=bcrypt.hashSync(newUser.password,14);
    const newUserwithPass={...newUser,password:hashPassword}
    const resp=await userCollection.insertOne(newUserwithPass);
    return Response.json({message:'user craeted successfully'})
}
catch(error){
    return Response.json({message:'something went wrong'})
}
}

