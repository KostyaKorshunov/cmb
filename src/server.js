// const { PORT } = require('./common/config');
const app = require('./app');

const { PORT } = require('./config/index');

const { connect } = require('./common/db.connection');

connect(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});