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
        <DataCard
          title={"Active Assets"}
          number={233}
          icon={FaBarcode}
          cardColor="bg-rose-600"
          link={"/assets"}
        />
        <DataCard
          title={"Allocated Assets"}
          number={200}
          icon={FaUserPlus}
          cardColor={"bg-lime-600"}
          link={"/assets"}
        />
        <DataCard
          title={"Users"}
          number={168}
          icon={FaUsers}
          cardColor={"bg-amber-600"}
          link={"/users"}
        />
        <DataCard
          title={"Asset Categories"}
          number={6}
          icon={FaComputer}
          cardColor={"bg-sky-600"}
          link={"/assets"}
        />
        {/* Bottom Row */}
        <DataCard
          title={"Assets Under Repair"}
          number={2}
          icon={GiAutoRepair}
          cardColor={"bg-green-600"}
          link={"/assets"}
        />
        <DataCard
          title={"Disposed Assets"}
          number={0}
          icon={ImBin}
          cardColor={"bg-orange-600"}
          link={"/assets"}
        />
        <DataCard
          title={"Licenses"}
          number={9}
          icon={TbLicense}
          cardColor={"bg-purple-600"}
          link={"/licenses"}
        />
        <DataCard
          title={"Expired Licenses"}
          number={2}
          icon={TbLicenseOff}
          cardColor={"bg-red-600"}
          link={"/licenses"}
        />
      </div>
    </>
  );
}
