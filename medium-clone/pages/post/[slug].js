import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from "react";
import Footer from "../../components/Footer";
import Head from "next/head";

function Post({ post }) {

  const [submitted, setSubmitted] = useState(false);

  console.log(post);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // console.log(data)
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(() => {
      console.log(data);
      setSubmitted(true);
    }).catch((err) => {
      console.log(err);
      setSubmitted(false);
    })
  }

  return (
    <main>

      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <img className="w-full h-40 object-cover" src={urlFor(post.mainImage).url()} alt={post.title} />

      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">{post.description}</h2>

        <div>
          <img className="h-10 w-10 rounded-full" src={urlFor(post.author.image).url()} alt={post.author.name} />
          <p className="font-extralight text-sm">
            Blog post by <span className="text-orange-700">{post.author.name}</span> - Published at {new Date(post._createdAt).toUTCString()}
          </p>
        </div>

        <div className="mt-10">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props) => {
                <h1 className="text-2xl font-bold my-5"></h1>
              },
              h2: (props) => {
                <h2 className="text-xl font-bold my-5"></h2>
              },
              li: ({ children }) => {
                <li className="ml-4 list-disc">{children}</li>
              },
              link: ({ href, children }) => {
                <a href={href} className="text-blue-500 hover:underline">{children}</a>
              },
            }}
          />
        </div>
      </article>

      <hr className="max-w-lg my-5 mx-auto border border-orange-500" />

      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-orange-500 text-white max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold">Thank You for submitting you comment.</h1>
          <p>Once it has been approved it will show here !!!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 max-w-2xl mx-auto mb-10">
          <h3 className="text-sm text-orange-700">Enjoy reading this article?</h3>
          <h4 className="text-3xl font-bold">Leave your comment here!</h4>
          <hr className="py-3 mt-2" />

          <input type="hidden" {...register("_id")} name="_id" value={post._id} />

          <label className="block mb-5">
            <span className="text-gray-700">Name</span>
            <input {...register("name", { required: true })} className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-orange-500 outline-none focus:ring" type="text" placeholder="Enter Name" />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Email</span>
            <input {...register("email", { required: true })} className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-orange-500 outline-none focus:ring" type="email" placeholder="Enter Email" />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Comments</span>
            <textarea {...register("comment", { required: true })} className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-orange-500 outline-none focus:ring" rows={8} placeholder="Enter Comments" />
          </label>

          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">Name is required !</span>
            )}
            {errors.email && (
              <span className="text-red-500">Email is required !</span>
            )}
            {errors.comment && (
              <span className="text-red-500">Comment is required !</span>
            )}
          </div>

          <input type="submit" className="shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none font-bold py-2 px-4 cursor-pointer text-white" />
        </form>
      )
      }
      {/* Comments */}
      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-orange-500 shadow space-y-2">
        <h3 className="text-4xl">Comments</h3>
        <hr pb-2 />

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-orange-500">{comment.name}: </span>{comment.comment}
            </p>
          </div>
        ))}
      </div>

      <Footer />
    </main>

  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug {
            current
        }
    }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    author -> {
      name,
      image
    },
    "comments": *[
      _type == "comment" && post._ref == ^._id && approved == true
    ], 
    description,
    mainImage,
    slug,
    body
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60, //after 60s it will update the old cache
  }
};
