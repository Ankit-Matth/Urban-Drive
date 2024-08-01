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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setError('')
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginBtnClick = async (formData) => {
    setIsLoading(true)
    let res = await loginHandler(formData)

    if (res.success) {
      dispatch(setIsAuthRequired(false))

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

      if (contactCategory) {
        router.push(`/contact/?category=${contactCategory}`);
      }

    } else {
      setError(res.message)
      if (res.err) {
        console.error(res.err)
      }
      setIsLoading(false)
    }
  };
 
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white shadow-md rounded-lg w-full max-w-md p-8'>
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
              {isAdmin ? "Admin Page" : "Login Page"}
            </h2>
            <form action={handleLoginBtnClick} className="space-y-4">
           <div>
            <input
              type="email"
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
          {error && 
           <div className="text-red-600 text-center block w-full px-3 py-2 rounded-md bg-red-200">
            {error}
           </div>}
          {contactCategory && 
                <div className='flex flex-row justify-between pl-1 pb-2'>
                    <Link href="/signup" onClick={()=>{dispatch(setRole("rider"))}} className="text-sm text-indigo-600 underline">SignUp as a Rider</Link>
                    <Link href="/signup" onClick={()=>{dispatch(setRole("driver"))}} className="text-sm text-indigo-600 underline">SignUp as a Driver</Link>
                </div>
          }
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? (
                <div className="loader"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page
