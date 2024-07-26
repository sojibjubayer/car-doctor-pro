
"use client";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Signup = () => {
  const handleSignUp = async(e) => {
    e.preventDefault();
    const form = e.target;
    const name=form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const newUser = { name, email,password };
    const resp=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup/api`,{
      method:'POST',
      body:JSON.stringify(newUser),
      headers:{
        'content-type':'application/json'
      }
    })
    // console.log(resp)
    if(resp.status===200){
      e.target.reset()
    }
  };
  return (
    <div className="container mx-auto min-h-screen">
      <div className="flex  justify-center gap-24 my-10">
        <div className="mt-10">
          <Image
            src="/assets/images/login/login.svg"
            width={"350"}
            height={"500"}
            alt="login image"
          />
        </div>
        <div>
          <form onSubmit={handleSignUp} className="border-2 p-10">
            <h3 className="text-center mb-5 font-semibold">Sign Up</h3>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                name="email"
                type="email"
                placeholder="Your email"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <input
                name="submit"
                type="submit"
                value="sign up"
                className="btn btn-primary text-white font-semibold mt-8"
              />
            </label>
            <p className="my-3 text-center">or sign up with</p>
            <div className="flex justify-center gap-5 ">
              <button className="btn rounded-full"><FaGoogle className="text-green-500 font-semibold" /></button>
              <button className="btn rounded-full"><FaGithub className="text-primary font-semibold"/></button>
            </div>
            <p className="text-center mt-3">Have an account? <Link href="/login" className="text-primary">Sign in</Link></p>
            <div></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
