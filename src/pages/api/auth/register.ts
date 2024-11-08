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
  const { fullName, username, email, password } = req.body;

  if (!fullName || !username || !email || !password) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  let search = await userModel.find({ email });

  if (search.length > 0) {
    return res.status(409).json({ error: "Email already exists" });
  }

  search = await userModel.find({ username });

  if (search.length > 0) {
    return res.status(409).json({ error: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new userModel({
    fullName,
    username,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    const token = jwt.sign(
      { _id: user._id, email, password: hashedPassword },
      process.env.JWT_SECRET || ""
    );
    res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=3600`
    );
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
