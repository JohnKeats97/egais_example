"use strict";

import AdminController from "./AdminController.js";
import adminView from "../Views/AdminView/AdminView.js";
import Services from "../Services.js";
import MessageBox from "../Blocks/MessageBox/MessageBox.js";
import Loader from "../Views/LoaderView/LoaderView.js";

import EventBus from "../EventBus.js";

class AdminSelector
{
    constructor()
    {
        this.adminController = new AdminController(adminView);
        this.url = "/admin";
        this.title = "Admin";
    }

    show()
    {
        let loader = new Loader();
        loader.show();
        Services.getUser()
            .then(response =>
                {
                    if(response.status === 0) {
                        let eventBus = new EventBus();
                        loader.hide();
                        eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
                    }
                    else
                    {
                        if(response.email == "hackers-contest@mail.ru" && response.login == "admin") {
                            loader.hide();
                            this.adminController.show();
                        }
                        else {
                            let eventBus = new EventBus();
                            eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
                        }
                    }
                })
            .catch(() =>
                {
                    let eventBus = new EventBus();
                    loader.hide();
                    eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
                    new MessageBox("Ошибка соединения");
                });
    }

    hide()
    {
        this.adminController.hide();
        /*
        Services.getUser()
            .then(response =>
            {
                if(response.status === 0)
                    this.startGameMenuController.hide();
            })
            .catch(exit =>
            {
            });
        */
    }

}

export default AdminSelector;
