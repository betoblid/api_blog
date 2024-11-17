import { Router, Request, Response } from "express";
import { validateRegisterFields } from "./middleware/validateRegisterFields";
import { CreateUserController } from "./controller/User/CreateUserController";
import { validateLoginFields } from "./middleware/validateLoginFields";
import { AuthUserController } from "./controller/User/AuthUserController";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { detailUserController } from "./controller/User/detailUserController";
import { validateCreatePost } from "./middleware/validateCreatePost";
import { CreatePostController } from "./controller/Posts/CreatePostController";
import { PublicPostController } from "./controller/Posts/PublicPostController";
import { validadeIdPostPublic } from "./middleware/validadeIdPostPublic";
import { RemovePostController } from "./controller/Posts/RemovePostController";
import { UpdateUserController } from "./controller/User/UpdateUserController";

export const route = Router()


// Mensagem de boas vindas a API BLOG
route.get("/", (req: Request, res: Response) => { res.json({ message: "Bem vindo" }) })

//Registrar usuário...
route.post("/registe", validateRegisterFields, new CreateUserController().handler)

//Login Usuário, authenticar usuário...
route.post("/session", validateLoginFields, new AuthUserController().handler)

//Returna informação do usuário
route.get("/me", isAuthenticated, new detailUserController().handler)

//Atualizar Perfil
route.put("/me/update", isAuthenticated, new UpdateUserController().handler)


//criar posts
route.post("/post",isAuthenticated, validateCreatePost,  new CreatePostController().handler)

//publicar post 
route.put("/post/public", isAuthenticated, validadeIdPostPublic, new PublicPostController().handler)

//apagar post
route.delete("/post/remove",isAuthenticated , validadeIdPostPublic, new RemovePostController().handler)