import axios from 'axios';

const API=axios.create({baseURL:'http://127.0.0.1:8000/api'}) 
// set headers 

API.interceptors.request.use(function (req) {
    if(localStorage.getItem("user")){
      // req.headers=config.headers 
      req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
        
    }
  
 return req;
},function(error){
  console.log('in config error');
  return Promise.reject(error);
}
);


// const url='https://js-mastery-memories.herokuapp.com/posts';

export const complexMovieFetching=(url)=>{
    API.get(url)
    console.log('at complex fetching');
}




