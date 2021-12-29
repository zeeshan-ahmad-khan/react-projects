import { useMoralis } from "react-moralis"
import Image from "next/image";
import Avatar from "./Avatar";
import ChangeUsername from "./ChangeUsername";

function Header() {

    const { user, logout } = useMoralis();

    return (
        <div className="sticky top-0 p-5 z-50 bg-black shadow-sm border-b-2 border-blue-700 text-blue-500">
            <div className="grid grid-cols-5 lg:grid-cols-6 items-end lg:items-center">
                <div className="relative h-24 w-24 mx-auto hidden lg:inline-grid">
                    <Image src="/images/logo.jpg" layout="fill" className="rounded-full " objectFit="cover" />
                </div>

                <div className="col-span-4 text-left lg:text-center">
                    <div className="relative h-48 w-48 lg:mx-auto border-blue-500 border-8 rounded-full">
                        <Avatar logoutOnPress />
                    </div>

                    <h1 className="text-3xl">Welcome to NFT Metaverse</h1>

                    <h2 className="text-5xl font-bold truncate">{user.getUsername()}</h2>

                    <button onClick={logout}
                        className="p-2 border-2 border-blue-500 mt-3 rounded-full
                     hover:bg-blue-500 hover:text-black"
                    >
                        LOGOUT
                    </button>

                    <ChangeUsername />
                </div>
            </div>
        </div>
    )
}

export default Header
