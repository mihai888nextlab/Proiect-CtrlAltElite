import connectDB from "@/database/connectDB";
import communityModel from "@/database/models/communities";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let communities = await communityModel.find();

  return res.status(200).json(communities);
}
