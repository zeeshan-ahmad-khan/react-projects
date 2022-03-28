import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { app } from '../config/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { login, signout } from '../features/authSlice';
import { useState } from 'react';
import Notification from './Notification';

function Header({ isHomePage = false, isCart = false }) {

    const [comment, setComment] = useState("");
    const [notif, setNotif] = useState(false);

    const quantity = useSelector(state => state.cart.totalQuantity);
    const user = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const loginHandler = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // console.log(user);
                // ...
                dispatch(login({
                    uid: user.uid,
                    userName: user.displayName,
                    userImg: user.photoURL,
                }))
                console.log("User Signed In");
                setComment(`${user.displayName} logged in !`)
                setNotif(true);
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                setComment("")
                setNotif(false);
            });
    }

    const signOutHandler = () => {
        signOut(auth).then(() => {
            dispatch(signout());
            console.log("Signed Out");
            setNotif(true);
            setComment(`${user.userName} logged out !`)
        }).catch((error) => {
            console.log(error);
        })
    }

    setTimeout(() => {
        setNotif(false);
        setComment("");
    }, 3000)

    return (
        <>
            <Notification comment={comment} notif={notif} />
            <header className='header'>
                <div className="headerLogo">
                    <Link to="/">MARVELxDC Cardverse</Link>
                </div>
                {!(isHomePage || isCart) &&
                    <div className="headerSearchBar">
                        <input type="text" />
                        <div className="magnifier">
                            <FaSearch style={{ fill: "white" }} />
                        </div>
                    </div>}
                <div className="headerButton">
                    {!user.uid && <button onClick={loginHandler}>Login</button>}
                    {user.uid && <button onClick={signOutHandler}>Sign Out</button>}
                    <div className="cart">
                        <Link to="/cart">
                            <FaShoppingCart style={{ fill: "white" }} />
                            <div className="itemQuantity">{quantity}</div>
                        </Link>
                    </div>
                    <div className="user">
                        <span>{user.userName || "No User"}</span>
                        <img src={user.userImg || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThPIWNxqYlgwcPj7JZDM_5pS7nf-Gy9ySNmD4WOLHd_YGhEILVR-DqzJ6FIEdbMw-dxoY&usqp=CAU"} alt="user photo" />
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header