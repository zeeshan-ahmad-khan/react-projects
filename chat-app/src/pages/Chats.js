import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import ChatBox from "../components/ChatBox";
import { db } from "../config/firebase";
import { AuthContext } from "../context/authContext";

function Chats() {

    const { state } = useContext(AuthContext);

    const [rooms, setRooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentRoom, setCurrentRoom] = useState({});

    const handleUsers = (room) => {
        if (room)
            setCurrentRoom({
                roomName: room.roomName,
                roomId: room.roomId,
                roomPass: room.roomPass,
            })
    }

    useEffect(() => {
        const userRef = collection(db, "users");
        const q = query(userRef, where("uid", "==", state.uid))
        const userSnap = onSnapshot(q, (snap) => {
            setRooms(snap.docs[0].data().rooms)
        });

        return () => userSnap();
    }, [])

    useEffect(() => {
        if (currentRoom.roomId) {
            const roomRef = collection(db, "rooms");
            const q = query(roomRef, where("roomId", "==", currentRoom.roomId))
            const roomSnap = onSnapshot(q, (snap) => {
                setUsers(snap.docs[0].data().users);
            });
        } else {
            setUsers([]);
        }
    }, [currentRoom])

    return (
        <section className="chats">
            <Link to='/'>
                <button className="back">◀</button>
            </Link>
            <div className="roomList">
                <div className="roomInfo">
                    <p>Room ID: {currentRoom.roomId}</p>
                    <p>Password: {currentRoom.roomPass}</p>
                </div>
                <div className="rooms">
                    <h5>Room Names to Chat</h5>
                    {rooms?.map((room, i) => (
                        <aside key={i} onClick={() => handleUsers(room)} className={room.roomId === currentRoom.roomId ? "active" : null}>
                            <h5>{room.roomName}</h5>
                        </aside>
                    ))}
                </div>
            </div>
            <div className="chatSection">
                <ChatBox room={currentRoom} setCurrentRoom={setCurrentRoom} />
            </div>
            <div className="roomUsers">
                <div className="roomUserHeader">
                    <p>Users</p>
                </div>
                {users?.map((user) => (
                    <aside key={user.uid}>
                        <img src={user.userImg} alt="#" />
                        <h5>{user.userName}</h5>
                    </aside>
                ))}
            </div>
        </section>
    )
}

export default Chats