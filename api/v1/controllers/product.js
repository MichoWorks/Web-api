const mysql = require('mysql');

module.exports = {
  // Get all products
  GetAllProduct: (req, res) => {
    const conn = global.db;
    const query = "SELECT * FROM t_products";
    
    conn.query(query, (error, results, fields) => {
      if (error) {
        console.error("Error retrieving products:", error);
        return res.status(500).json({ error: "Failed to retrieve products" });
      }
      
      return res.status(200).json(results);
    });
  },

  // Get product by ID
  GetProductById: (req, res) => {
    const conn = global.db;
    const pid = req.params.id;
    const query = "SELECT * FROM t_products WHERE pid = ?";
    
    conn.query(query, [pid], (error, results, fields) => {
      if (error) {
        console.error("Error retrieving product:", error);
        return res.status(500).json({ error: "Failed to retrieve product" });
      }
      
      return res.status(200).json(results);
    });
  },

  // Add new product
  AddProduct: (req, res) => {
    const conn = global.db;
    const body = req.body;
    const query = "INSERT INTO t_products SET ?";
    
    conn.query(query, [body], (error, results, fields) => {
      if (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({ error: "Failed to add product" });
      }
      
      return res.status(200).json({ msg: "Product added successfully" });
    });
  },

  // Update product
  UpdateProduct: (req, res) => {
    const conn = global.db;
    const pid = req.params.id;
    const body = req.body;
    const query = "UPDATE t_products SET ? WHERE pid = ?";
    
    conn.query(query, [body, pid], (error, results, fields) => {
      if (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ error: "Failed to update product" });
      }
      
      return res.status(200).json({ msg: `Product ${pid} updated successfully` });
    });
  },

  // Delete product
  DeleteProduct: (req, res) => {
    const conn = global.db;
    const pid = req.params.id;
    const query = "DELETE FROM t_products WHERE pid = ?";
    
    conn.query(query, [pid], (error, results, fields) => {
      if (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ error: "Failed to delete product" });
      }
      
      return res.status(200).json({ msg: `Product ${pid} deleted successfully` });
    });
  }
};
