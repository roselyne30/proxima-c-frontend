import React, { useState,useRef,useEffect } from 'react';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';  // Ensure this is the correct path
import logo from '../images/logo.png';  // Replace with your logo file path

const Navbar = () => {
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location= useLocation()
  console.log(location)
  const{pathname}= location
  const splitPath=pathname.split('/')
  console.log(splitPath)
  // Toggle Dropdown for Groups
  const toggleGroups = () => setIsGroupsOpen(!isGroupsOpen);

  // Toggle Dropdown for Transactions
  const toggleTransactions = () => setIsTransactionsOpen(!isTransactionsOpen);
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsGroupsOpen(false);
  //       setIsTransactionsOpen(false)
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Proxima Centauri Logo" className="logo" />
        </Link>
        
        <div className="navbar-links">
          <Link  to="/" className={`navbar-link  ${splitPath[1]===''?'active':''}`}>Home</Link>
          <div className="navbar-dropdown">
            <button className={`navbar-link dropdown-btn ${splitPath.includes('groups')||splitPath.includes('create-group')?'active':''} `}>Groups</button>
            {/* {isGroupsOpen && ( */}
              <div className="dropdown-content" ref={dropdownRef}>
                <Link to="/groups" className="dropdown-link">All Groups</Link>
                <Link to="/create-group" className="dropdown-link">Create Group</Link>
              </div>
            {/* )} */}
          </div>
          <div className="navbar-dropdown">
            <button  className={`navbar-link dropdown-btn ${splitPath.includes('deposit')||splitPath.includes('transactionHistory')?'active':''}`}>Transactions</button>
            {/* {isTransactionsOpen && ( */}
              <div className="dropdown-content" ref={dropdownRef}>
                <Link to="/deposit/1" className="dropdown-link">Deposit</Link>
                <Link to="/transactionHistory" className="dropdown-link">Transaction History</Link>
              </div>
            {/* )} */}
          </div>
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/register" className="navbar-link">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
