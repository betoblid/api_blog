import * as Dotenv from "dotenv";
import { z } from "zod";


// Carregar as variáveis de ambiente
Dotenv.config()


const envSchame = z.object({
   // NODE_ENV: z.enum(['development', 'production', 'test']),
    PORT: z.string().regex(/^\d+$/, { message: 'PORT deve ser um número' }),
    DATABASE_URL: z.string().url(),
    SECRET_JWT: z.string().min(32, { message: 'SECRET_KEY precisa ter pelo menos 32 caracteres' }),
   // API_KEY: z.string().optional(),
})

// Validar as variáveis de ambiente
const parsedEnv = envSchame.safeParse(process.env);

// Se a validação falhar, lançar um erro com os detalhes
if (!parsedEnv.success) {
    console.error('Erro na validação das variáveis de ambiente:');
    console.error(parsedEnv.error.format());
    process.exit(1); // Interromper a execução se a validação falhar
  }
  
  // Tipar o ambiente validado
  type Env = z.infer<typeof envSchame>;
  
  export const env: Env = parsedEnv.data;