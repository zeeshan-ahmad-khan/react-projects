import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between px-10 py-5 max-w-7xl mx-auto border-b-2 border-black">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <h1 className="text-3xl font-bold cursor-pointer">मध्यम</h1>
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5 cursor-pointer">
          <h3>Contact</h3>
          <h3>About</h3>
          <h3 className="text-white bg-black px-5 py-2 rounded-full hover:text-orange-400">
            Follow
          </h3>
        </div>
      </div>

      <div className="flex items-center space-x-5 cursor-pointer">
        <h3>Sign In</h3>
        <h3 className="border-2 px-5 py-2 rounded-full border-black text-black hover:bg-black hover:text-orange-400">
          Get Started
        </h3>
      </div>
    </header>
  );
}

export default Header;
