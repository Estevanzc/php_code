var main_menu = document.getElementById("lw_main_menu")
var links_window = document.getElementById("lw_links_window")
var screen_background = document.getElementById("screen_background")
var second_screen = document.getElementById("second_screen")
var link_timeout
async function data_taker(action = 0, link = null, link_num = null) {
    var data = await fetch(`http://localhost/vs_code/php_code/shortcut_links/data_taker.php?action=${action}&link=${link}&link_num=${link_num}`)
    data = await data.json()
    console.log(data)
    return data
}
data_taker()
/*
<div id="lw_link" onmouseenter="trash_show(this)" onmouseleave="trash_unshow(this)">
    <div id="ll_perf">
        <div class="lp_side">
            <i onclick="ss_open(this)" data-screen_num="1" class="fa-solid fa-trash"></i>
        </div>
        <div id="lp_perf">
            <div></div>
        </div>
    </div>
    <div id="ll_desc">
        <p>shortcut_name</p>
    </div>
</div>
*/
function link_constructor(data) {
}
function trash_show(element) {
    var trash = element.children[0].children[0].children[0]
    link_timeout = setTimeout(() => {
        trash.style.display = "flex"
        trash.style.animation = "trash_show 0.25s forwards"
    }, 500);
}
function trash_unshow(element) {
    var trash = element.children[0].children[0].children[0]
    clearTimeout(link_timeout)
    trash.style.display = "none"
    trash.style.opacity = 0
}
function menu_show(element) {
    if (element.dataset.menu_open == 0) {
        element.dataset.menu_open = 1
        element.style.animation = "ar_open 0.25s forwards"
        main_menu.style.borderBottomLeftRadius = "0"
        main_menu.style.borderBottomRightRadius = "0"
        links_window.style.animation = "main_menu_show 0.25s forwards"
    } else {
        element.dataset.menu_open = 0
        element.style.animation = "ar_close 0.25s forwards"
        main_menu.style.borderBottomLeftRadius = "5px"
        main_menu.style.borderBottomRightRadius = "5px"
        links_window.style.animation = "main_menu_unshow 0.25s forwards"
    }
}
function ss_open(element) {
    screen_num = Number(element.dataset.screen_num)
    screen_background.style.zIndex = 0
    second_screen.style.zIndex = 1
    second_screen.children[screen_num].style.display = "flex"
    second_screen.children[screen_num].style.animation = "show_window 0.25s forwards"
}
function ss_close(element) {
    if (element.id == "cs_confirm" || element.id == "cs_cancel") {
        var link_input = element.parentNode.parentNode.children[0].children[1]
        var message = link_input.parentNode.children[2]
        if (!link_input.value.match(/https:\/\//) || !link_input.value.match(/.com/) && element.id == "cs_confirm") {
            message.style.display = "flex"
            message.innerHTML = `the current link doesn't have ${!link_input.value.match(/https:\/\//) ? `"https://"` : `".com"`}`
            return
        } else {
            message.style.display = "none"
            data_taker(0, link_input.value)
            link_input.value = ""
        }
    }
    var open_window = second_screen.children[Number(element.dataset.screen_num)]
    open_window.style.animation = "unshow_window 0.25s forwards"
    setTimeout(() => {
        open_window.style.display = "none"
        second_screen.style.zIndex = 0
        screen_background.style.zIndex = 1
    }, 250);
}