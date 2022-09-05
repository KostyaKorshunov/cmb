"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
// const config = require( './config.json' );
let app = new App_1.App();
app.expressApp.listen(3000, "0.0.0.0", function () {
    console.log(`App listening at port ${3000}`);
});
