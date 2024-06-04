import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="relative bg-gradient-to-r from-green-400 to-blue-500 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center">
                            <Logo />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-lg font-semibold uppercase text-orange-300">Resources</h2>
                            <ul className="text-gray-100">
                                <li className="mb-4">
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) => `${isActive ? 'text-orange-300' : 'hover:text-orange-300'} transition-colors duration-200`}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className="mb-4">
                                    <NavLink
                                        to="/about"
                                        className={({ isActive }) => `${isActive ? 'text-orange-300' : 'hover:text-orange-300'} transition-colors duration-200`}
                                    >
                                        About
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-lg font-semibold uppercase text-orange-300">Follow Me</h2>
                            <ul className="text-gray-100">
                                <li className="mb-4">
                                    <a
                                        href="https://github.com/sam33r0"
                                        className="hover:text-orange-300 transition-colors duration-200"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaGithub className="inline mr-2" />
                                        GitHub
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        href="https://x.com/gtssameergts?t=1An65WZq-A2YHW7X0_V2Qw&s=08"
                                        className="hover:text-orange-300 transition-colors duration-200"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaTwitter className="inline mr-2" />
                                        Twitter
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        href="https://www.linkedin.com/in/sameer-sri?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                        className="hover:text-orange-300 transition-colors duration-200"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaLinkedin className="inline mr-2" />
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm sm:text-center text-gray-100">
                        © 2024
                        <a href="https://github.com/sam33r0" className="hover:text-orange-300">
                            sameersrivastava
                        </a>
                        . All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
