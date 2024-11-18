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
exports.PublicPostService = void 0;
const prisma_1 = require("../../prisma");
class PublicPostService {
    execute(id_post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //consulta o Post do id passado
                const Post = yield prisma_1.prisma.post.update({
                    where: {
                        id: id_post
                    },
                    data: {
                        published: true
                    }
                });
                return {
                    status: 200,
                    content: Post
                };
            }
            catch (err) {
                return {
                    status: 404, // Not Fold "não existe esse post"
                    content: err
                };
            }
        });
    }
}
exports.PublicPostService = PublicPostService;
