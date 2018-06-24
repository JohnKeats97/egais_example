"use strict";
import BaseView from "../BaseView/BaseView.js";
let generateMainMenuView = require("./MainMenuViewUnRegister.pug");

const mainMenuUnRegister = new BaseView(document.getElementsByClassName("page")[0], generateMainMenuView,
    {
        title: "Меню",
        menus:
            [
                {name: "Регистрация", id: "/startGame/register", class: "button"},
                {name: "Вход", id: "/startGame/login", class: "button button_secondary"},
                {name: "Таблица лидеров", id: "/leaderboardMenu", class: "button button_secondary"},
                {name: "О нас", id: "/aboutMenu", class: "button button_secondary"},
            ]
    });

export default mainMenuUnRegister;