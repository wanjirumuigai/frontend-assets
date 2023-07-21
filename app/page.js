"use client";
import AddAsset from "@/components/AddAsset";
import AssignAsset from "@/components/AssignAsset";
import ShowAssets from "@/components/ShowAssets";

export default function Home() {
  return (
    <main>
      <AddAsset />
      <ShowAssets />
      <AssignAsset />
    </main>
  );
}
