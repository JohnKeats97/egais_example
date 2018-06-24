"use strict";

import Services from "../Services.js";
import MessageBox from "../Blocks/MessageBox/MessageBox.js";
import EventBus from "../EventBus.js";
import Loader from "../Views/LoaderView/LoaderView.js";

class StartTestController
{
    constructor(view)
    {
        this.view = view;

        this.title = "Start Test";
        this.url = "/startTest";

        this.userTest = [];
    }

    onShow()
    {
        Services.getTest()
            .then(result =>
            {
                result = result.reverse();
                this.view.changeData({title: "Start Test", menus: result});

                let testButtons = document.querySelectorAll(".testForm__testButton");
                testButtons.forEach((item) =>
                {
                    let id = +item.dataset.id;
                    if (this.userTest.indexOf(id) < 0) {
                        item.addEventListener('click', ()=>{
                            let input = document.getElementById(id);
                            if (input) {
                                let value = input.value;
                                if (value.toString().trim()) {
                                    value = value.toString().trim();
                                    let loader = new Loader();
                                    loader.show();
                                    Services.checkTest(id, value)
                                        .then((result) => {
                                            debugger;
                                            loader.hide();
                                            let form = input.parentNode.parentNode;
                                            if (result.answer == "OK") {
                                                let parent = item.parentNode;
                                                form.classList.add("testForm_back-green");
                                                parent.innerHTML = "Задание выполнено";
                                                form.classList.remove("testForm_back-red");
                                            }
                                            else if (result.answer == "NOT") {
                                                form.classList.add("testForm_back-red");
                                            }
                                            else {
                                                new MessageBox("Невозможно проверить задание");
                                            }
                                        })
                                        .catch(error => {
                                            loader.hide();
                                            new MessageBox("Невозможно проверить задание");
                                        });
                                }
                            }
                        });
                    }
                    else {
                        let form = item.parentNode.parentNode;
                        form.classList.add("testForm_back-green");
                        let parent = item.parentNode;
                        parent.innerHTML = "Задание выполнено";
                    }
                });
            })
            .catch(() =>
            {
                new MessageBox("Ошибка соединения");
            });
    }


    hide()
    {
        this.view.hide();
        this.onHide();
        let loader = new Loader();
        loader.hide();
    }

    onHide(){
        this.view.changeData({title: "Start Test", menus: []});
    }

    show(tests)
    {
        this.userTest = tests;
        this.onShow();
        let loader = new Loader();
        loader.hide();
        this.view.show();
    }

    goBackHandler()
    {
        let eventBus = new EventBus();
        eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
    }

}

export default StartTestController;
