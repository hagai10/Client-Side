import './App.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import React from "react";
import Dashboard from "./layouts/DashboardPage/Dashboard";
import AuthenticationTabs from "./layouts/LoginPage/AuthenticationTabs";
import {Navbar} from "./layouts/Navbar";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<AuthenticationTabs/>}></Route>
                <Route path={"/dashboard"} element={<Dashboard/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
