import "./listList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState,useContext, useEffect } from "react";
import {ListContext} from "../../context/listContext/ListContext"
import {CircularProgress} from '@material-ui/core'
import {getLists,deleteList} from "../../context/listContext/apiCalls"

export default function ListList() {
  // const [data, setData] = useState(productRows);
  const {lists,dispatch,isFetching}=useContext(ListContext);

  useEffect( () =>{
    getLists(dispatch)
  },[dispatch])

  const handleDelete = (id,params) => {
    deleteList(id,dispatch)
    // console.log(params);
    // console.log(id);
  };

// console.log(lists);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },  
    { field: "title", headerName: "Title", width: 250 },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "type", headerName: "Type", width: 120 },
  
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          {/* pass movie---------------- */}
            <Link to={{pathname:`/lists/${params.row._id}`,state:params.row}}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id,params)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      {isFetching ? <CircularProgress  /> :(
        <>
        <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id }
        // getRowId={Math.random()}
        
      />
        </>
      ) }
     
      
    </div>
  );
}
