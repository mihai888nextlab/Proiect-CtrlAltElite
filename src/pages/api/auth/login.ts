import connectDB from "@/database/connectDB";
import userModel from "@/database/models/users";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  let user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "Email or password are incorrect!" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(404).json({ error: "Email or password are incorrect!" });
  }

  const token = jwt.sign(
    { _id: user._id, email, password: user.password },
    process.env.JWT_SECRET || ""
  );
  res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=3600`);
  return res.status(200).json({ message: "User logged in successfully" });
}
