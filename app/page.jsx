"use client";

import Dashboard from "@/components/Dashboard";
import LoginPage from "./login/page";
import AssetsList from "@/components/AssetsList";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import RootLayout from "./layout";

 
export default function Home({}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [user]);

  function onLogin(user) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }
  function onLogout() {
    setUser(null);
    localStorage.removeItem("user");
  }


  return (
    <>
   
      {/* <AssetsList /> */}
      {/* <NavBar /> */}
     
    
      {user ? <Dashboard /> : <LoginPage onLogin={onLogin} />}
    </>
  );
}
