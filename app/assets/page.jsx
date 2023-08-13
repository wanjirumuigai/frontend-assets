"use client";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Fuse from "fuse.js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import markForDisposal from "@/components/MarkForDisposal";

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
    width: 130,
  },
  {
    field: "marked_for_disposal",
    headerName: "Disposed?",
    width: 90,
  },
  {
    field: "user_id",
    headerName: "Assigned To",
    width: 90,
  },
  {
    field: "department",
    headerName: "Department",
    width: 90,
  },
  {
    field: "location",
    headerName: "Location",
    width: 130,
  },
  {
    field: "assigned_by",
    headerName: "Assigned By",
    width: 150,
  },
  {
    field: "is_returned",
    headerName: "Returned?",
    width: 100
  },
  {
    field: "received_by",
    headerName: "Received By",
    width: 100
  }
];

export default function ShowAssets() {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [assets, setAssets] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const router = useRouter();
  const token = JSON.parse(sessionStorage.getItem("user")).jwt;
  const loggedUser = JSON.parse(sessionStorage.getItem("user")).user;

  useEffect(() => {
    const fetchAssets = async () => {
      const res = await fetch("http://localhost:4000/assets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAssets(data);
      setSearchItems(data);
    };

    fetchAssets();
  }, []);

  // const undisposed = assets.filter(
  //   (asset) => asset.marked_for_disposal === false
  // );

  function handleView() {
    router.replace(`/assets/${rowSelectionModel}`);
  }

  function handleEdit() {
    router.replace(`/edit/${rowSelectionModel}`);
  }

  const handleDispose = () => {
    markForDisposal({
      selectedIds: rowSelectionModel,
    });
  };
  const fuse = new Fuse(assets, options);
  const disableView = rowSelectionModel.length != 1;
  const disableAssign = rowSelectionModel.length < 1;

  // FOR TRIAL==========================================================================================================
  const flattenObj = (ob) => {

    // The object which contains the
    // final result
    let result = {};

    // loop through the object "ob"
    for (const i in ob) {

        // We check the type of the i using
        // typeof() function and recursively
        // call the function again
        if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
            const temp = flattenObj(ob[i]);
            for (const j in temp) {

                // Store temp in result
                result[i + '.' + j] = temp[j];
            }
        }

        // Else store ob[i] in result directly
        else {
            result[i] = ob[i];
        }
    }
    return result;
};

const flattened_assets = assets.map((asset) => {
  return Object.assign({...asset}, flattenObj(asset.assigns[0]))
})

  // END FOR TRIAL======================================================================================================

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div className="flex justify-end mt-6">
        {loggedUser.role !== "Super Admin" ? null : (
          <button
            className="px-6 py-2 leading-5 mr-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600 disabled:bg-grey-500"
            onClick={handleDispose}
            disabled={disableAssign}
          >
            Mark For Disposal
          </button>
        )}

        <button
          className="px-6 py-2 leading-5 mr-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600 disabled:bg-grey-500"
          onClick={handleEdit}
          disabled={disableView}
        >
          Edit
        </button>
        <button
          className="px-6 py-2 leading-5 mr-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600 disabled:bg-grey-500"
          onClick={handleView}
          disabled={disableView}
        >
          View
        </button>

        <button
          className="px-6 py-2 leading-5 mr-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600 disabled:bg-grey-500"
          disabled={disableAssign}

          // send id to assign page
        >
          <Link
            href={{
              pathname: `/assets/assign`,
              query: rowSelectionModel,
            }}
          >
            {" "}
            Assign
          </Link>
        </button>
      </div>

      <DataGrid
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        rows={flattened_assets}
        columns={columns}
        checkboxSelection
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        pageSizeOptions={[5, 10, 15]}
      />
    </div>
  );
}
