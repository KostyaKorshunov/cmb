import { App } from './App';
// const config = require( './config.json' );

let app = new App();
app.expressApp.listen(3000, "0.0.0.0", function() {
    console.log(`App listening at port ${3000}`);
});