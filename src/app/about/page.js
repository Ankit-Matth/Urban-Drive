import Image from "next/image";

const AboutUsPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen py-8 bg-gray-50 mt-1">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-10 py-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 pl-12 pr-4">
              <h2 className="text-4xl font-bold mb-4">About Us</h2>
              <p className="text-gray-700 mb-4 text-base text-justify">
                Welcome to Urban Drive, your local car booking platform connecting drivers and riders in local or urban
                areas. Drivers can list their cars online, receive instant bookings, and maximize their earnings. Riders
                can find available cars quickly and book rides hassle-free.
              </p>
              <p className="text-gray-700 text-base text-justify">
                Our mission is to provide a seamless and efficient car booking experience for the local or urban areas.
                We aim to bridge the gap between drivers and passengers, ensuring safety, convenience, and reliability
                in every ride.
              </p>
            </div>
            <div className="md:w-1/3 p-8 flex items-center justify-center">
              <Image
                src="/images/aboutLogo.png"
                alt="Car"
                width={450}
                height={450}
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg px-12 mb-10 py-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3">
              <Image
                src="/images/forDrivers.jpg"
                alt="Driver"
                width={330}
                height={300}
                className="object-cover rounded-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold px-6 mb-4">For Drivers</h3>
              <p className="text-gray-700 text-lg px-6 text-justify">
                As a driver, you no longer need to bring your car to common places every morning. Save time and petrol
                by listing your car online. Get notified of bookings instantly, request some payment in advance, and
                manage your rides efficiently. Join our platform to connect with passengers in need of a ride.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg px-12 mb-10 py-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold px-6 mb-4">For Riders</h3>
              <p className="text-gray-700 text-lg px-6 text-justify">
                As a rider, you can easily find available cars online without the hassle of visiting common places. View
                profiles of drivers, check availability, book your ride, and make advance payments securely. Rest
                assured with our policy to refund your payment if a driver fails to arrive at the specified location.
              </p>
            </div>
            <div className="md:w-1/3 flex items-center justify-end pr-1">
              <Image
                src="/images/forRiders.jpg"
                alt="Rider"
                width={300}
                height={300}
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
