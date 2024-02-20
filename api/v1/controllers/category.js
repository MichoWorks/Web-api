const Category = require('../models/category');

module.exports = {
  // קבלת מידע על הקטגוריות =>
  // קבל את כל הקטגוריות
  GetAllCategories: (req, res) => {
    Category.find().then((data) => {
      return res.status(200).json(data);
    });
  },
  
  // קבל קטגוריה ספיציפית לפי מזהה
  GetCategoryById: (req, res) => {
    let categoryId = req.params.id;
    
    Category.find({ categoryId }).then((data) => {
      return res.status(200).json(data);
    });
  },

  // ביצוע פעולות =>
  // הוספת קטגוריה חדשה
  AddCategory: (req, res) => {
    let body = req.body;
    Category.insertMany([body]).then((data) => {
      return res.status(200).json(data);
    });
  },

  // ביצוע פעולות על הקטגוריות קיימות =>
  // עדכון קטגוריה
  UpdateCategory: (req, res) => {
    let categoryId = req.params.id;
    let body = req.body;
    // Update the category in the database
    Category.updateOne({ categoryId }, body).then(() => {
      return res.status(200).json({ msg: `Category ${categoryId} has been successfully updated`, body });
    });
  },

  // מחיקת קטגוריה
  DeleteCategory: (req, res) => {
    let categoryId = req.params.id;
    Category.deleteOne({ categoryId }).then((data) => {
      return res.status(200).json(data);
    });
  },
};
