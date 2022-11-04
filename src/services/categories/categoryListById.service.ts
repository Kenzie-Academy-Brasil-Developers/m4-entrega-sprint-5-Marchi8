import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entities";
import { AppError } from "../../errors/appError";

const categoryListByIdService = async (id: string): Promise<Categories> => {
    const categoryRepository = AppDataSource.getRepository(Categories)

    const category = await categoryRepository.findOne({
        where: {
            id: id
        },
        relations: {
            properties: true
        },
    })

    if (!category) {
        throw new AppError("Id Not Found", 404)
    }

    return category
}

export default categoryListByIdService