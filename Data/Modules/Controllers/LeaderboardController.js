"use strict";

import BaseController from "./BaseController.js";
import Services from "../Services.js";
import MessageBox from "../Blocks/MessageBox/MessageBox.js";
import Loader from "../Views/LoaderView/LoaderView.js";

class LeaderboardController extends BaseController
{
    constructor(view)
    {
        super(view);

        this.title = "Leaderboard";
        this.url = "/leaderboardMenu";
    }

    onShow()
    {
        let loader = new Loader();
        loader.show();
        Services.getUser()
            .then(response =>
                {
                    if(response.status === 0) {
                        Services.getLeaders()
                            .then(result =>
                            {
                                let highlight = 10;
                                loader.hide();
                                this.view.changeData({title: "Leaderboard", players: result, highlightIndex: highlight});
                            })
                            .catch(() =>
                            {
                                loader.hide();
                                new MessageBox("Ошибка соединения");
                            });
                    }
                    else
                    {
                        Services.getLeaders()
                            .then(result =>
                            {
                                let highlight = 10;

                                if(result[result.length - 1] && result[result.length - 1].position <= 10)
                                {
                                    highlight = result[result.length - 1].position - 1;
                                    result.pop();
                                }

                                loader.hide();
                                this.view.changeData({title: "Leaderboard", players: result, highlightIndex: highlight});
                            })
                            .catch(() =>
                            {
                                loader.hide();
                                new MessageBox("Ошибка соединения");
                            });
                    }
            });

    }

    onHide(){
        this.view.changeData({title: "0", players: []});
    }
}

export default LeaderboardController;
