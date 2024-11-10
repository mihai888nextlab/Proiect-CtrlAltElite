import userModel from "@/database/models/users";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId } = req.body;

  if (!eventId) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  const users = await userModel.find({ events: eventId });

  return res.status(200).json(users);
}
