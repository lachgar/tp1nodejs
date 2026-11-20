// src/controllers/product.controller.js
import { productService } from '../services/product.service.js';

export const productController = {
  getAll: async (req, res, next) => {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const product = await productService.getProductById(id);
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { name, price, stock } = req.body;
      const newProduct = await productService.createProduct({ name, price, stock });

      res.status(201).json({
        success: true,
        message: 'Produit créé avec succès',
        data: newProduct
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { name, price, stock } = req.body;
      const updatedProduct = await productService.updateProduct(id, { name, price, stock });

      res.status(200).json({
        success: true,
        message: 'Produit mis à jour avec succès',
        data: updatedProduct
      });
    } catch (error) {
      next(error);
    }
  },

  patch: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const existing = await productService.getProductById(id);
      const updatedData = { ...existing };

      for (const field of ['name', 'price', 'stock']) {
        if (field in req.body) updatedData[field] = req.body[field];
      }

      const updatedProduct = await productService.updateProduct(id, updatedData);

      res.status(200).json({
        success: true,
        message: 'Produit modifié partiellement avec succès',
        data: updatedProduct
      });
    } catch (error) {
      next(error);
    }
  },

  remove: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      await productService.deleteProduct(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};
