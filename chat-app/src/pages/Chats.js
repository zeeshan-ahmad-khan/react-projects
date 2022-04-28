import { Link } from "react-router-dom"
import ChatBox from "../components/ChatBox";

function Chats() {

    const roomIds = [69745, 98713, 93177]

    return (
        <section className="chats">
            <Link to='/'>
                <button className="back">◀</button>
            </Link>
            <div className="roomList">
                <div className="roomInfo">
                    <p>Room ID: 42231</p>
                    <p>Password: a4d5s</p>
                </div>
                <div className="rooms">
                    <h5>Rooms</h5>
                    {roomIds.map(roomId => (
                        <aside key={roomId}>
                            <h5>My Rooms Name</h5>
                        </aside>
                    ))}
                </div>
            </div>
            <div className="chatSection">
                <ChatBox />
            </div>
            <div className="roomUsers">
                <div className="roomUserHeader">
                    <p>Users</p>
                </div>
                <aside>
                    <img src="#" alt="" />
                    <h5>Zak Babu</h5>
                </aside>
                <aside>
                    <img src="#" alt="" />
                    <h5>Zak Babu</h5>
                </aside>
            </div>
        </section>
    )
}

export default Chats