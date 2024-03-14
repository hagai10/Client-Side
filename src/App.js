import logo from './logo.svg';
import './App.css';
import LoginPage from "./LoginPage";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import React from "react";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<LoginPage/>}></Route>
                <Route path={"/dashboard"} element={<Dashboard/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
