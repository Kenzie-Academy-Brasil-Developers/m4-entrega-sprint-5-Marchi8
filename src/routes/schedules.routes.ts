import { Router } from "express";
import scheduleCreateController from "../controllers/schedules/scheduleCreate.controller";
import scheduleListController from "../controllers/schedules/scheduleList.controller";
import ensureauthToken from "../middlewares/ensureAuthToken.middleware";
import ensureIsAdm from "../middlewares/ensureIsAdm.middleware";

const routes = Router()

export const schedulesRoutes = () => {
    routes.post("", ensureauthToken, scheduleCreateController)
    routes.get("/properties/:id", ensureauthToken, ensureIsAdm, scheduleListController)

    return routes
}