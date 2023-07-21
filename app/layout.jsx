"use client";
import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import { FaComputer, FaChevronLeft, FaUserGear } from "react-icons/fa6";
import { RiDashboard3Line, RiUserSettingsLine } from "react-icons/ri";
import { MdMenuOpen } from "react-icons/md";
import { TbLicense } from "react-icons/tb";
import { NavLink } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "ICT Asset Management",
//   description: "KISE Asset Management App",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-row">
          <div className="navbar bg-gray-900 w-1/6 h-screen">
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
          <div className="main-section flex flex-col w-5/6">
            <div className="top-section">
              <div className="flex flex-row justify-between px-10 my-2.5">
                <MdMenuOpen size={48} />
                <div className="user-menu flex flex-row">
                  <FaUserGear size={48} className="mx-2" />
                  <h1 className="font-bold text-xl self-end mx-2">Admin</h1>
                </div>
              </div>
              <hr className="border-zinc-900" />
            </div>
            <div className="main-body px-11 py-5">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
