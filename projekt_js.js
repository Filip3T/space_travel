//creating a party

var party = [];             // array of party members
var state = 1;              // 0 - management    1 - combat_skill_select    2 - combat_enemy_select    3 - story    5 - store
var select_x = 0;           // select on x axis
var select_y = 1;           // select on y axis (it's easier this way)

var panel;
var dayOfJourney = 1;

var bars = ["stan statku", "morale", "paliwo", "racje"];
var buttons = ["napraw", "kup", "pracuj", "wolne"];
var ship = [1000,750,500,500,100];

function createManagementPanel() {
    if (panel != null) {
        panel.innerHTML = "";
    }
    main.innerHTML = "";
    panel = document.createElement("div");
    let fade = document.createElement("div");
    panel.id = "management-panel"
    panel.style.backgroundColor = "rgba(6, 6, 12, 0.5)";
    fade.style.left = window.innerWidth * 0.4 + "px";
    fade.id = "management-fade";

    document.getElementById('main').appendChild(panel);
    document.getElementById('main').appendChild(fade);

    let textBox = document.createElement("p");
    textBox.id = "text-cont";
    panel.appendChild(textBox);
    let progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    let status = document.createElement("div");
    status.classList.add("progress-bar-status");

    for(let i=0;i<4;i++) {
        textBox.innerHTML += bars[i] + ":<br>";
        progressBar.id = bars[i];
        status.id = bars[i] + "-status";
        textBox.appendChild(progressBar);
        progressBar.appendChild(status);
        textBox.innerHTML += "<br>"
    }
    
    textBox.innerHTML += "<p style='text-align: center; width: 88%; font-size: 40px; margin: 0px;'>Dzień:</p>";

    let day = document.createElement("div");
    day.style.width = "90%";

    day.id = "day-cont";
    day.style.background = "linear-gradient(0.25turn, transparent, rgba(135, 110, 70, 0.1), transparent)";
    let grad = [0.2, 0.5, 1, 0.5, 0.2];
    textBox.appendChild(day);
    for (i=0;i<5;i++) {
        let day_tile = document.createElement("div");
        day_tile.style.color = "rgba(107, 87, 70," + grad[i] + ")";
        day_tile.style.left = 20 * i + 1 + "%";
        day_tile.id = "tile-" + i;
        day.appendChild(day_tile);
        if (dayOfJourney + i - 2 > 0 && dayOfJourney + i - 2 < 7) {
            day_tile.innerHTML = dayOfJourney + (i - 2);
        } else if (dayOfJourney + i - 2 == 7) {
            day_tile.style.color ="rgba(222, 68, 51," + grad[i] + ")";
            day_tile.innerHTML = dayOfJourney + (i - 2);
        } else {
            day_tile.innerHTML = "";
        }
        day.appendChild(day_tile);
    }
    let cordsY = [110, 210, 110, 210];
    let cordsX = [0, window.innerWidth / 12.4, 2 * window.innerWidth / 12.4, 3 * window.innerWidth / 12.4];

    for(j=0;j<4;j++) {
        let button = document.createElement("div");
        button.style.marginLeft = cordsX[j] + "px";
        button.style.marginTop = cordsY[j] + "px";
        button.style.width = window.innerWidth / 12.4 + "px";
        button.classList.add("management-button")
        button.innerHTML = buttons[j];
        button.id = "button-" + j;
        textBox.appendChild(button);    
    } 

    let button = document.createElement("div");
    button.style.width = "80%";
    button.id = "next_day";
    button.classList.add("management-button");
    button.style.border = "5px solid rgb(197, 173, 137)";
    button.innerHTML = "Nastepny dzien";
    button.style.top = window.innerHeight * 0.85 + "px";
    button.style.left = window.innerWidth * 0.016 + "px";


    textBox.appendChild(button);
    
    let money = document.createElement('div');
    money.style.left = window.innerWidth - 400 + "px";
    money.style.top = window.innerHeight - 70 + "px";
    money.id = "money";
    money.innerHTML = ship[4] + "$";

    document.getElementById('main').appendChild(money);
    updateManagementPanel();
} //createManagementPanel
//createManagementPanel();

