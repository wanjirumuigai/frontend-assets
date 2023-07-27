"use client";
import { useEffect, useState } from "react";
import Dashboard from "@/components/Dashboard";
import LoginPage from "./login/page";

export default function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  });

  function onLogin(user) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }
  function onLogout() {
    setUser(null);
    localStorage.removeItem("user");
  }
  return <>{user ? <Dashboard /> : <LoginPage onLogin={onLogin} />}</>;
}
