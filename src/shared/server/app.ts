import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { Server as HttpServer } from "http";
import morgan from "morgan";
import cors from "cors";

const app = express();
const server = new HttpServer(app);

/**
 * Disable HTTP header x-powered-by for security reasons
 */
app.disable("x-powered-by");

/**
 * HTTP Request Middlewares
 */
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(morgan("dev"));

/**
 * JSON Middleware
 */
app.use(express.json());

export { server };