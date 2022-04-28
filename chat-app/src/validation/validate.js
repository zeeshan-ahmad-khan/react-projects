import { getUsers } from "../db/firestoredb"

const validateUser = async (userId) => {

    const users = await getUsers();
    const isUserInDb = users.findIndex(user => user.uid === userId);

    if (isUserInDb === -1) return false;
    else return true;

}

export {
    validateUser,
}