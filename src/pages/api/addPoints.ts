import connectDB from "@/database/connectDB";
import communityModel from "@/database/models/communities";
import userModel from "@/database/models/users";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { points, user } = req.body;

  let userData = await userModel.find({
    _id: user._id,
  });

  if (userData.length === 0) {
    return res.status(404).json({ error: "Community not found" });
  }

  let userPoints = user.points || 0;

  userPoints += points;

  let pointsHistory = user.pointsHistory || [];

  pointsHistory.push({ points, date: new Date() });

  await userModel.updateOne(
    { _id: user._id },
    { points: userPoints, pointsHistory }
  );

  console.log(user);

  return res.status(200).json(user);
}
