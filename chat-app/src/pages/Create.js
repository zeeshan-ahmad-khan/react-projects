import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { addRoom, getRoomFromUserdb, getUserFromRoomdb, updateRoomInUserdb, updateUsersInRoomdb } from "../db/firestoredb";
import { AuthContext } from '../context/authContext';

function Create() {

    const { state } = useContext(AuthContext);

    // create room credentials
    const [createInput, setCreateInput] = useState({ roomName: "", roomPass: "" })

    // join room credentials
    const [joinInput, setJoinInput] = useState({ roomId: "", roomPass: "" })

    // handling create room
    const handleCreateRoom = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setCreateInput({ ...createInput, [name]: value })
    }

    const handleCreateRoomSubmit = (e) => {
        e.preventDefault();
        const roomId = Math.floor((Math.random() * 8999) + 10000).toString();

        const createRoom = {
            roomId,
            roomName: createInput.roomName.toLowerCase(),
            roomPass: createInput.roomPass,
            users: [{
                uid: state.uid,
                userName: state.userName,
            }],
        }

        addRoom(createRoom);
        setCreateInput({ roomName: "", roomPass: "" })
        // console.log(createRoom);
    }

    // handling join room
    const handleJoinRoom = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setJoinInput({ ...joinInput, [name]: value })
    }

    const handleJoinRoomSubmit = async (e) => {
        e.preventDefault();

        const currentUser = {
            uid: state.uid,
            userName: state.userName,
        };

        // updating users in room collection
        const roomInfo = await getUserFromRoomdb(joinInput.roomId);

        if (roomInfo) {
            const isUserExists = roomInfo.users.findIndex(user => user.uid === currentUser.uid)

            if (isUserExists === -1) {
                updateUsersInRoomdb(roomInfo.id, roomInfo.users, currentUser)
            }

            // updating rooms in user collection
            const userInfo = await getRoomFromUserdb(state.uid);
            console.log(userInfo);

            if (userInfo) {
                const isRoomExists = userInfo.rooms.findIndex(room => room.roomId === joinInput.roomId)

                if (isRoomExists === -1) {
                    updateRoomInUserdb(userInfo.id, userInfo.rooms, joinInput.roomId)
                }
            }
        } else {
            console.log("Room does not exist");
        }

        setJoinInput({ roomId: "", roomPass: "" })
    }

    return (
        <section className="create">
            <Link to='/'>
                <button className="back">◀</button>
            </Link>
            <div className="block">
                <h3>Create Room</h3>
                <p>Enter Password for room and you will receive Room ID.<br />Share Room ID and Password with your friends to join the same room.</p>
                <form onSubmit={handleCreateRoomSubmit}>
                    <label htmlFor="name">Enter Name For Room</label>
                    <input type="text" name="roomName" autoComplete="off" value={createInput.roomName} onChange={handleCreateRoom} required />
                    <label htmlFor="password">Enter Passoword For Room</label>
                    <input type="text" name="roomPass" autoComplete="off" value={createInput.roomPass} onChange={handleCreateRoom} required />
                    <button>Create Room</button>
                </form>
            </div>
            <div className="block">
                <h3>Join Room</h3>
                <p>Enter Room ID and Password to join the room.</p>
                <form onSubmit={handleJoinRoomSubmit}>
                    <label htmlFor="room">Enter Room ID</label>
                    <input type="text" name="roomId" autoComplete="off" value={joinInput.roomId} onChange={handleJoinRoom} required />
                    <label htmlFor="roomPass">Enter Passoword</label>
                    <input type="password" name="roomPass" autoComplete="off" value={joinInput.roomPass} onChange={handleJoinRoom} required />
                    <button>Join Room</button>
                </form>
            </div>
        </section>
    )
}

export default Create