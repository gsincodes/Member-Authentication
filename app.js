require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();
const member_router = require('./routes/member_router');
const passport = require('./config/passport');
// const helmet = require('helmet');

// app.use(helmet());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", member_router);


const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if(error) throw error;
    console.log(`App listening on PORT -> ${PORT}`);
})