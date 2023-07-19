import AddAsset from "@/components/AddAsset";
import ShowAssets from "@/components/ShowAssets";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <AddAsset />
      <ShowAssets />
    </main>
  );
}
