import userModel from "@/database/models/users";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  const users = await userModel.findOne({ _id: userId });

  return res.status(200).json(users);
}
