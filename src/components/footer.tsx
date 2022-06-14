import { CountOfficers, CountDocuments } from "./countobjects";
import { useStore } from "../appState";
import { FaUserCircle } from "react-icons/fa";
import { BiCheckShield } from "react-icons/bi"
import * as web3 from "../appState/web3";
import SignInStatus from "./signinstatus";

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
            <div className="columns">
            <div className="column is-three-quarters is-hidden-mobile has-text-centered is-small">
                <span className="is-size-6">tracking <CountOfficers /> officers, <strong>3</strong> agencies, <strong>39</strong> incidents,
                <br />
                <CountDocuments /> documents, <strong>934</strong> news articles, &amp; more.</span>
            </div>
            <div className="column is-one-quarter is-full-mobile has-text-centered">
                <div className="buttons" onClick={ buttonAction }>
                    {web3UserHash !== "" ?
                        (<a className="button is-primary is-small"><BiCheckShield />&nbsp;&nbsp;<strong>Signed In</strong></a>)
                    :
                        (<a className="button is-info is-small"><FaUserCircle />&nbsp;&nbsp;<strong>Volunteer Sign In</strong></a>)
                    }
                </div>
            </div>
            </div>
        </footer>
    )
}

export default Footer;