import { AiOutlineSearch } from "react-icons/ai"; 
import { CiLight } from "react-icons/ci"; 
import { MdOutlineDarkMode } from "react-icons/md"; 
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; 
import { IoIosNotifications } from "react-icons/io"; 
import { AiOutlineUser } from "react-icons/ai"; 
import location from "../assets/location.svg"
import logo from "../assets/logo.png";
import React from 'react';
import { Link, Outlet } from "react-router-dom";

const data = []

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // Initialize theme from localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  let auth_token = localStorage.getItem('auth_token')

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
      <footer className="bg-black text-white w-full py-3 px-4 grid grid-cols-3 gap-3">
        <div>
          <Link to={`/`} className="logo flex items-end object-">
            <p><img className="w-[130px] h-[120px]" src={logo}></img></p>
          </Link>
          <p className="text-white w-[90%]">E-Shop is one of 
          the largest specialists in Morocco for electronic 
          products which is committed to the best services, 
          the widest choice and the most attractive offers.</p>
        </div>
        <div className="contactus">
          <h2 className="text-orange-500 justify-center" style={{fontSize:"20px"}}>Our Service Commitments</h2>
          <ul className="list-none space-y-2">
            <li className="text-white cursor-pointer hover:text-orange-500 transition duration-150">Opening Hours</li>
            <li className="text-white cursor-pointer hover:text-orange-500 transition duration-150">Expert Advice</li>
            <li className="text-white cursor-pointer hover:text-orange-500 transition duration-150">Best Price Guarantee</li>
            <li className="text-white cursor-pointer hover:text-orange-500 transition duration-150">Free Financing & Credit</li>
            <li className="text-white cursor-pointer hover:text-orange-500 transition duration-150">Delivery & Installation</li>
            <li className="text-white cursor-pointer hover:text-orange-500 transition duration-150">After-Sales Service</li>
            <li className="text-white cursor-pointer hover:text-orange-500 transition duration-150">Returns & Refunds</li>
            <li className="text-white cursor-pointer hover:text-orange-500 transition duration-150">Cookies Chatbot</li>
            <li className="text-white cursor-pointer hover:text-orange-500 transition duration-150">Need Help?</li>
            <li className="text-white cursor-pointer hover:text-orange-500 transition duration-150">Track Your Order</li>
          </ul>
        </div>
        <div className="socialMedia">
          <h1 className="text-orange-500 justify-center" style={{fontSize:"20px"}}>Contact Us</h1>
          <a href="mailto:contact@E-shop.com" className="cursor-pointer hover:text-orange-500 transition duration-200"><span className="text-white"> Email : </span>contact@E-shop.com</a>
          <p><span>Phone : </span>+212 520334055</p>
          <div className="flex">
            <a className="hover:text-orange-500 transition duration-200" target="_blank" href="https://www.google.com/maps/place/LA+COLLINE,+Mohamm%C3%A9dia/@33.6976009,-7.3782635,16z/data=!3m1!4b1!4m6!3m5!1s0xda7b6c29e7c8dd3:0xb2fcd7c87d1def0e!8m2!3d33.6972502!4d-7.3725901!16s%2Fg%2F12q4tsxc0?entry=ttu&g_ep=EgoyMDI0MTEwNS4wIKXMDSoASAFQAw%3D%3D"><p><span className="text-white">address : </span>Mohammedia, Morrocco</p></a>
            <a target="_blank" href="https://www.google.com/maps/place/LA+COLLINE,+Mohamm%C3%A9dia/@33.6976009,-7.3782635,16z/data=!3m1!4b1!4m6!3m5!1s0xda7b6c29e7c8dd3:0xb2fcd7c87d1def0e!8m2!3d33.6972502!4d-7.3725901!16s%2Fg%2F12q4tsxc0?entry=ttu&g_ep=EgoyMDI0MTEwNS4wIKXMDSoASAFQAw%3D%3D"><img className=" ml-2 w-7" src={location} alt="Maps_location" /></a>
          </div>
          <h1 className="text-orange-500 justify-center" style={{fontSize:"20px"}}>Social Links</h1>
          <ul className="flex space-x-4  mt-2">
            <li className="list-none">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="block w-12 h-12 text-2xl text-center leading-[3rem] bg-gray-700 rounded-full hover:text-[#3b5998] hover:bg-gray-600 transition duration-300"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li className="list-none">
              <a
                href="https://www.twitter.com/"
                target="_blank"
                className="block w-12 h-12 text-2xl text-center leading-[3rem] bg-gray-700 rounded-full hover:text-[#1da1f2] hover:bg-gray-600 transition duration-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="list-none">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="block w-12 h-12 text-2xl text-center leading-[3rem] bg-gray-700 rounded-full hover:text-[#c32aa3] hover:bg-gray-600 transition duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li className="list-none">
              <a
                href="https://wa.me/212770698980"
                target="_blank"
                className="block w-12 h-12 text-2xl text-center leading-[3rem] bg-gray-700 rounded-full hover:text-[#25D366] hover:bg-gray-600 transition duration-300"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </li>
          </ul>
        </div>
        <br />
        <div className="w-full mt-2 text-[20px]"><p>Copyright © 2024 E-Shop, All rights reserved.</p></div>
      </footer>
    </div>
  );
}

export default Layout;
