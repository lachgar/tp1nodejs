
// src/models/product.model.js

export class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  // Validation des données du produit
  validate() {
    if (typeof this.name !== 'string' || !this.name.trim()) {
      throw new Error('Le nom du produit est obligatoire');
    }

    if (!Number.isFinite(this.price) || this.price < 0) {
      throw new Error('Le prix doit être un nombre positif ou nul');
    }

    if (!Number.isInteger(this.stock) || this.stock < 0) {
      throw new Error('Le stock doit être un entier positif ou nul');
    }

    return true;
  }
}
