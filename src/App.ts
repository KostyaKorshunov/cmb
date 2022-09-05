import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import caors from 'cors';
const cors = require('cors');
// const config = require( './config.json' );
import { UserQuery } from './UserQuery';

export class App {
    public expressApp: Application;
    public dbURL: string;
    
    public userQ: UserQuery;

    constructor() {
    //    this.dbURL = "mongodb+srv://user:user@cluster0.4jxafye.mongodb.net/?retryWrites=true&w=majority";
        this.dbURL = "mongodb+srv://user:user@cluster0.jijfxzy.mongodb.net/?retryWrites=true&w=majority";
        this.expressApp = express();
        const corsOptions = {
            origin: '*',
            optionsSuccessStatus: 200,
            methods: "GET, PUT, POST"
        }
        // this.expressApp.use(cors());
        this.expressApp.use(cors(corsOptions));
        // this.expressApp.options('*', cors());

        // , {useUnifiedTopology: true, useNewUrlParser: true}
        mongoose.connect(this.dbURL);

        this.userQ = new UserQuery(this.dbURL);

        this.attachRoutes();
    }

    attachRoutes () {
        //let app = this.expressApp;
        let jsonParser = bodyParser.json();
        this.expressApp.get('/user', this.getUser.bind(this));
        this.expressApp.put('/user', this.putUser.bind(this));
        this.expressApp.post('/user', jsonParser, this.postUser.bind(this));

        this.expressApp.get('/watchlist', this.getWatchList.bind(this));
        this.expressApp.put('/watchlist', this.putWatchList.bind(this));

        this.expressApp.get('/portfolio', this.getPortfolio.bind(this));
        this.expressApp.put('/portfolio', this.putPortfolio.bind(this));
    }

    getUser(req: Request, res: Response) {
        if (!req.query.email || !req.query.pass) {
            console.log("Bad request");
            res.status(400).json({"answer": "bad request"});
        }else{
            this.userQ.getUser(req, res);
        }
    }

    // update User. Key is email. Only for name, lang, currency
    putUser(req: Request, res: Response) {
        if (!req.query.email) {
            console.log("Bad request");
            res.status(400).json({"answer": "bad request"});
        }else{
            this.userQ.updateUser(req, res);
            // .then((response: Object) => {
                // res.json(response);
            // });
        }
    }

    postUser(req: Request, res: Response) {
        if (!req.body.email || !req.body.pass) {
            console.log("Bad request ");
            res.status(400).json({"answer": "bad request"});
        }else{
            this.userQ.createUser(req, res);
            // let response: Object = this.userQ.createUser(req);
            // res.json(response);
        }

    }

    getWatchList(req: Request, res: Response) {
        if (!req.query.email) {
            console.log("Bad request");
            res.status(400).json({"answer": "bad request"});
        }else{
            this.userQ.getWatchList(req, res);
        }
    }

    putWatchList(req: Request, res: Response) {
        if (!req.query.email) {
            console.log("Bad request");
            res.status(400).json({"answer": "bad request"});
        }else{
            this.userQ.putWatchList(req, res);
        }
    }

    getPortfolio(req: Request, res: Response) {
        if (!req.query.email) {
            console.log("Bad request");
            res.status(400).json({"answer": "bad request"});
        }else{
            this.userQ.getPortfolio(req, res);
        }
    }

    putPortfolio(req: Request, res: Response) {
        if (!req.query.email) {
            console.log("Bad request");
            res.status(400).json({"answer": "bad request"});
        }else{
            this.userQ.putPortfolio(req, res);
        }
    }    
}
