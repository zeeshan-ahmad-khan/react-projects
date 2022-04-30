import { getUserFromRoomdb, getUsers } from "../db/firestoredb"

const validateUser = async (userId) => {

    const users = await getUsers();
    const isUserInDb = users.findIndex(user => user.uid === userId);

    if (isUserInDb === -1) return false;
    else return true;

}

const validateRoomIdAndPassword = async (roomId, roomPass) => {
    const roomInfo = await getUserFromRoomdb(roomId);

    if (roomInfo) {
        if (roomInfo.roomId === roomId && roomInfo.roomPass === roomPass) {
            return { roomInfo, valid: true };
        }
    } else {
        return { roomInfo: [], valid: false };
    }
}

export {
    validateUser,
    validateRoomIdAndPassword,
}