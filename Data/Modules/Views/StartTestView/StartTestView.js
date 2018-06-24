"use strict";

import BaseView from "../BaseView/BaseView.js";

let generateStartTestView = require("./StartTestView.pug");

const startTestView = new BaseView(document.getElementsByClassName("page")[0], generateStartTestView,
    {
        title: "Меню",
        menus: []
    });

export default startTestView;
