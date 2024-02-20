const Product = require('../models/product');

module.exports = {
  // קבלת מידע על המוצרים =>
  // קבל את כל המוצרים
  GetAllProduct: (req, res) => {
    Product.find().then((data) => {
      return res.status(200).json(data);
    });
  },
  // קבל מוצר ספיציפי על ידי מספר מזהה
  GetProductById: (req, res) => {
    let pid = req.params.id;
    
    Product.find({pid}).then((data) => {
      return res.status(200).json(data);
    });
  },

  // ביצוע פעולות =>
  // הוספת מוצר חדש
  AddProduct: (req, res) => {
    let body = req.body;
    Product.insertMany([body]).then((data) => {
      return res.status(200).json(data);
    });
  },

  // ביצוע פעולות על המוצרים קיימים =>
  // עדכון מוצר
  UpdateProduct: (req, res) => {
    let pid = req.params.id;
    let body = req.body;
    // Update the product in the database
    Product.updateOne({ pid }, body).then(() => {
      return res.status(200).json({ msg: `Product ${pid} has been successfully updated`, body });
    });
  },

  // מחיקת מוצר
  DeleteProduct: (req, res) => {
    let pid = req.params.id;
    Product.deleteOne({ pid }).then((data) => {
      return res.status(200).json(data);
    });
  },
};
