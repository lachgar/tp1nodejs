// src/services/product.service.js
import { productRepository } from '../repositories/product.repository.js';
import { Product } from '../models/product.model.js';

const validateProduct = (productData) => {
  try {
    new Product(null, productData.name, productData.price, productData.stock).validate();
  } catch (error) {
    error.status = 400;
    throw error;
  }
};

export const productService = {
  getAllProducts: async () => {
    return await productRepository.findAll();
  },

  getProductById: async (id) => {
    const product = await productRepository.findById(id);
    if (!product) {
      const error = new Error('Produit non trouvé');
      error.status = 404;
      throw error;
    }
    return product;
  },

  createProduct: async (productData) => {
    validateProduct(productData);
    return await productRepository.create(productData);
  },

  updateProduct: async (id, productData) => {
    await productService.getProductById(id); // Vérifie l'existence
    validateProduct(productData);
    return await productRepository.update(id, productData);
  },

  deleteProduct: async (id) => {
    await productService.getProductById(id); // Vérifie l'existence
    return await productRepository.delete(id);
  }
};
