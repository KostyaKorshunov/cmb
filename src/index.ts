import { App } from './app';
// const config = require( './config.json' );

let app = new App();
app.expressApp.listen(process.env.PORT || 3000, function() {  // 8080, "0.0.0.0", 
    console.log(`App listening at port ${3000}`);
});