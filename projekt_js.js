//creating a party

var party = [];             // array of party members
var state = 0;              // 0 - management    1 - combat_skill_select    2 - combat_enemy_select    3 - story    5 - store   6 - allies  7 - health and amp selection    8 - message
var select_x = 1;           // select on x axis
var select_y = 1;           // select on y axis (it's easier this way)

var panel;
var dayOfJourney = 1;
var weekOfJouney = 0;

var hp_panel = document.createElement("div")
hp_panel.id = "hp";

var bars = ["stan statku", "morale", "paliwo", "racje"];
var buttons = ["napraw", "kup", "pracuj", "wolne"];
var ship = [1000,750,500,500,400];

var desc_message = "Zaczekać do następnego dnia?<br>Dzięki pracy załogi zyskam trochę gotówki."

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
        button.innerHTML = "Zaczekaj do nocy";
    }
    button.style.top = window.innerHeight * 0.85 + "px";
    button.style.marginLeft = "0px";

    textBox.appendChild(button);

    let management_desc = document.createElement("div");
    management_desc.id = "management-desc";
    document.getElementById('main').appendChild(management_desc);

    let desc_fade = document.createElement("div");
    desc_fade.id = "desc-fade";
    document.getElementById('main').appendChild(desc_fade)


    let money = document.createElement('div');
    money.id = "money";
    money.innerHTML = ship[4] + "$";

    document.getElementById('main').appendChild(money);
    updateManagementPanel();
} //createManagementPanel
createManagementPanel();

function updateManagementPanel() {
    if(ship[0] <= 0) {
        fade.style.backgroundColor = "black";
        fade.innerHTML = "Statek został zniszczony.";
        state = 4;
    } if (ship[1] <= 0) {
        fade.style.backgroundColor = "black";
        fade.innerHTML = "Cała załoga odeszła.";
        state = 4;
    } if (ship[2] <= 0) {
        fade.style.backgroundColor = "black";
        fade.innerHTML = "Skończyło się paliwo.";
        state = 4;
    } if (ship[3] <= 0) {
        fade.style.backgroundColor = "black";
        fade.innerHTML = "Skończyły nam się racje.";
        state = 4;
    }
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
            if (ship[i] >= 0) focus.style.width = ship[i] / 10 + "%";
            else focus.style.width = "0%";
        }
    }
    if (state == 0) {
        document.getElementById('money').innerHTML = ship[4] + "$";
        document.getElementById('management-desc').innerHTML = desc_message;
    }
} //updateManagementPanel
updateManagementPanel();

function createStoreMenu() {
    panel.innerHTML = "";
    let heights = [0,0.2,0.4,0.7];
    let nazwy = ["paliwo 10% - 100$", "racje 20% - 200$", "najemnicy - menu", "wstecz"];
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
    desc_message = "Co mógłbym kupić?"
    updateManagementPanel();
}

function ally(name, hp, skills, id, price, desc) {
    this.name = name;
    this.org_name = name;
    this.hp = hp;
    this.maxhp = hp;
    this.skills = skills;
    this.id = id;
    this.price = price
    this.desc = desc;
    this.boost = 1;
    this.usable = true;
    this.protected = false;
    ally_store_list.push(this);
    if (id == 0) {
        party.push(this);
    }
} //creating an ally

function skill(name, type, effect) {
    this.name = name;
    this.type = type; //dmg - atak  hel - zdrowie   def - tarcza    amp - dmg boost
    this.effect = effect;
}

var skill_arr = [new skill("cios", "dmg", 20), new skill("orzeźwienie", "hel", 20), new skill("tarcza", "def", 20),
new skill("ciemna magia", "dmg", 40), new skill("modlitwa", "amp", 1.3), new skill("okrzyk bojowy", "amp", 1.7), new skill("strzał", "dmg", 30),
new skill("znachorstwo", "hel", 40)];

var party_panel;
var skill_panel;
var desc_panel;

