"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
// import caors from 'cors';
const cors = require('cors');
// const config = require( './config.json' );
const UserQuery_1 = require("./UserQuery");
class App {
    constructor() {
        //    this.dbURL = "mongodb+srv://user:user@cluster0.4jxafye.mongodb.net/?retryWrites=true&w=majority";
        this.dbURL = "mongodb+srv://user:user@cluster0.jijfxzy.mongodb.net/?retryWrites=true&w=majority";
        this.expressApp = (0, express_1.default)();
        // const corsOptions = {
        //     origin: 'http://127.0.0.1:5500',
        //     optionsSuccessStatus: 200,
        //     methods: "GET, PUT, POST"
        // }
        this.expressApp.use(cors());
        // this.expressApp.use(cors(corsOptions));
        // , {useUnifiedTopology: true, useNewUrlParser: true}
        mongoose_1.default.connect(this.dbURL);
        this.userQ = new UserQuery_1.UserQuery(this.dbURL);
        this.attachRoutes();
    }
    attachRoutes() {
        //let app = this.expressApp;
        let jsonParser = body_parser_1.default.json();
        this.expressApp.get('/user', this.getUser.bind(this));
        this.expressApp.put('/user', this.putUser.bind(this));
        this.expressApp.post('/user', jsonParser, this.postUser.bind(this));
        this.expressApp.get('/watchlist', this.getWatchList.bind(this));
        this.expressApp.put('/watchlist', this.putWatchList.bind(this));
        this.expressApp.get('/portfolio', this.getPortfolio.bind(this));
        this.expressApp.put('/portfolio', this.putPortfolio.bind(this));
    }
    getUser(req, res) {
        if (!req.query.email || !req.query.pass) {
            console.log("Bad request");
            res.status(400).json({ "answer": "bad request" });
        }
        else {
            this.userQ.getUser(req, res);
        }
    }
    // update User. Key is email. Only for name, lang, currency
    putUser(req, res) {
        if (!req.query.email) {
            console.log("Bad request");
            res.status(400).json({ "answer": "bad request" });
        }
        else {
            this.userQ.updateUser(req, res);
            // .then((response: Object) => {
            // res.json(response);
            // });
        }
    }
    postUser(req, res) {
        if (!req.body.email || !req.body.pass) {
            console.log("Bad request ");
            res.status(400).json({ "answer": "bad request" });
        }
        else {
            this.userQ.createUser(req, res);
            // let response: Object = this.userQ.createUser(req);
            // res.json(response);
        }
    }
    getWatchList(req, res) {
        if (!req.query.email) {
            console.log("Bad request");
            res.status(400).json({ "answer": "bad request" });
        }
        else {
            this.userQ.getWatchList(req, res);
        }
    }
    putWatchList(req, res) {
        if (!req.query.email) {
            console.log("Bad request");
            res.status(400).json({ "answer": "bad request" });
        }
        else {
            this.userQ.putWatchList(req, res);
        }
    }
    getPortfolio(req, res) {
        if (!req.query.email) {
            console.log("Bad request");
            res.status(400).json({ "answer": "bad request" });
        }
        else {
            this.userQ.getPortfolio(req, res);
        }
    }
    putPortfolio(req, res) {
        if (!req.query.email) {
            console.log("Bad request");
            res.status(400).json({ "answer": "bad request" });
        }
        else {
            this.userQ.putPortfolio(req, res);
        }
    }
}
exports.App = App;
