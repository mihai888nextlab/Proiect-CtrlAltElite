import userModel from "@/database/models/users";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { communityId } = req.body;

  if (!communityId) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  const users = await userModel.find({ communities: communityId });

  return res.status(200).json(users);
}
