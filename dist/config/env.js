"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const Dotenv = __importStar(require("dotenv"));
const zod_1 = require("zod");
// Carregar as variáveis de ambiente
Dotenv.config();
const envSchame = zod_1.z.object({
    // NODE_ENV: z.enum(['development', 'production', 'test']),
    PORT: zod_1.z.string().regex(/^\d+$/, { message: 'PORT deve ser um número' }),
    DATABASE_URL: zod_1.z.string().url(),
    SECRET_JWT: zod_1.z.string().min(32, { message: 'SECRET_KEY precisa ter pelo menos 32 caracteres' }),
    // API_KEY: z.string().optional(),
});
// Validar as variáveis de ambiente
const parsedEnv = envSchame.safeParse(process.env);
// Se a validação falhar, lançar um erro com os detalhes
if (!parsedEnv.success) {
    console.error('Erro na validação das variáveis de ambiente:');
    console.error(parsedEnv.error.format());
    process.exit(1); // Interromper a execução se a validação falhar
}
exports.env = parsedEnv.data;
