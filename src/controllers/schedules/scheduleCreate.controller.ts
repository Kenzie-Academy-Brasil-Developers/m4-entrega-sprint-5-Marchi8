import { Request, Response } from "express";
import scheduleCreateService from "../../services/schedules/scheduleCreate.service";

const scheduleCreateController = async (req: Request, res: Response) => {
    const { date, hour, propertyId, userId } = req.body

    const schedule = await scheduleCreateService({ date, hour, propertyId, userId })

    return res.status(201).json({ message: schedule })
}

export default scheduleCreateController