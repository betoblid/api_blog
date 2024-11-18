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
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../service/User/CreateUserService");
class CreateUserController {
    handler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, password } = req.body; // pegando o payload do usuário
            //instanciando a class create user
            const RegisterUser = new CreateUserService_1.CreateUserService();
            //chamando a camada de serviços, passando o payload como params para criar novo usuário no banco
            const user = yield RegisterUser.execute({ email, name, password });
            res.status(user.status).json(user);
        });
    }
}
exports.CreateUserController = CreateUserController;
