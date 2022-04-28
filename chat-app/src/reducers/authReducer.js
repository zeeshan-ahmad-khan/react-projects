import { useReducer } from "react"

const user = JSON.parse(sessionStorage.getItem("user"));

export const initialState = {
    uid: user ? user.uid : null,
    userName: user ? user.userName : null,
    userImg: user ? user.userImg : null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state, uid: action.payload.uid, userName: action.payload.userName,
                userImg: action.payload.userImg
            }
        case "SIGNOUT":
            return {
                ...state, uid: null, userName: null,
                userImg: null
            }
        default:
            return state
    }
}

const useGlobalState = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return { state, dispatch };
}

export default useGlobalState;