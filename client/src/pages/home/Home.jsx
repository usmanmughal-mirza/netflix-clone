import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import axios from 'axios'
import { useContext, useEffect, useState } from "react";
import {MovieContext} from "../../context/movieContext/MovieContext"
import {fetchingMovies} from "../../context/movieContext/apiCalls"

const Home = ({type}) => {
  const [lists,setLists]=useState([]);
  const [genre,setGenre]=useState(false);
  // const {dispatch}=useContext(MovieContext);

  console.log('before list');
  console.log(lists);
  console.log('after lists');
  console.log(`genre is ${genre}`);


  useEffect( () =>{

 const RandomLists =async() =>{
  try {
    const res=await axios.get(`lists${type ? "?type=" + type:""}${genre ? "&genre=" + genre:""}`,{
      headers:{
        token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
      }
    });
   
    // console.log(res);
    setLists(res?.data);
    
  } catch (error) {
    console.log(error);
    
  }
}
RandomLists();
  },[type,genre])



return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
     {lists?.map( (list) =>(
       <List list={list} />
     ))}
     {/* <p>checking </p> */}
    </div>

  );
};

export default Home;
