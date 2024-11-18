"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginFields = validateLoginFields;
function validateLoginFields(req, res, next) {
    // Verificar se o corpo da requisição existe
    if (!req.body || typeof req.body !== 'object') {
        res.status(400).json({ status: 400, message: "O corpo da requisição é obrigatório e deve ser um objeto JSON válido." }).end();
        return;
    }
    const { email, password } = req.body || {}; // Fallback para evitar undefined
    // Verificar se algum campo está vazio ou não foi enviado
    if (!email || !password) {
        res.status(400).json({ status: 400, message: "Todos os campos 'email' e 'password' são obrigatórios e não podem estar vazios." }).end();
        return;
    }
    next(); // Continua para o próximo middleware ou controller
}
