import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entities";
import { AppError } from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";

const categoryCreateService = async ({ name }: ICategoryRequest) => {
    const categoryRepository = AppDataSource.getRepository(Categories)

    const categories = await categoryRepository.find()

    const categoryAlreadyExists = categories.find(category => category.name === name)

    if (categoryAlreadyExists) {
        throw new AppError("Category Already Exists", 400)
    }


    const categoryCreate = categoryRepository.create({
        name: name
    })
    await categoryRepository.save(categoryCreate)

    return categoryCreate
}

export default categoryCreateService