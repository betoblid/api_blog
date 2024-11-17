import { Request, Response } from "express";
import { AuthUserService } from "../../service/User/AuthUserService";
import { RequestPayloadAuth } from "../../@types/RequestPayloadAuth.type";



export class AuthUserController{

    async handler(req: Request<{}, {}, RequestPayloadAuth>, res: Response){

        //pegando o body
        const { email, password } = req.body
        const AuthUser = new AuthUserService()

        // chamar camada de serviços 
        const Auth = await AuthUser.execute( { email, password } )
        
        //retorna para usuário o que a camada de serviço retornou...
        res.status(Auth.status).json(Auth)
    }
}