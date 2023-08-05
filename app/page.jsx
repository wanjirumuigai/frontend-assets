"use client";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/Dashboard";

export default function Home({}) {
  const router = useRouter()
  const user = JSON.parse(sessionStorage.getItem("user"))

  return (
    <>
      {user ? <Dashboard /> : router.push("/login")}
    </>
  );
}
