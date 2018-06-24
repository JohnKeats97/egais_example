"use strict";
// JS
import MenuManager from "./Modules/MenuManager.js";
import EventBus from "./Modules/EventBus.js";
// CSS
import "./CSS/body.css"
import "./CSS/page.css"
import "./Modules/Blocks/Input/Input.css"
import "./Modules/Views/BaseView/BaseView.css"
import "./Modules/Views/CSS/button.css"
import "./Modules/Views/CSS/wrapper.css"
import "./Modules/Views/CSS/header2.css"
import "./Modules/Views/CSS/input.css"
import "./Modules/Views/StartTestView/TestView.css"
import "./Modules/Views/LoaderView/Loader.css"
import "./Modules/Views/AdminView/AdminView.css"
import "./Modules/Views/BaseMenuView/BaseMenuView.css"
import "./Modules/Views/LoginMenuView/LoginMenuView.css"
import "./Modules/Views/AboutMenuView/AboutMenuView.css"
import "./Modules/Views/LeaderboardView/LeaderboardView.css"
import "./Modules/Blocks/MessageBox/MessageBox.css";
import "./Modules/Blocks/TimeAdminBox/TimeAdminBox.css";
import "./Modules/Blocks/LoadingScreen/LoadingScreen.css";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./ServiceWorker.js", {scope: "/"})
        .catch((err) => {console.log("Service worker error: " + err)});
}

let header = document.getElementsByClassName("page__header")[0];
header.innerHTML = "HACKERS CONTEST";

const eventBus = new EventBus();
const menuManager = new MenuManager();
eventBus.subscribe(menuManager);
menuManager.go();

header.addEventListener('click', ()=> {
    let eventBus = new EventBus();
    eventBus.emitEvent({type: "changeMenu", newMenuName: "/"});
});

window.onpopstate = menuManager.go.bind(menuManager);
