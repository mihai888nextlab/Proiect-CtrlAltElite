import connectDB from "@/database/connectDB";
import communityModel from "@/database/models/communities";
import userModel from "@/database/models/users";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { communityId, user } = req.body;

  let communities = await communityModel.find({ _id: communityId });

  if (communities.length === 0) {
    return res.status(404).json({ error: "Community not found" });
  }

  const userCommunities = user.communities || [];

  if (userCommunities.includes(communityId)) {
    return res.status(409).json({ error: "User already in community" });
  }

  userCommunities.push(communityId);

  await userModel.updateOne(
    { _id: user._id, email: user.email, password: user.password },
    { communities: userCommunities }
  );

  return res.status(200).json(communities);
}