function updateManagementPanel() {
 /*    if(ship[0] <= 0) {
        panel.innerHTML = "STATEK ZOSTAL ZNISZCZONY!!! KONIEC!!!";
        state = 4;
    } if (ship[1] <= 0) {
        panel.innerHTML = "CALA ZALOGA CIE OPUSZCZA!!! KONIEC!!!";
        state = 4;
    } if (ship[2] <= 0) {
        panel.innerHTML = "SKONCZLYLO SIE PALIWO!!! KONIEC!!!";
        state = 4;
    } if (ship[3] <= 0) {
        panel.innerHTML = "SKONCZYLY SIE RACJE!!! KONIEC!!!";
        state = 4;
    } */
    if(ship[0] >= 1000) {
        ship[0] = 1000;
    } if (ship[1] > 1000) {
        ship[1] = 1000;
    } if (ship[2] > 1000) {
        ship[2] = 1000;
    } if (ship[3] > 1000) {
        ship[3] = 1000;
    }
    if (state == 0) {
        for (i=0;i<4;i++) {
            let focus = document.getElementById(bars[i] + '-status');
            focus.style.width = ship[i] / 10 + "%";
        }
    } 
    document.getElementById('money').innerHTML = ship[4] + "$";
} //updateManagementPanel
//updateManagementPanel();

function createStoreMenu() {
    panel.innerHTML = "";
    let heights = [0,0.2,0.4,0.7];
    let nazwy = ["paliwo 10% - 100$", "racje 10% - 200$", "najemnicy - menu", "wstecz"];
    for(i=0;i<4;i++) {
        let button = document.createElement("div");
        button.classList.add("management-button");
        button.style.width = "30vw";
        button.style.margin = "4vw";
        button.style.top = heights[i] * window.innerHeight + "px";
        button.innerHTML = nazwy[i];
        if (select_y == i) {
            button.style.border = "5px solid rgb(197, 173, 137)";
        }
        panel.appendChild(button);
        state = 5;
    }
}

function ally(name, hp, skills, mp) {
    this.name = name;
    this.hp = hp;
    this.maxhp = hp;
    this.skills = skills;
    this.mp = mp;
    this.maxmp = mp;
    party.push(this);    
} //creating an ally

function skill(name, type, effect, price) {
    this.name = name;
    this.type = type; //dmg - atak  hel - zdrowie   def - tarcza    amp - dmg boost
    this.effect = effect;
    this.price = price;
}

var skill_arr = [new skill("cios", "dmg", 50, 3).name, new skill("orzeźwienie", "hel", 20, 6).name, new skill("tarcza", "def", 20, 3).name,
new skill("ciemna magia", "dmg", 180, 9).name, new skill("modlitwa", "amp", 100, 12).name];

var mc = new ally("player", 100, [0,1,2], 100);
var test_ally = new ally("test", 100, [0,2], 999);

var party_panel;
var skill_panel;

function createCombatPanel() {    //creating a panel for combat choices
    if (panel != null) {
        panel.remove();
    }
    panel = document.createElement("div");
    
    panel.style.top = window.innerHeight * 0.7 + "px";
    panel.id = "combat-panel";
    document.getElementById('main').appendChild(panel);

    let fade_combat = document.createElement('div');
    fade_combat.id = "combat-fade";
    fade_combat.style.top = window.innerHeight * 0.7 - 150 + 'px';
    document.getElementById('main').appendChild(fade_combat);

    let panel_combat_line = document.createElement('div');
    panel_combat_line.id = "panel-line";
    panel_combat_line.style.left = window.innerWidth * 0.175 + "px";
    panel.appendChild(panel_combat_line);
    panel_combat_line = document.createElement('div');
    panel_combat_line.id = "panel-line";
    panel_combat_line.style.left = window.innerWidth * 0.5 + "px";
    panel.appendChild(panel_combat_line);

    party_panel = document.createElement("div");
    party_panel.id = "party-panel";
    panel.appendChild(party_panel);

    skill_panel = document.createElement("div");
    skill_panel.style.position = "absolute";
    skill_panel.id = "skill-panel";
    skill_panel.style.left = window.innerWidth * 0.2 + "px";
    panel.appendChild(skill_panel);
} //createConbatPanel
createCombatPanel();

var skill_select = 0;

