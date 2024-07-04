import Image from 'next/image';
import carImage from '../../../public/images/about.jpg'

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg overflow-hidden">
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700 mb-4">
              Welcome to our local car booking platform! We connect residents of Bahal with reliable drivers like Ankit for convenient and safe travel. 
              Our mission is to make it easy for you to find available cars online, saving time and making your journey stress-free.
            </p>
            <p className="text-gray-700">
              Whether you need a ride to Bhiwani or anywhere else, our platform ensures you have access to the best local drivers at your fingertips. 
              No more waiting at common places – book your ride with just a few clicks!
            </p>
          </div>
          <div className="md:w-1/2 p-16 pt-24">
            <Image
              src={carImage}
              alt="Car"
              width={300}
              height={300}
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-8 bg-white shadow-md rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-gray-700">
            Our mission is to provide a seamless and efficient car booking experience for the residents of Bahal. We aim to bridge the gap between drivers and passengers, ensuring safety, convenience, and reliability in every ride.
          </p>
        </div>
      </div>
    </div>
  )
}

export default page
