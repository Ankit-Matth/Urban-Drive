"use client"
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setRole } from '@/lib/features/role/roleSlice'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('/')
  const dispatch = useAppDispatch()
  const userRole = useAppSelector((state) => state.role.userRole);

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setIsOpen(false);
  };

  return (
    <header className="p-4 py-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href={`/`} onClick={() => handleLinkClick('/')}>
              <Image src="/images/Logo.png" alt="Logo" width={250} height={100} className="w-48 md:w-100" />
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="border-black border px-1 rounded"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center w-full md:w-auto absolute top-20 left-0 md:static md:top-0 bg-white`}
        >
          <ul className="flex flex-col border-2 m-1 md:flex-row md:space-x-5 md:border-none md:m-0 text-lg">
            {userRole === '' && (
              <>
                <li className='border-b-2 py-2 md:border-none md:py-0'>
                  <Link href="/" className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                        activeLink === '/' ? 'font-medium' : 'font-light' } w-full justify-center flex md:flex-none md:inline`} onClick={() => handleLinkClick('/')}>Home</Link>
                </li>
                <li className='border-b-2 py-2 md:border-none md:py-0'>
                  <Link href="/about" className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                        activeLink === '/about' ? 'font-medium' : 'font-light' } w-full justify-center flex md:flex-none md:inline`} onClick={() => handleLinkClick('/about')}>About</Link>
                </li>
                <li className='border-b-2 py-2 md:border-none md:py-0'>
                  <Link href="/signup" className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                        activeLink === '/riders' ? 'font-medium' : 'font-light' } w-full justify-center flex md:flex-none md:inline`} onClick={() => {
                          handleLinkClick('/riders')
                          dispatch(setRole('rider'))
                        }}>Riders</Link>
                </li>
                <li className='border-b-2 py-2 md:border-none md:py-0'>
                  <Link href="/signup" className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                        activeLink === '/drivers' ? 'font-medium' : 'font-light' } w-full justify-center flex md:flex-none md:inline`} onClick={() => {
                          handleLinkClick('/drivers')
                          dispatch(setRole('driver'))
                        }}>Drivers</Link>
                </li>
                <li className='border-b-2 py-2 md:border-none md:py-0'>
                  <Link href="/login" className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                        activeLink === '/login' ? 'font-medium' : 'font-light' } w-full justify-center flex md:flex-none md:inline`} onClick={() => {
                          handleLinkClick('/login')
                          dispatch(setRole('admin'))
                        }}>Admin</Link>
                </li>
                <li className='py-2 md:py-0'>
                  <Link href="/contact" className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                        activeLink === '/contact' ? 'font-medium' : 'font-light' } w-full justify-center flex md:flex-none md:inline`} onClick={() => {handleLinkClick('/contact')}}>Contact</Link>
                </li>
              </>
            )}
            {userRole === 'admin' && (
              <>
                <li className='border-b-2 py-2 md:border-none md:py-0'>
                  <Link href="/driverVerification" className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                        activeLink === '/driverVerification' ? 'font-medium' : 'font-light' } w-full justify-center flex md:flex-none md:inline`} onClick={() => handleLinkClick('/driverVerification')}>Driver Verification</Link>
                </li>
                <li className='border-b-2 py-2 md:border-none md:py-0'>
                  <Link href="/userManagement" className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                        activeLink === '/userManagement' ? 'font-medium' : 'font-light' } w-full justify-center flex md:flex-none md:inline`} onClick={() => {handleLinkClick('/userManagement')}}>User Management</Link>
                </li>
                <li className='border-b-2 py-2 md:border-none md:py-0'>
                  <Link href="/customerQueries" className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                        activeLink === '/customerQueries' ? 'font-medium' : 'font-light' } w-full justify-center flex md:flex-none md:inline`} onClick={() => handleLinkClick('/customerQueries')}>Customer Queries</Link>
                </li>
              </>
            )}
            {(userRole === 'rider' || userRole === 'driver') && (
              <>
                <li className='border-b-2 py-2 md:border-none md:py-0'>
                  <Link 
                    href={userRole === 'rider' ? '/riderDashboard' : '/driverDashboard'}
                    className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                      activeLink === (userRole === 'rider' ? '/riderDashboard' : '/driverDashboard') ? 'font-medium' : 'font-light'
                    } w-full justify-center flex md:flex-none md:inline`}
                    onClick={() => { handleLinkClick(userRole === 'rider' ? '/riderDashboard' : '/driverDashboard') }}>
                    Dashboard
                  </Link>
                </li>
                <li className='border-b-2 py-2 md:border-none md:py-0'>
                  <Link href="/contact" className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                        activeLink === '/contact' ? 'font-medium' : 'font-light' } w-full justify-center flex md:flex-none md:inline`} onClick={() => {handleLinkClick('/contact')}}>Contact</Link>
                </li>
                <li className="py-2 md:py-0 flex items-center justify-center">
                    <Link href="/myProfile" className="flex justify-center items-center w-full md:flex-none md:inline pl-2" onClick={() =>{handleLinkClick('/drivers')}}>
                    <Image src="/svgs/defaultUser.svg" alt="Logo" width={25} height={25} />
                </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
