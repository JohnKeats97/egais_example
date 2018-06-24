"use strict";

import Subscriber from "./Subscriber.js";
import mainMenuView from "./Views/MainMenuView/MainMenuView.js";
import mainMenuUnRegisterView from "./Views/MainMemuViewUnRegister/MainMenuViewUnRegister"
import aboutMenuView from "./Views/AboutMenuView/AboutMenuView.js";
import leaderboardView from "./Views/LeaderboardView/LeaderboardView.js";
import loginMenuView from "./Views/LoginMenuView/LoginMenuView.js";
import registerMenuView from "./Views/RegisterMenuView/RegisterMenuView.js";
import MainMenuUnRegisterController from "./Controllers/MainMenuUnRegisterController.js";
import AboutMenuController from "./Controllers/AboutMenuController.js";
import LeaderboardController from "./Controllers/LeaderboardController.js";
import LoginMenuController from "./Controllers/LoginMenuController.js";
import RegisterMenuController from "./Controllers/RegisterMenuController.js";
import StartTestSelector from "./Controllers/StartTestSelector.js";
import AdminSelector from "./Controllers/AdminSelector.js";
import MainMenuSelector from "./Controllers/MainMenuSelector";

class MenuManager extends Subscriber
{
    constructor()
    {
        if(MenuManager.instance)
            return MenuManager.instance;

        super();
        this.menus =
            {
                "/": new MainMenuSelector(mainMenuView),
                "/menuUnRegister": new MainMenuUnRegisterController(mainMenuUnRegisterView),
                "/leaderboardMenu": new LeaderboardController(leaderboardView),
                "/aboutMenu": new AboutMenuController(aboutMenuView),
                "/startTest": new StartTestSelector(),
                "/admin": new AdminSelector(),
                "/startGame/login": new LoginMenuController(loginMenuView),
                "/startGame/register": new RegisterMenuController(registerMenuView),
            };

        this.currentMenu = this.menus["/"];

        MenuManager.instance = this;
    }

    changeMenu(newMenuURL, bPushState = true)
    {
        this.currentMenu.hide();
        this.currentMenu = this.menus[newMenuURL];
        if(bPushState === true)
            window.history.pushState(null, this.currentMenu.title, this.currentMenu.url);
        this.currentMenu.show();
    }

    go()
    {
        this.changeMenu(window.location.pathname, false);
    }


    eventFired(event)
    {
        if(event.type === "changeMenu")
        {
            if(event.bPushState === true)
                this.changeMenu(event.newMenuName, true);
            else
                this.changeMenu(event.newMenuName);
        }
        else if(event.type === "goBack")
            window.history.back();
    }

    registerMenu(URL, controller)
    {
        this.menus[URL] = controller;
    }

}

export default MenuManager;
