var panel = document.createElement("div");

panel.style.position = "absolute";
panel.style.borderTop = "10px solid black";
panel.style.width = 2 * window.innerWidth + "px";
panel.style.height = window.innerHeight * 0.3 + "px";
panel.style.top = window.innerHeight * 0.7 + "px";
panel.style.left = window.innerWidth * -0.1 + "0px";

document.getElementById("main").appendChild(panel);

function limb(name, hp, id, x, y) {
    this.name = name;
    this.hp = hp;
    this.id = id;
    this.maxhp = hp;

    var graphic = document.createElement("div");
    graphic.style.background = "lime";
    graphic.style.width = "200px";
    graphic.style.height = "200px";
    graphic.style.position = "absolute";
    graphic.style.left = x+"px";
    graphic.style.top = y+"px";

    document.getElementById("main").appendChild(graphic)

    this.div = graphic;
}

var boss;

function test() {
    var limb1 = new limb("lewa reka", 100, 1, 100, 400);
    var limb2 = new limb("prawa reka", 100, 2, 400, 400);
    var limb3 = new limb("lewa noga", 100, 3, 700, 400);
    var limb4 = new limb("prawa noga", 100, 4, 1000, 400);
    boss = [limb1, limb2, limb3, limb4];
}

var select = 0;

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 39) {        // Right
        if (select < 3) {
            select += 1;
            boss[select-1].div.style.border = null;
            boss[select].div.style.border = "3px solid black";
        }
    } else if (event.keyCode == 40) { // down
        
    } else if (event.keyCode == 37) { // Left
        if (select > 0) {
            select -= 1;
            boss[select+1].div.style.border = null;
            boss[select].div.style.border = "3px solid black";
        }
    } else if (event.keyCode == 38) { // Up
        if (boss[select].hp > 10){
            boss[select].hp -= 10;
            boss[select].div.style.background = "hsl(" + (boss[select].hp / boss[select].maxhp) * 120 + ", 100%, 50%)";
        }      
}});



test();