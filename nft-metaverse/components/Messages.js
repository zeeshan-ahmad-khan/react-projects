import { useRef } from 'react';
import { ByMoralis, useMoralis, useMoralisQuery } from 'react-moralis'
import SendMessage from './SendMessage';
import Message from './Message';

// only shows chats from last 15 mins
const MINS_DURATION = 115;

function Messages() {

    const { user } = useMoralis();
    const endOfMessageRef = useRef(null);
    const { data, loading, error } = useMoralisQuery('Messages',
        (query) => query.ascending('createdAt').greaterThan('createdAt', new Date(Date.now() - 1000 * 60 * MINS_DURATION)),
        [],
        {
            live: true,
        }
    )

    // console.log(data)
    return (
        <div className="pb-56">

            <div className='space-y-10 p-4'>
                {data.map(message => {
                    return (
                        <Message key={message.id} message={message} />
                    )
                })}
            </div>

            <div className='flex justify-center'>
                <SendMessage endOfMessageRef={endOfMessageRef} />
            </div>

            <div ref={endOfMessageRef} className='text-center text-gray-400 mt-5'>
                <p>You are up to date {user.getUsername()}!</p>
            </div>

            <div className='my-5'>
                <ByMoralis variant='dark' style={{ marginLeft: "auto", marginRight: "auto" }} />
            </div>

        </div>
    )
}

export default Messages
