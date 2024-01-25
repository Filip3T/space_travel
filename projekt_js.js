//creating a party

var party = [];             // array of party members
var state = 1;              // 0 - management    1 - combat_skill_select    2 - combat_enemy_select    3 - story
var select_x = 0;           // select on x axis
var select_y = 0;           // select on y axis (it's easier this way)

function ally(name, hp, skills) {
    this.name = name;
    this.hp = hp;
    this.maxhp = hp;
    this.skills = skills;
    party.push(this);    
} //creating an ally

var skill_arr = ["attack", "heal", "slam"];

var mc = new ally("player", 100, [0,1,2]);
var test_ally = new ally("test", 100, [0,2]);

var panel;
var party_panel;
var skill_panel;

function createPanel() {    //creating a panel
    panel = document.createElement("div");
     
    panel.style.position = "absolute";
    panel.style.left = "0px";
    panel.style.width = window.innerWidth + "px";
    panel.style.height = window.innerHeight * 0.3 + "px";
    panel.style.top = window.innerHeight * 0.7 + "px";
    panel.style.borderTop = "10px solid black";
    panel.style.fontSize = "30px";
    document.body.appendChild(panel);

    party_panel = document.createElement("div");
    party_panel.style.position = "absolute";
    party_panel.style.left = "0px";
    party_panel.style.height = window.innerHeight * 0.3 + "px";
    party_panel.style.width = window.innerWidth * 0.2 + "px";
    panel.appendChild(party_panel);

    skill_panel = document.createElement("div");
    skill_panel.style.position = "absolute";
    skill_panel.style.height = window.innerHeight * 0.3 + "px";
    skill_panel.style.left = window.innerWidth * 0.2 + "px";
    skill_panel.style.width = window.innerWidth * 0.7 + "px";
    skill_panel.style.borderLeft = "10px solid black";
    panel.appendChild(skill_panel);
} //createPanel
createPanel();

var skill_select = 0;

function partyUpdate() {    //updating party members
    party_panel.innerHTML = "";
    for(i=0;i<party.length;i++) {
        party_panel.innerHTML += party[i].name + " ( " + party[i].hp + " / " + party[i].maxhp + " ) ";
        if (select_y == i && select_x == 0) {
            party_panel.innerHTML += " <<< ";
        }
        party_panel.innerHTML += "<br>";
    }
    skill_panel.innerHTML = "";
    for(i=0;i<party[select_y].skills.length;i++) {
        skill_panel.innerHTML += skill_arr[party[select_y].skills[i]];
        if (skill_select == i && select_x == 1) {
            skill_panel.innerHTML += " <<< ";
        }
        skill_panel.innerHTML += "<br>";
    }
} //partyUpdate
partyUpdate();

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

    document.body.appendChild(graphic)

    this.div = graphic;
} //creating a boss's limb

var boss;

function test() {
    var limb1 = new limb("lewa reka", 100, 1, 100, 400);
    var limb2 = new limb("prawa reka", 100, 2, 400, 400);
    var limb3 = new limb("lewa noga", 100, 3, 700, 400);
    var limb4 = new limb("prawa noga", 100, 4, 1000, 400);
    boss = [limb1, limb2, limb3, limb4];
}

var ongoing; //stores used skill when chosing target
var enemy_select = 0; //stores selected enemy

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 39) {        // Right
        switch(state) {
            case 1: //right in combat menu
                if (select_x == 0) select_x = 1;
                break;
            case 2: // right in enemy select
                if (enemy_select < boss.length - 1) enemy_select += 1;
                boss[enemy_select-1].div.style.border = null;
                boss[enemy_select].div.style.border = "3px solid black";
        }
        partyUpdate();
    } else if (event.keyCode == 40) { // down
        switch(state) {
            case 1:     //down in combat menu
                if (select_y < party.length - 1 && select_x == 0) {
                    select_y += 1;
                } else if (skill_select < party[select_y].skills.length - 1 && select_x == 1) {
                    skill_select += 1;
                }
        }
        partyUpdate();
    } else if (event.keyCode == 37) { // Left
        switch(state) {
            case 1:     //left in combat menu
                if (select_x == 1) select_x = 0;
                break;
            case 2:     //left in enemy selection
                if (enemy_select != 0) enemy_select -= 1;
                boss[enemy_select+1].div.style.border = null;
                boss[enemy_select].div.style.border = "3px solid black";
        }
        partyUpdate();
    } else if (event.keyCode == 38) { // Up
        switch(state) {
            case 1:     //up in combat menu
                if (select_y != 0 && select_x == 0) {
                    select_y -= 1;
                } else if (skill_select != 0 && state == 1) skill_select -= 1;
        }
        partyUpdate();
    } else if (event.keyCode == 32) { //Space
        switch(state) {
            case 2:     //space in enemy selection
                if (boss[enemy_select].hp > 10){
                    boss[enemy_select].hp -= 10;
                    boss[enemy_select].div.style.background = "hsl(" + (boss[enemy_select].hp / boss[enemy_select].maxhp) * 120 + ", 100%, 50%)";
                }
                boss[enemy_select].div.style.border = null;
                state = 1;
                break;
            case 1:
                if (select_x == 1) {        //space in combat menu
                    boss[enemy_select].div.style.border = "3px solid black";
                    ongoing = party[select_y].skills[i];
                    state = 2;
                }
        }   
}});
test();