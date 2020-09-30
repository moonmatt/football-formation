// my canvas
let canvas = document.querySelector('#mainCanvas')
let cursorCanvas = document.querySelector('#layer')

canvas.width = 480
canvas.height = 600

cursorCanvas.width = 480
cursorCanvas.height = 600

let c = canvas.getContext('2d')
let cursorC = cursorCanvas.getContext('2d')

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

let grabbed = false

let players = [
{
    role: 'Goalkeeper',
    name: '',
    width: 240,
    height: 485
}, {
    role: 'Central Defender',
    name: '',
    width: 180,
    height: 400
}, {
    role: 'Central Defender',
    name: '',
    width: 300,
    height: 400
}, {
    role: 'Fullback',
    name: '',
    width: 80,
    height: 350
}, {
    role: 'Fullback',
    name: '',
    width: 400,
    height: 350
}, {
    role: 'Central Midfielder',
    name: '',
    width: 180,
    height: 275
}, {
    role: 'Central Midfielder',
    name: '',
    width: 300,
    height: 275
}, {
    role: 'Attacker',
    name: '',
    width: 100,
    height: 165
}, {
    role: 'Attacker',
    name: '',
    width: 240,
    height: 165
}, {
    role: 'Attacker',
    name: '',
    width: 380,
    height: 165
}, {
    role: 'Striker',
    name: '',
    width: 240,
    height: 75
}   
]

let temp


players.forEach(player => {
    player.id = generateId()
    c.fillRect(player.width -25, player.height, 50, 50)
})

canvas.addEventListener("mousemove", function(e) { 
    var cRect = canvas.getBoundingClientRect(); 
    var canvasX = Math.round(e.clientX - cRect.left);
    var canvasY = Math.round(e.clientY - cRect.top);
    document.getElementById('xy').innerText = "X: "+canvasX+", Y: "+canvasY

    if(grabbed){
        cursorC.clearRect(0, 0, 480, 600);
        console.log('grabbed: ' + grabbed)
        cursorC.fillStyle = '#333'
        cursorC.fillRect(canvasX -25, canvasY - 25, 50, 50)

        //

        players.forEach(player => {
            let checkWidth = canvasX + 25 > player.width - 25 && canvasX - 25 < player.width + 25
            let checkHeight = canvasY + 25 > player.height && canvasY - 25 < player.height + 50
            if(checkWidth && checkHeight){
                console.log('there is another player: ' + player.role)
                cursorC.fillStyle = '#FF0000'
                cursorC.fillRect(canvasX -25, canvasY - 25, 50, 50)
            }
        })

    }

    players.forEach(player => {

        let checkWidth = canvasX > player.width - 25 && canvasX < player.width + 25
        let checkHeight = canvasY > player.height && canvasY < player.height + 50
        if(checkWidth && checkHeight){
            document.getElementById('role').innerText = player.role
        } else {
            document.body.style.cursor = "auto";
        }
    })


});

canvas.addEventListener("mousedown", function(e) { 
    console.log(players.length)
    var cRect = canvas.getBoundingClientRect(); 
    var canvasX = Math.round(e.clientX - cRect.left);
    var canvasY = Math.round(e.clientY - cRect.top);

    players.forEach(player => {

        let checkWidth = canvasX > player.width - 25 && canvasX < player.width + 25
        let checkHeight = canvasY > player.height && canvasY < player.height + 50
        if(checkWidth && checkHeight){
            grabbed = true
            c.clearRect(player.width - 25, player.height, 50, 50);
            // get index of object with id:37
            var removeIndex = players.map(function(item) { return item.id; }).indexOf(player.id);
            // remove object
            players.splice(removeIndex, 1);

            temp = {
                role: player.role,
                name: player.name,
                width: player.width,
                height: player.height
            }
            console.log(temp)
        }
    })
});

canvas.addEventListener("mouseup", function(e) {
    document.body.style.cursor = "auto";
    if(grabbed){
        var cRect = canvas.getBoundingClientRect(); 
        var canvasX1 = Math.round(e.clientX - cRect.left);
        var canvasY1 = Math.round(e.clientY - cRect.top);

        let testFound = false

        players.forEach(player => {
            let checkWidth = canvasX1 + 25 > player.width - 25 && canvasX1 - 25 < player.width + 25
            let checkHeight = canvasY1 + 25 > player.height && canvasY1 - 25 < player.height + 50
            if(checkWidth && checkHeight){
                console.log('there is another player: ' + player.role)
                console.log(temp)
                c.fillRect(temp.width -25 , temp.height, 50, 50)
                players.push(temp)
                grabbed = false
                testFound = true
                cursorC.clearRect(0, 0, 480, 600);
            }
            

        })
        console.log(testFound)
        if(testFound == false){
            console.log('messo')
            c.fillRect(canvasX1 - 25, canvasY1 - 25, 50, 50)
            players.push({
                role: 'Custom',
                name: '',
                id: generateId(),
                width: canvasX1,
                height: canvasY1 - 25
             })
             grabbed = false
             temp = ''
        }
    }

});
