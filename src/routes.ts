import { Router, Request, Response } from "express";

const route = Router()


// Mensagem de boas vindas a API BLOG
route.get("/",(req: Request, res: Response) => {  res.json({message: "Bem vindo"})})