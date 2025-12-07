const { Passport } = require('passport');
const db = require('../db/queries');
const passport = require('passport');
const bcrypt = require('bcryptjs');

async function memberPostGet(req, res) {
    const posts = await db.getPostInfo();
    
    if(!req.isAuthenticated()) {
        // return res.redirect("/log-in");
        return res.render("member_post", { posts: posts, isAuthenticated: false, userInfo: null});
    }

    const userInfo = await db.getUserInfo(req.user.id);
    console.log(`isAdmin: ${userInfo.admin}`);
    return res.render("member_post", { posts: posts, user: req.user, isAuthenticated: true, userInfo: userInfo });
}

async function signUpFormGet(req, res) {
    res.render("sign-up-form");
}

async function signUpFormPost(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.insertUserPass(req.body.firstname, req.body.lastname, req.body.username, hashedPassword);
        res.redirect("/log-in");
    }
    catch(error) {
        console.error(error);
        return next(error);
    }
}

async function logInFormGet(req, res) {
    res.render("log-in-form");
}

function logInFormPost(req, res, next) {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in"
    })(req, res, next);
};

async function logOutGet(req, res, next) {
    req.logout((error) => {
        if(error) {
            return next(error);
        }
        res.redirect("/");
    })
}

async function createPostGet(req, res) {
    if(!req.isAuthenticated()) {
        return res.redirect("/log-in");
    }
    res.render("create-post");
}

async function createPostPost(req, res) {
    if(!req.isAuthenticated()) {
        return res.redirect("/log-in");
    }
    try {
        const postText = req.body.postText;
        await db.createPost(req.user.id, req.user.username, req.body.postTitle, postText);
        res.redirect("/");
    }
    catch(error) {
        console.error(error);
        res.redirect("/create-post");
    }
    
}

async function deletePostPost(req, res) {
    await db.deletePost(req.body.postId);
    res.redirect("/");
}

module.exports = {
    signUpFormGet,
    signUpFormPost,
    memberPostGet,
    logInFormGet,
    logInFormPost,
    logOutGet,
    createPostGet,
    createPostPost,
    deletePostPost
}