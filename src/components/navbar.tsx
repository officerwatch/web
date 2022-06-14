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
        </div>
      </nav>
    )
}

export default NavBar;