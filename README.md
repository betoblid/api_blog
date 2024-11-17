## USUÁRIO

- [x] **Criar usuário**
  - Valida se o usuário já está cadastrado. Se estiver, retorna status: `409 - Conflict` com a mensagem: `"Usuário já cadastrado."`
  - Valida se o payload do usuário existe. Se não existir, retorna status: `400 - Bad Request` com a mensagem: `"O corpo da requisição é obrigatório e deve ser um objeto JSON válido."`

- [x] **Criar sessão para usuário (login)**
  - Valida se o payload existe.
  - Valida se o usuário possui registro no banco de dados.
  - Retorna um token JWT em caso de sucesso.

- [x] **Retornar informações do usuário**
  - Valida se o usuário possui registro.
  - Retorna os posts criados pelo usuário e seus dados pessoais.

- [x] **Atualizar perfil do usuário**
  - Valida se o usuário possui registro.
  - Valida o payload enviado (apenas os campos presentes serão atualizados).

## POSTS

- [x] **Apagar posts**
  - Valida se o usuário possui registro.
  - Valida a query para garantir que o ID do post foi enviado.
  - Valida se o post existe antes de tentar removê-lo.
  - Em caso de erro no Prisma, retorna status: `500 - Internal Server Error`.

- [x] **Publicar post**
  - Valida se o usuário possui registro.

- [x] **Criar post**
  - Valida se o usuário possui registro.
  - Valida o payload enviado.
  - Verifica se já existe um post com o mesmo conteúdo. Se existir, retorna status: `409 - Conflict` com a mensagem: `"Post já existe."`
  - Cria o post em caso de sucesso.
