import { Link, useLocation } from "react-router-dom";
import "./list.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
// import {updatelist} from '../../context/movieContext/apiCalls'
// import {MovieContext} from "../../context/movieContext/MovieContext";
import {CircularProgress} from '@material-ui/core'
import {updateList} from '../../context/listContext/apiCalls'
import {ListContext} from "../../context/listContext/ListContext"

export default function Product() {
    const [formData,setFormData]=useState(null);
    const location=useLocation();
    const list=location.state;
    const {dispatch,isFetching}=useContext(ListContext);
   

    // console.log(movie);

    const handleChange= (e) =>{
        const {value,name}=e.target;

        setFormData({
            ...formData,
            [name]:value
        })
    }
console.log(formData);
    // after user click on update button ---------
    const handleSubmit =(e) =>{
        e.preventDefault();
        
        updateList(list?._id,formData,dispatch)
      
    }
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
         
          <div className="productTopRight">
              
              <div className="productInfoTop">
                
                  <span className="productName">{list.title} </span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{list._id} </span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre:</span>
                      <span className="productInfoValue">{list.genre} </span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">type</span>
                      <span className="productInfoValue">{list.type} </span>
                  </div>
                 
              </div>
          </div>
      </div>

      {/* UPDATE MOVIE ------------------------ */}
      {isFetching ? <CircularProgress />:(
          <>
   <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>List Title</label>
                  <input type="text"  name="title" onChange={handleChange}
                   placeholder={list.title} />
                 
                  <label>Type</label>
                  <input  name="type" onChange={handleChange}
                   type="text" placeholder={list.type} />

                  <label>Genre</label>
                  <input  name="genre" onChange={handleChange}
                   type="text" placeholder={list.genre} />

                
              </div>
              <div className="productFormRight">
                  
                  <button onClick={handleSubmit}
                   className="productButton">Update</button>
              </div>
          </form>
      </div>
          </>
      )}
   
    </div>
  );
}
