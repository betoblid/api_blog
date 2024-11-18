"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
const validateRegisterFields_1 = require("./middleware/validateRegisterFields");
const CreateUserController_1 = require("./controller/User/CreateUserController");
const validateLoginFields_1 = require("./middleware/validateLoginFields");
const AuthUserController_1 = require("./controller/User/AuthUserController");
const isAuthenticated_1 = require("./middleware/isAuthenticated");
const detailUserController_1 = require("./controller/User/detailUserController");
const validateCreatePost_1 = require("./middleware/validateCreatePost");
const CreatePostController_1 = require("./controller/Posts/CreatePostController");
const PublicPostController_1 = require("./controller/Posts/PublicPostController");
const validadeIdPostPublic_1 = require("./middleware/validadeIdPostPublic");
const RemovePostController_1 = require("./controller/Posts/RemovePostController");
const UpdateUserController_1 = require("./controller/User/UpdateUserController");
exports.route = (0, express_1.Router)();
// Mensagem de boas vindas a API BLOG
exports.route.get("/", (req, res) => { res.json({ message: "Bem vindo" }); });
//Registrar usuário...
exports.route.post("/registe", validateRegisterFields_1.validateRegisterFields, new CreateUserController_1.CreateUserController().handler);
//Login Usuário, authenticar usuário...
exports.route.post("/session", validateLoginFields_1.validateLoginFields, new AuthUserController_1.AuthUserController().handler);
//Returna informação do usuário
exports.route.get("/me", isAuthenticated_1.isAuthenticated, new detailUserController_1.detailUserController().handler);
//Atualizar Perfil
exports.route.put("/me/update", isAuthenticated_1.isAuthenticated, new UpdateUserController_1.UpdateUserController().handler);
//criar posts
exports.route.post("/post", isAuthenticated_1.isAuthenticated, validateCreatePost_1.validateCreatePost, new CreatePostController_1.CreatePostController().handler);
//publicar post 
exports.route.put("/post/public", isAuthenticated_1.isAuthenticated, validadeIdPostPublic_1.validadeIdPostPublic, new PublicPostController_1.PublicPostController().handler);
//apagar post
exports.route.delete("/post/remove", isAuthenticated_1.isAuthenticated, validadeIdPostPublic_1.validadeIdPostPublic, new RemovePostController_1.RemovePostController().handler);
