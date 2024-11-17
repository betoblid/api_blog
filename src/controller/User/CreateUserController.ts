import { Request, Response } from "express";
import { RequestPayloadRegister } from "../../@types/RequestPayloadRegister.type";
import { CreateUserService } from "../../service/User/CreateUserService";



export class CreateUserController {

    async handler(req: Request<{}, {}, RequestPayloadRegister>, res: Response) {

        const { email, name, password } = req.body; // pegando o payload do usuário

        //instanciando a class create user
        const RegisterUser = new CreateUserService();

        //chamando a camada de serviços, passando o payload como params para criar novo usuário no banco
        const user = await RegisterUser.execute({ email, name, password });

        res.status(user.status).json(user);
    }
}