function partyUpdate() {    //updating party members
    let progressBar = document.createElement('div');
    progressBar.style.height = "10px";
    progressBar.classList.add('progress-bar');
    let status = document.createElement('div');
    status.style.height = "10px";
    status.classList.add('progress-bar-status')

    party_panel.innerHTML = "Party:<br>";
    for(i=0;i<party.length;i++) {
        
        if (select_y == i && select_x == 0) {
            party_panel.innerHTML += "<span style='color: rgb(197, 173, 137);'>" + party[i].name + "</span><span style='float: right;'>" +
            party[i].mp + "</span>";
        } else {
            party_panel.innerHTML += party[i].name + "<span style='float: right;'>" + party[i].mp + "</span>";
        }
        party_panel.innerHTML += "<br>";
        party_panel.appendChild(progressBar)
        status.style.width = party[i].hp / party[i].maxhp * 100 + "%"; 
        progressBar.appendChild(status);
    }
    skill_panel.innerHTML = "Skills:<br>";
    for(i=0;i<party[select_y].skills.length;i++) {
        if (skill_select == i && select_x == 1) {
            skill_panel.innerHTML += "<span style='color: rgb(197, 173, 137);'>" + skill_arr[party[select_y].skills[i]] + "</span>";
        } else {
            skill_panel.innerHTML += skill_arr[party[select_y].skills[i]];
        }
        skill_panel.innerHTML += "<br>";
    }
} //partyUpdate
partyUpdate();

function limb(name, hp, x, y) {
    this.name = name;
    this.hp = hp;
    this.maxhp = hp;

    var graphic = document.createElement("div");
    graphic.style.background = "lime";
    graphic.style.width = "200px";
    graphic.style.height = "200px";
    graphic.style.position = "absolute";
    graphic.style.left = x+"px";
    graphic.style.top = y+"px";

    document.getElementById('main').appendChild(graphic)

    this.div = graphic;
} //creating a boss's limb

var boss;

function test() {
    let limb1 = new limb("lewa reka", 100, 100, 400);
    let limb2 = new limb("prawa reka", 100, 400, 400);
    let limb3 = new limb("lewa noga", 100, 700, 400);
    let limb4 = new limb("prawa noga", 100, 1000, 400);
    boss = [limb1, limb2, limb3, limb4];
}

function nextDay() {
    let fade = document.getElementById('fade');
    fade.style.backgroundColor = "black";

    dayOfJourney+=1;
    fade.innerHTML = "DZIEŃ " + dayOfJourney;

    setTimeout(() => {
        fade.style.backgroundColor = "transparent";
        ship[1] -= 80;
        ship[2] -= 200;
        ship[3] -= 150;
        let event = Math.round(Math.random() * 100);
        if(event > 50 && event <= 60) {
            panel.innerHTML = "<p style='font-size:40px;'>Okradziono nas!!!<br>Stracilismy troche paliwa i racji zywnosciowych!</p>";
            state = 3;
            ship[1] -= 150;
            ship[2] -= 200;
            ship[3] -= 100;
        } else if (event > 60 && event <= 70) {
            panel.innerHTML = "<p style='font-size:40px;'>Uderzlismy w asteroide!!!<br>Nasz statek jest w oplakanym stanie!!!</p>";
            ship[0] -= 300;
            state = 3;
        }
        if (state != 3) {
            updateManagementPanel();
        }
        if (state == 0) {
            for (i=0;i<5;i++) {
                let grad = [0.2, 0.5, 1, 0.5, 0.2];
                let day_cont = document.getElementById("tile-" + i)
                day_cont.style.color = "rgba(107, 87, 70," + grad[i] + ")";
                day_cont.style.left = 20 * i + 1 + "%";
                day_cont.id = "tile-" + i;
                if (dayOfJourney + i - 2 > 0 && dayOfJourney + i - 2 < 7) {
                    day_cont.innerHTML = dayOfJourney + (i - 2);
                } else if (dayOfJourney + i - 2 == 7) {
                    day_cont.style.color ="rgba(222, 68, 51," + grad[i] + ")";
                    day_cont.innerHTML = dayOfJourney + (i - 2);
                } else {
                    day_cont.innerHTML = "";
                }
            }
        }   
    }, 2000);
    setTimeout(() => {
        fade.innerHTML = "";
    }, 3000);
}

