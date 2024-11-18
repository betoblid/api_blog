"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserService = void 0;
const prisma_1 = require("../../prisma");
class UpdateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ banner_photo, bio_content, name, perfil_photo, id_user, }) {
            // Buscar o usuário pelo ID
            const user = yield prisma_1.prisma.user.findUnique({
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
            const updatedUser = yield prisma_1.prisma.user.update({
                where: {
                    id: id_user,
                },
                data: {
                    banner_photo: banner_photo ? { set: banner_photo } : user.banner_photo, // Se não enviar banner_photo, usa o valor atual
                    bio_content: bio_content ? { set: bio_content } : user.bio_content, // Se não enviar bio_content, usa o valor atual
                    name: name ? { set: name } : user.name,
                    perfil_photo: perfil_photo ? { set: perfil_photo } : user.perfil_photo, // Se não enviar perfil_photo, usa o valor atual
                },
            });
            return updatedUser;
        });
    }
}
exports.UpdateUserService = UpdateUserService;
