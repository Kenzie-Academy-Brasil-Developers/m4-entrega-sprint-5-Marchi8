import { Router } from "express";
import categoryCreateController from "../controllers/categories/categoryCreate.controller";
import categoryListController from "../controllers/categories/categoryList.controller";
import categoryListByIdController from "../controllers/categories/categoryListById.controller";
import ensureauthToken from "../middlewares/ensureAuthToken.middleware";
import ensureIsAdm from "../middlewares/ensureIsAdm.middleware";

const routes = Router()

export const categoriesRoutes = () => {
    routes.post("", ensureauthToken, ensureIsAdm, categoryCreateController)
    routes.get("/", categoryListController)
    routes.get("/:id/properties", categoryListByIdController)

    return routes
}