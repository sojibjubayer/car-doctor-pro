import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  const { title, img, price,_id } = service || {};
  return (
   <div className="grid grid-cols-3">
     <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <Image src={img} width={400} height={200} alt="image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
       
        <div className="card-actions justify-between items-center">
            <h5 className="text-primary ">price : ${price}</h5>
            <Link href={`/services/${_id}`}><button className="btn btn-primary">view details</button></Link>
        </div>
      </div>
    </div>
   </div>
  );
};

export default ServiceCard;
