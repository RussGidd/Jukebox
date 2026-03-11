import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByUsername } from "#db/queries/users";

const usersRouter = express.Router();

usersRouter.post("/register", async function (request, response, next) {
  try {
    const username = request.body?.username?.trim();
    const password = request.body?.password;

    if (!username || !password) {
      return response
        .status(400)
        .send({ error: "Username and password are required." });
    }

    const existingUser = await getUserByUsername(username);

    if (existingUser) {
      return response.status(400).send({ error: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashedPassword);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret");

    response.status(201).send(token);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async function (request, response, next) {
  try {
    const username = request.body?.username?.trim();
    const password = request.body?.password;

    if (!username || !password) {
      return response
        .status(400)
        .send({ error: "Username and password are required." });
    }

    const user = await getUserByUsername(username);

    if (!user) {
      return response.status(401).send({ error: "Invalid credentials." });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return response.status(401).send({ error: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret");

    response.send(token);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
