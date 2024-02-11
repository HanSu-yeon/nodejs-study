const productModel = require('../models/products.model');

async function createProduct(req, res, next) {
  try {
    console.log(req.body);
    const createProduct = await productModel.create(req.body);
    console.log(createProduct);

    res.status(201).json(createProduct);
  } catch (error) {
    next(error);
  }
}

async function getProducts(req, res, next) {
  try {
    const allProducts = await productModel.find({});
    res.status(200).json(allProducts);
  } catch (err) {
    next(err);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await productModel.findById(req.params.productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    let updatedProduct = await productModel.findByIdAndUpdate(req.params.productId, req.body, { new: true });

    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    let deleteProduct = await productModel.findByIdAndDelete(req.params.productId);
    if (deleteProduct) {
      res.status(200).json(deleteProduct);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
