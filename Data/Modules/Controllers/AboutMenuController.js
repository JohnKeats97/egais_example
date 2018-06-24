"use strict";

import BaseController from "./BaseController.js";
import Services from "../Services.js";
import MessageBox from "../Blocks/MessageBox/MessageBox.js";
import Loader from "../Views/LoaderView/LoaderView.js";

class AboutMenuController extends BaseController
{
    constructor(view)
    {
        super(view);

        this.title = "About menu";
        this.url = "/aboutMenu";
    }

    onShow()
    {
        let loader = new Loader();
        loader.show();
        this.view.changeData({title: "About", text: []});
        Services.getAboutText()
            .then((res) =>
            {
                loader.hide();
                // this.view.changeData({title: "About", text: res.about});
                this.view.changeData({title: "About", text: "Created by Vadim Efimenko"});
            })
            .catch((error) =>
            {
                loader.hide();
                new MessageBox("Ошибка соединения");
            });
    }
}

export default AboutMenuController;
