function Banner() {
  return (
    <div className="my-5 border-b-2 border-black py-3">
      <div className="px-10 space-y-5">
        <h1 className="text-4xl mx-w-xl font-serif text-justify md:text-6xl">
          <span className="bg-orange-400 p-1">मध्यम</span> is a place to channel
          your thoughts by reading, writing and connecting.
        </h1>
        <h2>
          Channel your thinking on any topic and connect with millions of
          readers.
        </h2>

        <div>
          <button className="bg-black text-orange-300 px-5 py-2 rounded-full">
            Start Writing
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
