import { Request, Response } from "express";
import categoryListService from "../../services/categories/categoryList.service";

const categoryListController = async (req: Request, res: Response) => {
    const category = await categoryListService()

    return res.status(200).json(category)
}

export default categoryListController