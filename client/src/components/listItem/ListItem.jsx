import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom'


export default function ListItem({ index,item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie,setMovie]=useState({});
  // let navigate=useNavigate();
 
// item  contain id of movie --------

useEffect( () =>{

  const getMovie=async() =>{
    try {
      const res=await axios.get(`/movies/find/${item}`,{
        headers:{
          token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
        }
      })

      // console.log(res);
      setMovie(res?.data);
    } catch (error) {
      console.log(error);
      
    }

  }
getMovie()
},[])



  return (
    // send object to 
    <Link to={{pathname:"/watch"}} state={{movie:movie}} >
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie?.img}
        alt=""
      />
      {isHovered && (
        <>
          <video src={movie?.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration} </span>
              <span className="limit">+{movie.limit} </span>
              <span>{movie.year} </span>
            </div>
            <div className="desc">
              {movie.desc}
            </div>
            <div className="genre">{movie.genre} </div>
          </div>
        </>
      )}
    </div>
    </Link>
  );
}
