const {Router} = require('express');
let router = Router();
const controler = require('../controlers/basket_controler');

router.post("/add",controler.addToBasket);
router.post("/delete",controler.deleteFromBasket);
router.get("/get",controler.getBasket);

module.exports = router;