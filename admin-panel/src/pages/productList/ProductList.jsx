import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState,useContext, useEffect } from "react";
import {MovieContext} from '../../context/movieContext/MovieContext'
import {getMovies,deleteMovie} from '../../context/movieContext/apiCalls'
import {CircularProgress} from '@material-ui/core'

export default function ProductList() {
  // const [data, setData] = useState(productRows);
  const {movies,dispatch,isFetching}=useContext(MovieContext);

  useEffect( () =>{
    getMovies(dispatch);
  },[dispatch])

  const handleDelete = (id,params) => {
    deleteMovie(id,dispatch)
    console.log(params);
    console.log(id);
  };

console.log(movies);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          {/* pass movies array ---------------- */}
            <Link to={{pathname:`/product/${params.row._id}`,state:params.row}}>
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
        rows={movies}
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
