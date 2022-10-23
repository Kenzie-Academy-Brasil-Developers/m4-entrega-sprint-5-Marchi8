import { Request, Response } from "express";
import userCreateService from "../../services/user/userCreate.service";

const userCreateController = async (req: Request, res: Response) => {
    const { name, email, password, isAdm } = req.body

    const newUser = await userCreateService({ name, email, password, isAdm })

    return res.status(201).send(newUser)
}

export default userCreateController