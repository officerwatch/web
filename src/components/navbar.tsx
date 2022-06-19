import SearchBox from "./searchbox";

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