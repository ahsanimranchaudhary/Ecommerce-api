import Order from "../models/ordermodel.js";
import Cart from "../models/cartmodel.js";
import Product from "../models/productmodel.js";

export async function createOrder(req, res, next) {
  try {
    const ownerId = req.user.id;
    const { cartId } = req.body;
    const cart = await Cart.findOne({ _id: cartId, owner: ownerId }).populate("items.product");
    if (!cart) {
      return res.status(400).send("cart does not exist");
    }
    if(cart.items.length==0)
    {
      return res.status(404).json({message:"Cart is empty"});
    }
    const OrderItems = [];
    let total=0;
    for (const item of cart.items)
    {
      const product = item.product;
      if(!product)
      {
        return res.status(404).json({ message: "One or more products in cart no longer exist" });
      }

      const orderItem = {
        product:product._id,
        productname:product.name,
        quantity:item.quantity,
        price:product.price
      }
      OrderItems.push(orderItem);
      total+=product.price*item.quantity;
    }
    const newOrder = await Order.create({
      user:ownerId,
      items:OrderItems,
      totalprice:total,
    });
    await Cart.findByIdAndDelete(cart._id);
    return res.status(201).json({message:"Order created successfully",order:newOrder});
  } catch (error) {
    next(error);
  }
}

export async function getalluserOrder(req, res, next) {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId });
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    return res
      .status(200)
      .json({ message: "All orders received", orders: orders });
  } catch (error) {
    next(error);
  }
}

export async function deletealluserOrder(req, res, next) {
  try {
    const userId = req.user.id;
    const delorders = await Order.deleteMany({ user: userId });
    return res
      .status(200)
      .json({ message: "All orders received", orders: delorders });
  } catch (error) {
    next(error);
  }
}

export async function deleteuserOrderbyId(req, res, next) {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;
    const order = await Order.findOneAndDelete({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
}

export async function getuserOrderbyId(req, res, next) {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res
      .status(200)
      .json({ message: "Order retrieved successfully", order: order });
  } catch (error) {
    next(error);
  }
}

export async function getOrders(req, res, next) {
  try {
    const orders = await Order.find();
    if (orders.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }
    return res
      .status(200)
      .json({ message: "Orders retrieved successfully", orders: orders });
  } catch (error) {
    next(error);
  }
}

export async function updateOrderstatus(req, res, next) {
  try {
    const { orderId } = req.params;
    const { newstatus } = req.body;
    const validstatuses = ["pending", "completed", "cancelled"];
    if (!newstatus || !validstatuses.includes(newstatus)) {
      return res.status(400).json({
        message: `Invalid status`,
      });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    order.status = newstatus;
    await order.save();
    return res.status(200).json({
      message: "Order status updated successfully.",
      order,
    });
  } catch (error) {
    next(error);
  }
}
