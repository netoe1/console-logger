# Console Logger para Python

Logger simples para terminal com níveis coloridos, horário, nome do arquivo chamador e controle de mensagens `debug`.

## Requisitos

- Python 3;
- terminal com suporte a sequências ANSI para exibir cores.

O logger usa apenas a biblioteca padrão do Python. Não é necessário instalar pacotes externos.

## Uso

Na raiz do repositório, importe `Console` e use os métodos de log:

```python
from src.python.Console import Console

Console.log("Aplicação iniciada")
Console.info("Conectando na porta 3000")
Console.success("Conexão estabelecida")
Console.warn("Uso de memória alto")
Console.error("Falha ao conectar")
Console.debug("Detalhes para desenvolvimento")
```

O logger imprime o horário, o nível, o arquivo chamador e a mensagem. O modo `debug` começa ativo e pode ser controlado em tempo de execução:

```python
Console.set_debug_mode(False)
print(Console.is_debug_mode_active())  # False
```

## Fluxo

Cada método público (`log`, `info`, `success`, `warn`, `error` ou `debug`) escolhe o nível e encaminha a mensagem para `_escrever`. Esse método reúne horário, arquivo chamador e cor antes de imprimir. `debug` verifica a configuração e só encaminha a mensagem quando está ativo.

## Testes

Execute os testes automatizados a partir da raiz do repositório:

```sh
python -m unittest discover -s src/python/tests -v
```

Os testes cobrem os níveis, horário e arquivo chamador, cores e ativação ou desativação do modo `debug`.
