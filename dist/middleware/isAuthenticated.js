"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("../config/env");
function isAuthenticated(req, res, next) {
    //pegar token que foi enviado no headers na request
    const authToken = req.headers.authorization;
    //verificar se foi passado
    if (!authToken) {
        res.status(401).json({ content: "Forneça um Token válido..." }).end();
        return;
    }
    //separar o Bearer do Token pelo space dos dois
    const [Bearer, Token] = authToken.split(" ");
    if (!Token) {
        res.status(401).json({ content: "Forneça um Token válido..." }).end();
        return;
    }
    try {
        //validar se o Token é valido
        const { sub } = (0, jsonwebtoken_1.verify)(Token, env_1.env.SECRET_JWT);
        //adicionar o token a request
        req.user_id = sub;
        return next();
    }
    catch (err) {
        res.status(401).json({ status: 401, content: "Forneça um Token válido..." }).end();
    }
}
