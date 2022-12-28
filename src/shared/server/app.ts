import "dotenv/config";
import express from "express";
import { Server as HttpServer } from "http";

const app = express();
const server = new HttpServer(app);

/**
 * JSON Middleware
 */
app.use(express.json());

export { server };