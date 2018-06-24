"use strict";

import BaseView from "../BaseView/BaseView.js";
let generateAboutMenuView = require("./AboutMenuView.pug");

const aboutMenu = new BaseView(document.getElementsByClassName("page")[0], generateAboutMenuView, {title: "О нас", text: []});

export default aboutMenu;
