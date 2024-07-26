"use client"
import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const session = useSession();
  let path = '/';

  // Wrap useSearchParams() in Suspense
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComponentUsingSearchParams />
    </Suspense>
  );

  function ComponentUsingSearchParams() {
    const searchParams = useSearchParams();
    path = searchParams.get('redirect');

    //SOCIAL LOGIN
    const handleSocialLogin = (provider) => {
      signIn(provider);
    };


    //CREDENTIALS LOGIN
    const handleLogin = async (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      const resp = await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: path ? path : '/',
      });
      if (resp?.status === 200) {
        router.push('/');
      }
    };
    

    if (session?.status === 'authenticated') {
      router.push('/');
    }

    return (
      <div className="container mx-auto">
        <div className="flex justify-center gap-24 my-10">
          <div className="mt-10">
            <Image
              src="/assets/images/login/login.svg"
              width={'350'}
              height={'500'}
              alt="login image"
            />
          </div>
          <div>
            <form onSubmit={handleLogin} className="border-2 p-10">
              <h3 className="text-center mb-5 font-semibold">Sign In</h3>
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
                  value="sign in"
                  className="btn btn-primary text-white font-semibold mt-8"
                />
              </label>
              <p className="my-3 text-center">or sign in with</p>
              <div className="flex justify-center gap-5 ">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="btn rounded-full"
                >
                  <FaGoogle className="text-green-500 font-semibold" />
                </button>
                <button
                  onClick={() => handleSocialLogin('github')}
                  className="btn rounded-full"
                >
                  <FaGithub className="text-primary font-semibold" />
                </button>
              </div>
              <p className="text-center mt-3">
                Don&apos;t have an account?
                <Link href="/signup" className="text-primary">
                  Sign Up
                </Link>
              </p>
              <div></div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
