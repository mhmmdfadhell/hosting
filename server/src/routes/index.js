const express = require("express");

const router = express.Router();

const { auth, authAdmin } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

const { login, register, checkAuth } = require("../controllers/auth");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getProfile,
} = require("../controllers/user");
const {
  addPrduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
} = require("../controllers/product");
const {
  addTopping,
  getToppings,
  getTopping,
  updateTopping,
  deleteTopping,
  updateToppingStock,
} = require("../controllers/topping");
const {
  addTransaction,
  getTransactions,
  getTransaction,
  getUserTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction");

router.post("/login", login);
router.post("/register", register);

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user", auth, uploadFile("image"), updateUser);
router.get("/profile", auth, getProfile);
router.delete("/user/:id", deleteUser);
router.get("/check-auth", auth, checkAuth);

router.post("/product", authAdmin, uploadFile("image"), addPrduct);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.patch("/product/:id", auth, updateProduct);
router.patch("/productStock/:id", auth, updateProductStock);
router.delete("/product/:id", authAdmin, deleteProduct);

router.post("/topping", authAdmin, uploadFile("image"), addTopping);
router.get("/toppings", getToppings);
router.get("/topping/:id", getTopping);
router.patch("/topping/:id", authAdmin, updateTopping);
router.patch("/toppingStock/:id", auth, updateToppingStock);
router.delete("/topping/:id", authAdmin, deleteTopping);

router.post("/transaction", auth, uploadFile("attachment"), addTransaction);
router.get("/transactions", getTransactions);
router.get("/transaction/:id", getTransaction);
router.get("/cart/", auth, getUserTransaction);
router.patch("/transaction/:id", auth, updateTransaction);
router.delete("/transaction/:id", auth, deleteTransaction);

module.exports = router;
