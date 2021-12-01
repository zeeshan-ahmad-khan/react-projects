import { useState } from 'react'
import { useHistory } from 'react-router';

const url = "https://creator-blog-default-rtdb.firebaseio.com/blogs.json";

function Create() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const blog = { title, author, content };
        console.log(blog);

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(blog),
            header: { "Content-Type": "application/json" }
        }).then(() => {
            console.log("new blog added");
            history.push("/");
        })
    }

    return (
        <div className="create">
            <h1>add a new blog</h1>
            <form onSubmit={handleSubmit}>
                <label>blog title:</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>blog content:</label>
                <textarea rows="13" required value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <label>blog author:</label>
                <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)} />
                <button>Add Blog</button>
            </form>
        </div>
    )
}

export default Create