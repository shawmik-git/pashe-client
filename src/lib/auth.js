import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

// Reuse one connection across hot reloads and serverless invocations.
const client = (globalThis._pasheMongo ??= new MongoClient(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"));
const db = client.db(process.env.DB_NAME || "pashe");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true, minPasswordLength: 6 },
  socialProviders: {
    github: { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET },
  },
  plugins: [jwt(), nextCookies()], // jwt(): exposes /api/auth/token and /api/auth/jwks
});
