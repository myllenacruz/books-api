import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { Server as HttpServer } from "http";
import morgan from "morgan";
import cors from "cors";
import { AppError } from "@shared/errors/AppError";

(async () => {
	await import("@shared/container");
	await import("@shared/database");
})();

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

/**
 * Global Exception Handler Middleware
 */
app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			status: "error",
			message: error.message
		});
	}

	return response.status(500).json({
		status: "error",
		message: `Internal Server Error: ${error}`
	});
});

export { server };
