import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import classes from '../components/Sidebar.module.css'
import { FaCoins, FaHome, FaRegNewspaper } from 'react-icons/fa'

function Sidebar() {

    const [isSelected, setIsSelected] = useState(0)


    return (
        <header className={classes.wrapper}>
            <div className={classes.logo} onClick={() => setIsSelected(0)}>
                <Link to='/'>Cryptoverse</Link>
            </div>
            <nav className={classes.navbar}>
                <ul>
                    <Link to='/'><li className={isSelected === 0 || isSelected === 1 ? classes.selected : ""} onClick={() => setIsSelected(1)}>
                        <FaHome /> <span>Home</span>
                    </li></Link>

                    <Link to='/cryptocurrencies'><li className={isSelected === 2 ? classes.selected : ""} onClick={() => setIsSelected(2)}>
                        <FaCoins /> <span>Cryptocurrencies</span>
                    </li></Link>

                    <Link to='/news'><li className={isSelected === 4 ? classes.selected : ""} onClick={() => setIsSelected(4)}>
                        <FaRegNewspaper /> <span>News</span>
                    </li></Link>
                </ul>
            </nav>
        </header>
    )
}

export default Sidebar