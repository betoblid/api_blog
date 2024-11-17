import { hash } from "bcryptjs";
import { RequestPayloadRegister } from "../../@types/RequestPayloadRegister.type";
import { prisma } from "../../prisma";



export class CreateUserService {
    async execute({ email, name, password }: RequestPayloadRegister) {

        //Procurar no banco se esse e-mail existe
        const VerifyUserExiste = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        //se existir retorne uma mensagem de erro 
        if (VerifyUserExiste) {

           return {
                status: 409,
                content: "Usuário já cadastrado..."
            }
        }


        //criptografar senha
        const PasswordHash = await hash(password, 10)

        //criar usuário no banco 
        const RegisterUser = await prisma.user.create({
            data: {
                email,
                name,
                password: PasswordHash
            },
            select: {
                id: true,
                name: true
            }
        })
        return {
            status: 201,
            content: RegisterUser
        }
    }
}