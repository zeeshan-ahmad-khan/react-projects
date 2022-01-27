import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Posts from "../components/Posts";
import Footer from '../components/Footer'
import { sanityClient } from "../sanity";

export default function Home({ posts }) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>मध्यम (Channel)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Banner */}
      <Banner />

      {/* Posts */}
      <Posts posts={posts} />

      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
      _id,
      title,
      author -> {
        name,
        image
      },
      description,
      mainImage,
      slug
    }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