var ongoing; //stores used skill when chosing target
var enemy_select = 0; //stores selected enemy

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 39) {        // Right
        switch(state) {
            case 0: //right in management menu
                if (select_x < 3 && select_y == 0) {
                    document.getElementById("button-" + select_x).style.border = "5px solid rgb(107, 87, 70)";
                    select_x += 1;
                    document.getElementById("button-" + select_x).style.border = "5px solid rgb(197, 173, 137)";
                } 
                break;
            case 1: //right in combat menu
                if (select_x == 0) select_x = 1;
                partyUpdate();
                break;
            case 2: // right in enemy select
                if (enemy_select < boss.length - 1) enemy_select += 1;
                boss[enemy_select-1].div.style.border = null;
                boss[enemy_select].div.style.border = "3px solid black";
                partyUpdate();
        }
    } else if (event.keyCode == 40) { // down
        switch(state) {
            case 0: //down in management menu
                if (select_y == 0) {
                    select_y = 1;
                    document.getElementById("button-" + select_x).style.border = "5px solid rgb(107, 87, 70)";
                    document.getElementById("next_day").style.border = "5px solid rgb(197, 173, 137)";

                }
                break;
            case 1:     //down in combat menu
                if (select_y < party.length - 1 && select_x == 0) {
                    select_y += 1;
                } else if (skill_select < party[select_y].skills.length - 1 && select_x == 1) {
                    skill_select += 1;
                }
                partyUpdate();
                break;
            case 5:
                if (select_y != 3) {
                    select_y += 1;
                    createStoreMenu();
                    console.log(select_y);
                }
        }

    } else if (event.keyCode == 37) { // Left
        switch(state) {
            case 0:
                if (select_x >= 1 && select_y == 0) {
                    document.getElementById("button-" + select_x).style.border = "5px solid rgb(107, 87, 70)";
                    select_x -= 1;
                    document.getElementById("button-" + select_x).style.border = "5px solid rgb(197, 173, 137)";
                }
                break;
            case 1:     //left in combat menu
                if (select_x == 1) select_x = 0;
                partyUpdate();
                break;
            case 2:     //left in enemy selection
                if (enemy_select != 0) enemy_select -= 1;
                boss[enemy_select+1].div.style.border = null;
                boss[enemy_select].div.style.border = "3px solid black";
                partyUpdate();
        }
        
    } else if (event.keyCode == 38) { // Up
        switch(state) {
            case 0: //up in management menu
                case 0:
                if (select_y == 1) {
                    select_y = 0;
                    document.getElementById("button-" + select_x).style.border = "5px solid rgb(197, 173, 137)"; 
                    document.getElementById("next_day").style.border = "5px solid rgb(107, 87, 70)";

                }
                break;
            case 1:     //up in combat menu
                if (select_y != 0 && select_x == 0) {
                    select_y -= 1;
                } else if (skill_select != 0 && state == 1) skill_select -= 1;
                partyUpdate();
                break;
            case 5:
                if (select_y != 0) {
                    select_y -= 1
                    createStoreMenu();
                }
        }
        
    } else if (event.keyCode == 32) { //Space
        switch(state) {
            case 0:     //space in management menu
                if (select_y == 1) {
                    nextDay();
                    ship[4] += 400;
                } else {
                    switch(select_x) {
                        case 0:
                            ship[0] += 70;
                            ship[1] -= 20;
                            updateManagementPanel();
                            break;
                        case 1:
                            createStoreMenu();
                            break;
                        case 2:
                            ship[4] += 250;
                            ship[1] -= 100;
                            updateManagementPanel();
                            break;
                        case 3:
                            ship[1] += 280;
                            nextDay();
                    }
                }
                break;
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
                break;
            case 3:
                state = 0;
                createManagementPanel();
                updateManagementPanel();
                break;
            case 5:
                switch (select_y) {
                    case 0:
                        if (ship[4] >= 100) {
                            ship[4] -= 100;
                            ship[2] += 100;
                        }
                        break;
                    case 1:
                        if (ship[4] >= 200) {
                            ship[4] -= 200;
                            ship[3] += 200;
                        }
                        break;
                    case 3:
                        state = 0;
                        createManagementPanel();
                        select_y = 1;
                        break;
                }
                document.getElementById("money").innerHTML = ship[4] + "$";
        }   
}});
test();