"use client"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
const session = useSession();
 console.log(session)
  return (
   <div className="bg-base-100 ">
     <div className="navbar container mx-auto">
      <div className="navbar-start">
       
        <Link href={'/'}>
        <Image src={'/assets/logo.svg'} width={100}  height={60}  />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
       {
        linkItems.map(item=><Link className="mr-10 font-semibold" href={item.path}>{item.title}</Link>)
       }
      </div>
      <div className="navbar-end">
        <CiSearch  className="mr-10"/>
        <a className="btn btn-primary btn-outline hover:text-orange-700 mr-3">Appointment</a>
        <div className="flex flex-col items-center justify-center">
          {
            session?.data?<Image alt={session?.data?.user?.name} src={session?.data?.user?.image} width={40} height={40} className="rounded-full" />:''
          }
          <p>{session?.data?.user?.name}</p>
        </div>
        {!session.data?
        <Link href="/login"><button className="btn btn-primary ml-3 text-white">Login</button></Link>:
        <button onClick={()=>signOut()}  className="btn btn-primary ml-3 text-white">Logout</button>
        }
      </div>
    </div>
   </div>
  );
};
const linkItems=[
  {
      title:'Home',
      path:'/'
  },
  {
      title:'About',
      path:'/about'
  },
  {
      title:'Services',
      path:'/services'
  },
  {
      title:'My Bookings',
      path:'/my-bookings'
  },
  {
      title:'Blog',
      path:'/blog'
  },
]

export default Navbar;
