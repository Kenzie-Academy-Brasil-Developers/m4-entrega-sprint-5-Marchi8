import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entities";
import { AppError } from "../../errors/appError";

const scheduleListService = async (id: string): Promise<Properties>  => {
    const propertiesRepository = AppDataSource.getRepository(Properties)

    const property = await propertiesRepository.findOne({
        where: {
            id: id
        },
        relations: {
            schedules: { user: true },
        },
    })

    if (!property) {
        throw new AppError("Property Not Found", 404)
    }

    return property
}

export default scheduleListService