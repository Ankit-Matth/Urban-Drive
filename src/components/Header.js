"use client";
import Link from "next/link";
import { useState , useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation'
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setRole } from "@/lib/features/role/roleSlice";
import { hideCommonLayout } from "@/lib/features/layout/layoutSlice";
import { signOut } from "next-auth/react"

const Header = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userRole = useAppSelector((state) => state.role.userRole);

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setIsOpen(false);
  };

  const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/"); 
      handleLinkClick("/logout")
      dispatch(setRole(""))
    });
  };

  useEffect(()=>{
    if (pathname === '/riders') {
      handleLinkClick('/riders');
    } else if (pathname === '/drivers') {
      handleLinkClick('/drivers');
    } else if (pathname === '/customerQueries') {
      handleLinkClick('/customerQueries');
    } else if (pathname === '/userManagement') {
      handleLinkClick('/userManagement');
    } else if (pathname === '/driverVerification') {
      handleLinkClick('/driverVerification');
    }
  },[pathname])

  const getPath = () => {
    switch (userRole) {
      case "admin":
        return "/admin";
      case "driver":
        return "/drivers";
      case "rider":
        return "/riders";
      default:
        return "/";
    }
  };

  return (
    <header className="p-4 py-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href={getPath()} onClick={() => handleLinkClick("/")}>
            <Image
              src="/images/Logo.png"
              priority={true}
              alt="Logo"
              width={250}
              height={100}
              className="w-48 md:w-100"
            />
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="border-black border px-1 rounded">
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
            {userRole === "" && (
              <>
                <li className="border-b-2 py-2 md:border-none md:py-0">
                  <Link
                    href="/"
                    className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                      activeLink === "/" ? "font-medium text-gray-950" : "font-light text-gray-600"
                    } w-full justify-center flex md:flex-none md:inline`}
                    onClick={() => handleLinkClick("/")}
                  >
                    Home
                  </Link>
                </li>
                <li className="border-b-2 py-2 md:border-none md:py-0">
                  <Link
                    href="/about"
                    className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                      activeLink === "/about" ? "font-medium text-gray-950" : "font-light text-gray-600"
                    } w-full justify-center flex md:flex-none md:inline`}
                    onClick={() => handleLinkClick("/about")}
                  >
                    About
                  </Link>
                </li>
                <li className="border-b-2 py-2 md:border-none md:py-0">
                  <Link
                    href="/riders"
                    className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                      activeLink === "/riders" ? "font-medium text-gray-950" : "font-light text-gray-600"
                    } w-full justify-center flex md:flex-none md:inline`}
                    onClick={() => {handleLinkClick("/riders");}}>
                    Riders
                  </Link>
                </li>
                <li className="border-b-2 py-2 md:border-none md:py-0">
                  <Link
                    href="/drivers"
                    className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                      activeLink === "/drivers" ? "font-medium text-gray-950" : "font-light text-gray-600"
                    } w-full justify-center flex md:flex-none md:inline`}
                    onClick={() => {handleLinkClick("/drivers");}}>
                    Drivers
                  </Link>
                </li>
                <li className="border-b-2 py-2 md:border-none md:py-0">
                  <Link
                    href="/api/auth/signin"
                    className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                      activeLink === "/admin" ? "font-medium text-gray-950" : "font-light text-gray-600"
                    } w-full justify-center flex md:flex-none md:inline`}
                    onClick={() => {
                      handleLinkClick("/admin");
                      dispatch(setRole("admin"));
                      dispatch(hideCommonLayout());
                    }}
                  >
                    Admin
                  </Link>
                </li>
                <li className="py-2 md:py-0">
                  <Link
                    href="/contact"
                    className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                      activeLink === "/contact" ? "font-medium text-gray-950" : "font-light text-gray-600"
                    } w-full justify-center flex md:flex-none md:inline`}
                    onClick={() => {
                      handleLinkClick("/contact");
                    }}
                  >
                    Contact
                  </Link>
                </li>
              </>
            )}
            {userRole === "admin" && (
              <>
                <li className="border-b-2 py-2 md:border-none md:py-0">
                  <Link
                    href="/driverVerification"
                    className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                      activeLink === "/driverVerification" ? "font-medium text-gray-950" : "font-light text-gray-600"
                    } w-full justify-center flex md:flex-none md:inline`}
                    onClick={() => handleLinkClick("/driverVerification")}
                  >
                    Driver Verification
                  </Link>
                </li>
                <li className="border-b-2 py-2 md:border-none md:py-0">
                  <Link
                    href="/userManagement"
                    className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                      activeLink === "/userManagement" ? "font-medium text-gray-950" : "font-light text-gray-600"
                    } w-full justify-center flex md:flex-none md:inline`}
                    onClick={() => {
                      handleLinkClick("/userManagement");
                    }}
                  >
                    User Management
                  </Link>
                </li>
                <li className="border-b-2 py-2 md:border-none md:py-0">
                  <Link
                    href="/customerQueries"
                    className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                      activeLink === "/customerQueries" ? "font-medium text-gray-950" : "font-light text-gray-600"
                    } w-full justify-center flex md:flex-none md:inline`}
                    onClick={() => handleLinkClick("/customerQueries")}
                  >
                    Customer Queries
                  </Link>
                </li>
                <li className="border-b-2 py-2 md:border-none md:py-0">
                  <Link
                    href=""
                    className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                      activeLink === "/logout" ? "font-medium text-gray-950" : "font-light text-gray-600"
                    } w-full justify-center flex md:flex-none md:inline`}
                    onClick={() => {handleLogout()}}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
            {(userRole === "rider" || userRole === "driver") && (
              <>
                <li className="border-b-2 py-2 md:border-none md:py-0">
                  <Link
                    href={userRole === "rider" ? "/riderDashboard" : "/driverDashboard"}
                    className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                      activeLink === (userRole === "rider" ? "/riderDashboard" : "/driverDashboard")
                        ? "font-medium text-gray-950"
                        : "font-light text-gray-600"
                    } w-full justify-center flex md:flex-none md:inline`}
                    onClick={() => {
                      handleLinkClick(userRole === "rider" ? "/riderDashboard" : "/driverDashboard");
                    }}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="border-b-2 py-2 md:border-none md:py-0">
                  <Link
                    href="/contact"
                    className={`md:p-1 md:pb-[3px] rounded md:hover:border-b-2 md:hover:border-black ${
                      activeLink === "/contact" ? "font-medium text-gray-950" : "font-light text-gray-600"
                    } w-full justify-center flex md:flex-none md:inline`}
                    onClick={() => {
                      handleLinkClick("/contact");
                    }}
                  >
                    Contact
                  </Link>
                </li>
                <li className="py-2 md:py-0 flex items-center justify-center">
                  <Link
                    href="/myProfile"
                    className="flex justify-center items-center w-full md:flex-none md:inline pl-2"
                    onClick={() => {
                      handleLinkClick("/drivers");
                    }}
                  >
                    <Image src="/svgs/defaultUser.svg" alt="Logo" width={25} height={25} />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
