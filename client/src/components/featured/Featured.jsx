import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import { useEffect, useState } from "react";
import "./featured.scss";
import axios from 'axios'


export default function Featured({ type,setGenre }) {
  const [content,setContent]=useState({});

  useEffect( () =>{
    const getRandomContext =async() =>{
      try {
        const res=await axios.get(`/movies/random?type=${type}`,{
          headers:{
            token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
          }
        })
        // res.data is an array 
        // console.log(res?.data[0]);
        setContent(res?.data[0])
        
      } catch (error) {
        console.log(error);
        
      }
    }
  getRandomContext();
  },[type])
  
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre"
           onChange={(e) =>setGenre(e.target.value)}>
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
        
      //  src="https://images.pexels.com/photos/2447092/pexels-photo-2447092.jpeg?cs=srgb&dl=pexels-sudipta-mondal-2447092.jpg&fm=jpg"
       src={content.img}
       alt=""
      />
      <div className="info">
        <img
          // src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1"
        src={content.imgTitle}
          alt=""
        />
        <span className="desc">
         {content.desc}
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
