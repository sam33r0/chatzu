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
    }, {
      name: "Create Room",
      slug: "/create-room",
      active: authStatus,
    },
  ];

  return (
    <>
      <header className="shadow sticky z-50 top-0 bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div className="lg:hidden flex items-center">
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
                  <DropdownMenuItem className={!authStatus ? `hidden ` : `w-full h-full text-left`}>
                    <button className={!authStatus ? `hidden ` : `w-full h-full text-left`} onClick={() => { navigate('/create-room') }}>Create Room</button>
                  </DropdownMenuItem>
                  <DropdownMenuItem className={!authStatus ? `hidden ` : `w-full h-full text-left`}>
                    <button className={!authStatus ? `hidden ` : `w-full h-full text-left`} onClick={() => { navigate('/add-contact') }}>Add Contact</button>
                  </DropdownMenuItem>
                  <DropdownMenuItem className={authStatus ? `hidden ` : `w-full h-full text-left`}>
                    <button className={authStatus ? `hidden ` : `w-full h-full text-left`} onClick={() => { navigate('/login') }}>Sign In</button>
                  </DropdownMenuItem>
                  <DropdownMenuItem className={authStatus ? `hidden ` : `w-full h-full text-left`}>
                    <button className={authStatus ? `hidden ` : `w-full h-full text-left`} onClick={() => { navigate('/signup') }}>Sign Up</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to="/" className="hidden md:flex items-center">
              <img src="/colourLogoTransparent.png" width="80px" alt="ChatZu Logo" />
            </Link>

            <Link to="/" className="md:hidden flex items-center">
              <img src="/colourLogoTransparent.png" width="80px" alt="ChatZu Logo" />
            </Link>


            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto "
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `text-white hover:text-orange-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none
                  ${isActive ? 'text-orange-300' : 'text-white'}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `text-white hover:text-orange-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none
                  ${isActive ? 'text-orange-300' : 'text-white'}`
                    }
                  >
                    About
                  </NavLink>
                </li>

                {navItems.map((item) => (item.active ?
                  <li key={item.slug}>
                    <NavLink
                      key={item.slug}
                      to={item.slug}
                      className={({ isActive }) =>
                        `text-white hover:text-orange-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none
                    ${isActive ? 'text-orange-300' : 'text-white'}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li> : null))}


              </ul>

            </div>
            {authStatus && (
              <div>
                <YourProfile />
              </div>)}
          </div>

        </nav>

      </header>
    </>
  )
}

export default Header;
