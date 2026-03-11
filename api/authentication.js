import jwt from "jsonwebtoken";
import { getUserById } from "#db/queries/users";

export async function requireUser(request, response, next) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response.status(401).send({ error: "Unauthorized." });
    }

    const token = authHeader.slice(7);
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET || "secret");

    const user = await getUserById(tokenPayload.id);

    if (!user) {
      return response.status(401).send({ error: "Unauthorized." });
    }

    request.user = user;
    next();
  } catch (error) {
    return response.status(401).send({ error: "Unauthorized." });
  }
}
