//creating a party

var party = [];             // array of party members
var state = 0;              // 0 - management    1 - combat_skill_select    2 - combat_enemy_select    3 - story    5 - store   6 - allies  7 - health and amp selection
var select_x = 1;           // select on x axis
var select_y = 1;           // select on y axis (it's easier this way)

var panel;
var dayOfJourney = 1;
var weekOfJouney = 0;

var bars = ["stan statku", "morale", "paliwo", "racje"];
var buttons = ["napraw", "kup", "pracuj", "wolne"];
var ship = [1000,750,500,500,2000];

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
    
    textBox.innerHTML += "<p style='text-align: center; width: 88%; font-size:" + window.innerHeight*0.037+ "px; margin: 0px;'>Dzień:</p>";

    let day = document.createElement("div");

    day.id = "day-cont";
    day.style.background = "linear-gradient(0.25turn, transparent, rgba(135, 110, 70, 0.1), transparent)";
    let grad = [0.2, 0.5, 1, 0.5, 0.2];
    textBox.appendChild(day);
    for (i=0;i<5;i++) {
        let day_tile = document.createElement("div");
        day_tile.style.color = "rgba(107, 87, 70," + grad[i] + ")";
        day_tile.style.left = 20 * i + "%";
        day_tile.id = "tile-" + i;
        day_tile.style.marginTop = window.innerHeight * 0.002;
        day.appendChild(day_tile);
        if (dayOfJourney + i - 2 > 0 && dayOfJourney + i - 2 < 7) {
            day_tile.innerHTML = (dayOfJourney + weekOfJouney * 7) + (i - 2);
        } else if (dayOfJourney + i - 2 == 7) {
            day_tile.style.color ="rgba(222, 68, 51," + grad[i] + ")";
            day_tile.innerHTML = (dayOfJourney + weekOfJouney * 7) + (i - 2);
        } else {
            day_tile.innerHTML = "";
        }
        day.appendChild(day_tile);
    }
    let cordsY = [11, 20, 11, 20];
    let cordsX = [0, window.innerWidth / 12.4, 2 * window.innerWidth / 12.4, 3 * window.innerWidth / 12.4];

    for(j=0;j<4;j++) {
        let button = document.createElement("div");
        button.style.marginLeft = cordsX[j] + "px";
        button.style.marginTop = cordsY[j] + "vh";
        button.style.width = window.innerWidth / 12.4 + "px";
        button.classList.add("management-button")
        button.innerHTML = buttons[j];
        button.id = "button-" + j;
        textBox.appendChild(button);    
    } 

    let button = document.createElement("div");
    button.style.width =  window.innerWidth * 0.32 + "px";
    button.id = "next_day";
    button.classList.add("management-button");
    button.style.border = "5px solid rgb(197, 173, 137)";
    if (dayOfJourney != 7) {
        button.innerHTML = "Nastepny dzien";
    } else {
        button.innerHTML = "Zaśnij";
    }
    button.style.top = window.innerHeight * 0.85 + "px";
    button.style.marginLeft = "0px";


    textBox.appendChild(button);
    
    let money = document.createElement('div');
    money.style.left = window.innerWidth - 400 + "px";
    money.style.top = window.innerHeight - 70 + "px";
    money.id = "money";
    money.innerHTML = ship[4] + "$";

    document.getElementById('main').appendChild(money);
    updateManagementPanel();
} //createManagementPanel
createManagementPanel();

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
updateManagementPanel();

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

function ally(name, hp, skills, mp, id, price, desc) {
    this.name = name;
    this.org_name = name;
    this.hp = hp;
    this.maxhp = hp;
    this.skills = skills;
    this.mp = mp;
    this.maxmp = mp;
    this.id = id;
    this.price = price
    this.desc = desc;
    this.usable = true;
    this.protected = false;
    ally_store_list.push(this);
    if (id == 0) {
        party.push(this);
    }
} //creating an ally

function skill(name, type, effect, price) {
    this.name = name;
    this.type = type; //dmg - atak  hel - zdrowie   def - tarcza    amp - dmg boost
    this.effect = effect;
    this.price = price;
}

var skill_arr = [new skill("cios", "dmg", 50, 3), new skill("orzeźwienie", "hel", 20, 6), new skill("tarcza", "def", 20, 3),
new skill("ciemna magia", "dmg", 180, 9), new skill("modlitwa", "amp", 100, 12)];

