import Console from "./Console.js";

// 1. Testes básicos de cada nível
Console.log("Iniciando execução do sistema...");
Console.info("Conectando ao servidor na porta", 3000);
Console.success("Servidor inicializado com sucesso!");
Console.warn("Taxa de requisições próxima do limite", { atual: 92, maximo: 100 });
Console.error("Falha na autenticação do token JWT");

// 2. Inspeção de objetos aninhados e tipos variados (estilo ts-node)
const usuario = {
  id: 42,
  nome: "Ada Lovelace",
  ativo: true,
  permissoes: ["read", "write", "admin"],
  sessao: {
    ip: "127.0.0.1",
    expiraEm: null,
    metadata: new Map([["tema", "dark"]]),
  },
};

Console.log("Dados do usuário:", usuario);

// 3. Exibição de instância de Error com stack trace
try {
  throw new Error("Timeout ao consultar serviço externo");
} catch (erro) {
  Console.error("Exceção capturada:", erro);
}