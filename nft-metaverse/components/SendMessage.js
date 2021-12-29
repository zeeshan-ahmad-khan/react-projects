import { useState } from 'react';
import { useMoralis } from 'react-moralis'

function SendMessage({ endOfMessageRef }) {

    const { user, Moralis } = useMoralis();
    const [message, setMessage] = useState()

    const sendMessage = (e) => {
        e.preventDefault();

        if (!message) {
            return;
        }

        const Messages = Moralis.Object.extend("Messages");
        const messages = new Messages();

        messages.save({
            message: message,
            username: user.getUsername(),
            ethAddress: user.get("ethAddress"),
        }).then((message) => {
            // object was saved successfully
        }),
            (error) => {
                // save failed
                // error is a Moralis Erro with an error code and message
                console.log(error.message);
            }

        endOfMessageRef.current.scrollIntoView({ behaviour: "smooth" });

        setMessage("")
    }

    return (
        <form className='flex w-11/12 fixed bottom-10 bg-black opacity-80 px-6 py-4 max-w-2xl shadow-xl rounded-full border-4 border-blue-400'>
            <input type="text" className="flex-grow outline-none bg-transparent text-white placeholder-gray-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Enter message ${user.getUsername()}...`}
            />
            <button
                type='submit'
                onClick={sendMessage}
                className="font-bold text-blue-500">Send</button>
        </form>
    )
}

export default SendMessage