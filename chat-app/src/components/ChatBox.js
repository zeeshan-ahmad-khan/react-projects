import { collection, doc, onSnapshot, deleteDoc, query, updateDoc, where } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../config/firebase";
import { AuthContext } from "../context/authContext";
import { getRoomFromUserdb, getUserFromRoomdb, updateMessageInRoomdb } from "../db/firestoredb";

function ChatBox({ room, setCurrentRoom }) {

    let messageRef = useRef();
    const { roomName, roomId } = room;
    let t;

    const { state } = useContext(AuthContext);
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // making messages autoscroll
    if (messages.length) {
        t = setTimeout(() => {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }, 1000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputMessage.trim() !== "") {
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
        }

        setInputMessage("");
    }

    const handleLeaveRoom = (roomId) => {

        getUserFromRoomdb(roomId)
            .then(result => {
                const newUserArray = result?.users.filter(user => user.uid !== state.uid)

                const roomIdRef = doc(db, "rooms", result.id);

                if (newUserArray.length <= 0) {
                    deleteDoc(roomIdRef);
                    setCurrentRoom({});
                } else {
                    updateDoc(roomIdRef, {
                        users: newUserArray,
                    })
                }
            })

        getRoomFromUserdb(state.uid)
            .then(result => {
                const newRoomArray = result?.rooms.filter(room => room.roomId !== roomId);

                const userIdRef = doc(db, "users", result.id);
                updateDoc(userIdRef, {
                    messages: [],
                    rooms: newRoomArray,
                })
            });
    }

    useEffect(() => {
        if (roomId) {
            const roomRef = collection(db, "rooms");
            const q = query(roomRef, where("roomId", "==", roomId))
            const roomSnap = onSnapshot(q, (snap) => {
                setMessages(snap.docs[0].data().messages);
            });

            return () => roomSnap();
        } else {
            setMessages([])
        }
    }, [inputMessage, roomId])

    return (
        <section className="chatBox">
            <div className="chatHeader">
                <p>{roomName || "Click Room Name to Start Chat"}</p>
                {roomName && <button className="leave" onClick={() => handleLeaveRoom(roomId)}>Leave</button>}
            </div>
            <div className="messages" ref={messageRef} onScroll={() => clearTimeout(t)}>
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