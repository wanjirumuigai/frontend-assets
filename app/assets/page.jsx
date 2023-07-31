"use client";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Fuse from "fuse.js";
import { useRouter } from "next/navigation";

const options = {
  includeScore: true,
  keys: ["assetName", "model", "tag", "category", "serialNumber"],
};

const columns = [
  { field: "id", headerName: "ID", width: 70, color: "red" },
  { field: "asset_name", headerName: "Asset Name", width: 130 },
  { field: "model", headerName: "Model", width: 130 },
  {
    field: "asset_tag",
    headerName: "Tag",

    width: 90,
  },
  {
    field: "serial_no",
    headerName: "Serial Number",

    width: 90,
  },
  {
    field: "marked_for_disposal",
    headerName: "Marked for Disposal",

    width: 90,
  },
];

export default function ShowAssets() {
  const [assets, setAssets] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const route = useRouter();

  useEffect(() => {
    const fetchAssets = async () => {
      const res = await fetch("http://localhost:4000/assets");
      const data = await res.json();
      setAssets(data);
      setSearchItems(data);
    };

    fetchAssets();
  }, []);

  function handleEvent(params) {
    //console.log(params.row.id);
    route.replace(`/assets/${params.row.id}`);
  }

  const fuse = new Fuse(assets, options);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        onRowClick={handleEvent}
        rows={assets}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