function createCombatPanel() {    //creating a panel for combat choices
    if (panel != null) {
        panel.remove();
    }
    if (state == 0) {
        document.getElementById("management-desc").remove();
        document.getElementById("desc-fade").remove();
        document.getElementById("money").remove();
        document.getElementById("management-fade").remove();
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
            party_panel.innerHTML += "<span style='color: rgb(197, 173, 137);'>" + party[i].name + "</span>";
        } else {
            party_panel.innerHTML += party[i].name;
        }
        party_panel.innerHTML += "<br>";
        party_panel.appendChild(progressBar)
        if(party[i].protected) status.style.background = "rgb(30, 123, 123)";
        else if (party[i].usable == false) {
            status.style.background = "rgb(153, 51, 51)";
        } 
        else status.style.background = "rgb(107, 87, 70)";
        status.style.width = party[i].hp / party[i].maxhp * 100 + "%"; 
        progressBar.appendChild(status);
    }
    skill_panel.innerHTML = "Skile:<br>";
    for(i=0;i<party[who].skills.length;i++) {
        if (skill_select == i) {
                skill_panel.innerHTML += "<span style='color: rgb(197, 173, 137);'>" + skill_arr[party[who].skills[i]].name + "</span>";
                if (turn) {
                    switch (skill_arr[party[who].skills[i]].type) { //dmg - atak  hel - zdrowie   def - tarcza    amp - dmg boost
                        case "dmg":
                            desc_panel.innerHTML = "Zadaje " + skill_arr[party[who].skills[i]].effect * party[who].boost + " punktów obrażeń wybranemu przeciwnikowi.";
                            break;
                        case "hel":
                            desc_panel.innerHTML = "Leczy wybranego towarzysza o " + skill_arr[party[who].skills[i]].effect + " punktów zdrowia.";
                            break;
                        case "amp":
                            desc_panel.innerHTML = "Wzmacnia ataki danego towarzysza x" + skill_arr[party[who].skills[i]].effect + " do końca tury gracza.";
                            break;
                        case "def":
                            desc_panel.innerHTML = "Nadaje tarcze na wybrango towarzysza.";
                            break;
                    }
                }
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

function limb(name, hp, x, y, image = "",  size_x = "100px" ,size_y = "100px", s_image = "", px = false,) {
    this.name = name;
    this.hp = hp;
    this.maxhp = hp;
    this.shield = false;
    this.image = image;
    this.s_image = s_image;

    var graphic = document.createElement("div");
    graphic.id = name;
    if (image == "") graphic.style.background = "black";
    graphic.style.width = size_x;
    graphic.style.color = "white";
    graphic.style.display = "flex";
    graphic.style.alignItems = "center";
    graphic.style.justifyContent = "center";
    graphic.style.height = size_y;
    graphic.style.position = "absolute";
    graphic.style.backgroundSize = size_x + " " + size_y;
    if (px)  graphic.style.left = x+"px";
    else graphic.style.left = x+"vw";
    graphic.style.top = y/2+"vh";
    graphic.style.backgroundImage = "url('" + image + "')";
    graphic.style.zIndex = "20";

    this.effect = -1;

    document.getElementById('main').appendChild(graphic)

    this.div = graphic;
} //creating a boss's limb

var boss;
var boss_skills;

function boss2() {
    createCombatPanel();
    partyUpdate();
    let god = new limb("god", 99999, ((window.innerWidth / 2) - window.innerHeight / 2), 0, "images/god.png", "100vh", "100vh", "", true);
    boss = [god];
    boss_skills = ["annihilation"]
}

function boss1() {
    document.body.style.backgroundImage = "url('images/ship_bg.png')";
    createCombatPanel();
    partyUpdate();
    let body = document.createElement("div");
    body.style.backgroundImage = "url('images/boss1/body.png')";
    body.style.width = "100vw";
    body.style.height = "100vh";
    body.style.zIndex = "20";
    body.style.backgroundSize = "100vw 100vh";
    document.getElementById("main").appendChild(body);
    document.getElementById("main").appendChild(hp_panel);
    let limb1 = new limb("pierwsza reka", 100, 0, 0, "images/boss1/hand1.png", "100vw", "100vh" , "images/boss1/hand1g.png");
    let limb2 = new limb("druga reka", 100, 0, 0, "images/boss1/hand2.png", "100vw", "100vh", "images/boss1/hand2g.png");
    let limb3 = new limb("glowa", 250, 0, 0, "images/boss1/head.png", "100vw", "100vh");
    let limb4 = new limb("trzecia reka", 100, 0, 0, "images/boss1/hand3.png", "100vw", "100vh", "images/boss1/hand3g.png");
    boss = [limb1, limb4, limb3, limb2];
    boss_skills = ["cios",  "tarcza", "lap"];
}

function boss0() {
    document.body.style.backgroundImage = "url('images/ship_bg.png')";
    createCombatPanel();
    partyUpdate();
    document.getElementById("main").appendChild(hp_panel);
    mannequin = new limb("manekin", 150, 42, 45 , "images/dummy.png", "15vw" , "55vh");
    boss = [mannequin];
    boss_skills = ["nic"];
}

var ally_store_list = []
new ally("player", 100, [0,2], 0, 100);
new ally("Żołnierz", 150, [6,2,5], 1, 400, "Na jego rodzimej planecie był rewolucjonistą jednak po przegranj wojnie domowej musiał z tamtąd uciekać. Teraz jest najemnikiem.");
new ally("Mag", 150, [3,1], 2, 700, "Człowiek rasy potrafiącej kontrolować mane. Odszedł ze swojej planety w poszukiwaniu przygód. Zrobi wszystko za kilka złotników.");
new ally("Uzdrowiciel", 150, [7,4], 3, 300, "Pochodzi z pacyfistycznej planety. Nie potrafi walczyć ale z chęcią przyjmie pracę polegającą na ochronie ludzkiego życia.");

var ally_store_focus_x = 1;
var ally_store_focus_y = 1;

var choice = 1;

function createChoice() {
    state = 9;
    document.getElementById("main").innerHTML = "";
    document.body.style.background = "black";
    let choices = ["tak", "-", "nie"];
    for(i=0;i<3;i++) {
        let option = document.createElement("div");
        option.style.left = (window.innerWidth * 0.33 / 2 + (window.innerWidth * 0.33 * i)) - window.innerWidth * 0.04 + "px";
        option.style.top = window.innerHeight / 2 + "px";
        if (choice == i) option.style.color = "white";
        else option.style.color = "rgb(80, 80, 80)";
        option.style.fontSize = "4vw";
        option.innerHTML = choices[i];
        document.getElementById("main").appendChild(option);
    }
}

function createAllyStoreMenu() {
    panel.innerHTML = "";
    let ally_store = document.createElement("div");
    ally_store.id = "ally-store";
    ally_store.innerHTML = ally_store_list[ally_store_focus_x].name + "<br><br><span style='font-size: 1.5vw;'>Punkty Życia - " +
    ally_store_list[ally_store_focus_x].maxhp + "<br>Cena - " + ally_store_list[ally_store_focus_x].price + "$<br><br>" +
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
    desc_message = "Pomoc może się przydać";
    updateManagementPanel();
}

function nextDay() {
    let buttons = ["button-0","button-1","button-2","button-3"]
    for(i=0;i<buttons.length;i++) {
        document.getElementById(buttons[i]).style.border = "5px solid rgb(107, 87, 70)"
    }
    document.getElementById("next_day").style.border = "5px solid rgb(197, 173, 137)";
    select_y = 1;
    turn = false;
    let fade = document.getElementById('fade');
    fade.style.backgroundColor = "black";

    dayOfJourney+=1;
    if(dayOfJourney != 8) fade.innerHTML = "DZIEŃ " + (dayOfJourney + weekOfJouney * 7);
    else fade.innerHTML = "W NOCY";

    setTimeout(() => {
        fade.style.backgroundColor = "transparent";
        ship[1] -= 80;
        ship[2] -= 200;
        ship[3] -= 150;
        let event = Math.round(Math.random() * 100);
        if(event > 50 && event <= 60 && dayOfJourney != 7) {
            panel.innerHTML = "<p style='font-size:40px; text-align: center;'>Okradziono nas!!!<br>Stracilismy troche paliwa i racji zywnosciowych!</p>";
            state = 3;
            ship[1] -= 150;
            ship[2] -= 200;
            ship[3] -= 100;
        } else if (event > 60 && event <= 70 && dayOfJourney != 7) {
            panel.innerHTML = "<p style='font-size:40px; text-align: center;'>Uderzlismy w asteroide!!!<br>Nasz statek jest w oplakanym stanie!!!</p>";
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
            document.getElementById("next_day").innerHTML = "Zaczekaj do nocy";
            message_start_i += 2;
            start()
            state = 8;
        }
        if (dayOfJourney == 8) {
            select_x = 1;
            state = 1;
            switch(weekOfJouney) {
                case 0:
                    boss0();
                    break;
                case 1:
                    boss1();
                    break;
            }
        }
    }, 2000);
    setTimeout(() => {
        fade.innerHTML = "";
        turn = true;
    }, 3000);
}

function enemyTurn() {
    for(i=0;i<party.length;i++) {
        party[i].boost = 1;
    }
    if(turns > 0) {
        turn = false;
        let target = Math.round(Math.random() * (party.length - 1));
        let ability = 0;
        if (boss[boss.length - turns].name != "glowa") ability =  boss_skills[Math.round(Math.random() * (boss_skills.length - 1))];
        else ability =  boss_skills[Math.round(Math.random() * (boss_skills.length - 2))];
        switch(ability) {
            case "cios":
                if (party[target].protected == true) {
                    desc_panel.innerHTML = boss[boss.length - turns].name + " używa ciosu.<br>" + 
                    party[target].name + " traci tarcze.";
                    party[target].protected = false;
                } else {
                    party[target].hp -= 40;
                    if (party[target].hp <= 0) party.splice(target, 1)
                    if (party.length == 0) {
                        fade.style.backgroundColor = "black";
                        fade.innerHTML = "Nie żyjesz.";
                        state = 4;
                    }
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
                    if (boss[boss.length - turns].effect != -1) {
                        desc_panel.innerHTML = boss[boss.length - turns].name + " wypuszcza " + party[boss[boss.length - turns].effect].name + "a i łapie" +
                        party[target].name;
                        party[boss[boss.length - turns].effect].usable = true;
                        party[target] = false;
                    } else {
                        party[target].usable = false;
                        desc_panel.innerHTML = boss[boss.length - turns].name + " stara sie złapać jednego z twoich towarzyszy.<br>" +
                        party[target].name + " zostaje złapany.";
                        boss[boss.length - turns].effect = target;
                        boss[boss.length - turns].div.style.backgroundImage = "url('" +  boss[boss.length - turns].s_image + "')";
                    }
                }
                break;
            case "tarcza":
                let head = "";
                for(i=0;i<boss.length;i++) {
                    if(boss[i].name == "glowa") head = i;
                }
                boss[head].shield = true;
                if (boss[head].hp + 15 > boss[head].maxhp) boss[head].hp = boss[head].maxhp;
                else boss[head].hp += 15;
                desc_panel.innerHTML = boss[boss.length - turns].name + " tworzy tarcze i leczy glowe potwora."
                break;
            case "nic":
                switch(Math.round(Math.random() * 3)) {
                    case 0:
                        desc_panel.innerHTML = "Manekin gapi się w nicość. Myśli nad sensem istnienia.";
                        break;
                    case 1:
                        desc_panel.innerHTML = "Manekin gapi się w nicość. Zastanawia się nad tym co dzisiaj na obiad.";
                        break;
                    case 2:
                        desc_panel.innerHTML = "Manekin gapi się w nicość. Jego oczka wpatrzone są w napastników.";
                        break;
                    case 3:
                        desc_panel.innerHTML = "Manekin gapi się w nicość. Stara wzbudzić sie twoją litość.";
                }
                break;
            case "annihilation":
                turns++;
                if (party[target].protected == true) {
                    desc_panel.innerHTML =  "Bóg uderza w " + party[target].name + "a z siłą tysiąca słońc.<br>" + 
                    party[target].name + " traci tarcze.";
                    party[target].protected = false;
                } else {
                    party[target].hp = 0;
                    desc_panel.innerHTML = "Bóg uderza w " + party[target].name + "a z siłą tysiąca słońc.<br>" +
                    party[target].name + " traci życie.";
                    party.splice(target, 1);
                    if(party.length == 0) {
                        fade.style.backgroundColor = "black";
                        fade.innerHTML = "<span style='font-size: 60px;'>Człowiek nie może zabić boga.</span>";
                        state = 4;
                    }
                }
        }
        partyUpdate();
        setTimeout(() => {
            desc_panel.innerHTML = "";
            turns--;
            console.log("reset:" + turns)
            enemyTurn();  
        }, 5000);
    } else {
        turn = true;
        for(i=0;i<party.length;i++) {
            if (party[i].usable) turns++;
        }
    }
    who = 0;
    while(party[who].usable == false) who++;
    partyUpdate();
}

var message_box = document.createElement("div");
message_box.id = "message";
document.body.appendChild(message_box);

function message(text) {
    message_box.style.color = "white";
    message_box.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    message_box.innerHTML = text;
}

function management_buttons_desc(select) {
    switch(select) {
        case 0:
            desc_message = "Czy naprawić statek?<br>Przez dodatkowy wysiłek załoga może stracić motywacje do pracy.";
            break;
        case 1:
            desc_message = "Kupić coś?";
            break;
        case 2:
            desc_message = "Czy nakazać nadgodziny? Mogę zyskać więcej pieniędzy, ale załoga może mnie znienawidzić.";
            break;
        case 3:
            desc_message = "Czy zarządzić wolne? Mogę podnieść morale załogi, ale strace dochody za ten dzień.";
            break;
    }
    updateManagementPanel();
}

var message_start = ["Jesteście kosmicznymi piratami.", false, "Ostatnio ograbiliście kapliczke nieznanego bożka na dalece oddalonej primytywnej planecie.", false,
                     "Miesiąc od tamtego dnia w twoim sercu pojawia się złowrogie przeczucie.", false, "Słyszysz w głowie głos bożka mówiący że musisz zwrócić bezprawnie skradzione bogactwa.", false,
                     "Głos w wypadku niespełnienia żądań zapowiedział swój powrót za tydzień", false, "Postanawiasz wrócić na opuszczoną planete i zwrócić złoto", false,
                     "Przed tobą daleka podróż", true, "Głos wraca.", false, "Bożek przeklina cie twierdząc że jeżeli bogactwa nie zostaną zwrócone<br> za tydzień pośle na wasz statek straszliwą bestie", false,
                     "Masz siedem dni", false, "Aby dolecieć do planety skąd ukradłeś złoto potrzbujesz jeszcze dwóch tygodni", false, "Wiedząc że walka z bestią jest nieunikniona postanwiasz potrenować na kukle", true,
                     "Uważasz że jesteś gotów", false, "Masz 7 dni", true, "Dzisiaj w nocy pojawić ma sie bestia", false, "Nie będe dzisiaj spał", true, "Zabiliśmy bestie", false,
                     "Za 7 dni dolecimy do celu", true, "Dolecoeliśmy do celu", false, "Czuje się dziwnie", false, "Pora na pożegnanie moich bogactw", false, "Czy zwrócić złoto?", true, "Oddałeś bogactwa", false,
                     "udało ci się przeżyć", false, "KONIEC", 2];
var message_start_i = 0;

function start() {
    message(message_start[message_start_i])
}
start();
state = 8;

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
                        management_buttons_desc(select_x)
                    } 
                    break;
                case 2: // right in enemy select
                    if (boss.length > 1) {
                        if (enemy_select < boss.length - 1) enemy_select += 1;
                        boss[enemy_select-1].div.style.filter = "drop-shadow(0px 0px 0px hsl(" + (boss[enemy_select].hp / boss[enemy_select].maxhp) * 120 + ", 100%, 50%))";
                        hp_panel.innerHTML = "";
                        if (boss[enemy_select].shield == false) boss[enemy_select].div.style.filter = "drop-shadow(0px 0px 10px hsl(" + (boss[enemy_select].hp / boss[enemy_select].maxhp) * 120 + ", 100%, 50%))";
                        else boss[enemy_select].div.style.filter = "drop-shadow(0px 0px 10px rgb(0, 255, 255))";
                        hp_panel.innerHTML = boss[enemy_select].hp + " / " + boss[enemy_select].maxhp + "<br>";
                        partyUpdate();
                    }
                    break;
                case 6:
                    if (ally_store_focus_x < ally_store_list.length - 1) ally_store_focus_x += 1;
                    createAllyStoreMenu();
                    break;
                case 9:
                    if(choice != 2) choice++
                    createChoice();
            }
        } else if (event.keyCode == 40) { // down
            switch(state) {
                case 0: //down in management menu
                    if (select_y == 0) {
                        select_y = 1;
                        document.getElementById("button-" + select_x).style.border = "5px solid rgb(107, 87, 70)";
                        document.getElementById("next_day").style.border = "5px solid rgb(197, 173, 137)";
                        desc_message = "Zaczekać do następnego dnia?<br>Dzięki pracy załogi zyskam trochę gotówki.";
                        updateManagementPanel();
                    }
                    break;
                case 1:     //down in combat menu
                    if (skill_select < party[who].skills.length - 1) skill_select += 1;
                    console.log(party);
                    console.log("skill: " + skill_select);
                    console.log("y:     " + who);
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
                        management_buttons_desc(select_x);
                    }
                    break;
                case 2:     //left in enemy selection -----------------------------------------------------------------------------------------------------------------
                    if(boss.length > 1) {
                        if (enemy_select != 0) enemy_select -= 1;
                        boss[enemy_select+1].div.style.filter = "drop-shadow(0px 0px 0px hsl(" + (boss[enemy_select].hp / boss[enemy_select].maxhp) * 120 + ", 100%, 50%))";
                        hp_panel.innerHTML = "";
                        if (boss[enemy_select].shield == false) boss[enemy_select].div.style.filter = "drop-shadow(0px 0px 10px hsl(" + (boss[enemy_select].hp / boss[enemy_select].maxhp) * 120 + ", 100%, 50%))";
                        else boss[enemy_select].div.style.filter = "drop-shadow(0px 0px 10px rgb(0, 255, 255))";
                        hp_panel.innerHTML = boss[enemy_select].hp + " / " + boss[enemy_select].maxhp + "<br>";
                        partyUpdate();
                    }
                    break;
                case 6:
                    if (ally_store_focus_x > 1) ally_store_focus_x -= 1;
                    createAllyStoreMenu();
                    break;
                case 9:
                    if(choice != 0) choice--;
                    createChoice();
            }
        } else if (event.keyCode == 38) { // Up
            switch(state) {
                case 0: //up in management menu
                    case 0:
                    if (select_y == 1) {
                        select_y = 0;
                        document.getElementById("button-" + select_x).style.border = "5px solid rgb(197, 173, 137)"; 
                        document.getElementById("next_day").style.border = "5px solid rgb(107, 87, 70)";
                        management_buttons_desc(select_x);
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
                    desc_panel.innerHTML = "";
                    if (boss[enemy_select].shield == false) {
                        if (boss[enemy_select].hp > Math.round(ongoing.effect * party[party.length - turns].boost)){
                            boss[enemy_select].hp -= Math.round(ongoing.effect * party[party.length - turns].boost);
                            boss[enemy_select].div.style.filter = "drop-shadow(0px 0px 0px rgb(0, 255, 255))";
                            hp_panel.innerHTML = "";
                            if(boss[enemy_select].effect != -1) {
                                if (party[boss[enemy_select].effect].hp > 0) {
                                    party[boss[enemy_select].effect].usable = true;
                                    if (boss[enemy_select].effect > who) turns++;
                                }
                                console.log(boss[enemy_select]);
                                boss[enemy_select].div.style.backgroundImage = "url('" + boss[enemy_select].image + "')";
                                boss[enemy_select].effect = -1;
                            }
                        } else {
                            document.getElementById(boss[enemy_select].name).remove();
                            if (boss[enemy_select].effect != -1 && party[boss[enemy_select].effect].hp > 0) {
                                party[boss[enemy_select].effect].usable = true;
                                if (boss[enemy_select].effect > who) turns++;
                            }
                            boss.splice(enemy_select, 1);
                            enemy_select = 0;
                            if (boss.length == 0) {
                                turns = 0;
                                document.body.style.backgroundImage = "url('images/background.png')";
                                message_start_i += 2;
                                state = 8;            
                                weekOfJouney++;
                                dayOfJourney = 1;
                                select_x = 0;
                                select_y = 0;
                                createManagementPanel();
                                updateManagementPanel();
                                let buttons = ["button-0","button-1","button-2","button-3"]
                                for(i=0;i<buttons.length;i++) {
                                    document.getElementById(buttons[i]).style.border = "5px solid rgb(107, 87, 70)"
                                }
                                document.getElementById("next_day").style.border = "5px solid rgb(197, 173, 137)";
                                select_y = 1;
                                start();
                            } else {
                                if (boss[enemy_select].shield == false) boss[enemy_select].div.style.filter = "drop-shadow(0px 0px 0px hsl(" + (boss[enemy_select].hp / boss[enemy_select].maxhp) * 120 + ", 100%, 50%))";
                                else boss[enemy_select].div.style.filter = "drop-shadow(0px 0px 0px rgb(0, 255, 255))";
                                hp_panel.innerHTML = "";
                            }
                        }
                    } else {
                        boss[enemy_select].shield = false;
                    }
                    turns -= 1;
                    if(turns <= 0) {
                        turns = boss.length;
                        who = 0;
                        while(party[who].usable == false) who++;
                        enemyTurn();
                    }
                    else {
                        who++;
                        while(party[who].usable == false) who++;
                    }
                    partyUpdate();
                    skill_select = 0;
                    if(state != 8) state = 1;
                    select_x = 1;
                    break;
                case 1:
                    if (select_x == 1) {        //space in combat menu
                        ongoing = skill_arr[party[who].skills[skill_select]];
                        switch(skill_arr[party[who].skills[skill_select]].type) {
                            case "dmg":
                                boss[enemy_select].div.style.filter = "drop-shadow(0px 0px 10px hsl(" + (boss[enemy_select].hp / boss[enemy_select].maxhp) * 120 + ", 100%, 50%))";
                                hp_panel.innerHTML = boss[enemy_select].hp + " / " + boss[enemy_select].maxhp + "<br>";
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
                            desc_message = "Zaczekać do następnego dnia?<br>Dzięki pracy załogi zyskam trochę gotówki.";
                            updateManagementPanel();
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
                            if(party[select_y].hp + ongoing.effect >= party[select_y].maxhp) party[select_y].hp = party[select_y].maxhp;
                            else party[select_y].hp += ongoing.effect;
                            break;
                        case "def":
                            party[select_y].protected = true;
                            break;
                        case "amp":
                            party[select_y].boost *= ongoing.effect;
                    }
                    skill_select = 0;
                    desc_panel.innerHTML = "";
                    party[select_y].name = party[select_y].org_name
                    state = 1;
                    turns--;
                    if(turns <= 0) {
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
                    break;
                case 8:
                    if(message_start[message_start_i+1] == false) {
                        message_start_i += 2
                        start();
                    } else if (message_start[message_start_i+1] != 2){
                        if (weekOfJouney == 2 && dayOfJourney == 7) {
                            state = 9;
                            createChoice();
                        } else state = 0;
                        message_box.style.backgroundColor = "transparent";
                        message_box.style.color = "transparent";
                        updateManagementPanel();
                    } 
                    break;
                case 9:
                    message_start_i += 2;
                    if (choice == 0) {
                        document.getElementById("main").innerHTML = "";
                        start();
                        state = 8;
                    }
                    else if (choice == 2) {
                        document.getElementById('main').innerHTML = "";
                        message("Stanął przed tobą sam bożek gotowy do walki.");
                        setTimeout(() => {
                            message_box.style.backgroundColor = "transparent";
                            message_box.style.color = "transparent";
                            createCombatPanel();
                            partyUpdate();
                            boss2();
                            state = 1; 
                        }, 3000);
                    }
            }
        }
    }
});
//test();