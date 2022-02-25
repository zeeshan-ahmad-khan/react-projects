import { useState } from 'react';
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaCoins, FaHome, FaRegNewspaper } from 'react-icons/fa'
import { ImCross } from 'react-icons/im';

import classes from './Header.module.css'

function Header() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={classes.header}>
            <div className={classes.logo}>
                <Link to='/'>Cryptoverse</Link>
                {!isOpen ?
                    <GiHamburgerMenu onClick={() => setIsOpen(!isOpen)} /> : <ImCross onClick={() => setIsOpen(!isOpen)} />}
            </div>

            {isOpen &&
                <div className={classes.menu}>
                    <ul>
                        <Link to='/'><li>
                            <FaHome /> <span>Home</span>
                        </li></Link>

                        <Link to='/cryptocurrencies'><li>
                            <FaCoins /> <span>Cryptocurrencies</span>
                        </li></Link>

                        <Link to='/news'><li>
                            <FaRegNewspaper /> <span>News</span>
                        </li></Link>
                    </ul>
                </div>
            }
        </div>
    )
}

export default Header