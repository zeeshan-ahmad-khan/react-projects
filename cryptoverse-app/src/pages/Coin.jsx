import { useParams } from 'react-router-dom'
import useFetch from '../utilities/useFetch';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';

import { FaDollarSign, FaBtc, FaRegChartBar, FaMedal } from 'react-icons/fa'
import { BsDroplet } from 'react-icons/bs'
import { TiWaves, TiTick } from 'react-icons/ti'
import { ImCross } from 'react-icons/im'

import classes from './Coin.module.css'
import Charts from '../components/Charts';

function Coin() {

    const { coinId } = useParams();
    const { reqData, isPending } = useFetch(`/coin/${coinId}`)

    // console.log(reqData?.coin)

    if (isPending) {
        return <h1>Loading...</h1>
    }

    return (
        <div className={classes.cryptocoin}>
            <img src={reqData?.coin?.iconUrl} alt={reqData?.coin?.name} />
            <h1> {reqData?.coin?.name}({reqData?.coin?.symbol})</h1>

            <div className={classes.coinStats}>
                <div className={classes.stats}>
                    <h2>{reqData?.coin?.name} value statistics</h2>
                    <p>An overview showing the statistics of {reqData?.coin?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    <div className={classes.statsBox}>
                        <div className={classes.coinValues}>
                            <span><FaDollarSign /> Price to USD</span>
                            <span>$ {millify(reqData?.coin?.price)}</span>
                        </div>
                        <div className={classes.coinValues}>
                            <span><FaBtc /> Price to BTC</span>
                            <span>₿ {reqData?.coin?.btcPrice}</span>
                        </div>
                        <div className={classes.coinValues}>
                            <span><FaRegChartBar /> Rank</span>
                            <span>{reqData?.coin?.rank}</span>
                        </div>
                        <div className={classes.coinValues}>
                            <span><BsDroplet /> 24h Volume</span>
                            <span>{millify(reqData?.coin['24hVolume'])}</span>
                        </div>
                        <div className={classes.coinValues}>
                            <span><TiWaves /> Market Cap</span>
                            <span>{millify(reqData?.coin?.marketCap)}</span>
                        </div>
                        <div className={classes.coinValues}>
                            <span><FaMedal /> All time high (daily avg)</span>
                            <span>$ {millify(reqData?.coin?.allTimeHigh?.price)}</span>
                        </div>
                    </div>
                </div>

                <div className={classes.stats}>
                    <h2>{reqData?.coin?.name} other statistics</h2>
                    <p>An overview showing the statistics of {reqData?.coin?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    <div className={classes.statsBox}>
                        <div className={classes.coinValues}>
                            <span>Verified Supply</span>
                            <span>{reqData?.coin?.supply?.confirmed ? <TiTick /> : <ImCross />}</span>
                        </div>
                        <div className={classes.coinValues}>
                            <span>No of Exchanges</span>
                            <span>{reqData?.coin?.numberOfExchanges}</span>
                        </div>
                        <div className={classes.coinValues}>
                            <span>No of Markets</span>
                            <span>{reqData?.coin?.numberOfMarkets}</span>
                        </div>
                        <div className={classes.coinValues}>
                            <span>Circulating Supply</span>
                            <span>{millify(reqData?.coin?.supply?.circulating)}</span>
                        </div>
                        <div className={classes.coinValues}>
                            <span>Total Circulating Supply</span>
                            <span>{millify(reqData?.coin?.supply?.circulating)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            {/* <Charts coinId={coinId} /> */}

            {/* About Coins */}
            <div className={classes.aboutCoin}>
                <h1>About {reqData?.coin?.name}</h1>
                <div>{HTMLReactParser(reqData?.coin?.description)}</div>
            </div>

            <div className={classes.websites}>
                <h1>To know more about {reqData?.coin?.name}</h1>
                {reqData?.coin?.links.map((link, i) => {
                    return (
                        <li key={i} className={classes.link}>
                            <a href={link?.url}>{link?.name}</a>
                        </li>
                    )
                })}
            </div>

        </div>
    )
}

export default Coin