import mongoose from 'mongoose';
import { typeDBUser, typeUser } from './types';

export default class User {
    
    public id: number;
    public name: string;
    public pass: string;
    public email: string;
    public lang: string;
    public curr: string;
    public avatar: string;
    public watchlist: Array<string>;
    public portfolio: Map<string, string>;

    constructor(id: number) {
        if(id > 0) {
            this.id = id;
        }else{;
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
        const id: number = this.id;
        const name: string = this.name;
        const pass: string = this.pass;
        const email: string = this.email;
        const lang: string = this.lang;
        const curr: string = this.curr;
        const avatar: string = this.avatar;
        const wList: Array<string> = this.watchlist;
        const port: Map<string, string> = this.portfolio;

        return {id, name, pass, email, lang, curr, avatar, wList, port};
    }

    nextId() {
        this.id = Date.now();
    }

    checkUserPass(pass: string): boolean {
        if(pass === this.pass) {
            return true;
        }
        return false;
    }

    readData(newData: typeDBUser) {
        this.name = newData.name;
        this.pass = newData.pass;
        this.email = newData.email;
        this.lang = newData.lang;
        this.curr = newData.curr;
        this.avatar = newData.avatar;
        this.watchlist = [];
        this.portfolio = new Map();
    }

    toJson ():typeUser {
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
