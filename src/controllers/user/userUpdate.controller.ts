import { Request, Response } from "express";
import userUpdateService from "../../services/user/userUpdate.service";

const userUpdateController = async (req: Request, res: Response) => {
    const update = req.body
    const { id } = req.params

    const user = await userUpdateService(update, id)

    return res.status(200).json(user);
}

export default userUpdateController