#ifndef CONSOLE_PORTABLE_H
#define CONSOLE_PORTABLE_H

#include <stdbool.h>
#include <stdarg.h>
#include <stdio.h>
#include <time.h>

static bool console_portable_debug_enabled = true;
static bool console_portable_color_enabled = true;

static inline void console_portable_print(const char *level, const char *color,
                                          FILE *stream, const char *format,
                                          va_list args)
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

    if (console_portable_color_enabled) {
        (void)fprintf(stream, "\033[90m%s\033[0m \033[1m%s%s\033[0m ",
                      timestamp, color, level);
    } else {
        (void)fprintf(stream, "%s %-7s ", timestamp, level);
    }

    (void)vfprintf(stream, format, args);
    (void)fputc('\n', stream);
}

static inline void console_log(const char *format, ...)
{
    va_list args;
    va_start(args, format);
    console_portable_print("LOG", "\033[37m", stdout, format, args);
    va_end(args);
}

static inline void console_info(const char *format, ...)
{
    va_list args;
    va_start(args, format);
    console_portable_print("INFO", "\033[36m", stdout, format, args);
    va_end(args);
}

static inline void console_success(const char *format, ...)
{
    va_list args;
    va_start(args, format);
    console_portable_print("SUCCESS", "\033[32m", stdout, format, args);
    va_end(args);
}

static inline void console_warn(const char *format, ...)
{
    va_list args;
    va_start(args, format);
    console_portable_print("WARN", "\033[33m", stderr, format, args);
    va_end(args);
}

static inline void console_error(const char *format, ...)
{
    va_list args;
    va_start(args, format);
    console_portable_print("ERROR", "\033[31m", stderr, format, args);
    va_end(args);
}

static inline void console_debug(const char *format, ...)
{
    va_list args;

    if (!console_portable_debug_enabled) {
        return;
    }

    va_start(args, format);
    console_portable_print("DEBUG", "\033[35m", stdout, format, args);
    va_end(args);
}

static inline void console_set_debug(bool enabled)
{
    console_portable_debug_enabled = enabled;
}

static inline bool console_is_debug_enabled(void)
{
    return console_portable_debug_enabled;
}

static inline void console_set_color(bool enabled)
{
    console_portable_color_enabled = enabled;
}

static inline bool console_is_color_enabled(void)
{
    return console_portable_color_enabled;
}

#endif
