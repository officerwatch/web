import React, { useState } from "react";
import SearchAutoComplete from "./searchautocomplete";

function SearchBox () {

    // menu state
    const [menuOpen, setMenuOpen] = useState(false);

    // search box content
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="field">
            <p className="control has-icons-left">
            <input className="input is-medium searchInput" type="text" value={searchTerm}
                placeholder="Search Database"
                onFocus={() => 
                    setMenuOpen(true)
                }
                onBlur={() => 
                    setMenuOpen(false)
                }
                onChange={(e) => 
                    setSearchTerm(e.target.value)
                }
            />
            <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
            </span>
            </p>

            {menuOpen ? (
                <div className="searchActive">
                    <SearchAutoComplete term={ searchTerm } />
                </div>
                ) : (
                <div className="searchClosed"></div>
            )}

        </div>
    )
}

export default SearchBox;