import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entities";

const propertyListService = async (): Promise<Properties[]> => {
    const propertyRepository = AppDataSource.getRepository(Properties)

    const property = await propertyRepository.find()

    return property
}

export default propertyListService