import { useStore } from "../appState";

function SignInStatus () {

    const theme = useStore(state => state.uiTheme)

    return (
        <div className="buttons">
            <a className="button is-primary">
                <strong>Sign In</strong>
            </a>
        </div>
    )
}

export default SignInStatus;