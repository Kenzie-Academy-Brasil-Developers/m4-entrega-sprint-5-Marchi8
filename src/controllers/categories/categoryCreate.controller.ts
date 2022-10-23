import { Request, Response } from "express";
import { ICategoryRequest } from "../../interfaces/categories";
import categoryCreateService from "../../services/categories/categoryCreate.service";

const categoryCreateController = async (req: Request, res: Response) => {
    const { name }: ICategoryRequest = req.body

    const category = await categoryCreateService({name})

    return res.status(201).json(category)
}

export default categoryCreateController