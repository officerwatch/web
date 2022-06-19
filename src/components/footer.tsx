import { CountOfficers } from "./countobjects";
import { useStore } from "../appState";
import { 
        FaUserCircle, FaCog, FaClipboardCheck, 
        FaPowerOff, FaRegEdit
        } from "react-icons/fa";
import { VscNewFile } from "react-icons/vsc";
import * as web3 from "../appState/web3";
import { Link } from "react-router-dom";

function Footer () {
    const web3UserHash = useStore(state => state.web3UserHash);
    const web3SetUserHash = useStore(state => state.web3modSetUserHash);

    async function buttonAction () {
        if (web3UserHash !== "") {
            // user logged in
            // initiate soft "sign out" process
            web3SetUserHash("");
            console.log('User disconnected');
        } else {
            // user not signed in
            // initiate metamask call for user hash
            try {
                const userHash = await web3.connectWallet();
                web3SetUserHash(userHash as string);
                console.log('Sign in successful for user: ' + userHash);
            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <footer className="footer">
            <div className="columns is-vcentered">
            <div className="column is-one-third is-hidden-mobile has-text-left is-small">
                <span className="is-size-6">
                    <CountOfficers /> officers from <strong>3</strong> agencies<br/>
                    <strong>939</strong> incidents in <strong>2</strong> regions<br/>
                    <strong>2,392</strong> media &amp; documents<br/>
                </span>
            </div>
            <div className="column is-one-third is-hidden-mobile">

            </div>
            <div className="column is-one-third is-full-mobile has-text-centered">
                <div className="buttons">
                    {web3UserHash !== "" ?
                        (
                            <>
                            <Link to="/create" className="mr-2"><button className="button"><FaRegEdit /></button></Link>
                            <Link to="/intake" className="mr-2"><button className="button"><FaClipboardCheck /></button></Link>
                            <Link to="/settings" className="mr-2"><button className="button"><FaCog /></button></Link>
                            <button className="button is-info" onClick={ buttonAction }><FaPowerOff /></button>
                            </>
                        )
                    :
                        (
                            <>
                            <Link to="/contribute" className="mr-2"><button className="button is-small"><VscNewFile />&nbsp;&nbsp;<strong>Contribute</strong></button></Link> 
                            <button className="button is-info is-small" onClick={ buttonAction }>&nbsp;&nbsp;<FaUserCircle />&nbsp;&nbsp;&nbsp;<strong>Sign In</strong>&nbsp;&nbsp;&nbsp;</button> 
                            </>
                        )
                    }
                </div>
            </div>
            </div>
        </footer>
    )
}

export default Footer;