import React, { useState } from "react";

function SearchBox () {

    const [menuOpen, setMenuOpen] = useState(false);

    const styler =  {
        height: "50px",
        lineHeight: "50px"
    }

    const childStyle = {

    }

    return (
        <div className="field">
            <p className="control has-icons-left">
            <input className="input" style={styler} type="text" placeholder="Search Database"
            onFocus={() => 
                setMenuOpen(true)
            }
            onBlur={() => 
                setMenuOpen(false)
            }
            />
            <span className="icon is-small is-left" style={styler}>
                <i className="fas fa-search"></i>
            </span>
            </p>

            {menuOpen ? (
                <div className="searchActive" style={childStyle}>
                    open
                </div>
                ) : (
                <div className="searchOff" style={childStyle}>
                    closed
                </div>
            )}

        </div>
    )
}

export default SearchBox;