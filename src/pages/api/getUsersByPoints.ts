import userModel from "@/database/models/users";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = await userModel.find().sort({ points: -1 });

  return res.status(200).json(users);
}
