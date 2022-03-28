import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Notification from './Notification';

function Cards({ alignment, character, isCart }) {

    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const [comment, setComment] = useState("");
    const [notif, setNotif] = useState(false);

    const controller = new AbortController();

    useEffect(() => {
        axios.request("https://akabab.github.io/superhero-api/api/all.json", {
            signal: controller.signal,
        }).then(function (response) {
            let requiredData = response.data.filter(d => d.biography.alignment === alignment).map(d => {
                return { ...d, price: Math.floor(Math.random() * 300 + 500) }
            })
            setData(requiredData);
        }).catch(function (error) {
            console.error(error);
        });

        return () => controller.abort();
    }, [])

    const handleAddToCart = (d) => {
        dispatch(addToCart(d));
        setNotif(true);
        setComment(`${d.name} added to cart !`)
    }

    setTimeout(() => {
        setNotif(false);
        setComment("");
    }, 2000);

    return (
        <>
            <Notification comment={comment} notif={notif} />
            <Header />
            <div className='cards'>
                {data.map(d => {
                    return (
                        <div className="card" key={d.id}>
                            <Link to={`${d.id}`} >
                                <h1>{d.name}</h1>
                                <div className="price">${d?.price}</div>
                                <div className="imgContainer">
                                    <img src={d?.images?.lg} alt={d.name} />
                                    <div className="powerstats">
                                        <div className="stats">
                                            <img src="./images/fusion.png" alt="Fusion icons created by Triangle Squad - Flaticon" />
                                            <span>{d?.powerstats?.intelligence}</span>
                                        </div>
                                        <div className="stats">
                                            <img src="./images/bodybuilder.png" alt="Strength icons created by DinosoftLabs - Flaticon" />
                                            <span>{d?.powerstats?.strength}</span>
                                        </div>
                                        <div className="stats">
                                            <img src="./images/speed.png" alt="Speed icons created by Smashicons - Flaticon" />
                                            <span>{d?.powerstats?.speed}</span>
                                        </div>
                                        <div className="stats">
                                            <img src="./images/shield.png" alt="Shield icons created by Freepik - Flaticon" />
                                            <span>{d?.powerstats?.durability}</span>
                                        </div>
                                        <div className="stats">
                                            <img src="./images/energy.png" alt="Power icons created by Freepik - Flaticon" />
                                            <span>{d?.powerstats?.power}</span>
                                        </div>
                                        <div className="stats">
                                            <img src="./images/gaming.png" alt="Combat icons created by Freepik - Flaticon" />
                                            <span>{d?.powerstats?.combat}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            {!isCart &&
                                <button className='btns' onClick={() => handleAddToCart(d)}>Add To Cart</button>
                            }
                        </div>
                    )
                })}
            </div>
            <Footer />
        </>
    )
}

export default Cards