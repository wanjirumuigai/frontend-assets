import DataCard from "@/components/DataCard";
import { FaBarcode } from "react-icons/fa6";

export default function Home() {
  return (
    <>
    <h1 className="main-heading text-4xl font-bold">Dashboard</h1>
    <div className="cards-container bg-zinc-100 mt-5">
      <DataCard title="Active Assets" number={233} icon={FaBarcode}/>
    </div>
    </>
   )
}
