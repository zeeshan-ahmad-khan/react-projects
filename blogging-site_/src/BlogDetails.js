import React from 'react'
import { useHistory, useParams } from 'react-router'
import useFetch from './useFetch';

const url = "https://creator-blog-default-rtdb.firebaseio.com/blogs/";

function BlogDetails() {

    const { id } = useParams();
    const { data: blog, isLoading } = useFetch(`${url}${id}.json`);
    const history = useHistory();
    
    console.log(blog)
    const { title, author, content } = blog;

    const handleClick = () => {

        fetch(`${url}${id}.json`, {
            method: 'DELETE'
        }).then(() => {
            history.push("/")
        })
    }

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="blog-details">
            <h1>{title}</h1>
            <span>by - {author}</span>
            <p><br />{content}</p>
            <button onClick={handleClick}>Delete</button>
        </div>
    )
}

export default BlogDetails