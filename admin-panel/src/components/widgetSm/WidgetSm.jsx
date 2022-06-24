import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function WidgetSm() {
  const [newUsers,setNewUsers]=useState([]);

  // this api return 5 new users 
  //  check backend for further info
  
  useEffect( () =>{
    const getNewUsers =async() =>{
      try {
        const res=await axios.get("/users?new=true",{
          headers:{
      token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
          }
        })
// console.log(res?.data);
setNewUsers(res?.data);       
      } catch (error) {
        console.log(error);
        
      }
    }
    getNewUsers();
  },[])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map( (user) =>(

<li className="widgetSmListItem">
<img
  src={user.profilePic || "https://is3-ssl.mzstatic.com/image/thumb/Purple118/v4/6f/63/cb/6f63cb77-8536-2b95-5228-13c52eac8fb3/source/512x512bb.jpg"}
  alt=""
  className="widgetSmImg"
/>
<div className="widgetSmUser">
  <span className="widgetSmUsername">{user.username} </span>
 
</div>
<button className="widgetSmButton">
  <Visibility className="widgetSmIcon" />
  Display
</button>
</li>


        ))}
          
     
      </ul>
    </div>
  );
}
