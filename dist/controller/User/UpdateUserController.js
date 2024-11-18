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
exports.UpdateUserController = void 0;
const UpdateUserService_1 = require("../../service/User/UpdateUserService");
class UpdateUserController {
    handler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //pegando o id do user
            const id_user = req.user_id;
            // pegando o body
            const { banner_photo, bio_content, name, perfil_photo } = req.body;
            //fazer um object com que será atualizado
            const data = {
                id_user,
                banner_photo: banner_photo ? banner_photo : "",
                bio_content: bio_content ? bio_content : "",
                name: name ? name : "",
                perfil_photo: perfil_photo ? perfil_photo : ""
            };
            const UpdateUser = new UpdateUserService_1.UpdateUserService();
            const user = yield UpdateUser.execute(data);
            res.json(user);
        });
    }
}
exports.UpdateUserController = UpdateUserController;
