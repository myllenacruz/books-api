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

routes.get("/:id",
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().required()
		}
	}),
	bookController.listOne
);

routes.put("/:id",
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().required()
		},
		[Segments.BODY]: {
			name: Joi.string().min(5).required(),
			description: Joi.string().min(20).max(255).required(),
			stock_quantity: Joi.number().min(1).required(),
			author: Joi.string().required()
		}
	}),
	bookController.update
);

export default routes;
