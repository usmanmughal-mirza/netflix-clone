import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from 'axios';

export default function Home() {

  // we use this months as dependency array in useEffect but this is static data it never changes so we use useMemo 

  const months=useMemo( () => 
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],[] )
  const [userStats,setUserStats]=useState([]);

  // User Stats ----
  // get users in different months ---------------
  // ------------------------------------

  useEffect( () =>{
    const getStats =async() =>{
      try {
        const res=await axios.get("/users/stats",{
          headers:{
            token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
          }
        })

        // The sort() method sorts the elements of an array in place and returns the sorted array. 
        // a._id - b._id it sort based on ids of both objects 
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

        const StatsList=res?.data?.sort(function(a,b){
          return a._id - b._id;
        })


        // console.log(res);
        // months is an array starts with 0 ..so that item._id -1
        // store a new field (name)..{name:months[item._id - 1]} 
        // months[item._id -1]=>months[6-1]=>months[5]=>check array months and set fifth position value to name 
        // because 6 number is june but array starts with 0 so it comes july so -1 to avoid this problem 
        // item.total is the amount of users in this month 

        StatsList?.map( item => setUserStats( (preState) =>[...preState,
          {name:months[item._id - 1],"New User":item.total}] ) )
 
          console.log(userStats);   
  // console.log(res?.data); 
      } catch (error) { 
        console.log(error);
      }
     
     
    }
getStats()
  },[months])

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics"
       grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
