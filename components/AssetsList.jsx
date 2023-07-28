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
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
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
