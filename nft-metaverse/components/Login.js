import Image from "next/image"
import { useMoralis } from "react-moralis";

function Login() {

    const { authenticate, isAuthenticated, user } = useMoralis();

    return (
        <div className="bg-black relative">
            <h1>Login Screen</h1>
            <div className="flex flex-col absolute z-50 h-4/6 w-full items-center justify-center space-y-4">
                {/* logo */}
                <Image className="object-contain rounded-full" src="/images/logo.jpg" width={200} height={200} alt="image by Meryl Merlin" />
                {/* login button */}
                <button onClick={authenticate} className="bg-black rounded-lg font-bold p-5 animate-pulse text-blue-500">META LOGIN</button>
            </div>

            <div className="w-full h-screen">
                <Image src="/images/bg.jpg" layout="fill" objectFit="cover" />
            </div>
        </div>
    )
}

export default Login
