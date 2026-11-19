#include "Console.h"

#include <stdarg.h>
#include <stdio.h>
#include <time.h>

static bool debug_enabled = true;
static bool color_enabled = true;

static void print_message(const char *level, const char *color, FILE *stream,
                          const char *format, va_list args)
{
    time_t now = time(NULL);
    struct tm *local_time = localtime(&now);
    char timestamp[20];

    if (format == NULL) {
        return;
    }

    if (local_time == NULL ||
        strftime(timestamp, sizeof(timestamp), "%Y-%m-%d %H:%M:%S", local_time) == 0) {
        (void)snprintf(timestamp, sizeof(timestamp), "unknown-time");
    }

    if (color_enabled) {
        (void)fprintf(stream, "\033[90m%s\033[0m \033[1m%s%s\033[0m ",
                      timestamp, color, level);
    } else {
        (void)fprintf(stream, "%s %-7s ", timestamp, level);
    }

    (void)vfprintf(stream, format, args);
    (void)fputc('\n', stream);
}

void console_log(const char *format, ...)
{
    va_list args;
    va_start(args, format);
    print_message("LOG", "\033[38;2;255;255;255m", stdout, format, args);
    va_end(args);
}

void console_info(const char *format, ...)
{
    va_list args;
    va_start(args, format);
    print_message("INFO", "\033[38;2;0;229;255m", stdout, format, args);
    va_end(args);
}

void console_success(const char *format, ...)
{
    va_list args;
    va_start(args, format);
    print_message("SUCCESS", "\033[38;2;0;230;118m", stdout, format, args);
    va_end(args);
}

void console_warn(const char *format, ...)
{
    va_list args;
    va_start(args, format);
    print_message("WARN", "\033[38;2;255;214;10m", stderr, format, args);
    va_end(args);
}

void console_error(const char *format, ...)
{
    va_list args;
    va_start(args, format);
    print_message("ERROR", "\033[38;2;255;69;58m", stderr, format, args);
    va_end(args);
}

void console_debug(const char *format, ...)
{
    va_list args;

    if (!debug_enabled) {
        return;
    }

    va_start(args, format);
    print_message("DEBUG", "\033[38;2;224;64;251m", stdout, format, args);
    va_end(args);
}

void console_set_debug(bool enabled)
{
    debug_enabled = enabled;
}

bool console_is_debug_enabled(void)
{
    return debug_enabled;
}

void console_set_color(bool enabled)
{
    color_enabled = enabled;
}

bool console_is_color_enabled(void)
{
    return color_enabled;
}
