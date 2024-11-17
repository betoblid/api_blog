import { Request, Response } from "express";
import { detailUserService } from "../../service/User/detailUserService";


export class detailUserController{
    async handler(req: Request, res: Response) {


        //pegando o ID na request
        const id = req.user_id

        if(!id){
            res.status(200).json({content: "Forneça um Token válido..."})
            return
        }

        //instanciando camada de serviço
        const detailUser = new detailUserService()

        //usando a camada de serviço
        const InfoUser = await detailUser.execute(id)

        res.status(200).json(InfoUser)
    }
}