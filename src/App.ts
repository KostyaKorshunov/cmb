import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import caors from 'cors';
const cors = require('cors');
// const config = require( './config.json' );
//import { UserQuery } from './UserQuery';

export class App {
    public expressApp: Application;
    // public dbURL: string;
    

    constructor() {
    //    this.dbURL = "mongodb+srv://user:user@cluster0.4jxafye.mongodb.net/?retryWrites=true&w=majority";
        // this.dbURL = "mongodb+srv://user:user@cluster0.jijfxzy.mongodb.net/?retryWrites=true&w=majority";
        this.expressApp = express();
        // const corsOptions = {
        //     origin: '*',
        //     optionsSuccessStatus: 200,
        //     methods: "GET, PUT, POST"
        // }
        this.expressApp.use(cors());
        // this.expressApp.use(cors(corsOptions));
        // this.expressApp.options('*', cors());

        // , {useUnifiedTopology: true, useNewUrlParser: true}
        // mongoose.connect(this.dbURL);

        this.attachRoutes();
        this.expressApp.listen(80, "0.0.0.0");
    }

    attachRoutes () {
        //let app = this.expressApp;
        let jsonParser = bodyParser.json();
        this.expressApp.get('/user', this.getUser);
    }

    getUser(req: Request, res: Response) {
        if (!req.query.email) {
            console.log("Bad request");
            res.status(400).json({"answer": "bad request"});
        }else{
            res.json({"answer": "Ok"});
        }
    }

}
