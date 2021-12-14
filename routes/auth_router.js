const {Router} = require('express');
let router = Router();
const controler = require('../controlers/auth_controler.js');
const {check} = require('express-validator');
const roleMiddleWare = require('../middleWare/roleMiddleWare.js');

router.post("/registration",[
    check('userName','UserName can\'t be empty').notEmpty(),
    check('password','Password length should be more then 3 and less then 30').isLength({min:4,max:30}),
    check('email','Invalid email').normalizeEmail().isEmail()
],controler.registration);
router.post("/login",controler.login);
router.get("/users",roleMiddleWare(['ADMIN']),controler.getUsers);
router.post("/deleteUser",roleMiddleWare(['ADMIN']),controler.deleteUser);

module.exports = router;