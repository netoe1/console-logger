import io
import sys
import unittest
from contextlib import redirect_stdout
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from Console import Console


class ConsoleTests(unittest.TestCase):
    def setUp(self):
        self.debug_anterior = Console.is_debug_mode_active()
        Console.set_debug_mode(True)

    def tearDown(self):
        Console.set_debug_mode(self.debug_anterior)

    def capturar(self, funcao, mensagem):
        """Executa um nível de log e retorna o texto impresso."""
        saida = io.StringIO()
        with redirect_stdout(saida):
            funcao(mensagem)
        return saida.getvalue()

    def test_niveis_incluem_horario_arquivo_e_cor(self):
        niveis = [
            (Console.log, "LOG", "log"),
            (Console.info, "INFO", "info"),
            (Console.success, "SUCCESS", "success"),
            (Console.warn, "WARN", "warn"),
            (Console.error, "ERROR", "error"),
            (Console.debug, "DEBUG", "debug"),
        ]

        for funcao, nivel, mensagem in niveis:
            with self.subTest(nivel=nivel):
                saida = self.capturar(funcao, mensagem)
                self.assertIn(nivel, saida)
                self.assertIn(mensagem, saida)
                self.assertIn("[test_console.py]", saida)
                self.assertRegex(saida, r"\d{2}:\d{2}:\d{2}")
                self.assertIn(Console._cores[nivel], saida)

    def test_debug_desativado_nao_imprime(self):
        Console.set_debug_mode(False)

        saida = self.capturar(Console.debug, "não deve aparecer")

        self.assertEqual(saida, "")
        self.assertFalse(Console.is_debug_mode_active())

    def test_modo_debug_pode_ser_reativado(self):
        Console.set_debug_mode(False)
        Console.set_debug_mode(True)

        self.assertTrue(Console.is_debug_mode_active())
        self.assertIn("debug ativo", self.capturar(Console.debug, "debug ativo"))


if __name__ == "__main__":
    unittest.main()
