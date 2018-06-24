"use strict";

import BaseView from "../BaseView/BaseView.js";

let generateAdminView = require("./AdminView.pug");

const adminView = new BaseView(document.getElementsByClassName("page")[0], generateAdminView,
    {
        title: 0,
        menus: []
    });

export default adminView;
