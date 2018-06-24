"use strict";

import StartTestController from "./StartTestController.js";
import startTestView from "../Views/StartTestView/StartTestView.js";
import Loader from "../Views/LoaderView/LoaderView.js";
import Services from "../Services.js";
import MessageBox from "../Blocks/MessageBox/MessageBox.js";

import EventBus from "../EventBus.js";

class StartTestSelector
{
    constructor()
    {
        this.startTestController = new StartTestController(startTestView);
        this.url = "/startTest";
        this.title = "Start Test";
    }

    show()
    {
        let loader = new Loader();
        loader.show();
        Services.getUserTest()
            .then(response =>
                {

                    if(response.status === 0) {
                        let eventBus = new EventBus();
                        loader.hide();
                        eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
                    }
                    else
                    {
                        let testId = response;
                        Services.getTime().then(response => {
                            let date = new Date();
                            date = date.toISOString().toString().slice(0,10);
                            if (response.start <= date && date <= response.stop) {
                                this.startTestController.show(testId);
                            }
                            else {
                                let eventBus = new EventBus();
                                loader.hide();
                                eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
                                new MessageBox("Соревноварие начинается: " +
                                    response.start + " и заканчивается: " + response.stop);
                            }
                        })
                            .catch(()=>{
                                let eventBus = new EventBus();
                                loader.hide();
                                eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
                                new MessageBox("Ошибка времени выполнения");
                            })
                    }
                })
            .catch(() =>
                {
                    let eventBus = new EventBus();
                    loader.hide();
                    eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
                    new MessageBox("Ошибка подключения к сети");
                });
    }

    hide()
    {
        this.startTestController.hide();
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

export default StartTestSelector;
