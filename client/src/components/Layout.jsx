import { AiOutlineSearch } from "react-icons/ai"; 
import { CiLight } from "react-icons/ci"; 
import { MdOutlineDarkMode } from "react-icons/md"; 
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; 
import { IoIosNotifications } from "react-icons/io"; 
import { AiOutlineUser } from "react-icons/ai"; 
import logo from "../assets/logo.png";
import React from 'react';
import { Link, Outlet } from "react-router-dom";
const data = []

function Layout() {
  // Initialize theme from localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [query, setQuery] = useState('')
  const [filterData, setFilterData] = useState([])

  const handleSearch = () =>{
    setFilterData(data.filter(item => {
      return (item.name.toLowerCase().includes(query.toLocaleLowerCase()) ||
      item.description.toLowerCase().includes(query.toLocaleLowerCase())) 
    }))

    console.log(query)
  }

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  useEffect(() => {
    // Toggle the dark-mode class on <body> based on theme
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)"
      }}>
      <header className=" shadow-md mb-3 header bg-black text-white h-[120px] items-center ">
        <nav className="flex items-center justify-between">
          <Link to={`/`} className="logo flex items-end object-">
            <p><img className="w-[130px] h-[120px]" src={logo}></img></p>
          </Link>
          <div className="search flex items-center ring-inset ring-1 ring-gray-300 bg-transparent py-2 pl-5 pr-3 rounded-full">
            <input 
              onChange={(e)=>setQuery(e.target.value)}
              type="text" 
              placeholder="Search" 
              className="border-none bg-transparent outline-none md:w-96"
            />
            <button onClick={handleSearch} className="bg-orange-500 p-2 rounded-full">
              <AiOutlineSearch />
            </button>
          </div>
          <div className="userActions flex items-center gap-4">
            <div className="mode flex items-center">
              <button 
                onClick={toggleDarkMode} 
                aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className="bg-icon"
              >
                {isDarkMode ? <CiLight size={25} /> : <MdOutlineDarkMode size={25} />}
              </button>
            </div>
            <Link to={'/login'} className="btn-style" >Login</Link>
            <Link to={'/register'} className="btn-style">Register</Link>
            <Link to={'/cart'} className="cart bg-icon relative">
              <FaShoppingCart size={25} aria-label="Shopping Cart" />
              <span 
                className="count-not rounded-full bg-red-600 w-4 h-4  flex items-center justify-center text-white absolute top-0 right-0" 
                style={{fontSize:"10px"}}
              >
                  5
              </span>
            </Link>
          </div>
        </nav>
      </header>
      <main><Outlet /></main>
      <footer className="bg-black text-white w-full py-3 px-4 grid grid-cols-3">
        <div>
          <Link to={'/'} className="logo flex items-end">
            <p className="font-semibold text-orange-500" style={{fontSize:"20px"}}>E-Shop<span></span></p>
          </Link>
          <p className="text-gray-400">sdlfjaljefkjsdifjewjfkldjfliajsifji</p>
        </div>
        <div className="contactus">
          <h1 className="text-orange-500" style={{fontSize:"20px"}}>Contact Us</h1>
          <p><span>email: </span>e-shop@gmai.com</p>
          <p><span>Phone: </span>+212 000000000</p>
          <p><span>address: </span>**************</p>
        </div>
        <div className="socialMedia">
          <h1 className="text-orange-500" style={{fontSize:"20px"}}>Contact Us</h1>
          <div className="facebook">
            facebook
          </div>
          <div className="instagram">
            instagram
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
