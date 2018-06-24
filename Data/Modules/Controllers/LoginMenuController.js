"use strict";

import BaseController from "./BaseController.js";
import Input from "../Blocks/Input/Input.js";
import Services from "../Services.js";
import EventBus from "../EventBus.js";
import MessageBox from "../Blocks/MessageBox/MessageBox.js";
import Loader from "../Views/LoaderView/LoaderView.js";

const eventBus = new EventBus();

class LoginMenuController extends BaseController
{
    constructor(view)
    {
        super(view);

        this.inputMail = new Input(null, document.loginForm.loginMailInput);
        this.inputPassword = new Input(null, document.loginForm.loginPasswordInput);
        document.loginForm.onsubmit = () => this.submitHandler();
        this.title = "Login";
        this.url = "/startGame/login";
    }

    onShow()
    {
        this.inputMail.clear();
        this.inputPassword.clear();
    }

    submitHandler()
    {
        if (this.validate()) {
            let loader = new Loader();
            loader.show();
            debugger;
            Services.checkUser(this.inputMail.value, this.inputPassword.value)
                .then(() => {
                    loader.hide();
                    eventBus.emitEvent({type: "updateUser"});
                    eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
                })
                .catch(error => {
                    loader.hide();
                    if (error.status == 403) {
                        new MessageBox("Вы не подтвердили почту");
                    }
                    else {
                        new MessageBox("Ошибка входа");
                    }
                });
        }

        return false;
    }

    validate()
    {
        let mail = this.inputMail.value;
        let pwd = this.inputPassword.value;
        let bValid = true;

        if(mail === "")
        {
            bValid = false;
        }
        if(pwd === "")
        {
            bValid = false;
        }

        if(!bValid)
            new MessageBox("Заполните пустые поля");

        return bValid;
    }

}

export default LoginMenuController;
