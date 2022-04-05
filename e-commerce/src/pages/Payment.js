import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"


function Payment() {
    return (
        <>
            <Header />
            <section className="payment">
                <Link to="/">
                    <button style={{
                        textDecoration: "underline",
                    }}>Back To Home</button>
                </Link>
                <div className="payment-mode">
                    <h2>Choose you payment options:</h2>
                    <div className="options">

                        <img src="https://www.reviewgeek.com/p/uploads/2020/11/d71ff789.jpg?height=200p&trim=2,2,2,2" alt="google pay" />
                        <img src="https://labourlawadvisor.in/blog/wp-content/uploads/2019/07/Horizontal-Thumbnail-7.jpg" alt="paytm" />
                        <img src="https://www.businessinsider.in/photo/79544185/phonepe-700-million-5-5-billion-valuation-flipkart-separate-entity.jpg?imgsize=42692" alt="phonepe" />
                        <img src="https://www.vibesofindia.com/wp-content/uploads/2021/09/amazon-pay.jpg" alt="amazon pay" />
                        <img src="https://indianstartupnews.com/wp-content/uploads/2021/07/bhim-upi-logo.jpg" alt="bhim upi" />
                    </div>
                </div>
                <div className="payment-text">
                    <h1>This project is just to show my <span style={{ color: "rebeccapurple" }}>REDUX</span> skills !!! 😎</h1>
                    <h3>I have not made payment option working !</h3>
                    <h1><em><u>Still you want to pay? Help someone in need and be their superhero !</u></em>🤗</h1>
                </div>

            </section>
            <Footer />
        </>
    )
}

export default Payment