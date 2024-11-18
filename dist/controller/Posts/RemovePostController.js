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
exports.RemovePostController = void 0;
const RemovePostService_1 = require("../../service/Posts/RemovePostService");
class RemovePostController {
    handler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //pegando o id do post
            const { id_post } = req.query;
            //instanciando camada de serviço
            const RemovePost = new RemovePostService_1.RemovePostService();
            //executando camanda de serviço
            const post = yield RemovePost.execute(id_post);
            res.status(post.status).json(post);
        });
    }
}
exports.RemovePostController = RemovePostController;
