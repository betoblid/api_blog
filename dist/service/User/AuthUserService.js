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
exports.AuthUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../../prisma");
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("../../config/env");
class AuthUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            //consulta se existe um registro desse e-mail no banco
            const RegisterUser = yield prisma_1.prisma.user.findFirst({
                where: {
                    email: email
                }
            });
            // verificar se usuário não existe..
            if (!RegisterUser) {
                return {
                    status: 404, //404 Not Found. "usuário não encontrado"
                    content: "Usuário não encontrado..."
                };
            }
            ;
            //comparar o password do Payload com o que existe no banco
            const ComparePassword = yield (0, bcryptjs_1.compare)(password, RegisterUser.password);
            //Validar se a comparação foi sucess..
            if (!ComparePassword) {
                return {
                    status: 401, //401 Unauthorized. "usuário forneceu credenciais inválidas"
                    content: "Senha incorreta..."
                };
            }
            ;
            //Criar um JWT
            const Token = (0, jsonwebtoken_1.sign)({
                name: RegisterUser.name,
                id: RegisterUser.id
            }, env_1.env.SECRET_JWT, {
                subject: RegisterUser.id,
                expiresIn: "1d"
            });
            //Return para o controller se tudo for sucess...
            return {
                status: 200,
                content: Token
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
