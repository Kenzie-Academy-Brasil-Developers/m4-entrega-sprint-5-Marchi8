import { Router } from "express";
import propertyCreateController from "../controllers/properties/propertyCreate.controller";
import propertyListController from "../controllers/properties/propertyList.controller";
import ensureauthToken from "../middlewares/ensureAuthToken.middleware";
import ensureIsAdm from "../middlewares/ensureIsAdm.middleware";

const routes = Router()

export const propertiesRoutes = () => {
    routes.post("", ensureauthToken, ensureIsAdm, propertyCreateController)
    routes.get("", propertyListController)

    return routes
}