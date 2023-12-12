<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        #back_ground {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: linear-gradient(to right, black, grey);
        }

        #board {
            width: 500px;
            height: 500px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-flow: wrap;
            border: 2px solid white;
        }

        .board_unity {
            width: 30%;
            height: 30%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            box-shadow: 1px 1px 5px black;
            font-size: 20pt;
            background-color: white;
            transition: background-color 0.25s ease;
        }
    </style>
</head>

<body>
    <div id="back_ground">
        <div id="board"></div>
    </div>
    <script>
        var board = document.getElementById("board")
        var parts = ["fa-solid fa-xmark", "fa-regular fa-circle"]
        var player_id
        var play_setter = 0
        var setter = true
        var data
        var tab = []
        async function data_taker(action) {
            if (action) {
                data = await fetch("http://localhost/phpcodes/jogo_da_velha/taker.php?action=0")
                data = await data.json()
                if (setter) {
                    if (await data) {
                        player_id = data[0]
                        if (data[0] == 0) {
                            data[0] = 1
                        }
                        setter = false
                        data_taker(false)
                    }
                }
                if (await data) {
                    board_creater()
                }
            } else {
                var taked = await fetch(`http://localhost/phpcodes/jogo_da_velha/taker.php?action=1&data=${JSON.stringify(data)}`)
                console.log(taked);
            }
        }
        var taker = setInterval(() => {
            data_taker(true)
        }, 250);
        function board_creater() {
            board.innerHTML = null
            for (var li = 0; li <= 2; li++) {
                tab.push([])
                for (var co = 0; co <= 2; co++) {
                    var element = document.createElement("div")
                    var part = Number(data[2][li][co])
                    element.dataset.li = li
                    element.dataset.co = co
                    element.dataset.played = part
                    if (part != 2) {
                        mark_creater(element, part)
                    }
                    element.classList.add("board_unity")
                    element.addEventListener("click", playing)
                    tab[li].push(element)
                    board.appendChild(element)
                }
            }
        }
        function playing() {
            play(this)
        }
        function mark_creater(element, part) {
            var mark = document.createElement("i")
            mark.className = parts[part]
            element.appendChild(mark)
        }
        function play(element) {
            if (player_id == data[1]) {
                if (element.dataset.played == 2) {
                    element.dataset.played = player_id
                    mark_creater(element, player_id)
                    verifyer(tab[0][0], tab[0][1], tab[0][2])
                    verifyer(tab[1][0], tab[1][1], tab[1][2])
                    verifyer(tab[2][0], tab[2][1], tab[2][2])
                    verifyer(tab[0][0], tab[1][0], tab[2][0])
                    verifyer(tab[0][1], tab[1][1], tab[2][1])
                    verifyer(tab[0][2], tab[1][2], tab[2][2])
                    verifyer(tab[0][0], tab[1][1], tab[2][2])
                    verifyer(tab[0][2], tab[1][1], tab[2][0])
                    if (data[1] == 0) {
                        data[1] = 1
                    } else if (data[1] == 1) {
                        data[1] = 0
                    }
                    var tab_copy = []
                    for (var li in tab) {
                        tab_copy.push([])
                        for (var co in tab[li]) {
                            tab_copy[li] = Number(tab[li][co].dataset.played)
                        }
                    }
                    data[2] = tab_copy
                    data_taker(false)
                }
            }
        }
        function verifyer(element1, element2, element3) {
            var number1 = element1.dataset.played
            var number2 = element2.dataset.played
            var number3 = element3.dataset.played
            if (number1 != 2 && number2 != 2 && number3 != 2 && number1 == number2 && number1 == number3) {
                for (var li in tab) {
                    for (var co in tab[li]) {
                        tab[li][co].removeEventListener("click", playing)
                    }
                }
                console.log(number1);
                element1.style.backgroundColor = "lightgreen"
                element2.style.backgroundColor = "lightgreen"
                element3.style.backgroundColor = "lightgreen"
            }
        }
    </script>
</body>

</html>