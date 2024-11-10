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

  await fetch("http://localhost:3000/api/addPoints", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ points: 20, user: { _id: organiser } }),
  });

  return res.status(200).json(event);
}
