import logo from './logo.svg';
import './App.css';
import React from 'react'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import HomePage from "./pages/homePage.jsx"
import AddSchool from "./pages/addSchool.jsx"
import EditSchool from "./pages/editschool.jsx"
import ViewSchool from "./pages/allInfo.jsx"




function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/additem" component={AddSchool} />
        <Route path="/allinfo/:id" component={ViewSchool} />
        <Route path="/edititem/:id" component={EditSchool} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
