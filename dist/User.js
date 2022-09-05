"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id) {
        if (id > 0) {
            this.id = id;
        }
        else {
            ;
            this.id = Date.now();
        }
        this.name = "";
        this.pass = "";
        this.email = "";
        this.lang = "";
        this.curr = "";
        this.avatar = "ava1";
        this.watchlist = [];
        this.portfolio = new Map();
    }
    getDbModelVars() {
        const id = this.id;
        const name = this.name;
        const pass = this.pass;
        const email = this.email;
        const lang = this.lang;
        const curr = this.curr;
        const avatar = this.avatar;
        const wList = this.watchlist;
        const port = this.portfolio;
        return { id, name, pass, email, lang, curr, avatar, wList, port };
    }
    nextId() {
        this.id = Date.now();
    }
    checkUserPass(pass) {
        if (pass === this.pass) {
            return true;
        }
        return false;
    }
    readData(newData) {
        this.name = newData.name;
        this.pass = newData.pass;
        this.email = newData.email;
        this.lang = newData.lang;
        this.curr = newData.curr;
        this.avatar = newData.avatar;
        this.watchlist = [];
        this.portfolio = new Map();
    }
    toJson() {
        return {
            id: this.id,
            email: this.email,
            pass: this.pass,
            name: this.name,
            lang: this.lang,
            currency: this.curr,
            avatar: this.avatar
        };
    }
}
exports.default = User;
