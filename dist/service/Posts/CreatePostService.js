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
exports.CreatePostService = void 0;
const prisma_1 = require("../../prisma");
class CreatePostService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ banner_url, content, title, id_user }) {
            //consulta no banco se existe um post criado com o mesmo conteúdo
            const VerifyConentPosts = yield prisma_1.prisma.post.findFirst({
                where: {
                    AND: [
                        { title },
                        { content }
                    ]
                }
            });
            //retorna um erro caso exista já um post com esse conteúdo
            if (VerifyConentPosts) {
                return {
                    status: 409, //409 Conflict "post já existe"
                    content: "Já existe um post cadastrado com esse título e conteúdo..."
                };
            }
            else {
                try {
                    const CreatePost = yield prisma_1.prisma.post.create({
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
                    };
                }
                catch (err) {
                    return {
                        status: 400,
                        content: "Não foi possivel criar o Post..."
                    };
                }
            }
        });
    }
}
exports.CreatePostService = CreatePostService;
