import { NextFunction, Request, Response } from "express";
import { RequestPayloadPublicPost } from "../@types/RequestPayloadPublicPost.type";
import { ParsedQs } from "qs";

export function validadeIdPostPublic(
    req: Request<{}, {}, {}, RequestPayloadPublicPost & ParsedQs>,
    res: Response,
    next: NextFunction
): void {

    // Verificar se o corpo da requisição existe
    if (!req.query || typeof req.query === 'string') {

        res.status(400).json({ status: 400, message: "A Query da requisição é obrigatório e deve ser um objeto JSON válido." }).end();
        return;
    }

    const { id_post } = req.query || {}; // Fallback para evitar undefined

    // Verificar se algum campo está vazio ou não foi enviado
    if (!id_post) {
        res.status(400).json({ status: 400, message: "O campo 'id_post' é obrigatório e não podem estar vazio." }).end();
        return;
    }

    if (id_post.length === 36) {
        next(); // Continua para o próximo middleware ou controller
        return;
    }
    //se nenhuma das condições for atendida retorne erro..
    res.status(404).json({ status: 404, message: "Query invalida.." }).end();

}
