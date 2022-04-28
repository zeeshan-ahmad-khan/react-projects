import { Link } from "react-router-dom"


function Home() {
    return (
        <section className="homepage">
            <div className="about">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium facere maxime omnis nesciunt ea magni expedita, sint quam delectus rerum obcaecati fuga illum corrupti sunt repellat vel, assumenda iste, adipisci nobis nihil animi unde explicabo atque. Non nesciunt, officia doloribus optio tempore praesentium perspiciatis voluptates necessitatibus fuga tenetur, quidem laborum?</p>
                <img src="./images/talking.png" />
            </div>
            <nav className="navigation">
                <Link to='/create'>
                    <div className="createRoomBtn">
                        <img src="./images/key.png" alt="" />
                    </div>
                </Link>
                <Link to='/chats'>
                    <div className="chatRoomBtn">
                        <img src="./images/door.png" alt="" />
                    </div>
                </Link>
            </nav>
        </section>
    )
}

export default Home