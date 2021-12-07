// TMDb api

export const API_KEY = `04c35731a5ee918f014970082a0088b1`;

export const BASE_URL = `https://api.themoviedb.org/3`;

// const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;

export const IMG_PATH = "https://image.tmdb.org/t/p/original";

// const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;

const requests = {
    fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_network=213`,
    fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&with_genres=99`,
}

export default requests;