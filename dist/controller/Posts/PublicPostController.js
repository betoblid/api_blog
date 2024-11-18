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
exports.PublicPostController = void 0;
const PublicPostService_1 = require("../../service/Posts/PublicPostService");
//para tirar o Query use esse trexo "& ParsedQs"
class PublicPostController {
    handler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // pegar id do post
            const id = req.query.id_post;
            //instancia a camada do serviço
            const updatePost = new PublicPostService_1.PublicPostService();
            //executar  camada do serviço
            const Post = yield updatePost.execute(id);
            res.status(Post.status).json(Post);
        });
    }
}
exports.PublicPostController = PublicPostController;
