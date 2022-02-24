import { useState } from 'react';
import useFetch from '../utilities/useFetch'

import classes from './Charts.module.css'

function Charts({ coinId }) {

    let coinPrices = [];
    let coinTimestamp = [];

    const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

    const [duration, setDuration] = useState('24h');

    const { reqData, isPending } = useFetch(`/coin/${coinId}/history?timePeriod=${duration}`)

    for (let i = 0; i < reqData?.history?.length; i++) {
        coinPrices.push(reqData?.history[i]?.price)
        coinTimestamp.push(new Date(reqData?.history[i]?.timestamp).toLocaleDateString())
    }
    // console.log({ coinPrices, coinTimestamp });

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrices,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <div className={classes.charts}>
            <h1>All Time Statistics</h1>

            <div className={classes.options}>
                <select className={classes.duration} value={duration} onChange={(e) => setDuration(e.target.value)}>
                    {time.map(t => {
                        return (
                            <option value={t}>{t}</option>
                        )
                    })}
                </select>
            </div>

            <div className={classes.chartStats}>

                <div className={classes.prices}>
                    <ul>

                        {coinPrices?.map((coin, i) => {
                            return (
                                <h3 key={i}>{coin}</h3>
                            )
                        })}
                    </ul>
                    <ul>

                        {coinTimestamp?.map((time, i) => {
                            return (
                                <h3 key={i}>{time}</h3>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Charts