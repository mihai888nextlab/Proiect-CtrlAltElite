import eventModel from "@/database/models/event";
import postModel from "@/database/models/posts";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId } = req.body;

  if (!eventId) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  const events = await eventModel.findOne({ _id: eventId });

  return res.status(200).json(events);
}
