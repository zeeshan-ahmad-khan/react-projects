import millify from 'millify';
import useFetch from '../utilities/useFetch';
import { BiStats } from 'react-icons/bi'
import Cryptocurrencies from './Cryptocurrencies';

import classes from '../pages/Home.module.css'
import News from './News';
import Header from '../components/Header';

function Home({ url }) {


    const { reqData, isPending } = useFetch(url);
    // console.log(reqData)

    if (isPending) {
        return <h1>Loading.....</h1>
    }

    return (
        <div className={classes.home}>

            <div className={classes.stats}>
                <h3>Total Global Stats</h3>
                <div className={classes.statsGrid}>
                    <div className={classes.statsBox}>
                        <h5>Total 24h Volume</h5>
                        <p><BiStats /> {millify(reqData?.stats?.total24hVolume)}</p>
                    </div>
                    <div className={classes.statsBox}>
                        <h5>Total Coins</h5>
                        <p><BiStats /> {millify(reqData?.stats?.totalCoins)}</p>
                    </div>
                    <div className={classes.statsBox}>
                        <h5>Total Exchange</h5>
                        <p><BiStats /> {millify(reqData?.stats?.totalExchanges)}</p>
                    </div>
                    <div className={classes.statsBox}>
                        <h5>Total Market Cap</h5>
                        <p><BiStats /> {millify(reqData?.stats?.totalMarketCap)}</p>
                    </div>
                    <div className={classes.statsBox}>
                        <h5>Total Markets</h5>
                        <p><BiStats /> {millify(reqData?.stats?.totalMarkets)}</p>
                    </div>
                </div>
            </div>

            <Cryptocurrencies cryptocoins={reqData?.coins} isHomepage={true} isPending={isPending} />

            <News isHomepage={true} />

        </div>
    )
}

export default Home