var party_panel;
var skill_panel;
var desc_panel;

function createCombatPanel() {    //creating a panel for combat choices
    if (panel != null) {
        panel.remove();
    }
    
    document.getElementById("money").remove();

    document.getElementById("management-fade").remove();
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
    skill_panel.id = "skill-panel";
    skill_panel.style.left = window.innerWidth * 0.2 + "px";
    panel.appendChild(skill_panel);

    desc_panel = document.createElement("div");
    desc_panel.id = "desc-panel";
    panel.appendChild(desc_panel);
} //createConbatPanel
//createCombatPanel();

var skill_select = 0;

function partyUpdate() {    //updating party members
    let progressBar = document.createElement('div');
    progressBar.style.height = "10px";
    progressBar.classList.add('progress-bar');
    let status = document.createElement('div');
    status.style.height = "10px";
    status.classList.add('progress-bar-status')

    if (select_y > party.length - 1) select_y = 0;

    party_panel.innerHTML = "Party:<br>";
    for(i=0;i<party.length;i++) {   
        if (who == i) {
            party_panel.innerHTML += "<span style='color: rgb(197, 173, 137);'>" + party[i].name + "</span><span style='float: right;'>" +
            party[i].mp + "</span>";
        } else {
            party_panel.innerHTML += party[i].name + "<span style='float: right;'>" + party[i].mp + "</span>";
        }
        party_panel.innerHTML += "<br>";
        party_panel.appendChild(progressBar)
        console.log("who: " + who);
        if(party[i].protected) status.style.background = "rgb(30, 123, 123)";
        else if (party[i].usable == false) {
            status.style.background = "rgb(153, 51, 51)";
        } 
        else status.style.background = "rgb(107, 87, 70)";
        status.style.width = party[i].hp / party[i].maxhp * 100 + "%"; 
        progressBar.appendChild(status);
    }
    skill_panel.innerHTML = "Skills:<br>";
    for(i=0;i<party[who].skills.length;i++) {
        if (skill_select == i && select_x == 1) {
            skill_panel.innerHTML += "<span style='color: rgb(197, 173, 137);'>" + skill_arr[party[who].skills[i]].name + "</span>";
        } else {
            skill_panel.innerHTML += skill_arr[party[who].skills[i]].name;
        }
        skill_panel.innerHTML += "<br>";
    }
    let usable = party.length;
    for(i=0;i<party.length;i++) {
        if(party[i].hp <= 0 || party[i].usable == false) {
            party[i].usable = false;
            usable--;
        } 
    }
    if(usable==0) {
        let fade = document.getElementById('fade');
        fade.style.backgroundColor = "black";
        fade.innerHTML = "KONIEC";
        state = 4;
    }
} //partyUpdate
//partyUpdate();

function limb(name, hp, x, y) {
    this.name = name;
    this.hp = hp;
    this.maxhp = hp;

    var graphic = document.createElement("div");
    graphic.id = name;
    graphic.style.background = "black";
    graphic.style.width = "100px";
    graphic.style.color = "white";
    graphic.style.display = "flex";
    graphic.style.alignItems = "center";
    graphic.style.justifyContent = "center";
    graphic.style.height = "100px";
    graphic.style.position = "absolute";
    graphic.style.left = x+"vw";
    graphic.style.top = y/2+"vh";

    this.effect = -1;

    document.getElementById('main').appendChild(graphic)

    this.div = graphic;
} //creating a boss's limb

var boss;
var boss_skills;

function test() {
    let limb1 = new limb("lewa reka", 100, 100, 100);
    let limb2 = new limb("prawa reka", 100, 400, 100);
    let limb3 = new limb("lewa noga", 100, 700, 100);
    let limb4 = new limb("prawa noga", 100, 1000, 100);
    boss = [limb1, limb2, limb3, limb4];
}

function boss1() {
    createCombatPanel()
    partyUpdate()
    let limb1 = new limb("trzecia reka", 100, 10, 70);
    let limb2 = new limb("pierwsza reka", 100, 20, 10);
    let limb3 = new limb("oko", 250, 50, 50);
    let limb4 = new limb("czwarta reka", 100, 70, 60);
    let limb5 = new limb("druga reka", 100, 80, 20);
    boss = [limb1, limb2, limb3, limb4, limb5];
    boss_skills = ["cios", "lap", "tarcza"];
}

