"use strict";

import BaseView from "../BaseView/BaseView.js";
let generateRegisterMenuView = require("./RegisterMenuView.pug");

const registerMenuView = new BaseView(document.getElementsByClassName("page")[0], generateRegisterMenuView, {title: "Register"});

export default registerMenuView;
