import "./app.scss"
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import {AuthContext} from "./context/authContext/AuthContext"
import { useContext } from "react";

const App = () => {
  const {user}=useContext(AuthContext);
  
  return(
    <>
    <BrowserRouter>
    <Routes>
{/* use redirect  */}
      <Route  path="/"  element={user? <Home /> :<Navigate to="/register" /> } />
     
     
{/* use redirect  */}
      <Route path="/register" element={user? <Navigate to="/" /> :<Register /> } />
      <Route path="/login" element={user? <Navigate to="/" /> :<Login /> } />


      {user && (
        <>
       <Route path="/movies" element={<Home type="movie" />} />
      <Route path="/series" element={<Home type="series" />} />
      <Route path="/watch" element={<Watch /> } />
        </>
      )}
    </Routes>
    </BrowserRouter>
    </>
  )
};

export default App;