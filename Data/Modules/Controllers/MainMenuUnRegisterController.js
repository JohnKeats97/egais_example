"use strict";

import MainMenuController from "./MainMenuController.js";

class MainMenuUnRegisterController extends MainMenuController
{
    constructor(view)
    {
        super(view);

        this.title = "Меню";
        this.url = "/menuUnRegister";
    }
}

export default MainMenuUnRegisterController;
