import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import {updateMovie} from '../../context/movieContext/apiCalls'
import {MovieContext} from "../../context/movieContext/MovieContext";
import {CircularProgress} from '@material-ui/core'

export default function Product() {
    const [formData,setFormData]=useState(null);
    const location=useLocation();
    const movie=location.state;
    const {dispatch,isFetching}=useContext(MovieContext);
   

    // console.log(movie);

    const handleChange= (e) =>{
        const {value,name}=e.target;

        setFormData({
            ...formData,
            [name]:value
        })
    }

    // after user click on update button ---------
    const handleSubmit =(e) =>{
        e.preventDefault();
        
        updateMovie(movie?._id,formData,dispatch)
      
    }
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
         
          <div className="productTopRight">
              
              <div className="productInfoTop">
                  <img src={movie.img} alt="" className="productInfoImg" />
                  <span className="productName">{movie.title} </span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{movie._id} </span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">genre:</span>
                      <span className="productInfoValue">{movie.genre} </span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">year</span>
                      <span className="productInfoValue">{movie.year} </span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">limit </span>
                      <span className="productInfoValue">{movie.limit} </span>
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
                  <label>Movie Title</label>
                  <input type="text"  name="title" onChange={handleChange}
                   placeholder={movie.title} />
                 
                  <label>Year</label>
                  <input  name="year" onChange={handleChange}
                   type="text" placeholder={movie.year} />

                  <label>Genre</label>
                  <input  name="genre" onChange={handleChange}
                   type="text" placeholder={movie.genre} />

                  <label>Limit</label>
                  <input  name="limit" onChange={handleChange}
                   type="text" placeholder={movie.limit} />

                  <label>Trailer</label>
                  <input type="file" placeholder={movie.trailer} />

                  <label>Video</label>
                  <input type="file" placeholder={movie.video} />
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={movie.img} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
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
