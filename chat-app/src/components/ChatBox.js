import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { AuthContext } from "../context/authContext";
import { getUserFromRoomdb, updateMessageInRoomdb } from "../db/firestoredb";

function ChatBox({ room }) {

    const { state } = useContext(AuthContext);
    const { roomName, roomId } = room;
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const messageContent = {
            uid: state.uid,
            userName: state.userName,
            message: inputMessage,
            createdAt: new Date().toUTCString(),
        }

        getUserFromRoomdb(roomId)
            .then(result => {

                updateMessageInRoomdb(result.id, result.messages, messageContent);
            })

        setInputMessage("");
    }

    useEffect(() => {
        if (roomId) {
            const roomRef = collection(db, "rooms");
            const q = query(roomRef, where("roomId", "==", roomId))
            const roomSnap = onSnapshot(q, (snap) => {
                setMessages(snap.docs[0].data().messages);
            });
        }
    }, [inputMessage, roomId])

    return (
        <section className="chatBox">
            <div className="chatHeader">
                <p>{roomName || "Click Room Name to Start Chat"}</p>
                {roomName && <button className="leave">Leave</button>}
            </div>
            <div className="messages">
                {messages?.map((m, i) => (
                    <div className={state.uid === m.uid ? "messageBlock" : "messageBlock messageOther"} key={i}>
                        <span>{m.userName} | {m.createdAt}</span>
                        <p>{m.message}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="message" value={inputMessage} autoComplete="off" onChange={(e) => setInputMessage(e.target.value)} />
                <button>▶</button>
            </form>
        </section>
    )
}

export default ChatBox;