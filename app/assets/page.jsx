"use client";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Fuse from "fuse.js";
import { useRouter } from "next/navigation";
import Link from "next/link";

const options = {
  includeScore: true,
  keys: ["asset_name", "model", "asset_tag", "category", "serial_no"],
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
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
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

  function handleView() {
    route.replace(`/assets/${rowSelectionModel}`);
  }

  function handleEdit() {
    route.replace(`/edit/${rowSelectionModel}`);
  }

  function handleAssign() {
    
  }

  const fuse = new Fuse(assets, options);
  const disableView = rowSelectionModel.length != 1;
  const disableAssign = rowSelectionModel.length < 1;

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <button 
      className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600 disabled:bg-grey-500"
        onClick={handleEdit}
        disabled={disableView}
        >
        Edit
        </button>
      <button 
      className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600 disabled:bg-grey-500"
      onClick={handleView}
      disabled={disableView}
      >
        View
      </button>

      <button 
      className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600 disabled:bg-grey-500"
      disabled={disableAssign}
      // send id to assign page
      ><Link
      href={{
        pathname: `/assets/assign`,
        query: [rowSelectionModel],
      }}
    >  Assign{disableAssign}
    </Link>
        
      </button>
      
      <DataGrid

        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        rows={assets}
        columns={columns}
        checkboxSelection
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
