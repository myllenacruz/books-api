import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { Server as HttpServer } from "http";
import morgan from "morgan";
import cors from "cors";
import { AppError } from "@shared/errors/AppError";
import { errors } from "celebrate";
import { routes } from "@shared/server/routes";
import basicAtuh from "express-basic-auth";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger.json";

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

app.use("/api", routes);

/**
 * Documentação
 */
app.use("/api-docs", basicAtuh({
	challenge: true,
	users: {
		dev: "dev"
	}
}), swaggerUi.serve,
swaggerUi.setup(swaggerDoc),
express.static("src/swagger.json")
);


/**
 * Celebrate Errors Middleware
 */
app.use(errors());

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
