
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./App.css"



const Nav= () =>{

  const [isDark, setIsDark] =useState(false);

  const darkMode=()=>{
   
         setIsDark(!isDark);
         document.body.classList.toggle("dark", isDark);
    
  }



    return(
    <>
<div className={`navbar bg-base-100 shadow-sm ${ isDark ? "bg-black text-white" : "bg-white text-black"}`}>
<div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>Overview</a></li>
        <li><a>Wallet</a></li>
        <li><a>Analytics</a></li>
      </ul>
    </div>
  <div className="flex-1">
    <a className="btn btn-ghost text-bold text-xl">Financy</a>
  </div>
  
  <div className="flex-none">
    <div className="dropdown dropdown-end">
    <input
  type="checkbox"
  checked={isDark}
  onChange={darkMode}
  className="toggle border-indigo-600 
  bg-indigo-500 
  checked:border-orange-500 
  checked:bg-orange-400
   checked:text-orange-800"
/>
    <button className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
    
        <FontAwesomeIcon 
      icon={faUser} 
      style={{ fontSize: '2rem', color: 'blue' }}
      className="user-icon"
    />
           </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    
    
    
    
    
    
    </>
    )
}
export default Nav;