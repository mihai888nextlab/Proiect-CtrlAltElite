import eventModel from "@/database/models/event";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, description, date, location, group, organiser } = req.body;

  const event = new eventModel({
    name,
    description,
    date,
    location,
    group,
    organiser,
  });

  await event.save();

  return res.status(200).json(event);
}