var ally_store_list = []
new ally("player", 100, [0,1,2], 100, 0, 100);
new ally("Żołnierz", 150, [0,1,2], 100, 1, 500, "opis żołnierza");
new ally("Mag", 150, [0,1,2], 100, 2, 500, "opis maga");
new ally("Uzdrowiciel", 150, [0,1,2], 100, 3, 500, "opis uzdrowiciela");

var ally_store_focus_x = 1;
var ally_store_focus_y = 1;

function createAllyStoreMenu() {
    panel.innerHTML = "";
    let ally_store = document.createElement("div");
    ally_store.id = "ally-store";
    ally_store.innerHTML = ally_store_list[ally_store_focus_x].name + "<br><br><span style='font-size: 1.5vw;'>Punkty Życia - " +
    ally_store_list[ally_store_focus_x].maxhp + "<br>Punkty Many - " + ally_store_list[ally_store_focus_x].maxmp +
    "<br>Cena - " + ally_store_list[ally_store_focus_x].price + "$<br><br>" +
    ally_store_list[ally_store_focus_x].desc + "<br></span>";

    panel.appendChild(ally_store);

    let button_info = ["kup", "wstecz", 20, 10];

    for(i=0;i<2;i++) {
        let button = document.createElement("div");
        button.style.width = window.innerWidth * 0.32 + "px"
        button.style.marginLeft = 1 + "vw";
        button.style.bottom = button_info[i + 2] + "vh";
        button.classList.add("management-button")
        button.innerHTML = button_info[i];
        button.id = "ally-button-" + i;

        if(ally_store_focus_y == i) {
            button.style.border = "5px solid rgb(197, 173, 137)";
        }

        ally_store.appendChild(button);  
    }
}

function nextDay() {
    turn = false;
    let fade = document.getElementById('fade');
    fade.style.backgroundColor = "black";

    dayOfJourney+=1;
    if(dayOfJourney != 8) fade.innerHTML = "DZIEŃ " + (dayOfJourney + weekOfJouney * 7);
    else fade.innerHTML = "WE ŚNIE";

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
                    day_cont.innerHTML = (dayOfJourney + weekOfJouney * 7) + (i - 2);
                } else if (dayOfJourney + i - 2 == 7) {
                    day_cont.style.color ="rgba(222, 68, 51," + grad[i] + ")";
                    day_cont.innerHTML = (dayOfJourney + weekOfJouney * 7) + (i - 2);
                } else {
                    day_cont.innerHTML = "";
                }
            }
        }   
        if (dayOfJourney == 7) {
            document.getElementById("next_day").innerHTML = "Zaśnij";
        }
        if (dayOfJourney == 8) {
            select_x = 1;
            state = 1;
            boss1();
        }
    }, 2000);
    setTimeout(() => {
        fade.innerHTML = "";
        turn = true;
    }, 3000);
}

function enemyTurn() {
    if(turns > 0) {
        turn = false;
        let target = Math.round(Math.random() * (party.length - 1));
        let ability =  boss_skills[Math.round(Math.random() * (boss_skills.length - 1))];
        switch(ability) {
            case "cios":
                if (party[target].protected == true) {
                    desc_panel.innerHTML = boss[boss.length - turns].name + " używa ciosu.<br>" + 
                    party[target].name + " traci tarcze.";
                    party[target].protected = false;
                } else {
                    party[target].hp -= 40;
                    desc_panel.innerHTML = boss[boss.length - turns].name + " używa ciosu.<br>" +
                    party[target].name + " traci 40PŻ.";
                }
                break;
            case "lap":
                if (party[target].protected == true) {
                    desc_panel.innerHTML = boss[boss.length - turns].name + " stara sie złapać jednego z twoich towarzyszy.<br>" + 
                    party[target].name + " traci tarcze.";
                    party[target].protected = false;
                } else if (party[target].usable == false) {
                    desc_panel.innerHTML = boss[boss.length - turns].name + " stara sie złapać jednego z twoich towarzyszy ale byl on juz zlapany<br>"
                } else {
                    party[target].usable = false;
                    desc_panel.innerHTML = boss[boss.length - turns].name + " stara sie złapać jednego z twoich towarzyszy.<br>" +
                    party[target].name + " zostaje złapany.";
                    boss[boss.length - turns].effect = target;
                    boss[boss.length - turns].div.style.background = "white";
                }
                break;
            case "tarcza":
                desc_panel.innerHTML = "Tarcza";
                break;
        }
        partyUpdate();
        setTimeout(() => {
            desc_panel.innerHTML = "";
            turns--;
            enemyTurn();  
        }, 5000);
    } else {
        turn = true;
        for(i=0;i<party.length;i++) {
            if (party[i].usable) turns++;
        }
    }
}

