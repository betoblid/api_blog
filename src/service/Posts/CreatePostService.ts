import { RequestPayloadPost } from "../../@types/RequestPayloadCreatePost.type";
import { prisma } from "../../prisma";

//reutilizando um type existente
interface ExtendeRequestPayloadPost extends RequestPayloadPost {
    id_user: string
}

export class CreatePostService {
    async execute({ banner_url, content, title, id_user }: ExtendeRequestPayloadPost) {

        //consulta no banco se existe um post criado com o mesmo conteúdo
        const VerifyConentPosts = await prisma.post.findFirst({
            where: {
                AND: [
                    {title},
                    {content}
                ]
            }
        });

        //retorna um erro caso exista já um post com esse conteúdo
        if (VerifyConentPosts) {
            return {
                status: 409, //409 Conflict "post já existe"
                content: "Já existe um post cadastrado com esse título e conteúdo..."
            }
        } else {
            try {
                const CreatePost = await prisma.post.create({
                    data: {
                        banner_url: banner_url,
                        content: content,
                        title: title,
                        authorId: id_user,
                    }
                });

                return {
                    status: 201,
                    message: "Post criado com sucesso...",
                    content: CreatePost
                }

            } catch (err) {
                return {
                    status: 400,
                    content: "Não foi possivel criar o Post..."
                }
            }
        }
    }

}