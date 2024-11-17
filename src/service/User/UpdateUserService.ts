import { RequestPayloadUpdateRegister } from "../../@types/RequestPayloadUpdateRegister.type";
import { prisma } from "../../prisma";

// Tipagem para os parâmetros de entrada, estendendo a interface RequestPayloadUpdateRegister
interface UpdateUserProps extends RequestPayloadUpdateRegister {
  id_user: string;
}

export class UpdateUserService {
  async execute({
    banner_photo,
    bio_content,
    name,
    perfil_photo,
    id_user,
  }: UpdateUserProps) {
    // Buscar o usuário pelo ID
    const user = await prisma.user.findUnique({
      where: { id: id_user },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

     // Construir dinamicamente o objeto de atualização
     /*const updateData = {
        banner_photo: banner_photo ?? user.banner_photo,  // Se não enviar banner_photo, usa o valor atual
        bio_content: bio_content ?? user.bio_content,  // Se não enviar bio_content, usa o valor atual
        name: name ?? user.name,  // Se não enviar name, usa o valor atual
        perfil_photo: perfil_photo ?? user.perfil_photo,  // Se não enviar perfil_photo, usa o valor atual
      }; */
      

    // Atualizar o usuário com os campos presentes no objeto
    const updatedUser = await prisma.user.update({
      where: {
        id: id_user,
      },
      data: {
        banner_photo: banner_photo ? {set: banner_photo } : user.banner_photo,  // Se não enviar banner_photo, usa o valor atual
        bio_content: bio_content ? {set: bio_content} : user.bio_content,  // Se não enviar bio_content, usa o valor atual
        name: name ? {set: name as string} : user.name,
        perfil_photo: perfil_photo ?{ set: perfil_photo} : user.perfil_photo,  // Se não enviar perfil_photo, usa o valor atual
      },
    });

    return updatedUser;
  }
}
