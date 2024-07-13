"use client";

import { getServicesDetails } from "@/services/getServices";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = ({ params }) => {
  const { data } = useSession();
  const [details, setDetails] = useState({});
  const notify = () => toast("successfully booked!");
  const serviceDetails = async () => {
    const newDetails = await getServicesDetails(params.id);
    setDetails(newDetails);
  };
  useEffect(() => {
    serviceDetails();
  }, [params]);
  const {price,_id,title}=details;
  console.log(price)

  const handleOrder = async (e) => {
    e.preventDefault()
    const form=e.target;
    const name=form.name.value;
    const date=form.date.value;
    const email=form.email.value;
    const due=form.due.value;
    const phone=form.phone.value;
    const address=form.address.value;
    const serviceId=_id;
    const ServiceTitle=title;
    const order={name,date,email,due,phone,address,serviceId,ServiceTitle}
   
    const resp=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/api/booking`,{
        method:'POST',
        body:JSON.stringify(order),
        headers:{
            'content-type':'application/json'
        }
    })
    form.reset()
    const res=await resp.json()
    if(res.message==='successfuly booked'){
      notify()
    }
    // console.log(res)
   

  };
  return (
    <div className="container mx-auto">
      Order Form:
      <form onSubmit={handleOrder}>
        <div className="flex ">
          <div className="w-[50%]">
            <label htmlFor="">Name</label> <br />
            <input
            readOnly
              defaultValue={data?.user?.name}
              type="text"
              name="name"
              id=""
              className="w-[90%]"
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="">Date</label> <br />
            <input
              defaultValue={new Date().getDate()}
              type="date"
              name="date"
              id=""
              className="w-[90%]"
            />
          </div>
        </div>
        <div className="flex ">
          <div className="w-[50%]">
            <label htmlFor="">Email</label> <br />
            <input
            readOnly
              defaultValue={data?.user?.email}
              type="email"
              name="email"
              id=""
              className="w-[90%]"
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="">Due Amount</label> <br />
            <input readOnly defaultValue={price} type="text" name="due" id="" className="w-[90%]" />
          </div>
        </div>
        <div className="flex ">
          <div className="w-[50%]">
            <label htmlFor="">Phone</label> <br />
            <input type="text" name="phone" id="" className="w-[90%]" />
          </div>
          <div className="w-[50%]">
            <label htmlFor="">Present Address</label> <br />
            <input type="text" name="address" id="" className="w-[90%]" />
          </div>
        </div>
        <button  className="btn btn-primary my-3 text-white justify-center   mx-auto w-[90%]">
          <input type="submit" value="confirm order" />
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Page;
