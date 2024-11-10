import connectDB from "@/database/connectDB";
import eventModel from "@/database/models/event";
import userModel from "@/database/models/users";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId, user } = req.body;

  let events = await eventModel.find({ _id: eventId });

  if (events.length === 0) {
    return res.status(404).json({ error: "Event not found" });
  }

  let userEvents = user.events || [];

  userEvents = userEvents.filter((event: string) => event !== eventId);

  await userModel.updateOne(
    { _id: user._id, email: user.email, password: user.password },
    { events: userEvents }
  );

  await eventModel.updateOne(
    { _id: eventId },
    { members: events[0].members - 1 }
  );

  return res.status(200).json(events);
}
