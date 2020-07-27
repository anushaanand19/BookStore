const Product = require("../model/product");
const Cart = require("../model/cart.js");
exports.getShopProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("../views/shop/products.pug", {
        title: "Shop",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productID;
  Product.findByPk(productId)
    .then((product) => {
      res.render("../views/shop/product-detail.pug", { prod: product });
    })
    .catch((err) => console.log(err));
};

exports.getCartItems = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      res.render("cart/cart.pug", { products: products, title: "Cart" });
    })
    .catch((err) => console.log(err));
};

exports.addCartItems = (req, res, next) => {
  const prodID = req.params.productID;
  let newQuantity = 1;
  let fetchedCart, product;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodID } });
    })
    .then((products) => {
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        let oldQuantity = product.cartItem.Quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodID);
    })
    .then((product) => {
      fetchedCart
        .addProduct(product, {
          through: { Quantity: newQuantity },
        })
        .then((result) => {
          res.redirect("/cart");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
