const {Router} = require('express');
const router = Router();
const controler = require('../controlers/products_controler.js');

router.get("/categories",controler.getCategories);
router.get("/all",controler.getAllProducts);
router.post("/currentType",controler.getCurrentTypedProduct);
router.post("/updateProduct",controler.updateProduct);
router.post("/addProduct",controler.addProduct);
router.post("/deleteProduct",controler.deleteProduct);
router.post("/addCategory",controler.addCategory);
router.post("/deleteCategory",controler.deleteCategory);

module.exports = router;