"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQuery = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require(".//User"));
class UserQuery {
    constructor(dbURL) {
        // mongoose.connect(dbURL);
        this.userModel = this.getDbModelUser('user');
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cUser = new User_1.default(-1);
            let response = cUser.toJson();
            const findDoc = yield this.userModel.findOne({ email: req.query.email }).exec();
            if (!(findDoc === null || findDoc === void 0 ? void 0 : findDoc.$isEmpty)) {
                console.log("get user not found!!! " + req.query.email);
                yield res.status(400).json({ "answer": "user not found" });
                return yield response;
            }
            else {
                let newUser = findDoc === null || findDoc === void 0 ? void 0 : findDoc.toObject();
                cUser.readData(newUser);
                if (cUser.checkUserPass(String(req.query.pass))) {
                    response = cUser.toJson();
                }
                else {
                    yield res.status(400).json({ "answer": "user not found" });
                    return yield response;
                }
            }
            ;
            console.log("put user " + req.query.email);
            yield res.json(response);
            return response;
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cUser = new User_1.default(-1);
            let response = cUser.toJson();
            const findDoc = yield this.userModel.findOne({ email: req.query.email }).exec();
            if (!(findDoc === null || findDoc === void 0 ? void 0 : findDoc.$isEmpty)) {
                console.log("put user not found!!! " + req.query.email);
                yield res.status(400).json({ "answer": "user not found" });
                return yield response;
            }
            else {
                if (req.query.name && req.query.name !== "") {
                    yield this.userModel.findOneAndUpdate({ email: req.query.email }, { name: req.query.name }).then((doc) => {
                        doc === null || doc === void 0 ? void 0 : doc.save();
                    });
                }
                if (req.query.lang && req.query.lang !== "") {
                    yield this.userModel.findOneAndUpdate({ email: req.query.email }, { lang: req.query.lang }).then((doc) => {
                        doc === null || doc === void 0 ? void 0 : doc.save();
                    });
                }
                if (req.query.currency && req.query.currency !== "") {
                    yield this.userModel.findOneAndUpdate({ email: req.query.email }, { curr: req.query.currency }).then((doc) => {
                        doc === null || doc === void 0 ? void 0 : doc.save();
                    });
                }
                if (req.query.avatar && req.query.avatar !== "") {
                    yield this.userModel.findOneAndUpdate({ email: req.query.email }, { avatar: req.query.avatar }).then((doc) => {
                        doc === null || doc === void 0 ? void 0 : doc.save();
                    });
                }
                const newUserData = yield this.userModel.findOne({ email: req.query.email }).exec();
                let newUser = newUserData === null || newUserData === void 0 ? void 0 : newUserData.toObject();
                cUser.readData(newUser);
                // await cUser.readData(newUserData as typeUser);
                // console.log(newUser);
                response = cUser.toJson();
            }
            ;
            console.log("put user " + req.query.email);
            yield res.json(response);
            return response;
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let newId = (req.body.id > 0) ? req.body.id : -1;
            console.log("post user: neew id is " + newId);
            const cUser = new User_1.default(newId);
            cUser.email = req.body.email;
            cUser.pass = req.body.pass;
            if (req.body.name !== undefined && req.body.name !== "") {
                cUser.name = req.body.name;
            }
            if (req.body.lang !== undefined && req.body.lang !== "") {
                cUser.lang = req.body.lang;
            }
            if (req.body.currency !== undefined && req.body.currency !== "") {
                cUser.curr = req.body.currency;
            }
            if (req.body.avatar !== undefined && req.body.avatar !== "") {
                cUser.avatar = req.body.avatar;
            }
            let response = cUser.toJson();
            const findDoc = yield this.userModel.findOne({ email: cUser.email }).exec();
            console.log(`${JSON.stringify(findDoc === null || findDoc === void 0 ? void 0 : findDoc.toJSON())}`);
            if (!(findDoc === null || findDoc === void 0 ? void 0 : findDoc.$isEmpty)) {
                // const userModel = cUser.getDbModel();
                const resDB = yield this.userModel.create(cUser.getDbModelVars());
                if (resDB) {
                    response = cUser.toJson();
                    console.log("post user " + req.body.email);
                    yield res.json(response);
                    return response;
                }
            }
            else {
                console.log("User " + req.body.email + " is already registered!");
                yield res.status(400).json({ "answer": "User " + req.body.email + " is already registered!" });
                return response;
            }
            // Отправим ответ клиенту. Объект будет автоматически сериализован
            // в строку. Если явно не задано иного, HTTP-статус будет 200 OK.
            yield res.status(500).json({ "answer": "Error connect to DB!" });
            return response;
        });
    }
    getWatchList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.userModel.findOne({ email: req.query.email }).exec();
            if (doc) {
                const watch = doc === null || doc === void 0 ? void 0 : doc.get('watchlist', (Array));
                console.log("put watchlist " + req.query.email);
                yield res.json(watch);
                return true;
            }
            else {
                console.log("put user not found!!! " + req.query.email);
                yield res.status(400).json({ "answer": "user not found" });
                return false;
            }
        });
    }
    putWatchList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cUser = new User_1.default(-1);
            const findDoc = yield this.userModel.findOne({ email: req.query.email }).exec();
            if (!(findDoc === null || findDoc === void 0 ? void 0 : findDoc.$isEmpty)) {
                console.log("put user not found!!! " + req.query.email);
                yield res.status(400).json({ "answer": "user not found" });
            }
            else {
                const watchlist = JSON.parse(String(req.query.watchlist));
                yield this.userModel.findOneAndUpdate({ email: req.query.email }, { watchlist: watchlist }).then((doc) => {
                    doc === null || doc === void 0 ? void 0 : doc.save();
                });
                const doc = yield this.userModel.findOne({ email: req.query.email }).exec();
                const watch = doc === null || doc === void 0 ? void 0 : doc.get('watchlist', (Array));
                console.log("put watchlist " + req.query.email);
                yield res.json(watch);
                return true;
            }
            ;
            return false;
        });
    }
    getPortfolio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.userModel.findOne({ email: req.query.email }).exec();
            if (doc) {
                const port = doc === null || doc === void 0 ? void 0 : doc.get('portfolio', Map);
                console.log("put portfolio " + req.query.email);
                yield res.json(port);
                return true;
            }
            else {
                console.log("user not found!!! " + req.query.email);
                yield res.status(400).json({ "answer": "user not found" });
                return false;
            }
        });
    }
    putPortfolio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cUser = new User_1.default(-1);
            const findDoc = yield this.userModel.findOne({ email: req.query.email }).exec();
            if (!(findDoc === null || findDoc === void 0 ? void 0 : findDoc.$isEmpty)) {
                console.log("user not found!!! " + req.query.email);
                yield res.status(400).json({ "answer": "user not found" });
            }
            else {
                const portfolio = JSON.parse(String(req.query.portfolio));
                yield this.userModel.findOneAndUpdate({ email: req.query.email }, { portfolio: portfolio }).then((doc) => {
                    doc === null || doc === void 0 ? void 0 : doc.save();
                });
                const doc = yield this.userModel.findOne({ email: req.query.email }).exec();
                const watch = doc === null || doc === void 0 ? void 0 : doc.get('portfolio', Map);
                console.log("put portfolio " + req.query.email);
                yield res.json(watch);
                return true;
            }
            ;
            return false;
        });
    }
    getDbModelUser(mod) {
        return mongoose_1.default.connection.model(mod, this.newShemaUser());
    }
    newShemaUser() {
        return new mongoose_1.default.Schema({
            id: { type: Number, required: true },
            name: { type: String, required: false },
            pass: { type: String, required: true },
            email: { type: String, unuque: true, required: true },
            lang: { type: String, required: false },
            curr: { type: String, required: false },
            avatar: { type: String, required: false },
            watchlist: { type: (Array), required: false },
            portfolio: { type: Map, default: {}, required: false }
        });
    }
}
exports.UserQuery = UserQuery;
