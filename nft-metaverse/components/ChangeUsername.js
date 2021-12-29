import { useMoralis } from "react-moralis"

function ChangeUsername() {

    const { setUserData, isUserUpdating, userError, user } = useMoralis();

    const setUsername = () => {
        const username = prompt(`Enter your new Username: ${user.getUsername()}`);

        if (!username) {
            return;
        }

        setUserData({
            username,
        })

    }

    return (
        <div className="text-sm absolute top-5 right-5">
            <button disabled={isUserUpdating}
                onClick={setUsername}
                className="hover:text-blue-700">Change username</button>
        </div>
    )
}

export default ChangeUsername
