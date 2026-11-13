
# Console Logger (TypeScript)

Logger customizado para terminal em TypeScript com formatação de data no padrão `pt-BR`, cores TrueColor ANSI via hexadecimal e inspeção rica de objetos e erros no estilo `ts-node`.

## Funcionalidades

- **Níveis de log semânticos:** `log`, `info`, `success`, `warn` e `error`.
- **Timestamps em `pt-BR`:** Exibição automática de data e hora (`DD/MM/AAAA HH:MM:SS`) no início de cada entrada.
- **Cores TrueColor ANSI:** Conversão automática de códigos hexadecimais (`EConsoleHexColors`) para sequências RGB ANSI, com fallback integrado.
- **Inspeção rica (`node:util`):** Formatação colorida e profunda de objetos, arrays, `Map`, `Set` e stack traces completos de instâncias `Error`.
- **Roteamento de streams:** Saídas `warn` e `error` são direcionadas para `stderr`, enquanto `log`, `info` e `success` vão para `stdout`.
- **ESM & TypeScript estrito:** Configurado com `"type": "module"`, `nodenext` e `verbatimModuleSyntax`.

## Estrutura do Projeto

```text
ts/
├── Console.ts        # Classe principal com os métodos estáticos de log
├── test.ts           # Arquivo de testes manuais
├── package.json      # Configuração do pacote e dependências de desenvolvimento
├── tsconfig.json     # Configuração estrita do TypeScript
└── types/
    ├── Errors.ts     # Tipagens e classes de erro customizadas
    └── types.ts      # Enums EConsoleType e EConsoleHexColors
```

## Configuração

1. Instale as dependências de desenvolvimento:

```bash
npm install
```

2. Certifique-se de que o `tsconfig.json` inclui as definições de tipos do Node.js:

```json
{
  "compilerOptions": {
    "types": ["node"]
  }
}
```

## Como Usar

Importe a classe `Console` (utilizando a extensão `.js` conforme exigido pelo `nodenext`) e utilize os métodos estáticos:

```ts
import Console from "./Console.js";

Console.log("Iniciando execução do sistema...");
Console.info("Conectando ao servidor na porta", 3000);
Console.success("Servidor inicializado com sucesso!");
Console.warn("Taxa de requisições próxima do limite", { atual: 92, maximo: 100 });
Console.error("Falha na autenticação do token JWT");

// Inspeção de objetos complexos
Console.log("Usuário:", {
  id: 42,
  nome: "Ada Lovelace",
  ativo: true,
  permissoes: ["read", "write", "admin"],
});

// Exibição de erros com stack trace
try {
  throw new Error("Timeout ao consultar serviço externo");
} catch (erro) {
  Console.error("Exceção capturada:", erro);
}
```

## Níveis e Cores Padrão

| Método               | Enum (`EConsoleType`) | Cor (`EConsoleHexColors`) | Hexadecimal | Stream     |
| :-------------------- | :---------------------- | :-------------------------- | :---------- | :--------- |
| `Console.log()`     | `LOG`                 | `WHITE`                   | `#F8FAFC` | `stdout` |
| `Console.info()`    | `INFO`                | `BLUE`                    | `#3B82F6` | `stdout` |
| `Console.success()` | `SUCCESS`             | `GREEN`                   | `#22C55E` | `stdout` |
| `Console.warn()`    | `WARNING`             | `YELLOW`                  | `#EAB308` | `stderr` |
| `Console.error()`   | `ERROR`               | `RED`                     | `#EF4444` | `stderr` |

## Execução e Validação de Tipos

- **Executar testes com `tsx`:**
  ```bash
  npx tsx test.ts
  ```
- **Executar em modo watch:**
  ```bash
  npx tsx watch test.ts
  ```
- **Executar nativamente no Node.js:**
  ```bash
  node test.ts
  ```
- **Validar tipagem (sem gerar arquivos):**
  ```bash
  npx tsc
  ```
