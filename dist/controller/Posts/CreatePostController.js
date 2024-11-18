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
exports.CreatePostController = void 0;
const CreatePostService_1 = require("../../service/Posts/CreatePostService");
class CreatePostController {
    handler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //pegando o id do usuário
            const id_user = req.user_id;
            // pegando o body
            const { banner_url, content, title } = req.body;
            const CreatePost = new CreatePostService_1.CreatePostService();
            const post = yield CreatePost.execute({ banner_url, content, title, id_user });
            res.status(post.status).json(post);
        });
    }
}
exports.CreatePostController = CreatePostController;
