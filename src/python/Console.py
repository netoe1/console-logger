from datetime import datetime
import inspect
from pathlib import Path


class Console:
    """Logger simples para terminal, com níveis e modo debug configurável."""

    _debug_ativo = True
    _reset = "\033[0m"
    _cinza = "\033[90m"

    # Cores ANSI TrueColor, alinhadas à versão TypeScript.
    _cores = {
        "LOG": "\033[38;2;255;255;255m",
        "INFO": "\033[38;2;0;229;255m",
        "SUCCESS": "\033[38;2;0;230;118m",
        "WARN": "\033[38;2;255;214;10m",
        "ERROR": "\033[38;2;255;69;58m",
        "DEBUG": "\033[38;2;224;64;251m",
    }

    @staticmethod
    def _arquivo_chamador():
        """Retorna o nome do arquivo que chamou o método de log."""
        frame = inspect.currentframe()
        if frame is None:
            return "unknown"

        # A pilha é: este método -> _escrever -> nível público -> aplicação.
        chamador = frame.f_back.f_back.f_back
        nome = Path(chamador.f_code.co_filename).name if chamador else "unknown"
        del frame  # Evita manter referências à pilha depois de retornar.
        return nome

    @classmethod
    def _escrever(cls, nivel, mensagem):
        """Formata e imprime uma mensagem; todos os níveis passam por aqui."""
        horario = datetime.now().strftime("%H:%M:%S")
        arquivo = cls._arquivo_chamador()
        cor_nivel = cls._cores[nivel]

        print(
            f"{cls._cinza}{horario}{cls._reset} "
            f"{cor_nivel}{nivel:<8}{cls._reset} "
            f"{cls._cinza}[{arquivo}]{cls._reset} "
            f"{mensagem}"
        )

    # Os métodos públicos só escolhem o nível e encaminham a mensagem.
    @classmethod
    def log(cls, mensagem):
        cls._escrever("LOG", mensagem)

    @classmethod
    def info(cls, mensagem):
        cls._escrever("INFO", mensagem)

    @classmethod
    def success(cls, mensagem):
        cls._escrever("SUCCESS", mensagem)

    @classmethod
    def warn(cls, mensagem):
        cls._escrever("WARN", mensagem)

    @classmethod
    def error(cls, mensagem):
        cls._escrever("ERROR", mensagem)

    @classmethod
    def debug(cls, mensagem):
        # Mensagens debug são ignoradas quando o modo está desligado.
        if cls._debug_ativo:
            cls._escrever("DEBUG", mensagem)

    @classmethod
    def set_debug_mode(cls, ativo):
        """Ativa ou desativa a impressão de mensagens debug."""
        cls._debug_ativo = ativo

    @classmethod
    def is_debug_mode_active(cls):
        """Informa se o modo debug está ativo."""
        return cls._debug_ativo
