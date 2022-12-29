import { Router } from "express";
import bookRoutes from "@modules/book/routes/book.routes";

const routes = Router();

routes.use("/book", bookRoutes);

export { routes };
