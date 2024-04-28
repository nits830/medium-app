import dotenv from "dotenv";
import express from "express";
import { PrismaClient } from "@prisma/client";
import userSchema from "./models/zod_schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticateToken from "../src/middlewares/authenticateToken";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Site in progress");
});

// Sign up route
app.post("/api/v1/signup", async (req, res) => {
  const saltRoundsString = process.env.SALT_ROUNDS;
  if (!saltRoundsString) {
    throw new Error("SALT_ROUNDS environment variable is not defined");
  }
  const saltRounds = parseInt(saltRoundsString);
  if (isNaN(saltRounds)) {
    throw new Error("Invalid value for SALT_ROUNDS environment variable");
  }

  const payload = req.body;
  const validatedUser = userSchema.safeParse(payload);
  if (validatedUser.success) {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

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
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret is not defined" });
      }
      const token = jwt.sign(
        { userId: user.id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    } else {
      res.status(401).send("Invalid password");
    }
  } catch (error) {
    res.status(500).send("Error logging in");
  } finally {
    await prisma.$disconnect();
  }
});

// Logout Route

app.post("/logout", (req, res) => {
  res.clearCookie("jwtToken");
  res.status(200).json({ message: "Logout successful" });
});

// Test Protected Route
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "You have accessed the protected resource" });
});

// POST ROUTES

app.post("/posts", authenticateToken, async (req, res) => {
  const authorId = req.body.author.userId;

  const { title, description } = req.body;
  const prisma = new PrismaClient();
  try {
    const user = await prisma.post.create({
      data: {
        title: title,
        description: description,
        published: true,
        authorId: authorId,
      },
    });
    res.status(200).json({ msg: "Post Created" });
  } catch (error) {
    res.status(400).json({ msg: "Error Creating Post" });
  } finally {
    await prisma.$disconnect();
  }
});

// Get Post route
app.get("/posts", authenticateToken, async (req, res) => {
  const authorId = req.body.id;
  const prisma = new PrismaClient();
  try {
    const posts = await prisma.post.findMany({
      where: {
        author: {
          id: authorId,
        },
      },
    });

    if (!posts) {
      return res.status(400).send(" User has not posted anything");
    } else {
      res.status(200).send(posts);
    }
  } catch (error) {
    res.status(404).send("Not found");
  } finally {
    await prisma.$disconnect();
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening `);
});
