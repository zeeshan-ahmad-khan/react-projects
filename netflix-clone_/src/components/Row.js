import React, { useEffect, useState } from 'react'
import './Row.css'
import { IMG_PATH } from '../Requests'
import { Link,} from 'react-router-dom'

function Row({ title, fetchUrl }) {
    const [data, setData] = useState([])

    const dataFetching = async () => {
        try {
            const resp = await fetch(fetchUrl);
            const respData = await resp.json();
            setData(respData.results)
            return respData
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        dataFetching()
    }, [fetchUrl])

    // console.log(data)

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row-posters">
                {data.map((movie) => {
                    return (
                        <div className="row-poster" key={movie.id}>
                            <img src={`${IMG_PATH}${movie.poster_path}`} alt={movie.title || movie.original_title || title.name} className="row-poster-image" />
                            <div className="watch-btn-container">
                                <Link to={`/${movie.id}`}>
                                    <button className="watch-btn">Watch Trailer</button>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Row
