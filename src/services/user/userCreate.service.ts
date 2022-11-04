import AppDataSource from "../../data-source";
import { IUserRequest } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import bcrypt from "bcryptjs";
import { AppError } from "../../errors/appError";

const userCreateService = async ({ name, email, password, isAdm }: IUserRequest): Promise<object> => {
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const emailAlreadyExists = users.find(user => user.email === email)

    if (emailAlreadyExists) {
        throw new AppError("Email Already Exists", 400)
    }

    const user = new User()
    user.name = name;
    user.email = email;
    user.password = bcrypt.hashSync(password, 10);
    user.isAdm = isAdm;
    user.isActive = true;

    userRepository.create(user)
    await userRepository.save(user)

    return { ...user, password: undefined }
};

export default userCreateService