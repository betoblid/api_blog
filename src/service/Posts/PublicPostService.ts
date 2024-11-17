import { prisma } from "../../prisma"

export class PublicPostService {
    async execute(id_post: string) {

        try {

            //consulta o Post do id passado
            const Post = await prisma.post.update({
                where: {
                    id: id_post
                },
                data: {
                    published: true
                }
            })
            return {
                status: 200,
                content: Post
            }

        } catch (err) {

            return {
                status: 404, // Not Fold "não existe esse post"
                content: err
            }
        }
    }
}