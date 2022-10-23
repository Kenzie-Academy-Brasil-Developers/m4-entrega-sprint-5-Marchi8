import { Router } from "express";
import userCreateController from "../controllers/user/userCreate.controller";
import userDeleteController from "../controllers/user/userDelete.controller";
import userListController from "../controllers/user/userList.controller";
import userUpdateController from "../controllers/user/userUpdate.controller";
import ensureauthToken from "../middlewares/ensureAuthToken.middleware";
import ensureIsActive from "../middlewares/ensureIsActive.middleware";
import ensureIsAdm from "../middlewares/ensureIsAdm.middleware";
import ensureUpdate from "../middlewares/ensureUpdate.middleware";


const routes = Router()

export const userRoutes = () => {
    routes.post("", userCreateController)
    routes.get("", ensureauthToken, ensureIsAdm, userListController)
    routes.delete("/:id", ensureauthToken, ensureIsAdm, ensureIsActive, userDeleteController)
    routes.patch("/:id", ensureauthToken, ensureIsActive, ensureUpdate, userUpdateController)

    return routes
}