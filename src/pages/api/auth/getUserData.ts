import connectDB from "@/database/connectDB";
import userModel from "@/database/models/users";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tokenData } = req.body;

  if (!tokenData) {
    return res.status(422).json({ error: "Invalid token" });
  }

  let data = jwt.verify(tokenData, process.env.JWT_SECRET || "");
  let uncodedData = JSON.parse(data ? JSON.stringify(data) : "{}");

  if (!uncodedData) {
    return res.status(422).json({ error: "Invalid token" });
  }

  let user = await userModel.findOne({
    email: uncodedData.email,
    password: uncodedData.password,
    _id: uncodedData._id,
  });

  if (!user) {
    return res.status(422).json({ error: "Invalid token" });
  }

  return res.status(200).json(user);
}
