import { Request, Response } from "express";
import { RequestPayloadUpdateRegister } from "../../@types/RequestPayloadUpdateRegister.type";
import { UpdateUserService } from "../../service/User/UpdateUserService";



export class UpdateUserController {

    async handler(req: Request<{}, {}, RequestPayloadUpdateRegister>, res: Response) {

        //pegando o id do user
        const id_user = req.user_id
        // pegando o body
        const { banner_photo, bio_content, name, perfil_photo } = req.body

        //fazer um object com que será atualizado
        const data = {
            id_user,
            banner_photo: banner_photo ? banner_photo : "",
            bio_content: bio_content ? bio_content : "",
            name: name ? name : "",
            perfil_photo: perfil_photo ? perfil_photo : ""
        } 

        const UpdateUser = new UpdateUserService()

        const user = await UpdateUser.execute(data)

        res.json(user)
    }
}