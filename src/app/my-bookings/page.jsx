"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  const session = useSession();
  const [myBookings, setMyBookings] = useState([]);
  const notify = () => toast("successfully deleted!");
  const getMyBookings = async () => {
    const resp = await fetch(
      `http://localhost:3000/my-bookings/api/${session?.data?.user?.email}`
    );
    const data = await resp.json();
    setMyBookings(data.myBookings);
  };
  
  useEffect(() => {
    getMyBookings();
  }, [session]);

  const handleDelete=async(id)=>{
    const deleted=await fetch(`http://localhost:3000/my-bookings/api/booking/${id}`,{
      method:'DELETE'
    }
    )
    const resp=await deleted.json()
  
    if(resp.response?.deletedCount>0){
      getMyBookings()
      notify()
    }
  }

  return (
    <div>
      <h2>My Bookings:</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Service Name</th>
                <th>Price</th>
                <th>Booking date</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

               { session &&
                myBookings?.map(({ServiceTitle,due,date,phone,_id})=>
                        <tr key={_id}>
                        <th>1</th>
                        <td>{ServiceTitle}</td>
                        <td>{due}</td>
                        <td>{date}</td>
                        <td>{phone}</td>
                        <div className="flex gap-2">
                            <button className="btn btn-primary">edit</button>
                            <button onClick={()=>handleDelete(_id)} className="btn btn-error">delete</button>
                        </div>
        
                      </tr>
                    )
                }
               
            
             
             
            </tbody>
          </table>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default page;
