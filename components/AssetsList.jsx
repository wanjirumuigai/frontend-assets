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
  { field: "assetName", headerName: "Asset Name", width: 130 },
  { field: "model", headerName: "Model", width: 130 },
  {
    field: "tag",
    headerName: "Tag",

    width: 90,
  },
  {
    field: "serialNumber",
    headerName: "Serial Number",

    width: 90,
  },
  {
    field: "Actions",
    headerName: "Serial Number",

    width: 90,
  },

];



export default function AssetsList() {
  const [assets, setAssets] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const route = useRouter();
  const token = JSON.parse(sessionStorage.getItem("user")).jwt

  useEffect(() => {
    const fetchAssets = async () => {
      const res = await fetch("http://localhost:4000/assets",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },

      }
      );

      const data = await res.json();
      setAssets(data);
      setSearchItems(data);
    };

    fetchAssets();
  }, []);

  function handleEvent(params) {
    // console.log(params.row.id);
    route.push(`/assets/${params.row.id}`);
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
