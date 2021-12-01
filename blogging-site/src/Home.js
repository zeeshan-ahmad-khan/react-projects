import React from 'react'
import Bloglist from './Bloglist';
import useFetch from './useFetch';

const url = "https://creator-blog-default-rtdb.firebaseio.com/blogs.json";

const Home = () => {

    const {data, isLoading} = useFetch(url);

    let blogs = [];

    for (let key in data) {
        blogs.push({
            id: key,
            title : data[key].title,
            author: data[key].author,
            content: data[key].content
        })
    }

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="home">
            <Bloglist blogs={blogs} title="all blogs" />
        </div>
    )
}

export default Home