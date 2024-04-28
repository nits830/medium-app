import dotenv from "dotenv";
import express from "express";
import { PrismaClient } from "@prisma/client";
import userSchema from "./models/zod_schema";
import bcrypt from "bcryptjs";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Sign up route
app.post("/api/v1/signup", async (req, res) => {
  const payload = req.body;
  const validatedUser = userSchema.safeParse(payload);
  if (validatedUser.success) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const prisma = new PrismaClient();
    try {
      const user = await prisma.user.create({
        data: {
          name: req.body.name,
          password: hashedPassword,
          email: req.body.email,
        },
      });
      res.status(200).json({ msg: "User Created" });
    } catch (error) {
      res.status(400).json({ msg: "Error Creating User" });
    } finally {
      await prisma.$disconnect();
    }
  }
});

// Signin route

app.post("/api/v1/signin", async (req, res) => {
  const { email, password } = req.body;
  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid password");
    }
  } catch (error) {
    res.status(500).send("Error logging in");
  } finally {
    await prisma.$disconnect();
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening `);
});
