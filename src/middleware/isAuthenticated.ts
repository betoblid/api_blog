import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../config/env";

interface Payload {
    sub: string,
}


export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {

    //pegar token que foi enviado no headers na request
    const authToken = req.headers.authorization;

    //verificar se foi passado
    if (!authToken) {
        res.status(401).json({ content: "Forneça um Token válido..." }).end();
        return;
    }

    //separar o Bearer do Token pelo space dos dois
    const [Bearer, Token] = authToken.split(" ")

    if (!Token) {
        res.status(401).json({ content: "Forneça um Token válido..." }).end();
        return;
    }

    try {
        //validar se o Token é valido
        const { sub } = verify(Token, env.SECRET_JWT) as Payload

        //adicionar o token a request
        req.user_id = sub

        return next()

    } catch (err) {

        res.status(401).json({status: 401, content: "Forneça um Token válido..." }).end()
    }
}