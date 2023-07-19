// "use client"
import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { FaComputer } from "react-icons/fa6";
import { FaLaptopFile } from "react-icons/fa6";
import { FaUserGear } from "react-icons/fa6";
import { MdMenuOpen } from "react-icons/md";
import { RiDashboard3Line } from "react-icons/ri";
import { RiUserSettingsLine } from "react-icons/ri";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ICT Asset Management",
  description: "KISE Asset Management App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-row">
          <div className="navbar bg-gray-900 w-1/6 h-screen">
            <h1 className="text-center font-bold text-lg text-white my-5">
              ICT ASSET MANAGEMENT
            </h1>
            <hr />
            <div className="links-container flex flex-col justify-start py-4">
              <div className="link-group flex gap-3 my-2 ml-10">
                <RiDashboard3Line size={28} color="white" />
                <Link className="text-white text-lg" href="/">
                  Dashboard
                </Link>
              </div>
              <div className="link-group flex gap-3 my-2 ml-10">
                <FaComputer size={28} color="white" />
                <Link className="text-white text-lg" href="/">
                  Assets
                </Link>
              </div>
              <div className="link-group flex gap-3 my-2 ml-10">
                <FaLaptopFile size={28} color="white" />
                <Link className="text-white text-lg" href="/">
                  Assign Assets
                </Link>
              </div>
              <div className="link-group flex gap-3 my-2 ml-10">
                <RiUserSettingsLine size={28} color="white" />
                <Link className="text-white text-lg" href="/">
                  Users
                </Link>
              </div>
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
            <div className="main-body">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
