//creating a party

var party = [];             // array of party members
var state = 1;              // 0 - management    1 - combat_skill_select    2 - combat_enemy_select    3 - story
var select_x = 0;           // select on x axis
var select_y = 0;           // select on y axis (it's easier this way)

var panel;

var bars = ["stan statku", "morale", "paliwo", "racje"];
var buttons = ["napraw", "kup", "pracuj", "ekwipunek"];
var statek = [1000, 750, 500, 500]; // stan, morale, paliwo, racje

function createManagementPanel() {
    if (panel != null) {
        panel.remove();
    }    
    panel = document.createElement("div");
    let fade = document.createElement("div");
    panel.style.left = "0px";
    panel.style.width = window.innerWidth * 0.4 + "px";
    panel.style.height = window.innerHeight + "px";
    panel.style.top = "0px";
    panel.style.backgroundColor = "rgba(6, 6, 12, 0.5)";

    fade.style.left = window.innerWidth * 0.4 + "px";
    fade.style.width = window.innerWidth * 0.1 + "px";
    fade.style.height = window.innerHeight + "px";
    fade.style.top = "0px";
    fade.style.background = "linear-gradient(to right, rgba(6, 6, 12, 0.5), transparent)";
    
    document.body.appendChild(panel);
    document.body.appendChild(fade);

    let textBox = document.createElement("p");
    textBox.id = "text-cont";
    textBox.style.fontSize = "30px";
    textBox.style.paddingLeft = "35px";

    panel.appendChild(textBox);

    let progressBar = document.createElement("div");
    progressBar.style.width = "80%";
    progressBar.style.backgroundColor = "rgba(135, 110, 70, 0.1)";
    progressBar.style.height = "35px";
    progressBar.style.borderRadius = "15px";

    let status = document.createElement("div");
    status.style.background = "rgb(107, 87, 70)";
    status.style.width = "10%";
    status.style.height = "100%";
    status.style.borderRadius = "15px";

    for(let i=0;i<4;i++) {
        textBox.innerHTML += bars[i] + ":<br>";
        progressBar.id = bars[i];
        status.id = bars[i] + "-status";
        textBox.appendChild(progressBar);
        progressBar.appendChild(status);
        textBox.innerHTML += "<br>"
    }

    textBox.innerHTML += "<p style='text-align: center; width: 82%; font-size: 40px; margin: 0px;'>Dzien:</p>";

    let day = document.createElement("div");
    day.style.width = "90%";
    day.style.height = "100px";
    day.style.fontSize = "70px";
    day.style.margin = "0px";
    day.style.background = "linear-gradient(0.25turn, transparent, rgba(135, 110, 70, 0.1), transparent)";
    day.innerHTML = "<p id='day-transparent'>&emsp;&emsp;&emsp;&emsp;0&emsp;&emsp;1&emsp;&emsp;2</p>";
    textBox.appendChild(day);

    let cordsY = [110, 210, 110, 210];
    let cordsX = [0, 150, 300, 450];

    for(j=0;j<4;j++) {
        let button = document.createElement("div");
        button.style.borderRadius = "40px";
        button.style.marginLeft = cordsX[j] + "px";
        button.style.marginTop = cordsY[j] + "px";
        button.style.height = "90px";
        button.style.width = "150px";
        button.style.fontSize = "25px";
        button.style.border = "3px solid rgb(107, 87, 70)";
        button.style.display = "flex";
        button.style.alignItems = "center"; 
        button.style.justifyContent = "center"; 

        button.innerHTML = buttons[j];
        button.id = buttons[j];
        textBox.appendChild(button);
    } 


} //createManagementPanel
createManagementPanel();

function updateManagementPanel() {
    for (i=0;i<4;i++) {
        let focus = document.getElementById(bars[i] + '-status');
        focus.style.width = statek[i] / 10 + "%";
    }
} //updateManagementPanel
updateManagementPanel();

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

var party_panel;
var skill_panel;

function createCombatPanel() {    //creating a panel for combat choices
    if (panel != null) {
        panel.remove();
    }
    panel = document.createElement("div");
     
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
} //createConbatPanel
//createCombatPanel();

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
//partyUpdate();

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
    let limb1 = new limb("lewa reka", 100, 1, 100, 400);
    let limb2 = new limb("prawa reka", 100, 2, 400, 400);
    let limb3 = new limb("lewa noga", 100, 3, 700, 400);
    let limb4 = new limb("prawa noga", 100, 4, 1000, 400);
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
                select_x = 0;
                partyUpdate();
                break;
            case 1:
                if (select_x == 1) {        //space in combat menu
                    boss[enemy_select].div.style.border = "3px solid black";
                    ongoing = party[select_y].skills[i];
                    state = 2;
                }
        }   
}});
