import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entities";
import { Schedules } from "../../entities/schedules.entities";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const scheduleCreateService = async ({ date, hour, propertyId, userId }: IScheduleRequest) => {
    const userRepository = AppDataSource.getRepository(User)
    const propertyRepository = AppDataSource.getRepository(Properties)
    const scheduleRepository = AppDataSource.getRepository(Schedules)

    const user = await userRepository.findOneBy({ id: userId })
    const property = await propertyRepository.findOneBy({ id: propertyId })
    const schedule = await scheduleRepository.find()
    const checkSchedule = schedule.find(schedule => schedule)

    if (!property) {
        throw new AppError("Property Not Found", 404)
    }

    if (checkSchedule) {
        throw new AppError("Schedule Alredy Exists", 400)
    }

    if (!user) {
        throw new AppError("User Not Found", 404)
    }

    const newSchedule = scheduleRepository.create({
        date: date,
        hour: hour,
        property: property,
        user: user,
    });

    await scheduleRepository.save(newSchedule)

    return newSchedule
}

export default scheduleCreateService