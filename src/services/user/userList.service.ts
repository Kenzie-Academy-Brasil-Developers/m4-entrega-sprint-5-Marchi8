import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";


const userListService = async (): Promise<object> => {
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const hidePassword = users.map((user) => {
        const userAtributes = {
            name: user.name,
            email: user.email,
            isAdm: user.isAdm,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            id: user.id,
        }

        return userAtributes
    })

    return hidePassword
}

export default userListService