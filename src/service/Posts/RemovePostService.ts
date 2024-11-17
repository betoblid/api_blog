
import { prisma } from "../../prisma";


export class RemovePostService {
    async execute(id_post: string) {


        try {

            const Post = await prisma.post.findUnique({ where: { id: id_post } })

            // Verificar se existe Post
            if (!Post) {
                return {
                    status: 404,
                    content: "Não foi possivel remove post"
                }
            }
            // Remover post
            await prisma.post.delete({
                where: {
                    id: id_post
                }
            })
            // Remoção bem-sucedida, sem corpo na resposta
            return {
                status: 201,
                content: "Post removido com sucesso..."
            }

        } catch (err) {
            // caso de erro
            return {
                status: 500,
                content: "Não foi possivel remove post"
            }
        }


    }
}