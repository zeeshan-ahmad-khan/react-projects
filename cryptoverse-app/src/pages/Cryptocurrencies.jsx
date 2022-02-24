import { useState } from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import classes from './Cryptocurrencies.module.css'

function Cryptocurrencies({ cryptocoins, isHomepage = false, isPending }) {

    const [searchedText, setSearchedText] = useState('')

    let coins = [];

    if (isPending) {
        return <h1>Loading.....</h1>
    } else if (searchedText) {
        const filteredData = cryptocoins.filter(coin => coin?.name.toLowerCase().includes(searchedText.toLowerCase()))
        coins = filteredData;
    } else {
        if (isHomepage) {
            let topTen = cryptocoins?.filter((_, i) => i < 10)
            coins = topTen;
        } else {
            coins = cryptocoins;
        }
    }

    // console.log(coins);
    const handleChange = (e) => {
        setSearchedText(e.target.value);

        console.log(coins, searchedText);
    }


    return (
        <div className={classes.cryptocurrencies}>
            <h3>Top 10 Crypto Currencies
                <span>{isHomepage && <Link to='/cryptocurrencies'>Show More...</Link>}</span>
            </h3>

            {!isHomepage &&
                <div className={classes.cryptoSearch}>
                    <input type="text" name='crypto' placeholder='Search Coins' value={searchedText} onChange={handleChange} autoComplete='off' />
                </div>}

            <div className={classes.coins}>
                {coins.map((coin) => {
                    return (
                        <Link to={`/cryptocoin/${coin?.uuid}`} key={coin?.uuid}>
                            <div className={classes.coin}>
                                <img src={coin?.iconUrl} alt={coin?.name} />
                                <h5>{coin?.name}</h5>
                                <h5>{coin?.symbol}
                                    <span>($ {millify(coin?.price)})</span>
                                </h5>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Cryptocurrencies