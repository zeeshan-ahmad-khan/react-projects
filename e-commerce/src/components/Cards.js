import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Cards({ alignment, character, isCart }) {

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const controller = new AbortController();

    useEffect(() => {
        axios.request("https://akabab.github.io/superhero-api/api/all.json", {
            signal: controller.signal,
        }).then(function (response) {
            let requiredData = response.data.filter(d => d.biography.alignment === alignment).map(d => {
                return { ...d, price: Math.floor(Math.random() * 100 + 200) }
            })
            setData(requiredData);
        }).catch(function (error) {
            console.error(error);
        });

        return () => controller.abort();
    }, [])

    const handleAddToCart = (d) => {
        dispatch(addToCart(d));
        toast.info(`${d.name} added to cart !`)
    }

    return (
        <>
            <Header />
            <div className='cards'>
                {data.map(d => {
                    return (
                        <div className="card" key={d.id}>
                            <div className="price">${d?.price}</div>
                            <h1>{d.name}</h1>
                            <div className="imgContainer">
                                <img src={d?.images?.lg} alt={d.name} />
                            </div>
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
                            <p>
                                <b>Full name:</b> {d?.biography?.aliases[0]}<br />
                                <b>Group Afflication: </b>{d?.connections?.groupAffiliation}<br />
                                <b>Relatives: </b> {d?.connections?.relatives}
                            </p>
                            <button className='btns' onClick={() => handleAddToCart(d)}>Add To Cart</button>
                        </div>
                    )
                })}
            </div>
            <Footer />
        </>
    )
}

export default Cards