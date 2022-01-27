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
          <h2 className="text-xs font-bold">
            *header button are non functional<br />
            *this is only for personal blog where I can only write and edit posts.<br />
            *you can only read and comment on the post
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Banner;
