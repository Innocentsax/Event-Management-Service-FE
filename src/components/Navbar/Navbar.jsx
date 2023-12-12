import React, { useState } from "react";
import Button from "../Button/Button";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useUserContext } from "../../UserContext";


// import UserImg from "../assets/images/user-img.png";
// import AngleIcon from "../assets/images/angle-bracket-down.png";

function Navbar(props) {
  const { loginInfo, setLoginInfo } = useUserContext(); // Access loginInfo and setLoginInfo


  return (
    <nav className="navbar">
      <div className="logo">Event Hub</div>
      <div className="nav-menu">
        <div className="auth">
          <div className="login-link">
          <Link to='/' className="mr-4" ><a className="nav-link"><button className="btn-primary"><i class='fas fa-home'></i></button></a></Link>
          {
            !loginInfo.loggedIn?<Link to='/login'  ><a className="nav-link"><button className="btn-secondary">Login</button></a></Link>
            :
            <>
            <Link to='/logout'  ><a className="nav-link"><button className="btn-secondary">Logout</button></a></Link>
            <Link to='/user/dashboard' className="ml-1"  ><a className="nav-link"><button className="btn-secondary">Dashboard</button></a></Link>
            </>
          }
          
          </div>
          <Link to='/create_event'><a className="nav-link"><button className="btn-secondary">Create Event</button></a></Link>

        
        </div>
        <div className="profile">
          <img src="" alt="User Image" className="proflie-img" />
          <p className="profile-text">
            David
            <span></span>
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
