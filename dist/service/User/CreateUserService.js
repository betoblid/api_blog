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
exports.CreateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../../prisma");
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, name, password }) {
            //Procurar no banco se esse e-mail existe
            const VerifyUserExiste = yield prisma_1.prisma.user.findFirst({
                where: {
                    email: email
                }
            });
            //se existir retorne uma mensagem de erro 
            if (VerifyUserExiste) {
                return {
                    status: 409,
                    content: "Usuário já cadastrado..."
                };
            }
            //criptografar senha
            const PasswordHash = yield (0, bcryptjs_1.hash)(password, 10);
            //criar usuário no banco 
            const RegisterUser = yield prisma_1.prisma.user.create({
                data: {
                    email,
                    name,
                    password: PasswordHash
                },
                select: {
                    id: true,
                    name: true
                }
            });
            return {
                status: 201,
                content: RegisterUser
            };
        });
    }
}
exports.CreateUserService = CreateUserService;
