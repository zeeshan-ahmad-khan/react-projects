import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import requests, { IMG_PATH } from '../Requests'
import './Banner.css'

function Banner() {

    const [movie, setMovie] = useState([])

    const dataFetching = async () => {
        try {
            const resp = await fetch(requests.fetchTrending);
            const respData = await resp.json();
            setMovie(respData.results[Math.floor(Math.random() * respData.results.length - 1)])
            return respData
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dataFetching()
    }, [])

    // console.log(movie)

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string
    }

    // ${IMG_PATH}${movie.poster_path}
    return (
        <header className="banner" style={{
            backgroundImage: `url(${IMG_PATH}${movie.backdrop_path})`,
        }}>
            <div className="banner-contents">
                <h1 className="banner-title">{movie?.original_title || movie?.title || movie?.name}</h1>
                <div className="banner-buttons">
                    <Link to={`/${movie?.id}`}>
                        <button className="banner-button">Watch Trailer</button>
                    </Link>
                    <button className="banner-button">My List</button>
                </div>
                <h2 className="banner-description">
                    {truncate(movie?.overview, 150)}
                </h2>
            </div>
            <div className="banner-fadeButton"></div>
        </header>
    )
}

export default Banner