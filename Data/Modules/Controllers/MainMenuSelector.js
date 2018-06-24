import MainMenuController from "./MainMenuController.js";
import mainMenuView from "../Views/MainMenuView/MainMenuView.js";
import Services from "../Services.js";
import MessageBox from "../Blocks/MessageBox/MessageBox.js";
import Loader from "../Views/LoaderView/LoaderView.js";

import EventBus from "../EventBus.js";

class MainMenuSelector
{
    constructor()
    {
        this.mainMenuController = new MainMenuController(mainMenuView);
        this.url = "/";
        this.title = "Меню";
    }

    show()
    {
        let loader = new Loader();
        loader.show();
        Services.getUser()
            .then(response =>
            {
                if(response.status === 0)
                {
                    let eventBus = new EventBus();
                    loader.hide();
                    debugger;
                    eventBus.emitEvent({type: "changeMenu", newMenuName: "/menuUnRegister"});
                    debugger;
                }
                else
                {
                    loader.hide();
                    this.mainMenuController.show();
                }
            })
            .catch(() =>
            {
                loader.hide();
                new MessageBox("Нет подключения к интернету");
            });
    }

    hide()
    {
        this.mainMenuController.hide();
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

export default MainMenuSelector;