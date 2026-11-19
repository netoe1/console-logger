#include "../portable/Console-portable.h"

#include <assert.h>

int main(void)
{
    assert(console_is_debug_enabled());
    assert(console_is_color_enabled());

    console_log("test log");
    console_info("test info");
    console_success("test success");
    console_warn("test warning");
    console_error("test error");
    console_debug("test debug enabled");

    console_set_debug(false);
    assert(!console_is_debug_enabled());
    console_debug("test debug disabled");

    console_set_debug(true);
    assert(console_is_debug_enabled());
    console_set_color(false);
    assert(!console_is_color_enabled());
    console_set_color(true);
    assert(console_is_color_enabled());

    return 0;
}
