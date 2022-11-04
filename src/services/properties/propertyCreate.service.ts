import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entities";
import { Categories } from "../../entities/categories.entities";
import { Properties } from "../../entities/properties.entities";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";

const propertyCreateService = async ({ size, value, address, categoryId }: IPropertyRequest): Promise<Properties> => {
    const propertiesRepository = AppDataSource.getRepository(Properties)
    const addressRepository = AppDataSource.getRepository(Addresses)
    const categoryRepository = AppDataSource.getRepository(Categories)

    const addresses = await addressRepository.find()
    const categories = await categoryRepository.find()

    const checkCategoryId = categories.find(category => category.id === categoryId)
    const checkAddress = addresses.find(address => address.number === address.number)

    if (address.zipCode.length > 8) {
        throw new AppError("Invalid ZipCode", 400)
    }

    if (address.state.length > 2) {
        throw new AppError("Invalid State", 400)
    }

    if (!checkCategoryId) {
        throw new AppError("Invalid Category Id", 404)
    }

    if (checkAddress) {
        throw new AppError("Address Already Exists", 400)
    }

    const newAddress = addressRepository.create({
        city: address.city,
        district: address.district,
        state: address.state,
        zipCode: address.zipCode,
        number: address.number
    })

    await addressRepository.save(newAddress)

    const newProperty = propertiesRepository.create({
        size: size,
        value: value,
        address: newAddress,
        category: {
            id: checkCategoryId.id,
            name: checkCategoryId.name,
        }
    })

    await propertiesRepository.save(newProperty)

    return newProperty
}

export default propertyCreateService