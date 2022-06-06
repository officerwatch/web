import { Link } from "react-router-dom";
import SearchBox from "./searchbox";
import SignInStatus from "./signinstatus";

function NavBar () {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
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
          <div className="navbar-end">
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
            <div className="navbar-item">
              <SignInStatus />
            </div>
          </div>
        </div>
      </nav>
    )
}

export default NavBar;