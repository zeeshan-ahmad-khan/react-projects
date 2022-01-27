// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const sanityClient = require('@sanity/client')

const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2022-01-21",
    useCdn: process.env.NODE_ENV === "production",
    token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config);

export default async function createComment(req, res) {

    const { _id, name, email, comment } = JSON.parse(req.body);

    try {
        await client.create({
            _type: "comment",
            post: {
                _type: "reference",
                _ref: _id,
            },
            name,
            email,
            comment
        });
    } catch (err) {
        // console.log(err);
        return res.status(500).json({ message: "Could not submit comment", err });
    }
    console.log("Comment Submitted");
    return res.status(200).json({ message: "Comment Submitted Successfully !!!" });
}