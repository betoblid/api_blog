import { Request, Response } from "express";
import { RequestPayloadPublicPost } from "../../@types/RequestPayloadPublicPost.type";
import { ParsedQs } from "qs";
import { PublicPostService } from "../../service/Posts/PublicPostService";

//para tirar o Query use esse trexo "& ParsedQs"
export class PublicPostController {
    async handler(
        req: Request<{}, {}, {}, RequestPayloadPublicPost & ParsedQs>,
        res: Response
    ) {
        // pegar id do post
        const id = req.query.id_post
        //instancia a camada do serviço
        const updatePost = new PublicPostService()
        //executar  camada do serviço
        const Post = await updatePost.execute(id)
        
        res.status(Post.status).json(Post)
    }
}