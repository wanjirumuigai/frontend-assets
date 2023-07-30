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
  // {
  //   field: "serialNumber",
  //   headerName: "Serial Number",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstname || ""} ${params.row.lastname || ""}`,
  // },
];

// const rows = [
//   { id: 1, lastname: "Snow", firstname: "Jon", age: 35 },
//   { id: 2, lastname: "Lannister", firstname: "Cersei", age: 42 },
//   { id: 3, lastname: "Lannister", firstname: "Jaime", age: 45 },
//   { id: 4, lastname: "Stark", firstname: "Arya", age: 16 },
//   { id: 5, lastname: "Targaryen", firstname: "Daenerys", age: null },
//   { id: 6, lastname: "Melisandre", firstname: null, age: 150 },
//   { id: 7, lastname: "Clifford", firstname: "Ferrara", age: 44 },
//   { id: 8, lastname: "Frances", firstname: "Rossini", age: 36 },
//   { id: 9, lastname: "Roxie", firstname: "Harvey", age: 65 },
// ];

export default function AssetsList() {
  const [assets, setAssets] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const route = useRouter();

  useEffect(() => {
    const fetchAssets = async () => {
      const res = await fetch("http://localhost:3000/assets");
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
