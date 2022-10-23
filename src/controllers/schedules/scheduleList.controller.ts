import { Request, Response } from "express";
import scheduleListService from "../../services/schedules/scheduleList.service";

const scheduleListController = async (req: Request, res: Response) => {
    const { id } = req.params

    const output = await scheduleListService(id)

    return res.status(200).json(output)
}

export default scheduleListController