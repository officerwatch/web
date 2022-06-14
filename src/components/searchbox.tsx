import React, { useState } from "react";
import { useStore } from "../appState";
import SearchAutoComplete from "./searchautocomplete";
import { AiOutlineFileSearch } from "react-icons/ai";

function SearchBox () {

    // menu open/closed state
    const menuStatus = useStore(state => state.uiSearchSuggest);
    const menuToggle = useStore(state => state.uimodSearchToggle);

    // search box content
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="field">
            <p className="control has-icons-left">
            <input className="input is-medium searchInput" type="text" value={searchTerm}
                placeholder="Search Database"
                onFocus={menuToggle}
                onBlur={menuToggle}
                onChange={(e) => 
                    setSearchTerm(e.target.value)
                }
            />
            <span className="icon is-small is-left">
                <AiOutlineFileSearch />
            </span>
            </p>

            {menuStatus ? (
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