// Charts can be implemented also
import { useState } from 'react';
import useFetch from '../utilities/useFetch'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

import classes from './Charts.module.css'

function Charts({ coinId }) {

    let coinHistory = [];


    const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

    const [duration, setDuration] = useState('24h');

    const { reqData, isPending } = useFetch(`/coin/${coinId}/history?timePeriod=${duration}`)

    for (let i = reqData?.history?.length; i > 0; i--) {

        let coinPrice = (reqData?.history[reqData?.history?.length - i]?.price) / 1000;
        let coinTimestamp = new Date(reqData?.history[reqData?.history?.length - i]?.timestamp).toLocaleDateString();
        coinHistory.push({ coinPrice, coinTimestamp })
    }
    // console.log(coinHistory, reqData, new Date(1644307200));


    return (
        <div className={classes.charts}>
            <h1>All Time Statistics</h1>

            <div className={classes.options}>
                <select className={classes.duration} value={duration} onChange={(e) => setDuration(e.target.value)}>
                    {time.map((t, i) => {
                        return (
                            <option key={i} value={t}>{t}</option>
                        )
                    })}
                </select>
            </div>

            <div className={classes.chartStats}>

                <div className={classes.chart}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            width={500}
                            height={400}
                            data={coinHistory}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 20,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="coinTimestamp" angle={-90}>
                                <Label value="Timestamp" position="insideBottom"
                                    offset={-10}
                                />
                            </XAxis>
                            <YAxis>
                                <Label value="Prices (in K)" angle={-90} position="insideLeft" offset={10} />
                            </YAxis>
                            <Tooltip />
                            <Area type="monotone" dataKey="coinPrice" stroke="#00161D" fill="#005567" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Charts