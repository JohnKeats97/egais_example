/**
 * designService
 * This module is designed to provide additional functionality for easier page decoration
 */

'use strict';

import Http from "./Http/http.js";

class Services
{
    static getTime() {
        return Http.FetchGet("/time");
    }

    static setTime(start, stop) {
        return Http.FetchPost("/time", {"start": start, "stop": stop});
    }

    static getTestAdmin()
    {
        return Http.FetchGet("/test-admin");
    }

    static getTest()
    {
        return Http.FetchGet("/test");
    }

    static getUserTest()
    {
        return Http.FetchGet("/user-test");
    }

    static getLeaders()
    {
        return Http.FetchGet("/leaderboard");
    }

    static getAboutText()
    {
        return Http.FetchGet("/about");
    }

    static isValidMail(text)
    {
        let reg = /[0-9A-Za-z.\-\_]+@[0-9A-Za-z.\-\_]+\.[A-Za-z\-\_]+/; // RegExp for mail
        let match = text.match(reg);

        return (match != null && match[0] == text);
    }

    static checkUser(mail, pwd)
    {
        debugger;
        return Http.FetchPost("/login", {"loginEmail": mail, "password": pwd});
    }

    static registerUser(mail, nickname, pwd)
    {
        return Http.FetchPost("/users", {"login": nickname, "email": mail, "password": pwd});
    }

    static checkTest(id, answer)
    {
        return Http.FetchPost("/test", {"id": id, "answer": answer});
    }

    static addTestAdmin(name, text, answer)
    {
        return Http.FetchPost("/add-test", {"name": name, "text": text, "answer":answer});
    }

    static deleteTestAdmin(id)
    {
        return Http.FetchPost("/delete-test", {"id": id});
    }

    static changeTestAdmin(id, name, text, answer)
    {
        return Http.FetchPost("/change-test", {"id": id, "name": name, "text": text, "answer":answer});
    }

    static getUser()
    {
        return Http.FetchGet("/info");
    }

    static logoutUser()
    {
        return Http.FetchGet("/logout");
    }
}

export default Services;
