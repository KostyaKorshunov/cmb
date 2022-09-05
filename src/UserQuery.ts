import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './/User';
import { typeDBUser } from './types';

export class UserQuery {
    public userModel;

    constructor(dbURL: string) {
        // mongoose.connect(dbURL);
        this.userModel = this.getDbModelUser('user');
    }

    async getUser(req: Request, res: Response): Promise<Object> {
        const cUser: User = new User(-1);
        let response = cUser.toJson();
        const findDoc = await this.userModel.findOne({ email: req.query.email }).exec();
        if(!findDoc?.$isEmpty) {
            console.log("get user not found!!! "+req.query.email);
            await res.status(400).json({"answer": "user not found"});
            return await response;
        } else {
            let newUser: typeDBUser = findDoc?.toObject() as typeDBUser;
            cUser.readData(newUser);
            if(cUser.checkUserPass(String(req.query.pass))) {
            response = cUser.toJson();
            } else {
                await res.status(400).json({"answer": "user not found"});
                return await response;
            }
        };
        console.log("put user "+req.query.email);
        await res.json(response);
        return response;
    }

    async updateUser(req: Request, res: Response): Promise<Object> {
        const cUser: User = new User(-1);
        let response = cUser.toJson();
        const findDoc = await this.userModel.findOne({ email: req.query.email }).exec();
        if(!findDoc?.$isEmpty) {
            console.log("put user not found!!! "+req.query.email);
            await res.status(400).json({"answer": "user not found"});
            return await response;
        } else {
            if(req.query.name && req.query.name !== "") {
                await this.userModel.findOneAndUpdate({email: req.query.email}, {name: req.query.name}).then((doc) => {
                    doc?.save();
                });
            }
            if(req.query.lang && req.query.lang !== "") {
                await this.userModel.findOneAndUpdate({email: req.query.email}, {lang: req.query.lang}).then((doc) => {
                    doc?.save();
                });
            }
            if(req.query.currency && req.query.currency !== "") {
                await this.userModel.findOneAndUpdate({email: req.query.email}, {curr: req.query.currency}).then((doc) => {
                    doc?.save();
                });
            }
            if(req.query.avatar && req.query.avatar !== "") {
                await this.userModel.findOneAndUpdate({email: req.query.email}, {avatar: req.query.avatar}).then((doc) => {
                    doc?.save();
                });
            }
            const newUserData = await this.userModel.findOne({ email: req.query.email }).exec();
            let newUser: typeDBUser = newUserData?.toObject() as typeDBUser;
            cUser.readData(newUser);
            // await cUser.readData(newUserData as typeUser);
            // console.log(newUser);
            response = cUser.toJson();
        };
        console.log("put user "+req.query.email);
        await res.json(response);
        return response;
    }

    async createUser(req: Request, res: Response): Promise<Object> {
        let newId: number = (req.body.id > 0)? req.body.id : -1;
            console.log("post user: neew id is "+newId);
        const cUser: User = new User(newId);
        cUser.email = req.body.email;
        cUser.pass = req.body.pass;
        if(req.body.name !== undefined && req.body.name !== "") {
            cUser.name = req.body.name;
        }
        if(req.body.lang !== undefined && req.body.lang !== "") {
            cUser.lang = req.body.lang;
        }
        if(req.body.currency !== undefined && req.body.currency !== "") {
            cUser.curr = req.body.currency;
        }
        if(req.body.avatar !== undefined && req.body.avatar !== "") {
            cUser.avatar = req.body.avatar;
        }

        let response = cUser.toJson();
        const findDoc = await this.userModel.findOne({ email: cUser.email }).exec();
            console.log(`${JSON.stringify(findDoc?.toJSON())}`)
        if(!findDoc?.$isEmpty) {
            // const userModel = cUser.getDbModel();
            const resDB = await this.userModel.create(cUser.getDbModelVars());
            if(resDB) {
                response = cUser.toJson();
                console.log("post user "+req.body.email);
                await res.json(response);
                return response;        
            }
        } else {
            console.log("User "+req.body.email+" is already registered!");
            await res.status(400).json({"answer": "User "+req.body.email+" is already registered!"});
            return response; 
        }
        
        // Отправим ответ клиенту. Объект будет автоматически сериализован
        // в строку. Если явно не задано иного, HTTP-статус будет 200 OK.
        await res.status(500).json({"answer": "Error connect to DB!"});
        return response;
    }

    async getWatchList(req: Request, res: Response): Promise<boolean> {
        const doc = await this.userModel.findOne({ email: req.query.email }).exec();
        if(doc) {
            const watch: Array<string> = doc?.get('watchlist', Array<string>);
            console.log("put watchlist "+req.query.email);
            await res.json(watch);
            return true;
        } else {
            console.log("put user not found!!! "+req.query.email);
            await res.status(400).json({"answer": "user not found"});
            return false;
        }
    }

    async putWatchList(req: Request, res: Response): Promise<boolean> {
        const cUser: User = new User(-1);
        const findDoc = await this.userModel.findOne({ email: req.query.email }).exec();
        if(!findDoc?.$isEmpty) {
            console.log("put user not found!!! "+req.query.email);
            await res.status(400).json({"answer": "user not found"});
        } else {
            const watchlist: Array<string> = JSON.parse(String(req.query.watchlist));
            await this.userModel.findOneAndUpdate({email: req.query.email}, {watchlist: watchlist}).then((doc) => {
                doc?.save();
            });
            const doc = await this.userModel.findOne({ email: req.query.email }).exec();
            const watch: Array<string> = doc?.get('watchlist', Array<string>);
            console.log("put watchlist "+req.query.email);
            await res.json(watch);
            return true;
        };
        return false;
    }

    async getPortfolio(req: Request, res: Response): Promise<boolean> {
        const doc = await this.userModel.findOne({ email: req.query.email }).exec();
        if(doc) {
            const port: Map<string, string> = doc?.get('portfolio', Map);
            console.log("put portfolio "+req.query.email);
            await res.json(port);
            return true;
        } else {
            console.log("user not found!!! "+req.query.email);
            await res.status(400).json({"answer": "user not found"});
            return false;
        }
    }

    async putPortfolio(req: Request, res: Response): Promise<boolean> {
        const cUser: User = new User(-1);
        const findDoc = await this.userModel.findOne({ email: req.query.email }).exec();
        if(!findDoc?.$isEmpty) {
            console.log("user not found!!! "+req.query.email);
            await res.status(400).json({"answer": "user not found"});
        } else {
            const portfolio: Map<string, string> = JSON.parse(String(req.query.portfolio));
            await this.userModel.findOneAndUpdate({email: req.query.email}, {portfolio: portfolio}).then((doc) => {
                doc?.save();
            });
            const doc = await this.userModel.findOne({ email: req.query.email }).exec();
            const watch: Map<string, string> = doc?.get('portfolio', Map);
            console.log("put portfolio "+req.query.email);
            await res.json(watch);
            return true;
        };
        return false;
    }

    getDbModelUser(mod: string) {
        return mongoose.connection.model(mod, this.newShemaUser());
    }

    newShemaUser(): mongoose.Schema {
        return new mongoose.Schema({
            id: {type: Number, required: true},
            name: {type: String, required: false},
            pass: {type: String, required: true},
            email: {type: String, unuque: true, required: true},
            lang: {type: String, required: false},
            curr: {type: String, required: false},
            avatar: {type: String, required: false},
            watchlist: {type: Array<String>, required: false},
            portfolio: {type: Map, default: {}, required: false}
        });
    }	
}