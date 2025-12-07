const { Router } = require('express');
const member_router = Router();
const member_controller = require('../controllers/member_controller');


member_router.get("/", member_controller.memberPostGet);
member_router.get("/sign-up", member_controller.signUpFormGet);
member_router.post("/sign-up", member_controller.signUpFormPost);
member_router.get("/log-in", member_controller.logInFormGet);
member_router.post("/log-in", member_controller.logInFormPost);
member_router.get("/log-out", member_controller.logOutGet);
member_router.get("/create-post", member_controller.createPostGet);
member_router.post("/create-post", member_controller.createPostPost);
member_router.post("/delete-post", member_controller.deletePostPost);

module.exports = member_router;