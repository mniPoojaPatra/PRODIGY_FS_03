const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const PORT = 3000;

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "ecom-secret", resave: false, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Home - Show Products
app.get("/", (req, res) => {
  db.all("SELECT * FROM products", [], (err, products) => {
    if (err) throw err;
    res.render("index", { products, cart: req.session.cart || [] });
  });
});

// Add to Cart
app.post("/add-to-cart", (req, res) => {
  const { id, name, price } = req.body;
  if (!req.session.cart) req.session.cart = [];
  req.session.cart.push({ id, name, price });
  res.redirect("/");
});

// View Cart
app.get("/cart", (req, res) => {
  res.render("cart", { cart: req.session.cart || [] });
});

// Checkout
app.get("/checkout", (req, res) => {
  res.render("checkout", { cart: req.session.cart || [] });
});

// Remove from Cart
app.post("/remove-from-cart", (req, res) => {
  console.log("Removing item at index:", req.body.index);
  const index = parseInt(req.body.index, 10); // make sure it's a number
  if (req.session.cart && index >= 0 && index < req.session.cart.length) {
    req.session.cart.splice(index, 1); // remove item by index
  }
  res.redirect("/cart");
});


app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
