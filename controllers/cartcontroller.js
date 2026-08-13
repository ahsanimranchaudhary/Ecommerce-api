import Cart from "../models/cartmodel.js";
import Product from "../models/productmodel.js";

export async function createCart(req, res, next) {
  try {
    const { id } = req.user;
    const newCart = await Cart.create({ owner: id, items: [] });
    return res.status(201).json({ message: "Cart created", cart: newCart });
  } catch (error) {
    next(error);
  }
}

export async function getCarts(req, res, next) {
  // admin
  try {
    const carts = await Cart.find();
    if (carts.length === 0) {
      return res.status(404).json({ message: "No carts found" });
    }
    res.status(200).json({ message: "All carts retrieved", carts });
  } catch (error) {
    next(error);
  }
}

export async function getallCarts(req, res, next) {
  try {
    const { id } = req.user;
    const carts = await Cart.find({ owner: id });
    if (carts.length === 0) {
      return res.status(404).json({ message: "No carts found" });
    }
    return res.status(200).json({ message: "All carts retrieved", carts });
  } catch (error) {
    next(error);
  }
}

export async function getCart(req, res, next) {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findOne({ _id: cartId, owner: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "No cart found" });
    }
    return res.status(200).json({ message: "Cart retrieved", cart: cart });
  } catch (error) {
    next(error);
  }
}

export async function addItemtoCart(req, res, next) {
  try {
    const cart = await Cart.findOne({
      _id: req.params.cartId,
      owner: req.user.id,
    });
    if (!cart) {
      return res.status(404).json({ message: "No cart found" });
    }
    const product = await Product.findOne({ name: req.body.name });
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    const quantity = Number(req.body.quantity);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be a positive integer",
      });
    }

    if (quantity > Number(product.stock)) {
      return res.status(400).json({ message: "Not enough stock" });
    }
    const existitem = cart.items.find((item) => {
      return item.product.equals(product._id);
    });
    if (existitem) {
      existitem.quantity += quantity;
    } else {
      cart.items.push({ product: product._id, quantity: quantity });
    }
    product.stock -= quantity;
    await product.save();
    await cart.save();
    return res.status(200).json({
      message: "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteCart(req, res, next) {
  try {
    const delcart = await Cart.findOneAndDelete({
      _id: req.params.cartId,
      owner: req.user.id,
    });
    if (!delcart) {
      return res.status(404).json({ message: "No cart found" });
    }
    const stockrestoration = delcart.items.map((item) => {
      return Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    });
    await Promise.all(stockrestoration);
    return res.status(200).json({ message: "Cart deleted", cart: delcart });
  } catch (error) {
    next(error);
  }
}

export async function removeCartItem(req, res, next) {
  try {
    const cart = await Cart.findOne({
      _id: req.params.cartId,
      owner: req.user.id,
    });
    if (!cart) {
      return res.status(404).json({ message: "No cart found" });
    }
    const item = cart.items.id(req.params.itemsId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: item.quantity },
    });
    cart.items.pull(req.params.itemsId);
    await cart.save();
    return res.status(200).json({
      message: "Item removed successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
}
