import { Request, Response } from "express";
import { RequestPayloadPost } from "../../@types/RequestPayloadCreatePost.type";
import { CreatePostService } from "../../service/Posts/CreatePostService";




export class CreatePostController {
    async handler(req: Request<{},{}, RequestPayloadPost>, res: Response){

        //pegando o id do usuário
        const id_user = req.user_id
        // pegando o body
        const { banner_url, content, title } = req.body;

        const CreatePost = new CreatePostService()

        const post = await CreatePost.execute({ banner_url, content, title, id_user })

        res.status(post.status).json(post)

    }
}