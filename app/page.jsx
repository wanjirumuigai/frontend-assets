import DataCard from "@/components/DataCard";
import { FaBarcode, FaUserPlus, FaComputer, FaUsers } from "react-icons/fa6";
import { ImBin } from "react-icons/im";
import { GiAutoRepair } from "react-icons/gi";
import { TbLicense, TbLicenseOff } from "react-icons/tb";

export default function Home() {
  return (
    <>
      <h1 className="main-heading text-4xl font-bold">Dashboard</h1>
      <div className="cards-container mt-5 flex flex-wrap justify-between">
        {/* Top row */}
        <DataCard title={"Active Assets"} number={233} icon={FaBarcode} color={"rose"} link={"/assets"}/>
        <DataCard title={"Allocated Assets"} number={200} icon={FaUserPlus} color={"lime"} link={"/assets"}/>
        <DataCard title={"Users"} number={168} icon={FaUsers} color={"amber"} link={"/users"}/>
        <DataCard title={"Asset Categories"} number={6} icon={FaComputer} color={"sky"} link={"/assets"}/>
        {/* Bottom Row */}
        <DataCard title={"Assets Under Repair"} number={2} icon={GiAutoRepair} color={"green"} link={"/assets"}/>
        <DataCard title={"Disposed Assets"} number={0} icon={ImBin} color={"orange"} link={"/assets"}/>
        <DataCard title={"Licenses"} number={9} icon={TbLicense} color={"purple"} link={"/licenses"}/>
        <DataCard title={"Expired Licenses"} number={2} icon={TbLicenseOff} color={"red"} link={"/licenses"}/>
      </div>
    </>
  );
}
