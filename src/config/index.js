const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../.env')
});

module.exports = {
    PORT: "3000",
    MONGO_CONNECTION_STRING: "mongodb+srv://user:user@cluster0.jijfxzy.mongodb.net/?retryWrites=true&w=majority"
  };