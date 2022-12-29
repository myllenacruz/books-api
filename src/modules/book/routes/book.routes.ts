import { Router } from "express";
import { BookController } from "@modules/book/controllers/BookController";
import { Joi, Segments, celebrate } from "celebrate";
import { pagination } from "@modules/pagination/middlewares/pagination";

const routes = Router();
const bookController = new BookController();

routes.post("/",
	celebrate({
		[Segments.BODY]: {
			sbn: Joi.string().min(17).max(17).required(),
			name: Joi.string().min(5).required(),
			description: Joi.string().min(20).max(255).required(),
			stock_quantity: Joi.number().min(1).required(),
			author: Joi.string().required()
		}
	}),
	bookController.create
);

routes.get("/",
	pagination,
	bookController.list
);

export default routes;
