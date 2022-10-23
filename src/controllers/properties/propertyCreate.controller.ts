import { Request, Response } from "express";
import propertyCreateService from "../../services/properties/propertyCreate.service";

const propertyCreateController = async (req: Request, res: Response) => {
    const { size, value, address, categoryId } = req.body

    const property = await propertyCreateService({ size, value, address, categoryId })

    return res.status(201).json(property)
}

export default propertyCreateController