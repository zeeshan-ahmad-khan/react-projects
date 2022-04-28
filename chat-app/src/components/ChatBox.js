import { useState } from "react"

function ChatBox() {
    const [user, setUser] = useState("Fayyaz Takkar");
    const [time, setTime] = useState(new Date().toLocaleString());
    const [chat, setChat] = useState("asfdhdhhfsdhsfdhgfdgs");

    return (
        <section className="chatBox">
            <div className="chatHeader">
                <p>My Room Name</p>
            </div>
            <div className="messages">
                <div className="messageBlock">
                    <span>{user} | {time}</span>
                    <p>{chat}</p>
                </div>
                <div className="messageBlock">
                    <span>{user} | {time}</span>
                    <p>{chat}</p>
                </div>
                <div className="messageBlock messageOther">
                    <span>{user} | {time}</span>
                    <p>{chat}</p>
                </div>
            </div>
            <form>
                <input type="text" autoComplete="off" />
                <button>▶</button>
            </form>
        </section>
    )
}

export default ChatBox