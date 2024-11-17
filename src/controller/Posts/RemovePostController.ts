import { Request, Response } from "express";
import { ParsedQs } from "qs";
import { RequestPayloadPublicPost } from "../../@types/RequestPayloadPublicPost.type";
import { RemovePostService } from "../../service/Posts/RemovePostService";

export class RemovePostController {
    async handler(
        req: Request<{}, {}, {}, RequestPayloadPublicPost & ParsedQs>,
        res: Response) {


            //pegando o id do post
            const { id_post } = req.query

            //instanciando camada de serviço
            const RemovePost = new RemovePostService()

            //executando camanda de serviço
            const post = await RemovePost.execute(id_post)

            res.status(post.status).json(post)
    }
}