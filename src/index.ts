import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');

const expressApp: Application = express();
expressApp.use(cors());
let jsonParser = bodyParser.json();

const getUser = (req: Request, res: Response) => {
    if (!req.query.email) {
        console.log("Bad request");
        res.status(400).json({"answer": "bad request"});
    }else{
        res.json({"answer": "Ok"});
    }
}


expressApp.get('/user', getUser);

expressApp.listen(80, "0.0.0.0");