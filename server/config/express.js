const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    Router = require('../routes/');
    passport = require("passport");

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || require('../config/config.js').db.uri, {
        useNewUrlParser: true
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // Bodyparser middleware
    app.use(
    bodyParser.urlencoded({
        extended: false
    })
    );
    app.use(bodyParser.json());

    // add a router
    const users = require("../routes/api/users");
    const horses = require("../routes/api/horses");
    const competitions = require("../routes/api/competitions");

    // DB Config
    // const db = require("./config/keys").mongoURI;

    // // Connect to MongoDB
    // mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/equestriancompetitionsdb");
    // // mongoose
    // .connect(
    //     db,
    //     { useNewUrlParser: true }
    // )
    // .then(() => console.log("MongoDB successfully connected"))
    // .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("../config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/horses", horses);
app.use("/api/competitions", competitions);

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
}






// const server = app.listen(process.env.PORT || 5000, () => {
//   const port = server.address().port;
//   console.log(`Express is working on port ${port}`);
// });
