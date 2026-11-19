#ifndef SIMPLE_CONSOLE_H
#define SIMPLE_CONSOLE_H

#include <stdbool.h>

/* As mensagens aceitam os mesmos marcadores de formato que printf. */
void console_log(const char *format, ...);
void console_info(const char *format, ...);
void console_success(const char *format, ...);
void console_warn(const char *format, ...);
void console_error(const char *format, ...);
void console_debug(const char *format, ...);

void console_set_debug(bool enabled);
bool console_is_debug_enabled(void);
void console_set_color(bool enabled);
bool console_is_color_enabled(void);

#endif
