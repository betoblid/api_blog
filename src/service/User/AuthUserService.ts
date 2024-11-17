import { compare } from "bcryptjs";
import { RequestPayloadAuth } from "../../@types/RequestPayloadAuth.type";
import { prisma } from "../../prisma";
import { sign } from "jsonwebtoken";
import { env } from "../../config/env";



export class AuthUserService {

    async execute({ email, password }: RequestPayloadAuth) {

        //consulta se existe um registro desse e-mail no banco
        const RegisterUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        // verificar se usuário não existe..
        if (!RegisterUser) {
            return {
                status: 404, //404 Not Found. "usuário não encontrado"
                content: "Usuário não encontrado..."
            }
        };

        //comparar o password do Payload com o que existe no banco
        const ComparePassword = await compare(password, RegisterUser.password);

        //Validar se a comparação foi sucess..
        if (!ComparePassword) {
            return {
                status: 401, //401 Unauthorized. "usuário forneceu credenciais inválidas"
                content: "Senha incorreta..."
            }
        };
        //Criar um JWT
        const Token = sign({
            name: RegisterUser.name,
            id: RegisterUser.id
        },
            env.SECRET_JWT,
            {
                subject: RegisterUser.id,
                expiresIn: "1d"
            }
        );

        //Return para o controller se tudo for sucess...
        return {
            status: 200,
            content: Token
        };
    }
}