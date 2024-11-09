import postModel from "@/database/models/posts";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { communityId } = req.body;

  if (!communityId) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  const posts = await postModel.find({ communityId }).sort({ dateCreated: -1 });

  return res.status(200).json(posts);
}
