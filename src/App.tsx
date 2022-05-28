import React from 'react';
import './App.css';
import { Outlet, Link } from "react-router-dom";
import SearchBox from "./components/searchbox";

function App() {
  return (
    <div className="App">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <span className="navbar-item">
            <strong>Officer Watch</strong>
          </span>
          <span className="navbar-item">
            <SearchBox />
          </span>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>

            <Link to="/contribute" className="navbar-item">
              Contribute
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                More
              </a>

              <div className="navbar-dropdown">
                <Link to="/about" className="navbar-item">
                  About
                </Link>
                <Link to="/contact" className="navbar-item">
                  Contact
                </Link>
                <hr className="navbar-divider" />
                <Link to="/report" className="navbar-item">
                  Report an issue
                </Link>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Sign In</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
