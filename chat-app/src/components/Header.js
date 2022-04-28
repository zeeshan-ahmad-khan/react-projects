import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { app, provider } from "../config/firebase";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { addUsers } from "../db/firestoredb";
import { validateUser } from "../validation/validate";

function Header() {

    const { state, dispatch } = useContext(AuthContext);

    const auth = getAuth(app);

    useEffect(() => {
        validateUser(state.uid)
            .then(result => {
                if (!result) {
                    addUsers({
                        ...state, rooms: []
                    });
                }
            })
    }, [state])

    const handleLogin = () => {

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
                // console.log(user)
                const data = {
                    uid: user.uid,
                    userName: user.displayName,
                    userImg: user.photoURL,
                };
                dispatch({
                    type: "LOGIN",
                    payload: data,
                })
                sessionStorage.setItem("user", JSON.stringify(data));
                console.log("User Logged In");
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(errorMessage, errorCode);
            });
    }

    const handleSignout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch({ type: "SIGNOUT" })
            sessionStorage.removeItem("user")
            console.log("User Signed Out !");
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    return (
        <header className="header">
            <div className="userDetails">
                <img src={state.userImg || null} />
                <h5>{state.userName || "No User"}</h5>
            </div>
            <div className="logo">
                <Link to='/'>
                    Chit Chat
                </Link></div>
            <div className="btns">
                {!state.uid ?
                    <button onClick={handleLogin}>Login</button> :
                    <button onClick={handleSignout}>Sign Out</button>}
            </div>
        </header>
    )
}

export default Header