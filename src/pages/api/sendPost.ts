import postModel from "@/database/models/posts";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message, user, communityId } = req.body;

  if (!message || !user || !communityId) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  const post = new postModel({
    userId: user._id,
    message,
    communityId,
    dateCreated: new Date(),
  });

  await post.save();

  return res.status(200).json(post);
}
