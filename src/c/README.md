# Console Logger para C

Logger de terminal em C99 com duas opções: uma versão normal (`Console.h` + `Console.c`) e uma versão em um único header (`portable/Console-portable.h`).

## Níveis

- `console_log`: mensagem genérica;
- `console_info`: informação;
- `console_success`: sucesso;
- `console_warn`: aviso;
- `console_error`: erro;
- `console_debug`: depuração, habilitada por padrão.

Cada mensagem recebe timestamp local. Avisos e erros vão para `stderr`; os outros níveis usam `stdout`. As cores ANSI podem ser desativadas com `console_set_color(false)`.

## Versão normal

Inclua `Console.h` e compile seu programa junto com `Console.c`:

```c
#include "Console.h"

int main(void)
{
    console_log("Aplicação iniciada");
    console_info("Porta: %d", 3000);
    console_success("Conexão estabelecida");
    console_warn("Uso de memória: %d%%", 82);
    console_error("Falha ao conectar");
    console_debug("Mensagem de depuração");

    console_set_debug(false);
    console_set_color(false);
    return 0;
}
```

Compile manualmente:

```sh
cc -std=c99 -Wall -Wextra -Wpedantic app.c Console.c -o app
```

## Versão portable

Inclua `portable/Console-portable.h` no arquivo que usará o logger. Essa versão não precisa de `Console.c` nem de compilação separada:

```c
#include "portable/Console-portable.h"

int main(void)
{
    console_info("Aplicação iniciada");
    return 0;
}
```

Compile apenas seu programa:

```sh
cc -std=c99 -Wall -Wextra -Wpedantic app.c -o app
```

Na versão portable, o estado de `debug` e de cores é próprio de cada arquivo `.c` que inclui o header.

## Makefile

Na pasta `src/c`, `make` cria a biblioteca estática `libconsole.a`, `make test` executa os testes das duas versões e `make clean` remove os arquivos gerados.
