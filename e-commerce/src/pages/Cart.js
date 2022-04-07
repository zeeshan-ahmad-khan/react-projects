import { useDispatch, useSelector } from "react-redux";
import { increase, decrease, removeFromCart } from "../features/cartSlice";

import Header from "../components/Header";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Cart() {

    const cartItems = useSelector(state => state.cart.cartItems);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalAmount = useSelector(state => state.cart.totalPrice);
    const dispatch = useDispatch();

    const isCartEmpty = (cartItems?.length < 1 || cartItems === undefined || cartItems === null);

    return (
        <>
            <Header isCart={true} />
            <div className='cartContainer'>
                {isCartEmpty ?
                    <>
                        <h1>Your Cart is Empty</h1>
                        <Link to="/">
                            <button style={{ textDecoration: "underline" }}>Back To Home</button>
                        </Link>
                    </>
                    :
                    <>
                        <h1>Your cart items</h1>
                        <Link to="/">
                            <button style={{ textDecoration: "underline" }}>Back To Home</button>
                        </Link>
                        {cartItems.map(item => {
                            return (
                                <div className="cartItems" key={item.id}>
                                    <div className="img">
                                        <h3>{item?.name}</h3>
                                        <img src={item?.images?.lg} alt={item.name} />
                                    </div>
                                    <div className="quantity">
                                        <button onClick={() => dispatch(decrease(item))}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => dispatch(increase(item))}>+</button>
                                    </div>
                                    <button className="removeBtn" onClick={() => dispatch(removeFromCart(item))}>Remove</button>
                                    <div className="totalPrice">
                                        Price:
                                        ${item.price * item.quantity}
                                    </div>
                                </div>
                            )
                        })}
                        <div className="amountBox">
                            <div className="totalAmount">
                                <span>Total ({totalQuantity} items): </span>
                                <span>${totalAmount}</span>
                            </div>
                            <div className="payBtn">
                                <Link to="/payment">
                                    <button>Proceed to Pay</button>
                                </Link>
                            </div>
                        </div>
                    </>
                }
            </div>
            <Footer />
        </>
    )
}

export default Cart