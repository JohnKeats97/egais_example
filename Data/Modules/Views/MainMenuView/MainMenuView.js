"use strict";
import BaseView from "../BaseView/BaseView.js";
let generateMainMenuView = require("./MainMenuView.pug");

const mainMenu = new BaseView(document.getElementsByClassName("page")[0], generateMainMenuView,
    {
        title: "Меню",
        menus:
            [
                {name: "Начать тест", id: "/startTest", class: "button"},
                {name: "Таблица лидеров", id: "/leaderboardMenu", class: "button button_secondary"},
                {name: "О нас", id: "/aboutMenu", class: "button button_secondary"},
                {name: "Выход", id: "/logout", class: "button button_secondary"},
            ]
    });

export default mainMenu;
