import { prisma } from "../../prisma";


export class detailUserService{
    async execute(id: string) {

        const InfoUser = await prisma.user.findMany({
            where: {
                id: id
            },
            select: {
                name: true,
                id: true,
                perfil_photo: true,
                bio_content: true,
                banner_photo: true,
                created_at: true,
                updated_at: true,
                posts: { // adicionando os posts
                    select: {
                        banner_url: true,
                        content: true,
                        id: true,
                        published: true,
                        date_public: true,
                        title: true,
                        user: { // adicionando o user 
                            select: {
                                name: true,
                                id: true,
                                perfil_photo: true,
                            }
                        }
                    }
                }
            }
        })

        return InfoUser
    }
}