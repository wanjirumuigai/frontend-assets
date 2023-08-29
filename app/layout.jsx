// import NavBar from "@/components/NavBar";
"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaComputer, FaChevronLeft, FaUserGear } from "react-icons/fa6";
import { RiDashboard3Line, RiUserSettingsLine } from "react-icons/ri";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { TbLicense } from "react-icons/tb";
import { NavLink } from "@mantine/core";
import { useState, useEffect } from "react";
import LoginPage from "@/components/Login";

const inter = Inter({ subsets: ["latin"] });

// const metadata = {
//   title: "KISE Assets Management",
//   description: "KISE Asset Management App",
// };

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter();
  const [navCollapsed, setNavCollapsed] = useState(false);

  useEffect(() => {
    if (window) {
      setUser(JSON.parse(sessionStorage.getItem("user")));
      router.refresh()
    }
  }, [isLoggedIn]);


  function handleLogout(){
      sessionStorage.removeItem("user");
      setUser(null);
      setIsLoggedIn(isLoggedIn => !isLoggedIn)
  }

  function handleIsLoggedIn(){
    setIsLoggedIn(isLoggedIn => !isLoggedIn)
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-row">
          {!navCollapsed ?
          <div className="navbar bg-gray-900 w-1/6 h-screen overflow-hidden">
            <h1 className="text-center font-bold text-lg text-white my-5">
              <Link href="/">ICT ASSET MANAGEMENT</Link>
            </h1>
            <hr />
            <div className="links-container flex flex-col justify-start py-4">
              <NavLink
                label="Dashboard"
                icon={<RiDashboard3Line size={28} color="white" />}
                className="text-white text-lg hover:bg-gray-950"
                variant="subtle"
                component={Link}
                href="/"
              />
              <NavLink
                label="Users"
                icon={<RiUserSettingsLine size={28} color="white" />}
                className="text-white text-lg hover:bg-gray-950"
                variant="subtle"
                rightSection={<FaChevronLeft size="0.8rem" stroke={1.5} />}
                childrenOffset={40}
              >
                <NavLink
                  label="All Users"
                  className="text-white text-lg hover:bg-gray-950"
                  component={Link}
                  href="/users"
                />
                <NavLink
                  label="New User"
                  className="text-white text-lg hover:bg-gray-950"
                  component={Link}
                  href="/users/new"
                />
              </NavLink>
              <NavLink
                label="Licenses"
                icon={<TbLicense size={28} color="white" />}
                className="text-white text-lg hover:bg-gray-950"
                variant="subtle"
                rightSection={<FaChevronLeft size="0.8rem" stroke={1.5} />}
                childrenOffset={40}
              >
                <NavLink
                  label="All Licenses"
                  className="text-white text-lg hover:bg-gray-950"
                  component={Link}
                  href="/licenses"
                />
                <NavLink
                  label="New License"
                  className="text-white text-lg hover:bg-gray-950"
                  component={Link}
                  href="/licenses/new"
                />
              </NavLink>
              <NavLink
                label="Assets"
                icon={<FaComputer size={28} color="white" />}
                childrenOffset={40}
                className="text-white text-lg hover:bg-gray-950"
                rightSection={<FaChevronLeft size="0.8rem" stroke={1.5} />}
              >
                <NavLink
                  label="All Assets"
                  className="text-white text-lg hover:bg-gray-950"
                  component={Link}
                  href="/assets"
                />
                <NavLink
                  label="New Asset"
                  className="text-white text-lg hover:bg-gray-950"
                  component={Link}
                  href="/assets/new"
                />
                <NavLink
                  label="Assign Asset"
                  className="text-white text-lg hover:bg-gray-950"
                  component={Link}
                  href="/assets/assign"
                />
                <NavLink
                  label="Return Asset"
                  className="text-white text-lg hover:bg-gray-950"
                  component={Link}
                  href="/assets/return"
                />
              </NavLink>
            </div>
          </div>
          : <div className="hidden"></div>
          }
          <div className="main-section flex flex-col w-5/6">
            <div className="top-section">
              <div className="flex flex-row justify-between px-10 my-2.5">
                <button
                onClick={() => setNavCollapsed(!navCollapsed)}
                >
                {navCollapsed ?
                <MdMenu size={48}/>
                :
                <MdMenuOpen size={48} />}
                </button>
                {user ? (
                  <h1 className="font-bold text-xl self-end mx-2">
                    Welcome, {user.user["firstname"]}
                  </h1>
                ) : null}
                <div className="user-menu flex flex-row">
                  <FaUserGear size={48} className="mx-2" />
                  {user ? (
                    <h1
                      className="font-bold text-xl self-end mx-2 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </h1>
                  ) : (
                    // <h1
                    //   className="font-bold text-xl self-end mx-2"
                    //   onClick={<LoginPage />}
                    // >
                    //   Login
                    // </h1>
                    null
                  )}
                </div>
              </div>
              <hr className="border-zinc-900" />
            </div>
            {user ? <div className="main-body px-11 py-5">{children}</div> : <LoginPage handleIsLoggedIn={handleIsLoggedIn}/>}
          </div>
        </div>
      </body>
    </html>
  );
}
