import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import YourProfile from './YourProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";

function Header() {
  const navigate = useNavigate();
  let authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Sign-In",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Sign-Up",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Add Contact",
      slug: "/add-contact",
      active: authStatus,
    },
  ];

  return (
    <>
      <header className="shadow sticky z-50 top-0 bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="hidden md:flex items-center">
              <img src="/colourLogoTransparent.png" width="80px" alt="ChatZu Logo" />
            </Link>
            <div className="md:hidden flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40">
                    <line x1="10" y1="32" x2="90" y2="32" stroke="white" strokeWidth="5" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="white" strokeWidth="5" />
                    <line x1="10" y1="68" x2="90" y2="68" stroke="white" strokeWidth="5" />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Navigate</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button className="w-full h-full text-left" onClick={() => { navigate('/') }}>Home</button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button className="w-full h-full text-left" onClick={() => { navigate('/about') }}>About</button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button className="w-full h-full text-left" onClick={() => { navigate('/contact') }}>Contact Us</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to="/" className="md:hidden flex items-center">
              <img src="/colourLogoTransparent.png" width="80px" alt="ChatZu Logo" />
            </Link>
            <div className="flex items-center lg:order-2">
              {navItems.map((item) => (item.active ?
                <NavLink
                  key={item.slug}
                  to={item.slug}
                  className={({ isActive }) =>
                    `text-white hover:text-orange-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none
                    ${isActive ? 'text-orange-300' : 'text-white'}`
                  }
                >
                  {item.name}
                </NavLink> : null))}
              {authStatus && (
                <div>
                  <YourProfile />
                </div>)}
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200
                      ${isActive ? 'text-orange-300' : 'text-white'} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-300 lg:p-0`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200
                      ${isActive ? 'text-orange-300' : 'text-white'} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-300 lg:p-0`
                    }
                  >
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header;
