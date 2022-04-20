import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { app } from '../config/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { login, signout } from '../features/authSlice';
import { fetchCart } from '../features/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header({ isHomePage = false, isCart = false }) {

    const quantity = useSelector(state => state.cart.totalQuantity);
    const loggedUser = useSelector(state => state.auth);
    // console.log(loggedUser);

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
                const userData = {
                    uid: user.uid,
                    userName: user.displayName,
                    userImg: user.photoURL,
                }
                sessionStorage.setItem("user", JSON.stringify(userData));
                dispatch(login(userData))
                dispatch(fetchCart(user.uid))
                console.log("User Signed In");
                toast.success(`${user.displayName} logged in !`)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const signOutHandler = () => {
        signOut(auth)
            .then(() => {
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("cart");
                dispatch(signout());
                console.log("Signed Out");
                toast.success(`${loggedUser.userName} logged out !`)
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
            />
            <header className='header'>
                <div className="headerLogo">
                    <Link to="/">MARVELxDC Cardverse</Link>
                </div>
                {/* {!(isHomePage || isCart) &&
                    <div className="headerSearchBar">
                        <input type="text" />
                        <div className="magnifier">
                            <FaSearch style={{ fill: "white" }} />
                        </div>
                    </div>} */}
                <div className="headerButton">
                    {!loggedUser.uid && <button onClick={loginHandler}>Login</button>}
                    {loggedUser.uid && <button onClick={signOutHandler}>Sign Out</button>}
                    {!isCart && <div className="cart">
                        <Link to="/cart">
                            <FaShoppingCart style={{ fill: "black" }} />
                            <div className="itemQuantity">{quantity}</div>
                        </Link>
                    </div>}
                    <div className="user">
                        <span>{loggedUser.userName || "No User"}</span>
                        <img src={loggedUser.userImg || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThPIWNxqYlgwcPj7JZDM_5pS7nf-Gy9ySNmD4WOLHd_YGhEILVR-DqzJ6FIEdbMw-dxoY&usqp=CAU"} alt="user photo" />
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header