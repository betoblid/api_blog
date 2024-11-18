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
exports.detailUserService = void 0;
const prisma_1 = require("../../prisma");
class detailUserService {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const InfoUser = yield prisma_1.prisma.user.findMany({
                where: {
                    id: id
                },
                select: {
                    name: true,
                    id: true,
                    perfil_photo: true,
                    bio_content: true,
                    banner_photo: true,
                    created_at: true,
                    updated_at: true,
                    posts: {
                        select: {
                            banner_url: true,
                            content: true,
                            id: true,
                            published: true,
                            date_public: true,
                            title: true,
                            user: {
                                select: {
                                    name: true,
                                    id: true,
                                    perfil_photo: true,
                                }
                            }
                        }
                    }
                }
            });
            return InfoUser;
        });
    }
}
exports.detailUserService = detailUserService;
