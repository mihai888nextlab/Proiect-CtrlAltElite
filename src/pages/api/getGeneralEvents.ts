import eventModel from "@/database/models/event";
import postModel from "@/database/models/posts";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const events = await eventModel
    .find({ date: { $gte: Date.now() } })
    .sort({ date: 1 });

  return res.status(200).json(events);
}
