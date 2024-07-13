import { getServicesDetails } from "@/services/getServices";
import Image from "next/image";
import Link from "next/link";

export const metadata={
    title:'details',
    description:'service details'
}

const page = async({params}) => {
    const details = await getServicesDetails(params.id)
   const {img,title,description,price,_id}=details;
    return (
        <div className="w-[60%] mx-auto ">
            <Image src={img} alt="detail image" width={400} height={300} className="rounded-md mt-3" />
            <h3 className="my-3">{title}</h3>
            <p>{description}</p>
            <p className="my-2 font-semibold">price:${price}</p>
           <Link href={`/checkout/${_id}`}> <button className="btn btn-primary my-2 text-white">proceed checkout</button></Link>
        </div>
    );
};

export default page;