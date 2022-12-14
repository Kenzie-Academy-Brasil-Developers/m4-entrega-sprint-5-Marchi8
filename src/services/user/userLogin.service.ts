import { IUserLogin } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../../errors/appError";

const userLoginService = async ({ email, password }: IUserLogin): Promise<string> => {
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.findOneBy({ email: email })

    if (!users) {
        throw new AppError("Wrong email/password", 403)
    }
    const passwordMatch = await compare(password, users.password)

    if (!passwordMatch) {
        throw new AppError("Wrong email/password", 403)
    }

    const token = jwt.sign({ isAdm: users.isAdm }, String(process.env.JWT_SECRET) as string, {
        expiresIn: "1d"
    })

    return token
}

export default userLoginService