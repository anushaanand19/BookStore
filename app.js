const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("./util/database");
const adminRouter = require("./routes/adminRoute");
const shopRouter = require("./routes/shopRoute");
const Product = require("./model/product");
const User = require("./model/user");
const Cart = require("./model/cart");
const CartItem = require("./model/cartItem");
const Order = require("./model/order");
const OrderItem = require("./model/orderItem");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

Product.belongsTo(User);
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

app.set("view engine", "pug");
app.set("views", "views");
app.use("/admin", adminRouter);
app.use(shopRouter);

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Anusha", email: "anushaanand@test.com" });
    }
    return user;
  })
  .then((user) => {
    user.createCart();
  })
  .then((cart) => app.listen(3000))
  .catch((err) => console.log(err));
