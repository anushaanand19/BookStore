const Product = require("../model/product");

exports.getMainAdminPage = (req, res, next) => {
  res.render("../views/admin/main-admin.pug", { title: "Admin Page" });
};

exports.getEditAndDeleteProducts = (req, res, next) => {
  Product.findAll()
    .then((products) =>
      res.render("../views/admin/edit-delete.pug", { products: products })
    )
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productID;
  console.log(prodId);
  Product.findByPk(prodId)
    .then((product) => {
      res.render("../views/admin/edit-product.pug", {
        product: product,
        title: "Edit Product",
      });
    })
    .catch((err) => console.log(err));
};
exports.getAddProduct = (req, res, next) => {
  res.render("../views/admin/add-product.pug", { title: "Admin Page" });
};

exports.getProducts = (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const price = req.body.price;
  const image = req.body.image;
  const description = req.body.description;

  Product.create({
    title: title,
    author: author,
    price: price,
    image: image,
    description: description,
  })
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
};

exports.setEditProduct = (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const price = req.body.price;
  const id = req.body.id;
  const description = req.body.description;
  console.log(req.body);
  Product.findByPk(id)
    .then((product) => {
      console.log(product);
      product.title = title;
      product.author = author;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then((result) => {
      console.log("Updated Product");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const prodID = req.params.productID;
  console.log(prodID);
  Product.findByPk(prodID)
    .then((product) => {
      product.destroy();
      res.redirect("/admin/edit-delete-product");
    })
    .catch((err) => console.log(err));
};
