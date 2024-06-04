var main_menu = document.getElementById("lw_main_menu")
var links_window = document.getElementById("lw_links_window")
var screen_background = document.getElementById("screen_background")
var second_screen = document.getElementById("second_screen")
var first_open = true
var data
var link_timeout
async function data_taker(action = 0, link = null) {
    console.log(action)
    data = await fetch(`http://localhost/vs_code/php_code/shortcut_links/data_taker.php?action=${action}&link=${link}`)
    data = await data.json()
    console.log(data)
    link_constructor()
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
function link_constructor() {
    var child_num = Number(links_window.children.length - 1)
    for (var i = 0; i <= child_num; i ++) {
        links_window.removeChild(links_window.children[0])
    }
    for (var i in data) {
        element = data[i]
        var lw_link = document.createElement("a")
        lw_link.href = element.link
        lw_link.id = "lw_link"
        lw_link.addEventListener("mouseenter", function () {
            trash_show(this)
        })
        lw_link.addEventListener("mouseleave", function () {
            trash_unshow(this)
        })
        lw_link.dataset.link_num = i
        var ll_perf = document.createElement("div")
        var ll_desc = document.createElement("div")
        ll_perf.id = "ll_perf"
        ll_desc.id = "ll_desc"
        var lp_side = document.createElement("div")
        var lp_perf = document.createElement("div")
        lp_side.classList.add("lp_side")
        lp_perf.id = "lp_perf"
        var i0 = document.createElement("i")
        i0.addEventListener("click", function () {
            ss_open(this)
        })
        i0.dataset.screen_num = 1
        i0.className = "fa-solid fa-trash"
        var lp_perf_child = document.createElement("div")
        var ll_desc_child = document.createElement("p")
        lp_perf_child.style.backgroundImage = element.icon != null ? element.icon : `url("https://img.favpng.com/17/15/18/favicon-computer-icons-icon-design-image-share-icon-png-favpng-Gcr0dC9VNRr9aywRBtm9r8R7f.jpg")`
        lp_side.appendChild(i0)
        lp_perf.appendChild(lp_perf_child)
        ll_desc_child.innerHTML = element.title
        ll_desc.appendChild(ll_desc_child)
        ll_perf.appendChild(lp_side)
        ll_perf.appendChild(lp_perf)
        lw_link.appendChild(ll_perf)
        lw_link.appendChild(ll_desc)
        links_window.appendChild(lw_link)
    }
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
        if (first_open && data != null) {
            link_constructor()
            first_open = false
        }
    } else {
        element.dataset.menu_open = 0
        element.style.animation = "ar_close 0.25s forwards"
        main_menu.style.borderBottomLeftRadius = "5px"
        main_menu.style.borderBottomRightRadius = "5px"
        links_window.style.animation = "main_menu_unshow 0.25s forwards"
    }
}
function ss_open(element) {
    event.preventDefault()
    screen_num = Number(element.dataset.screen_num)
    screen_background.style.zIndex = 0
    second_screen.style.zIndex = 1
    second_screen.children[screen_num].style.display = "flex"
    second_screen.children[screen_num].style.animation = "show_window 0.25s forwards"
    if (screen_num == 1) {
        var link = data[Number(element.parentNode.parentNode.parentNode.dataset.link_num)]
        second_screen.children[screen_num].children[0].children[1].innerHTML = link.title
        second_screen.children[screen_num].children[0].children[1].dataset.link = link.link
    }
}
function ss_close(element) {
    if (element.id == "cs_confirm" || element.id == "cs_cancel") {
        var link_input = element.parentNode.parentNode.children[0].children[1]
        var message = link_input.parentNode.children[2]
        if (element.id == "cs_confirm") {
            if (!link_input.value.match(/https:\/\//) || !link_input.value.match(/.com/)) {
                message.style.display = "flex"
                message.innerHTML = `the current link doesn't have ${!link_input.value.match(/https:\/\//) ? `"https://"` : `".com"`}`
                return
            } else {
                message.style.display = "none"
                data_taker(1, link_input.value)
                link_input.value = ""
            }
        } else if (element.id == "ls_confirm") {
            data_taker(2, element.parentNode.parentNode.children[0].children[1].dataset.link)
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