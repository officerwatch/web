import { useStore } from "../appState";
import { FaUserCircle } from "react-icons/fa";



function SignInStatus () {

    const theme = useStore(state => state.uiTheme)

    return (
        <div className="buttons">
            <a className="button is-primary is-small">
                <FaUserCircle />&nbsp;&nbsp;<strong>Volunteer Sign In</strong>
            </a>
        </div>
    )
}

export default SignInStatus;