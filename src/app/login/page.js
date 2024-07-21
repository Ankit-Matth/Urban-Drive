"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setRole } from "@/lib/features/role/roleSlice";
import { showCommonLayout , hideCommonLayout } from "@/lib/features/layout/layoutSlice";
import { setIsAuthRequired } from "@/lib/features/auth/authSlice";
import Link from 'next/link';
import { loginHandler } from '@/actions/login';

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const userRole = useAppSelector((state) => state.role.userRole);
  const contactCategory = useAppSelector((state) => state.contact.contactCategory);
  const isAdmin = userRole === "admin"

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginBtnClick = async (formData) => {
    let res = await loginHandler(formData)

    if (res) {
      dispatch(setIsAuthRequired(false))
      
      if (contactCategory) {
        router.push(`/contact/?category=${contactCategory}`);
      }

      if (isAdmin) {
        dispatch(showCommonLayout());
        router.push('/admin');
      }

      if (userRole === 'rider') {
        dispatch(showCommonLayout());
        router.push('/riders');
      }

      if (userRole === 'driver') {
        dispatch(showCommonLayout());
        router.push('/drivers');
      }

    } else {
      console.log("Login failed")
    }
  };
 
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white shadow-md rounded-lg w-full max-w-md p-6'>
            <h2 className="text-3xl font-bold text-center text-gray-800 mt-4">
              {isAdmin ? "Admin Page" : "Login Page"}
            </h2>
            <form action={loginBtnClick} className="space-y-4">
           <div className='mt-12'>
            <input
              type="text"
              name="email"
              value={`${isAdmin ? "admin@urbandrive" : formData.email}`}
              placeholder="Enter your email"
              onChange={handleInputChange}
              readOnly={isAdmin ? true : false}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${isAdmin ? 'hover:cursor-not-allowed' : ''}`}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder='Enter your password'
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          {contactCategory && 
                <div className='flex flex-row justify-between pl-1 pb-2'>
                    <Link href="/signup" onClick={()=>{dispatch(setRole("rider"))}} className="text-sm text-indigo-600 underline">Not have an account?</Link>
                    <Link href="/signup" onClick={()=>{dispatch(setRole("driver"))}} className="text-sm text-indigo-600 underline">SignUp as a Driver</Link>
                </div>
          }
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page
