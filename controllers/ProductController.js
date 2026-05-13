import { Product } from "../models/productModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({
      message: "get all products successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single product
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({
      message: "product fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      price,
      availibity,
      category,
      freeShipping,
      description,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    const product = await Product.create({
      productName,
      price,
      availibity,
      category,
      freeShipping,
      description,
      image,
    });

    res.status(201).json({
      message: "product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, title, price, description } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updateData = {
      productName: productName || product.productName,
      title: title || product.title,
      price: price || product.price,
      description: description || product.description,
    };

    if (req.file) {
      // Delete old image
      const oldImagePath = path.join(__dirname, "../uploads/", product.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      updateData.image = req.file.filename;
    }

    await product.update(updateData);

    res.json({
      message: "product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image file
    const imagePath = path.join(__dirname, "../uploads/", product.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await product.destroy();
    res.json({ message: "product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};