CC ?= cc
AR ?= ar
CFLAGS ?= -std=c99 -Wall -Wextra -Wpedantic -O2
ARFLAGS = rcs

TARGET = libconsole.a
OBJECT = Console.o
TEST_PROGRAM = tests/test_console
PORTABLE_TEST_PROGRAM = tests/test_portable

.PHONY: all test clean

all: $(TARGET)

$(TARGET): $(OBJECT)
	$(AR) $(ARFLAGS) $@ $^

$(OBJECT): Console.c Console.h
	$(CC) $(CFLAGS) -c Console.c -o $(OBJECT)

$(TEST_PROGRAM): tests/test_console.c Console.c Console.h
	$(CC) $(CFLAGS) tests/test_console.c Console.c -o $(TEST_PROGRAM)

$(PORTABLE_TEST_PROGRAM): tests/test_portable.c portable/Console-portable.h
	$(CC) $(CFLAGS) tests/test_portable.c -o $(PORTABLE_TEST_PROGRAM)

test: $(TEST_PROGRAM) $(PORTABLE_TEST_PROGRAM)
	@set -eu; \
	trap 'rm -f tests/stdout.tmp tests/stderr.tmp' EXIT HUP INT TERM; \
	for program in $(TEST_PROGRAM) $(PORTABLE_TEST_PROGRAM); do \
	  ./$$program > tests/stdout.tmp 2> tests/stderr.tmp; \
	  grep -F 'LOG     test log' tests/stdout.tmp >/dev/null; \
	  grep -F 'INFO    test info' tests/stdout.tmp >/dev/null; \
	  grep -F 'SUCCESS test success' tests/stdout.tmp >/dev/null; \
	  grep -F 'DEBUG   test debug enabled' tests/stdout.tmp >/dev/null; \
	  if grep -F 'test debug disabled' tests/stdout.tmp >/dev/null; then exit 1; fi; \
	  grep -F 'WARN    test warning' tests/stderr.tmp >/dev/null; \
	  grep -F 'ERROR   test error' tests/stderr.tmp >/dev/null; \
	done; \
	echo 'Todos os testes passaram.'

clean:
	rm -f $(OBJECT) $(TARGET) $(TEST_PROGRAM) $(PORTABLE_TEST_PROGRAM) tests/stdout.tmp tests/stderr.tmp
