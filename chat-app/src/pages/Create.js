import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { addRoom, getRoomFromUserdb, getUserFromRoomdb, updateRoomInUserdb, updateUsersInRoomdb } from "../db/firestoredb";
import { AuthContext } from '../context/authContext';
import { validateRoomIdAndPassword } from "../validation/validate";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/Loader";

function Create() {

    const { state } = useContext(AuthContext);
    let navigate = useNavigate();

    // loader state
    const [loading, setLoading] = useState(false);

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

        setLoading(true);

        const roomId = Math.floor((Math.random() * 8999) + 10000).toString();

        const createRoom = {
            roomId,
            roomName: createInput.roomName.toLowerCase(),
            roomPass: createInput.roomPass,
            users: [{
                uid: state.uid,
                userName: state.userName,
            }],
            messages: [],
        }

        addRoom(createRoom);

        // updating rooms in user collection
        getRoomFromUserdb(state.uid)
            .then(userInfo => {
                // console.log(userInfo);
                if (userInfo) {
                    const isRoomExists = userInfo.rooms.findIndex(room => room.roomId === joinInput.roomId)

                    if (isRoomExists === -1) {
                        updateRoomInUserdb(userInfo.id, userInfo.rooms, {
                            roomId: roomId,
                            roomName: createInput.roomName,
                            roomPass: createInput.roomPass
                        })
                    }
                }
            });

        setLoading(false);
        navigate("/chats");
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

        setLoading(true);

        const currentUser = {
            uid: state.uid,
            userName: state.userName,
        };

        validateRoomIdAndPassword(joinInput.roomId, joinInput.roomPass).then(result => {

            // updating users in room collection
            if (result.valid) {

                const isUserExists = result.roomInfo.users.findIndex(user => user.uid === currentUser.uid)

                if (isUserExists === -1) {
                    updateUsersInRoomdb(result.roomInfo.id, result.roomInfo.users, currentUser)
                }

                // updating rooms in user collection
                getRoomFromUserdb(state.uid)
                    .then(userInfo => {
                        // console.log(userInfo);
                        if (userInfo) {
                            const isRoomExists = userInfo.rooms.findIndex(room => room.roomId === joinInput.roomId)

                            if (isRoomExists === -1) {
                                updateRoomInUserdb(userInfo.id, userInfo.rooms, {
                                    roomId: joinInput.roomId,
                                    roomName: result.roomInfo.roomName,
                                    roomPass: joinInput.roomPass
                                })
                            }
                        }
                    });

                setLoading(false);
                navigate("/chats");
            } else {
                setLoading(false);
                console.log("Room does not exist");
                toast.error(`Room does not exist`);
            }
        });

        setJoinInput({ roomId: "", roomPass: "" })
    }

    return (
        <section className="create">
            {loading && <Loader />}
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
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