import { Request, Response } from "express";
import propertyListService from "../../services/properties/propertyList.service";

const propertyListController = async (req: Request, res: Response) => {
    const property = await propertyListService()

    return res.status(200).json(property)
}

export default propertyListController