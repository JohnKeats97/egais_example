"use strict";

import Button from "../Blocks/Button.js";
import EventBus from "../EventBus.js";
import Loader from "../Views/LoaderView/LoaderView.js";

const eventBus = new EventBus();

class BaseController
{
    /**
     *
     * @param view - view to control
     */
    constructor(view)
    {
        this.view = view;

        this.title = "Base Menu";
        this.url = "baseUrl";
    }

    hide()
    {
        this.view.hide();
        this.onHide();
        let loader = new Loader();
        loader.hide();
    }

    show()
    {
        let loader = new Loader();
        loader.show();
        this.onShow();
        loader.hide();
        this.view.show();
    }

    onShow(){}
    onHide(){}

    goBackHandler()
    {
        eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
    }
}

export default BaseController;
