import React, { useEffect, useState } from 'react'
import { API_KEY, BASE_URL, IMG_PATH } from '../Requests'
import { useParams } from 'react-router';
import Loading from './Loading';
import './MovieDetails.css'
import { Link } from 'react-router-dom';

function MovieDetails() {

    const { id } = useParams();

    const VIDEO_URL = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    const [isLoading, setIsLoading] = useState(false)
    const [keys, setKeys] = useState([]);
    const [poster, setPoster] = useState("");
    const [details, setDetails] = useState({});

    const dataFetching = async () => {
        try {
            setIsLoading(true);
            const resp = await fetch(VIDEO_URL);
            const respData = await resp.json();
            let trailers = respData?.videos?.results.filter((movie) => movie?.type === "Trailer" || movie?.type === "Official Trailer"
            )
            let videoKeys = trailers.map(trailer => trailer?.key)
            let details = {
                name: respData?.title,
                overview: respData?.overview,
                rating: respData?.vote_average,
            }
            // console.log(respData)
            setKeys(videoKeys)
            setPoster(respData?.poster_path)
            setDetails(details)
            setIsLoading(false)
            return respData
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }

    }

    useEffect(() => {
        dataFetching()
    }, [VIDEO_URL])

    // console.log(details)

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="movie-details">
            <Link to="/"><div className="back-button">&#60; Back</div></Link>
            {!isLoading && keys.length === 0 ?
                <div className="error">
                    <h1>error... No Data Found</h1>
                </div> :
                <div className="wrapper">
                    <div className="video-frame">
                        <iframe src={`https://www.youtube.com/embed/${keys[0] || keys[1] || keys[2]}`}></iframe>
                    </div>

                    <div className="details-container">
                        <div className="video-poster-container">
                            <img src={`${IMG_PATH}${poster}`} alt="" className="video-poster" />
                            <div className="rating">{details.rating}</div>
                        </div>
                        <div className="all-details">
                            <h1>{details.name}</h1>
                            <span>{details.overview}</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MovieDetails
