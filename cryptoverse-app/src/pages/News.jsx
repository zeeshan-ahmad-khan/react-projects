import { useEffect, useState } from 'react'

import classes from './News.module.css'

function News({ isHomepage = false }) {

    let news = [];
    const [isPending, setIsPending] = useState(true);
    const [data, setData] = useState([]);

    if (isHomepage) {
        let topTen = data.filter((_, i) => i < 10);
        news = topTen;
    } else {
        news = data;
    }

    useEffect(() => {

        fetch("https://bing-news-search1.p.rapidapi.com/news/search?q=crypto&count=100&freshness=Day&textFormat=Raw&safeSearch=Off", {
            "method": "GET",
            "headers": {
                "x-bingapis-sdk": "true",
                "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_API_KEY
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setData(data.value)
                setIsPending(false)
            })
            .catch(err => {
                console.error(err);
                setIsPending(false)
            });
    }, [])

    console.log(news);

    if (isPending) {
        return <h1>Loading...</h1>
    }

    return (
        <div className={classes.news}>
            <h1>Top Crypto News</h1>
            <p>Read the latest news about cryptocurrencies.</p>

            <div className={classes.newsGrid}>
                {news.map((n, i) => {
                    return (
                        <div className={classes.newsCard} key={i}>
                            <a href={n?.url}>
                                <img src={n?.image?.thumbnail?.contentUrl} alt={n?.name} />
                                <h3>{n?.name}</h3>
                                <p>{n?.description}</p>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default News