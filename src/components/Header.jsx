import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Style.module.css"; // Adjust the path as per your project structure

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="w-full fixed items-center">
      <div className="container flex justify-between bg-orange-500 px-4">
        <div>
          <RouterLink
            to="/"
            className="font-bold text-lg text-white block py-6"
          >
            Ini Logo
          </RouterLink>
        </div>
        {/* Sidebar toggle button (visible on mobile screens) */}
        <button
          className="lg:hidden text-white py-2 focus:outline-none"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        {/* Sidebar menu */}
        <nav
          id={styles["sidebar-menu"]}
          className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden`}
        >
          {/* Mobile View: Sidebar for smaller screens */}
          <ul className="flex flex-col pt-5 space-y-4 pl-5">
            <li className="group">
              <button
                className="lg:hidden text-white py-2 focus:outline-none"
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon icon={faBars} size="lg" />
              </button>
            </li>
            <li className="group">
              <ScrollLink
                to="home"
                smooth={true}
                duration={500}
                className={`text-white py-2 flex group-hover:text-white ${styles["scroll-link"]}`}
              >
                Home
              </ScrollLink>
            </li>
            <li className="group">
              <ScrollLink
                to="katalog"
                smooth={true}
                duration={500}
                className={`text-white py-2 flex group-hover:text-white ${styles["scroll-link"]}`}
              >
                Katalog
              </ScrollLink>
            </li>
            <li className="group">
              <ScrollLink
                to="layanan"
                smooth={true}
                duration={500}
                className={`text-white py-2 flex group-hover:text-white ${styles["scroll-link"]}`}
              >
                Layanan
              </ScrollLink>
            </li>
            <li className="group">
              <ScrollLink
                to="tentang-kami"
                smooth={true}
                duration={500}
                className={`text-white py-2 flex group-hover:text-white ${styles["scroll-link"]}`}
              >
                Tentang Kami
              </ScrollLink>
            </li>
          </ul>
        </nav>
        {/* Desktop View: ScrollLinks displayed directly in header for wider screens */}
        <nav className="hidden lg:flex lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none">
          <ul className="flex space-x-8 items-center">
            <li className="group">
              <ScrollLink
                to="home"
                smooth={true}
                duration={500}
                className={`text-white py-2 flex group-hover:text-white ${styles["scroll-link"]}`}
              >
                Home
              </ScrollLink>
            </li>
            <li className="group">
              <ScrollLink
                to="katalog"
                smooth={true}
                duration={500}
                className={`text-white py-2 flex group-hover:text-white ${styles["scroll-link"]}`}
              >
                Katalog
              </ScrollLink>
            </li>
            <li className="group">
              <ScrollLink
                to="layanan"
                smooth={true}
                duration={500}
                className={`text-white py-2 flex group-hover:text-white ${styles["scroll-link"]}`}
              >
                Layanan
              </ScrollLink>
            </li>
            <li className="group">
              <ScrollLink
                to="tentang-kami"
                smooth={true}
                duration={500}
                className={`text-white py-2 flex group-hover:text-white ${styles["scroll-link"]}`}
              >
                Tentang Kami
              </ScrollLink>
            </li>
          </ul>
        </nav>
        <nav
          id="auth-menu"
          className="hidden lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none content-center"
        >
          <ul className="flex space-x-8">
            <li className="group">
              <button
                className="text-white bg-red-900 px-5 py-2.5 flex hover:bg-orange-700 focus:outline-none font-medium text-sm rounded-lg"
              >
                <RouterLink to="/login">
                Login
                </RouterLink>
              </button>
            </li>
            <li className="group">
              <button
                className="text-white py-2 flex group-hover:text-dark"
              >
                Register
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
