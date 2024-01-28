//creating a party

var party = [];             // array of party members
var state = 0;              // 0 - management    1 - combat_skill_select    2 - combat_enemy_select    3 - story
var select_x = 0;           // select on x axis
var select_y = 1;           // select on y axis (it's easier this way)

var panel;
var dayOfJourney = 1;

var bars = ["stan statku", "morale", "paliwo", "racje"];
var buttons = ["napraw", "kup", "pracuj", "ekwipunek"];
var statek = [1000, 750, 500, 500, 100000]; // stan, morale, paliwo, racje, pieniadze

function createManagementPanel() {
    if (panel != null) {
        panel.remove();
    }    
    panel = document.createElement("div");
    let fade = document.createElement("div");
    panel.id = "management-panel"
    if (dayOfJourney == 1) {
        panel.style.backgroundColor = "rgba(6, 6, 12, 0.5)";
    } else {
        panel.style.backgroundColor = "rgba(6, 6, 12, 0.7)";
    }

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
    if (dayOfJourney == 5) {
        day.innerHTML = "<p id='day-transparent'>" + (dayOfJourney - 2) + "&emsp;&ensp;" + (dayOfJourney - 1) + "&emsp;&ensp;" + dayOfJourney + "&emsp;&ensp;" +
        (dayOfJourney + 1) + "&emsp;&ensp;</p><span>&emsp;&ensp;&emsp;&ensp;&emsp;&ensp;&emsp;&ensp;&emsp;&ensp;&ensp;7</span>";
    } else if (dayOfJourney == 6) {
        day.innerHTML = "<p id='day-transparent'>" + (dayOfJourney - 2) + "&emsp;&ensp;" + (dayOfJourney - 1) + "&emsp;&ensp;" + dayOfJourney +
        "&emsp;&ensp;</p><span>&emsp;&ensp;&emsp;&ensp;&emsp;&ensp;&emsp;&ensp;7</span>";
    } else if (dayOfJourney == 7) {
        day.innerHTML = "<p id='day-transparent'>" + (dayOfJourney - 2) + "&emsp;&ensp;" + (dayOfJourney - 1) + "&emsp;&ensp;&emsp;&ensp;</p><span>&emsp;&ensp;&emsp;&ensp;&emsp;7</span>";
    } else if (dayOfJourney == 1) {
        day.innerHTML = "<p id='day-transparent'>&emsp;&ensp;&emsp;&ensp;&emsp;1&emsp;&ensp;2&emsp;&ensp;3"; 
    } else {
        day.innerHTML = "<p id='day-transparent'>" +(dayOfJourney - 2) + "&emsp;&ensp;" + (dayOfJourney - 1) + "&emsp;&ensp;" + dayOfJourney + "&emsp;&ensp;" +
        (dayOfJourney + 1) + "&emsp;&ensp;" + (dayOfJourney + 2) + "</p>";
    }
    textBox.appendChild(day);

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
    updateManagementPanel();

    let money = document.createElement('div');
    money.style.left = window.innerWidth - 400 + "px";
    money.style.top = window.innerHeight - 70 + "px";
    money.id = "money";
    money.innerHTML = statek[4] + "$";

    document.getElementById('main').appendChild(money);
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
    document.getElementById('main').appendChild(panel);

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

    document.getElementById('main').appendChild(graphic)

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

function nextDay() {
    statek[1] -= 40;
    statek[2] -= 100;
    statek[3] -= 50;
    let event = Math.round(Math.random() * 100);
    if(event > 50 && event <= 60) {
        panel.innerHTML = "<p style='font-size:40px;'>Okradziono nas!!!<br>Stracilismy troche paliwa i racji zywnosciowych!</p>";
        state = 3;
        statek[1] -= 150;
        statek[2] -= 200;
        statek[3] -= 100;
    } else if (event > 60 && event <= 90) {
        panel.innerHTML = "<p style='font-size:40px;'>Uderzlismy w asteroide!!!<br>Nasz statek jest w oplakanym stanie!!!</p>";
        statek[0] -= 300;
        state = 3;
    }
    updateManagementPanel();
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
        }
        
    } else if (event.keyCode == 32) { //Space
        switch(state) {
            case 0:     //space in management menu
                if (select_y == 1) {
                    let fade = document.getElementById('fade');
                    fade.style.backgroundColor = "black";
    
                    dayOfJourney+=1;
                    fade.innerHTML = "DZIEŃ " + dayOfJourney;

                    setTimeout(() => {
                        fade.style.backgroundColor = "transparent";
                        nextDay();
                        if (state == 0) {
                            let cday = this.getElementById('day-cont');
                            if (dayOfJourney == 5) {
                                cday.innerHTML = "<p id='day-transparent'>" + (dayOfJourney - 2) + "&emsp;&ensp;" + (dayOfJourney - 1) + "&emsp;&ensp;" + dayOfJourney + "&emsp;&ensp;" +
                                (dayOfJourney + 1) + "&emsp;&ensp;</p><span>&emsp;&ensp;&emsp;&ensp;&emsp;&ensp;&emsp;&ensp;&emsp;&ensp;&ensp;7</span>";
                            } else if (dayOfJourney == 6) {
                                cday.innerHTML = "<p id='day-transparent'>" + (dayOfJourney - 2) + "&emsp;&ensp;" + (dayOfJourney - 1) + "&emsp;&ensp;" + dayOfJourney +
                                "&emsp;&ensp;</p><span>&emsp;&ensp;&emsp;&ensp;&emsp;&ensp;&emsp;&ensp;7</span>";
                            } else if (dayOfJourney == 7) {
                                cday.innerHTML = "<p id='day-transparent'>" + (dayOfJourney - 2) + "&emsp;&ensp;" + (dayOfJourney - 1) + "&emsp;&ensp;&emsp;&ensp;</p><span>&emsp;&ensp;&emsp;&ensp;&emsp;7</span>";
                            } else {
                                cday.innerHTML = "<p id='day-transparent'>" +(dayOfJourney - 2) + "&emsp;&ensp;" + (dayOfJourney - 1) + "&emsp;&ensp;" + dayOfJourney + "&emsp;&ensp;" +
                                (dayOfJourney + 1) + "&emsp;&ensp;" + (dayOfJourney + 2) + "</p>";
                            }
                        }   
                    }, 2000);
                    setTimeout(() => {
                        fade.innerHTML = "";
                    }, 3000);
                } else {
                    switch(select_x) {
                        case 0:
                            statek[0] += 50;
                            statek[1] -= 50;
                            updateManagementPanel();
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
            case 3:
                state = 0;
                createManagementPanel();
                break;
        }   
}});
