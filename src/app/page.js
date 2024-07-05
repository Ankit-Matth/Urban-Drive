"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch } from '@/lib/hooks'
import { setRole } from '@/lib/features/role/roleSlice'

export default function Home() {
  const dispatch = useAppDispatch()
  
  return (
    <div className="min-h-screen flex items-center justify-center pt-1">
      <div className="max-w-7xl w-full px-8">
        <div className="mt-20 mb-24">
          <div className="flex items-center justify-between">
            <div className="w-1/2 pl-12">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Find Your Ride with Urban Drive
              </h1>
              <p className="text-lg text-gray-700 mb-6 pr-12">
                Your reliable platform for booking private car rides, making travel easy and convenient.
              </p>
              <Link href={'/signup'} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded shadow-md" 
              onClick={()=>{dispatch(setRole('rider'))}}>
                Book a Ride
              </Link>
            </div>
            <div className="w-1/2 flex justify-end pr-10">
              <Image src="/images/wrangler.png" width={550} height={550} alt="Riders Image" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-20">
            <div className="w-1/2 pr-8 order-2">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Earn with Your Car on Urban Drive
              </h1>
              <p className="text-lg text-gray-700 mb-6 pr-8">
                Join us as a driver, connect with more customers, and maximize your earnings.
              </p>
              <Link href={'/signup'} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded shadow-md" onClick={()=>{dispatch(setRole('driver'))}}>
                Become a Driver
              </Link>
            </div>
            <div className="w-1/2 pl-10 order-1">
              <Image src="/images/carForRent.jpeg" width={400} height={400} alt="Drivers Image" className="rounded-md shadow-md" />
            </div>
          </div>

          <div className="bg-white overflow-hidden mb-10 py-6 px-8 mt-12">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">How It Works</h2>
          
          <div className="flex flex-col items-center justify-center mb-12 mt-4">
            <h3 className="text-3xl font-bold mb-6 text-blue-500">For Riders</h3>
            <div className="flex justify-between items-center w-full max-w-4xl">
              <div className="flex flex-col items-center text-center px-4">
                <img src="/svgs/sign-up.svg" alt="Sign Up" className="mb-4" />
                <h4 className="font-bold text-lg mb-2">Sign Up</h4>
                <p className="text-gray-700">Create your account on Urban Drive.</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <img src="/svgs/location.svg" alt="Search" className="mb-4" />
                <h4 className="font-bold text-lg mb-2">Search</h4>
                <p className="text-gray-700">Find available cars by entering your location and ride details.</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <img src="/svgs/car.svg" alt="Book a Ride" className="mb-4" />
                <h4 className="font-bold text-lg mb-2">Book a Ride</h4>
                <p className="text-gray-700">Choose your preferred car and book your ride.</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <img src="/svgs/pay.svg" alt="Pay Securely" className="mb-4" />
                <h4 className="font-bold text-lg mb-2">Pay Securely</h4>
                <p className="text-gray-700">Make advance payments securely through the platform.</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <img src="/svgs/refund.svg" alt="Enjoy Your Ride" className="mb-4" />
                <h4 className="font-bold text-lg mb-2">Enjoy Your Ride</h4>
                <p className="text-gray-700">Relax and enjoy your ride. Get a refund if the driver fails to arrive.</p>
              </div>
            </div>

            <h3 className="text-3xl font-bold my-6 text-blue-500">For Drivers</h3>
            <div className="flex justify-between items-center w-full max-w-4xl mb-12">
              <div className="flex flex-col items-center text-center px-4">
                <img src="/svgs/register.svg" alt="Register" className="mb-4" />
                <h4 className="font-bold text-lg mb-2">Register</h4>
                <p className="text-gray-700">Sign up and create your profile on Urban Drive.</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <img src="/svgs/documents.svg" alt="List Your Car" className="mb-4" />
                <h4 className="font-bold text-lg mb-2">List Your Car</h4>
                <p className="text-gray-700">Add your car details or documents and get verified.</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <img src="/svgs/notifications.svg" alt="Receive Bookings" className="mb-4" />
                <h4 className="font-bold text-lg mb-2">Receive Bookings</h4>
                <p className="text-gray-700">Get instant notifications for ride requests.</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <img src="/svgs/confirm-drive.svg" alt="Confirm & Drive" className="mb-4" />
                <h4 className="font-bold text-lg mb-2">Confirm & Drive</h4>
                <p className="text-gray-700">Confirm bookings, request advance payments, and provide rides efficiently.</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <img src="/svgs/earn.svg" alt="Earn" className="mb-4" />
                <h4 className="font-bold text-lg mb-2">Earn</h4>
                <p className="text-gray-700">Maximize your earnings with each ride.</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
