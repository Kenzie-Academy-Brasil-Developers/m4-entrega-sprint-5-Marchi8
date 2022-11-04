import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entities";
import { Schedules } from "../../entities/schedules.entities";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const scheduleCreateService = async ({ date, hour, propertyId, userId }: IScheduleRequest): Promise<Schedules> => {
    const userRepository = AppDataSource.getRepository(User)
    const propertyRepository = AppDataSource.getRepository(Properties)
    const scheduleRepository = AppDataSource.getRepository(Schedules)

    const user = await userRepository.findOneBy({ id: userId })
    const property = await propertyRepository.findOneBy({ id: propertyId })
    const schedule = await scheduleRepository.find()
    const checkSchedule = schedule.find(schedule => schedule)
    const dateFormater = new Date(date);

    if (dateFormater.getDay() === 0 || dateFormater.getDay() === 6) {
        throw new AppError("Invalid date", 400);
    }

    if (parseInt(hour) < 8 || parseInt(hour) > 18) {
        throw new AppError("Invalid hour", 400);
    }

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