import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from './pages/login/Login';
import {AuthContext} from './context/authContext/AuthContext'
import {useContext} from 'react'
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";

function App() {
const {user}=useContext(AuthContext);
// const user=true;
  return (
    
    <Router>
      <Switch>
      {/* <h1>usman</h1> */}
      <Route  path="/login">
      {user ? <Redirect to="/" />: <Login />}      
          </Route>
          {user && (
            <>
 <Topbar />
      <div className="container">
        <Sidebar />
        
          <Route exact path="/">
            <Home />
          </Route>
         
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/movies">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route> 
          <Route path="/newproduct">
            <NewProduct />
          </Route>
          {/* lists  */}
          <Route exact path="/lists">
            <ListList />
          </Route>
          <Route path="/lists/:listId">
            <List />
          </Route> 
          <Route path="/newList">
            <NewList />
          </Route>
        
      </div>

            </>
          )}

          {!user && (
            <Redirect to="/login" />
          )}
     
      </Switch>
    </Router>
    
  );
}

export default App;
