import Product from "../models/productmodel.js";

export async function getProducts(req, res, next) {
  try {
    const products = await Product.find();
    if (products.length == 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json({ message: "Products found", products: products });
  } catch (error) {
    next(error);
  }
}

export async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product found", product: product });
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    const { name, description, price, category, stock } = req.body;
    if (!name || !description || !price || !category || stock < 0) {
      return res.status(400).json({
        message: "All fields are required and stock must be a positive number",
      });
    }
    const product = await Product.create({
      name: name,
      description: description,
      price: price,
      category: category,
      stock: stock,
    });
    res.status(201).json({ message: "Product created", product: product });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const { name, description, price, category, stock } = req.body;
    if (name) {
      product.name = name;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    if (category) {
      product.category = category;
    }
    if (stock >= 0) {
      product.stock = stock;
    }
    await product.save();
    res.status(200).json({ message: "Product updated" });
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
}
