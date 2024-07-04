"use client"
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import ConfirmationModal from '@/components/ConfirmationModal';
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setContactCategory } from '@/lib/features/contactCategory/contactSlice'
import { setRole } from '@/lib/features/role/roleSlice'

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch()
  const category = useAppSelector((state) => state.contact.contactCategory);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [subject, setSubject] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');

  const [showModal, setShowModal] = useState(false);
  
  const handleFullNameChange = (e) => setFullName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);
  const handleSubjectChange = (e) => setSubject(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleDetailsChange = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setRole('');
    setSubject('');
    setUsername('');
    setDescription('');
    dispatch(setContactCategory(''))
    router.replace('/');
    setTimeout(() => {
      setShowModal(false);
    }, 900);
  };

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      dispatch(setContactCategory(categoryParam))
    } else {
      dispatch(setContactCategory(''))
    }
  }, [searchParams]);

  const handleCategoryClick = (cat) => {
    dispatch(setContactCategory(cat))
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      router.push(`?category=${cat}`);
    }
  };

  const handleBack = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setRole('');
    setSubject('');
    setUsername('');
    setDescription('');
    dispatch(setContactCategory(''))
    router.push('/contact');
  };

  return (
    <>
    {showModal ? 
    <ConfirmationModal onClose={closeModal}/> :
        <>
        {category ? (
          isLoggedIn && (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
          <div className="bg-white shadow-md rounded-lg w-full max-w-2xl py-8 px-10">
            <div>
              <div className="flex justify-between mb-4">
              <h2 className="text-3xl font-semibold">
                {category === 'report' && 'Report Someone'}
                {category === 'payment' && 'Payment Issues'}
                {category === 'general' && 'General Queries'}
              </h2>
              <button
                onClick={handleBack}
                className="text-blue-500 text-xl hover:underline">
                &larr;Back
              </button>
              </div>
              <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <div className="relative font-medium">
                      <input
                        type="text"
                        className="peer w-full p-4 pb-2 pt-6 border border-gray-300 rounded"
                        id='fullName'
                        value={fullName}
                        onChange={handleFullNameChange}
                        required
                      />
                      <label htmlFor="fullName"
                        className={`absolute hover:cursor-text left-4 transition-all duration-300 ${fullName ? 'text-sm top-2 text-gray-500' : 'top-4 text-gray-700 peer-focus:text-sm peer-focus:top-2 peer-focus:text-gray-500'}`}>
                        Full Name
                      </label>
                    </div>
                    <div className="relative font-medium">
                      <input
                        type="email"
                        className="peer w-full p-4 pb-2 pt-6 border border-gray-300 rounded"
                        id='email'
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                      <label htmlFor="email"
                        className={`absolute hover:cursor-text left-4 transition-all duration-300 ${email ? 'text-sm top-2 text-gray-500' : 'top-4 text-gray-700 peer-focus:text-sm peer-focus:top-2 peer-focus:text-gray-500'}`}
                      >
                        Email
                      </label>
                    </div>
                    <div className="relative font-medium">
                      <input
                        type="number"
                        className="peer w-full p-4 pb-2 pt-6 border border-gray-300 rounded"
                        id='phone'
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                      />
                      <label htmlFor='phone'
                        className={`absolute hover:cursor-text left-4 transition-all duration-300 ${phone ? 'text-sm top-2 text-gray-500' : 'top-4 text-gray-700 peer-focus:text-sm peer-focus:top-2 peer-focus:text-gray-500'}`}
                      >
                        Phone
                      </label>
                    </div>
                    <div className="relative font-medium">
                      <input
                        type="text"
                        className="peer w-full p-4 pb-2 pt-6 border border-gray-300 rounded"
                        id='role'
                        value={role}
                        onChange={handleRoleChange}
                        required
                      />
                      <label htmlFor='role'
                        className={`absolute hover:cursor-text left-4 transition-all duration-300 ${role ? 'text-sm top-2 text-gray-500' : 'top-4 text-gray-700 peer-focus:text-sm peer-focus:top-2 peer-focus:text-gray-500'}`}
                      >
                        Role
                      </label>
                    </div>
                  </div>
                  {category === 'general' ? 
                  <div className="relative font-medium mb-2">
                    <input
                      type="text"
                      className="peer w-full p-4 pb-2 pt-6 border border-gray-300 rounded"
                      id='subject'
                      value={subject}
                      onChange={handleSubjectChange}
                      required
                    />
                    <label htmlFor='subject'
                      className={`absolute hover:cursor-text left-4 transition-all duration-300 ${subject ? 'text-sm top-2 text-gray-500' : 'top-4 text-gray-700 peer-focus:text-sm peer-focus:top-2 peer-focus:text-gray-500'}`}
                    >
                      Subject
                    </label>
                  </div>
                  : ""}
                  {category === 'report' ? 
                  <div className="relative font-medium mb-2">
                    <input
                      type="text"
                      className="peer w-full p-4 pb-2 pt-6 border border-gray-300 rounded"
                      id='username'
                      value={username}
                      onChange={handleUsernameChange}
                      required
                    />
                    <label htmlFor='username'
                      className={`absolute hover:cursor-text left-4 transition-all duration-300 ${username ? 'text-sm top-2 text-gray-500' : 'top-4 text-gray-700 peer-focus:text-sm peer-focus:top-2 peer-focus:text-gray-500'}`}
                    >
                      Username of the person being reported
                    </label>
                  </div>
                  : ""}
                  <div className="relative font-medium">
                    <textarea
                      className="peer w-full p-4 pb-2 pt-6 border border-gray-300 rounded"
                      rows="4"
                      id='description'
                      value={description}
                      onChange={handleDetailsChange}
                      required
                    ></textarea>
                    <label htmlFor='description'
                      className={`absolute hover:cursor-text left-4 transition-all duration-300 ${description? 'text-sm top-2 text-gray-500' : 'top-4 text-gray-700 peer-focus:text-sm peer-focus:top-2 peer-focus:text-gray-500'}`}
                    >
                      Description
                    </label>
                  </div>
                  {category === 'general' ? "" : 
                  <div className="mb-2 mt-1">
                    <label className="block font-medium text-gray-700">Attach a screenshot</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="block p-3 w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none dark:border-gray-600"/>
                  </div>
                  }
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 w-full"
                  >
                    Submit
                  </button>
                </form>
            </div>
          </div>
        </div>)
        ) : (
          <div className="flex flex-col items-center justify-center py-2 bg-gray-100" style={{ height: 'calc(100vh - 4rem)' }}>
            <div className="container mx-auto p-4">
              <div className="flex flex-col md:flex-row bg-white  rounded-lg overflow-hidden">
                <div className="md:w-1/2 flex flex-col justify-center p-0 bg-gray-100">
                  <div className="flex flex-col w-full justify-center items-center">
                    <video width="435px" height="435px" autoPlay loop className="rounded-lg shadow-md">
                      <source src="https://cdnl.iconscout.com/lottie/premium/thumb/customer-support-4619490-3849167.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                <div className="md:w-1/2 flex flex-col justify-center p-0 bg-gray-100">
                  <div className="flex flex-col space-y-8 w-full justify-center items-center">
                    <div
                      onClick={() => handleCategoryClick('report')}
                      className="flex items-center justify-between cursor-pointer border-b-2 border-blue-500 bg-white shadow-lg rounded-lg w-full text-4xl p-10"
                    >
                      <span className="text-4xl font-medium text-gray-700">Report Someone</span>
                      <span className="text-4xl text-gray-700">&gt;</span>
                    </div>
                    <div
                      onClick={() => handleCategoryClick('payment')}
                      className="flex items-center justify-between cursor-pointer border-b-2 border-blue-500 bg-white shadow-lg rounded-lg w-full text-4xl p-10"
                    >
                      <span className="text-4xl font-medium text-gray-700">Payment Issues</span>
                      <span className="text-4xl text-gray-700">&gt;</span>
                    </div>
                    <div
                      onClick={() => handleCategoryClick('general')}
                      className="flex items-center justify-between cursor-pointer border-b-2 border-blue-500 bg-white shadow-lg rounded-lg w-full text-4xl p-10"
                    >
                      <span className="text-4xl font-medium text-gray-700">General Queries</span>
                      <span className="text-4xl text-gray-700">&gt;</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    }
    </>
  );
}

export default Page;
