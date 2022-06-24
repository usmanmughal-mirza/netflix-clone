import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthContextProvider} from './context/authContext/AuthContext'
import {MovieContextProvider} from './context/movieContext/MovieContext'
import {ListContextProvider} from "./context/listContext/ListContext"

ReactDOM.render(
  <AuthContextProvider>
    <MovieContextProvider>
      <ListContextProvider>
    <App />
    </ListContextProvider>
    </MovieContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);
