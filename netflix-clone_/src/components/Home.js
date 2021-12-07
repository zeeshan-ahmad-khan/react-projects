import React from 'react'
import Nav from './Nav'
import Banner from './Banner'
import Row from './Row'
import requests from '../Requests'
import './Home.css'

function Home() {
    return (
        <div className="homescreen">
            <Nav />
            <Banner />
            <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
            <footer>Powered By
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="logo" className="logo"/>
            </footer>
        </div>
    )
}

export default Home
