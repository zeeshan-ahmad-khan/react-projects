import React from 'react'
import { Link } from 'react-router-dom';

const Bloglist = ({ blogs, title }) => {

console.log(blogs)
    return (
        <div className="blog-list" >
            <h1>{title}</h1>
            {
                blogs?.map((blog) => {
                    const { id, title, author } = blog;
                    return (
                        <div key={id} className="blog-preview">
                            <Link to={`/blogs/${id}`}>
                                <h2>{title}</h2>
                                <p>written by {author}</p>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Bloglist