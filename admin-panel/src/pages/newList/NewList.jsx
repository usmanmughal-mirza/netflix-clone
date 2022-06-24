import { useContext, useEffect, useState } from "react";
import "./newList.css";
import {MovieContext} from "../../context/movieContext/MovieContext";
import {ListContext} from "../../context/listContext/ListContext";
import {getMovies} from "../../context/movieContext/apiCalls"
import {createList} from "../../context/listContext/apiCalls"

export default function NewProduct() {
  const [formData,setFormData]=useState(null);
  const {dispatch:dispatchMovie,movies}=useContext(MovieContext);
  const {dispatch}=useContext(ListContext);


  // when we open this page get movies 
  useEffect( () =>{
    getMovies(dispatchMovie)
  },[dispatchMovie])

  const changeHandler =(e) =>{
    const {value,name}=e.target;

    setFormData({
      ...formData,
      [name]:value
    })
  }
console.log(formData);

  const handleSelect =(e) =>{
    // console.log(e.target.selectedOptions);

    // The Array.from() static method creates a new, shallow-copied Array instance from an array-like or iterable object 

    let value=Array.from(e.target.selectedOptions,(option)=>option.value );
    // console.log(value);
    // value is an array..contains id of selected movie
    // console.log(value[0]);

    setFormData({...formData,
      [e.target.name]:value})
 
  }

  // 

  const submitHandler =(e)=>{
    e.preventDefault();

    createList(formData,dispatch);
    
  }

  return (
    <>
    
    <div className="newProduct">
      <h1 className="addProductTitle">New List </h1>
      <form className="addProductForm">

    
        {/* input fields -------------------- */}
        <div className="addProductItem">
          <label>Title</label>
          <input  onChange={changeHandler}
           type="text" placeholder="Usman Mughal" name="title" />
        </div>

        <div className="addProductItem">
          <label>Genre</label>
          <input  onChange={changeHandler}
           type="text" placeholder="description" name="genre" />
        </div>

       


        <div className="addProductItem">
          <label>Type</label>
          <select  onChange={changeHandler}
           name="type" >
            <option value="movie">movie</option>
            <option value="series">series</option>
          </select>
        </div>

        {/* select movies to add content array ---- */}

        <div className="addProductItem">
          <label>Content</label>
          <select multiple onChange={handleSelect}
           name="content" >
             {movies.map( (movie) =>(
        <option key={movie._id}
         value={movie._id}>{movie.title} </option>
             ))}
           
           
          </select>
        </div>


          <button className="addProductButton" 
          onClick={submitHandler}>Create</button>

      </form>
    </div>
    </>
  );
}
