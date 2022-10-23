import { Request, Response } from "express";
import categoryListByIdService from "../../services/categories/categoryListById.service";

const categoryListByIdController = async (req: Request, res: Response) => {
    const { id } = req.params

    const category = await categoryListByIdService(id)

    return res.status(200).json(category)
}

export default categoryListByIdController