var ongoing; //stores used skill when chosing target
var enemy_select = 0; //stores selected enemy
var turns = 1;
var turn = true;
var who = 0;
var type = "";

document.addEventListener('keydown', function (event) {
    if(turn) {
        if (event.keyCode == 39) {        // Right
            switch(state) {
                case 0: //right in management menu
                    if (select_x < 3 && select_y == 0) {
                        document.getElementById("button-" + select_x).style.border = "5px solid rgb(107, 87, 70)";
                        select_x += 1;
                        document.getElementById("button-" + select_x).style.border = "5px solid rgb(197, 173, 137)";
                    } 
                    break;
                case 2: // right in enemy select
                    if (boss.length > 1) {
                        if (enemy_select < boss.length - 1) enemy_select += 1;
                        boss[enemy_select-1].div.style.filter = "drop-shadow(0px 0px 0px hsl(" + (boss[enemy_select].hp / boss[enemy_select].maxhp) * 120 + ", 100%, 50%))";
                        boss[enemy_select-1].div.innerHTML = "";
                        boss[enemy_select].div.style.filter = "drop-shadow(0px 0px 10px hsl(" + (boss[enemy_select].hp / boss[enemy_select].maxhp) * 120 + ", 100%, 50%))";
                        boss[enemy_select].div.innerHTML = boss[enemy_select].hp + " / " + boss[enemy_select].maxhp;
                        partyUpdate();
                    }
                    break;
                case 6:
                    if (ally_store_focus_x < ally_store_list.length - 1) ally_store_focus_x += 1;
                    createAllyStoreMenu();
                    break;
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
                    if (skill_select < party[select_y].skills.length - 1) skill_select += 1;
                    partyUpdate();
                    break;
                case 5:
                    if (select_y != 3) {
                        select_y += 1;
                        createStoreMenu();
                    }
                    break;
                case 6:
                    if (ally_store_focus_y == 0) ally_store_focus_y = 1;
                    createAllyStoreMenu();
                    break;
                case 7:
                    if (select_y < party.length - 1){
                        party[select_y].name = party[select_y].org_name
                        select_y++;
                        party[select_y].name = party[select_y].name + " <<<";
                        partyUpdate();
                    } 
                    break;
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
                case 2:     //left in enemy selection
                    if(boss.length > 1) {
                        if (enemy_select != 0) enemy_select -= 1;
                        boss[enemy_select+1].div.style.filter = "drop-shadow(0px 0px 0px hsl(" + (boss[enemy_select].hp / boss[enemy_select].maxhp) * 120 + ", 100%, 50%))";
                        boss[enemy_select+1].div.innerHTML = "";
                        boss[enemy_select].div.style.filter = "drop-shadow(0px 0px 10px hsl(" + (boss[enemy_select].hp / boss[enemy_select].maxhp) * 120 + ", 100%, 50%))";
                        boss[enemy_select].div.innerHTML = boss[enemy_select].hp + " / " + boss[enemy_select].maxhp;
                        partyUpdate();
                    }
                    break;
                case 6:
                    if (ally_store_focus_x > 1) ally_store_focus_x -= 1;
                    createAllyStoreMenu();
                    break;
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
                    if (skill_select != 0 && state == 1) skill_select -= 1;
                    partyUpdate();
                    break;
                case 5:
                    if (select_y != 0) {
                        select_y -= 1
                        createStoreMenu();
                    }
                    break;
                case 6:
                    if (ally_store_focus_y == 1) ally_store_focus_y = 0
                    createAllyStoreMenu();
                    break;
                case 7:
                    if (select_y > 0){
                        party[select_y].name = party[select_y].org_name;
                        select_y--;    
                        party[select_y].name = party[select_y].name + " <<<";
                        partyUpdate();
                    }
                    break;
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
                    if (boss[enemy_select].hp > 50){
                        boss[enemy_select].hp -= 50;
                        boss[enemy_select].div.style.filter = "drop-shadow(0px 0px 10px hsl(" + (boss[enemy_select].hp / boss[enemy_select].maxhp) * 120 + ", 100%, 50%))";
                        boss[enemy_select].div.innerHTML = boss[enemy_select].hp + " / " + boss[enemy_select].maxhp;
                        if(boss[enemy_select].effect != -1) {
                            if (party[boss[enemy_select].effect].hp > 0) {
                                party[boss[enemy_select].effect].usable = true;
                            }
                            boss[enemy_select].div.style.background = black;
                            boss[enemy_select].effect = -1;
                        }
                    } else {
                        document.getElementById(boss[enemy_select].name).remove();
                        boss.splice(enemy_select, 1);
                        enemy_select = 0;
                        if (boss.length == 0) {
                            state = 0;
                            weekOfJouney++;
                            dayOfJourney = 1;
                            createManagementPanel();
                            updateManagementPanel();
                        } else {
                            boss[enemy_select].div.style.filter = "drop-shadow(0px 0px 0px hsl(" + (boss[enemy_select].hp / boss[enemy_select].maxhp) * 120 + ", 100%, 50%))";
                            boss[enemy_select].div.innerHTML = "";
                        }
                    }
                    turns -= 1;
                    if(turns == 0) {
                        turns = boss.length;
                        who = 0;
                        while(party[who].usable == false) who++;
                        enemyTurn();
                    }
                    else {
                        who++;
                        while(party[who].usable == false) who++;
                    }
                    console.log("turns: " + turns);
                    partyUpdate();
                    state = 1;
                    select_x = 1;
                    break;
                case 1:
                    if (select_x == 1) {        //space in combat menu
                        switch(skill_arr[party[select_y].skills[skill_select]].type) {
                            case "dmg":
                                boss[enemy_select].div.style.filter = "drop-shadow(0px 0px 10px hsl(" + (boss[enemy_select].hp / boss[enemy_select].maxhp) * 120 + ", 100%, 50%))";
                                boss[enemy_select].div.innerHTML = boss[enemy_select].hp + " / " + boss[enemy_select].maxhp;
                                ongoing = party[select_y].skills[i];
                                state = 2;
                                break;
                            case "hel":
                                console.log("hel");
                                state = 7
                                type = "hel";
                                party[select_y].name += " <<<";
                                break;
                            case "amp":
                                console.log("amp");
                                state = 7
                                type = "amp";
                                party[select_y].name += " <<<";
                                break;
                            case "def":
                                console.log("def");
                                state = 7
                                type = "def";
                                party[select_y].name += " <<<";
                                break;
                        }
                        partyUpdate();
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
                        case 2:
                            if(ally_store_list.length > 1) {
                                createAllyStoreMenu();
                                state = 6;
                            }
                            break;
                        case 3:
                            state = 0;
                            createManagementPanel();
                            select_y = 1;
                            break;
                    }
                    document.getElementById("money").innerHTML = ship[4] + "$";
                    break;
                case 6:
                    if(ally_store_focus_y == 1) {
                        createStoreMenu();
                        state = 5;
                    } else {
                        if (ally_store_list[ally_store_focus_x].price <= ship[4]) {
                            party.push(ally_store_list[ally_store_focus_x]);
                            ship[4] -= ally_store_list[ally_store_focus_x].price
                            ally_store_list.splice(ally_store_focus_x, 1);
                            ally_store_focus_x = 1;
                            createStoreMenu();
                            turns += 1;
                            state = 5;
                            updateManagementPanel();
                        }
                    }
                    break;
                case 7:
                    switch(type) {
                        case "hel":
                            if(party[select_y].hp + 30 >= party[select_y].maxhp) party[select_y].hp = party[select_y].maxhp;
                            else party[select_y].hp += 30;
                            break;
                        case "def":
                            party[select_y].protected = true;
                            break;
                    }
                    party[select_y].name = party[select_y].org_name
                    state = 1;
                    turns--;
                    console.log("turns: " + turns);
                    if(turns == 0) {
                        turns = boss.length;
                        who = 0;
                        while(party[who].usable == false) who++;
                        enemyTurn();
                    }
                    else {
                        who++
                        while(party[who].usable == false) who++;
                    }
                    partyUpdate();
            }
        }
    }
});
//test();
