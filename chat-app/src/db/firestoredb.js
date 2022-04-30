import { collection, addDoc, doc, getDocs, query, where, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const addRoom = async (roomCred) => {

    const roomRef = collection(db, "rooms");
    await addDoc(roomRef, roomCred)
}

const getRooms = async () => {

    const roomRef = collection(db, "rooms");
    const roomSnap = await getDocs(roomRef)
    const roomList = roomSnap.docs.map(room => {
        return { ...room.data(), id: room.id };
    });

    return roomList;
}

const getUserFromRoomdb = async (roomId) => {

    const roomRef = collection(db, "rooms");
    const q = query(roomRef, where("roomId", "==", roomId))
    const roomSnap = await getDocs(q);

    const roomInfo = roomSnap.docs.length === 0 ? null : { ...roomSnap.docs[0].data(), id: roomSnap.docs[0].id };

    return roomInfo;
}

const updateUsersInRoomdb = async (id, usersArray, currentUser) => {

    const roomIdRef = doc(db, "rooms", id);
    updateDoc(roomIdRef, {
        users: [...usersArray, currentUser],
    })
}

const addUsers = async (user) => {

    const userRef = collection(db, "users");
    await addDoc(userRef, user);
}

const getUsers = async () => {

    const userRef = collection(db, "users");
    const userSnap = await getDocs(userRef);
    const userList = userSnap.docs.map(user => {
        return { ...user.data(), id: user.id };
    });

    return userList;
}

const getRoomFromUserdb = async (userId) => {

    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "==", userId))
    const userSnap = await getDocs(q);

    const userInfo = userSnap.docs.length === 0 ? null : { ...userSnap.docs[0].data(), id: userSnap.docs[0].id };

    return userInfo;
}

const updateRoomInUserdb = async (id, roomArray, currentRoom) => {

    const userIdRef = doc(db, "users", id);
    updateDoc(userIdRef, {
        rooms: [...roomArray, currentRoom],
    })
}

const updateMessageInRoomdb = async (id, messagesArray, messageContent) => {

    const roomIdRef = doc(db, "rooms", id);
    await updateDoc(roomIdRef, {
        messages: [...messagesArray, messageContent],
    })
}

export {
    addRoom,
    getRooms,
    getUserFromRoomdb,
    updateUsersInRoomdb,
    addUsers,
    getUsers,
    getRoomFromUserdb,
    updateRoomInUserdb,
    updateMessageInRoomdb,
};